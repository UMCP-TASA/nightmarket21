/* eslint-disable import/no-unresolved */
import * as functions from "firebase-functions";
import { createTickets, CATEGORIES, PRIZES } from "./tickets";
import Stripe from "stripe";
const stripe = new Stripe(functions.config().stripe.key, {
  apiVersion: "2020-08-27"
});

const endPointSecret = functions.config().stripe.sign as string;

enum PRICES {
  TEST_PREMIUM_1 = "price_1HnIMNI2gbJ3CgDU6xU3IaoD",
  TEST_PREMIUM_5 = "price_1HnINLI2gbJ3CgDUVevYlVTz",
  TEST_PREMIUM_10 = "price_1HnINjI2gbJ3CgDUUo43habH",
  TEST_BASIC_1 = "price_1HnIQ2I2gbJ3CgDU9PBc3vov",

  LIVE_PREMIUM_1 = "price_1HnexyI2gbJ3CgDU5MAqwj5P",
  LIVE_PREMIUM_5 = "price_1HnexvI2gbJ3CgDUtQMiNHoL",
  LIVE_PREMIUM_10 = "price_1HnexsI2gbJ3CgDUqNfVdcQC",
  LIVE_BASIC_1 = "price_1HnexmI2gbJ3CgDUzvg52NMh"
}

type CheckoutSessionData = {
  person: string;
  items: {
    price: string;
    quantity: number;
  }[];
  successUrl: string;
  cancelUrl: string;
};

export const createCheckoutSession = functions
  .region("us-east4")
  .https.onCall((data: CheckoutSessionData, context) => {
    if (!context.auth)
      return { status: "error", code: 401, message: "Not signed in" };

    if (!data.person || !data.items)
      return {
        status: "error",
        code: 401,
        message: "Improperly formed request"
      };

    const { person, items, successUrl, cancelUrl } = data;

    let numBasicTickets = 0;
    let numPremiumTickets = 0;

    items.forEach((item) => {
      switch (item.price) {
        case PRICES.TEST_PREMIUM_1:
        case PRICES.LIVE_PREMIUM_1:
          numPremiumTickets += item.quantity;
          break;
        case PRICES.TEST_PREMIUM_5:
        case PRICES.LIVE_PREMIUM_5:
          numPremiumTickets += item.quantity * 5;
          break;
        case PRICES.TEST_PREMIUM_10:
        case PRICES.LIVE_PREMIUM_10:
          numPremiumTickets += item.quantity * 10;
          break;
        case PRICES.TEST_BASIC_1:
        case PRICES.LIVE_BASIC_1:
          numBasicTickets += item.quantity;
          break;
        default:
          functions.logger.log("Invalid product id provided: ", item.price);
          return;
      }
    });

    const session = stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: person,
      metadata: {
        person,
        numBasicTickets,
        numPremiumTickets
      }
    });

    return session
      .then((value) => {
        return { sessionId: value.id };
      })
      .catch((error) => {
        return {
          status: "error",
          code: 401,
          message: error
        };
      });
  });

type Metadata = {
  person: string;
  numBasicTickets: number;
  numPremiumTickets: number;
};

type Session = {
  id: string;
  client_reference_id: string;
  metadata: Metadata;
};

export const generatePurchasedTickets = functions
  .region("us-east4")
  .https.onRequest(async (request, response) => {
    const sig = request.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endPointSecret
      );
    } catch (err) {
      functions.logger.log("Invalid Stripe event");
      return response.status(400).end();
    }

    const session = event.data.object as Session;

    const { person, numBasicTickets, numPremiumTickets } = session.metadata;

    if (numBasicTickets > 0) {
      await createTickets(person, numBasicTickets, CATEGORIES.BASIC);
    }

    if (numPremiumTickets > 0)
      await createTickets(
        person,
        numPremiumTickets,
        CATEGORIES.PREMIUM,
        PRIZES.SWITCH
      );

    response.json({ received: true });
  });
