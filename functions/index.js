const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const itemsRef = admin.firestore().collection('items');

exports.addCode = functions.firestore
  .document('items/{itemID}')
  .onCreate((snap, context) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    itemsRef.doc(context.params.itemID).update({code: code});
  });

exports.changeCodeOnDelivery = functions.firestore
  .document('items/{itemID}')
  .onUpdate((change, context) => {
    const newValue = change.after.data();

    if (newValue.delivery_status === 'Delivered And Boxafed') {
      const newCode = Math.floor(100000 + Math.random() * 900000);
      itemsRef.doc(context.params.itemID).update({code: newCode});
    }
  });
