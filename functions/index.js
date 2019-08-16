"use strict";

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const {getUserProfile} = require("scrape-twitter");

admin.initializeApp();

const cors = handler => (req, res) => {
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	res.set("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
	res.set("Access-Control-Allow-Headers", "Content-Type");
	return handler(req, res);
};

exports.getProfiles = functions.region("asia-northeast1").https.onRequest(cors(async (req, res) => {
	if (req.method != "GET") {
		return res.status(405).send({error: "Method Not Allowed"});
	}

	const db = admin.firestore();
	const snapshot = await db.collection("deka").get();

	const result = [];
	snapshot.forEach(e => result.push(e.data()));

	res.status(200).send(result);
}));

exports.updateProfile = functions.region("asia-northeast1").https.onRequest(cors(async (req, res) => {
	if (req.method == "OPTIONS") {
		return res.status(204).send("");
	}
	if (req.method != "POST") {
		return res.status(405).send({error: "Method Not Allowed"});
	}
	if (typeof req.body != "object" || !req.body.target) {
		return res.status(400).send({error: "Bad Request"});
	}

	try {
		const {name, screenName, bio} = await getUserProfile(req.body.target);

		const db = admin.firestore();
		await db.collection("deka").doc(screenName).set({name, screenName, bio});

		res.status(200).send({name, screenName, bio});
	} catch (error) {
		res.status(404).send({error: "Not Found"});
	}
}));
