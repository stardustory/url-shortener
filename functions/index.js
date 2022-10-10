const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();
var urlRef = db.collection('urls');

const increment = FieldValue.increment(1);

const { encode, decode } = require('./hashurl');

const config = {
    webhost: 'http://localhost:5001/url-shortener-3d8fa/us-central1/shortener/'
}

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/shorten', async (req, res) => {
    const longurl = req.body.longurl;
    console.log(longurl);
    const docs = await urlRef.where('longurl', '==', longurl).get();
    if (docs.empty) {
        console.log('No such document!');
        const countRef = urlRef.doc('no');
        const cdoc = await countRef.get();

        var nourl = 0;
        if (cdoc.exists) {
            await countRef.update({ count: increment });
            const nodoc = await countRef.get();
            nourl = nodoc.data().count;
        } else {
            await countRef.set({ count: 10000 });
            nourl = 10000;
        }

        await urlRef.doc('' + nourl).set({
            longurl: longurl,
            time: FieldValue.serverTimestamp()
        });

        res.status(201).json({ shorturl: config.webhost + encode(nourl) });
    } else {
        const result = docs.docs.map(doc => doc.id);
        //console.log(result);
        res.status(201).json({ shorturl: config.webhost + encode(result[0]) });
    }
});

app.get('/:encodedid', async (req, res) => {
    const encodeid = req.params.encodedid
    const doc = await urlRef.doc('' + decode(encodeid)).get();
    if (!doc.exists) {
        console.log('No such document!');
        res.status(404).send();
    } else {
        const result = doc.data();
        console.log('Document data:', result);
        res.redirect(result.longurl);
    }
});

exports.shortener = functions.https.onRequest(app);