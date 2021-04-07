/* eslint-disable import/no-unresolved */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {createTickets, CATEGORIES, PRIZES} from "./tickets";

type GrantTicketData = {
  person: string;
  amount: number;
  category: CATEGORIES;
};

interface ReturnStatus {
  status: string;
  code: number;
  message: string;
  response?: any;
}

type ReturnStatusAndPromise = ReturnStatus | Promise<ReturnStatus>;

const returnError = (code: number, message: string) => () => ({
  status: "error",
  code,
  message,
});

function verifyAdmin(
    context: functions.https.CallableContext,
    handlerFunc: () => ReturnStatusAndPromise
): ReturnStatusAndPromise {
  if (!context.auth) {
    return {
      status: "error",
      code: 401,
      message: "Not authenticated",
    };
  }

  return admin
      .auth()
      .getUser(context.auth.uid)
      .then((userRecord) => {
        if (
          userRecord.customClaims &&
          userRecord.customClaims["admin"] === true
        ) {
          return handlerFunc();
        } else {
          return {
            status: "error",
            code: 401,
            message: "Not an admin",
          };
        }
      })
      .catch(returnError(401, "Couldn't verify ID token"));
}

export const grantTicket = functions
    .region("us-east4")
    .https.onCall((data: GrantTicketData, context) => {
      if (!data.person || !data.amount || !data.category) {
        return {
          status: "error",
          code: 401,
          message: "Improperly formed request",
        };
      }

      const {person, amount, category} = data;
      const prize =
        category === CATEGORIES.BASIC ? PRIZES.GENERAL : PRIZES.SWITCH;
      const handlerFunc = () =>
        createTickets(person, amount, category, prize)
            .then(() => ({
              status: "success",
              code: 200,
              message: "Successfully created tickets"
            }))
            .catch(returnError(500, "Failed to create tickets"));

      return verifyAdmin(context, handlerFunc);
    });

const assignWinner = (
    doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
    prize: PRIZES
): ReturnStatusAndPromise =>
  doc.ref
      .update({winner: true})
      .then(() => {
        const {person, category} = doc.data();

        return admin
          .firestore()
          .collection("winners")
          .doc(doc.id)
          .create({
            prize,
            person,
            category,
            ticket: doc.id
          })
          .then(() => ({
            status: "success",
            code: 200,
            message: `${person} won with ticket: ${doc.id}`,
            response: {
              ticket: doc.id,
              person: person
            }
          }))
          .catch(returnError(500, "Couldn't add ticket to winners collection"));
      })
      .catch(returnError(500, "Couldn't set ticket as winner"));

type ChooseWinnerData = {
  prize: PRIZES;
};

export const chooseWinner = functions
  .region("us-east4")
  .https.onCall((data: ChooseWinnerData, context) => {
    if (!data.prize) {
      return {
        status: "error",
        code: 401,
        message: "Improperly formed request"
      };
    }

    const { prize } = data;
    return verifyAdmin(context, () => {
      const prizeTicketsQuery = admin
        .firestore()
        .collection("raffle")
        .where("prize", "==", prize)
        .get();

      return prizeTicketsQuery
        .then((queryResult) => {
          const docs = queryResult.docs;
          const winningDoc = docs[Math.floor(Math.random() * docs.length)];
          return assignWinner(winningDoc, prize);
        })
        .catch(returnError(500, "Couldn't execute prize tickets query"));
    });
  });

type GrantAdminData = {
  id: string;
};

export const grantAdmin = functions
  .region("us-east4")
  .https.onCall((data: GrantAdminData, context) => {
    if (!data.id) {
      return {
        status: "error",
        code: 400,
        message: "Improperly formed request"
      };
    }

    const { id } = data;

    return verifyAdmin(context, () =>
      admin
        .auth()
        .setCustomUserClaims(id, { admin: true })
        .then(() => ({
          status: "success",
          code: 200,
          message: `Successfully made ${id} an admin`
        }))
        .catch(returnError(500, "Couldn't set as admin"))
    );
  });
