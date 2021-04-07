/* eslint-disable import/no-unresolved */
import * as firebaseAdmin from "firebase-admin";
import * as admin from "./admin"
import * as account from "./account";
import * as stripe from "./stripe";
import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:8000",
      // Staging URL

      "https://nightmarket21.umcptasa.com"
      // PROD URL
    ]
  })
);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

firebaseAdmin.initializeApp();

// account.ts
export const addUser = account.addUser;
export const removeUser = account.removeUser;

// stripe.ts
export const createCheckoutSession = stripe.createCheckoutSession;
export const generatePurchasedTickets = stripe.generatePurchasedTickets;

// admin.ts
export const grantTicket = admin.grantTicket
export const grantAdmin = admin.grantAdmin
export const chooseWinner = admin.chooseWinner
