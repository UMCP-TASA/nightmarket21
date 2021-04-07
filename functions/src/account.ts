/* eslint-disable import/no-unresolved */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {createTicket, deleteTickets} from "./tickets";

export const addUser = functions
    .region("us-east4")
    .auth.user()
    .onCreate((user) => {
      const {uid, displayName, email} = user;

      if (!email) {
        functions.logger.error("No email supplied");
        return;
      }

      createTicket(email);

      return admin
          .firestore()
          .collection("users")
          .doc(uid)
          .set({uid, displayName, email});
    });

export const removeUser = functions
    .region("us-east4")
    .auth.user()
    .onDelete((user) => {
      const {email} = user;
      functions.logger.log(`Deleting user: ${email}`);

      if (!email) {
        functions.logger.error("No email supplied");
        return;
      }

      const raffleQuery = admin
          .firestore()
          .collection("raffle")
          .where("person", "==", email);

      raffleQuery
          .get()
          .then(deleteTickets)
          .catch((reason) =>
            functions.logger.error(
                `Failed to remove raffle tickets for user ${email}: ${reason}`
            )
          );

      return admin.firestore().collection("users").doc(email).delete();
    });
