import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export enum CATEGORIES {
  BASIC = "Basic",
  PREMIUM = "Premium",
}

export enum PRIZES {
  GENERAL = "General",
  SWITCH = "Switch",
  AIRPODS = "Airpods"
}

const getRandom = () => {
  const num = Math.floor(Math.random() * 100)
  return num < 10 ? `0${num}` : num.toString()
};

const getTicketNum = () =>
  `${getRandom()}-${getRandom()}-${getRandom()}-${getRandom()}`;

export function createTicket(
  person: string,
  category: CATEGORIES = CATEGORIES.BASIC,
  prize: PRIZES = PRIZES.GENERAL
) {
  const ticketNum = getTicketNum();
  admin
    .firestore()
    .collection("raffle")
    .doc(ticketNum)
    .create({
      category,
      person,
      prize
    })
    .then(() => {
      functions.logger.log(`Created raffle ticket with ID: ${ticketNum}`);
    })
    .catch(() => createTicket(person, category));
}

export async function createTickets(
  person: string,
  amount: number = 1,
  category: CATEGORIES = CATEGORIES.BASIC,
  prize: PRIZES = PRIZES.GENERAL
) {
  const collection = admin.firestore().collection("raffle");

  return admin
    .firestore()
    .runTransaction(async (t) => {
      const validIds: string[] = [];
      let i = amount;
      while (i > 0) {
        const id = getTicketNum();
        const doc = await t.get(collection.doc("id"));

        if (!doc.exists) {
          // If doc doesn't exist, then it's a valid ID
          validIds.push(id);
          i--;
        }
      }

      validIds.forEach((id) => {
        t.create(collection.doc(id), {
          category,
          person,
          prize
        });
      });
    })
    .then(() => {
      functions.logger.log(`Successfully created ${amount} tickets`);
      return true;
    })
    .catch(() => {
      functions.logger.error("Failed to create tickets");
      return false;
    });
}

export function deleteTickets(
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) {
  functions.logger.log(`Deleting ${snapshot.size} tickets`);

  const batch = admin.firestore().batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}