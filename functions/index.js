/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * This function will create a new user in Firestore when we get a new signup
 */
exports.createUser = functions
  .region('europe-west1')
  .auth
  .user()
  .onCreate(async (user) => {
    await admin.firestore()
      .collection("users")
      .doc(user.uid)
      .set({ 
        email: user.email,
        roles: []
      }, { merge: true });
    return;
  });
