import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { getUserProfile } from "./scraper";

admin.initializeApp();

type Handler = (req: functions.https.Request, resp: express.Response) => void | Promise<void>;

const cors: (handler: Handler) => Handler = (handler) => (req, res) => {
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	res.set("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
	res.set("Access-Control-Allow-Headers", "Content-Type");
	return handler(req, res);
};
const addFunction = (handler: Handler) => {
	return functions.region("asia-northeast1").https.onRequest(cors(handler));
};

export const getProfiles = addFunction(async (req, res) => {
	if (req.method != "GET") {
		res.status(405).send({ error: "Method Not Allowed" });
		return;
	}

	const db = admin.firestore();
	const snapshot = await db.collection("deka").get();

	const result: FirebaseFirestore.DocumentData[] = [];
	snapshot.forEach(e => result.push(e.data()));

	res.status(200).send(result);
});

export const updateProfile = addFunction(async (req, res) => {
	if (req.method == "OPTIONS") {
		res.status(204).send("");
		return;
	}
	if (req.method != "POST") {
		res.status(405).send({ error: "Method Not Allowed" });
		return;
	}
	if (typeof req.body != "object" || !req.body.target) {
		res.status(400).send({ error: "Bad Request" });
		return;
	}

	try {
		const { name, screenName, bio } = await getUserProfile(req.body.target);

		const db = admin.firestore();
		await db.collection("deka").doc(screenName).set({ name, screenName, bio });

		res.status(200).send({ name, screenName, bio });
	} catch (error) {
		res.status(500).send({ error: `updateProfile failed: ${error}` });
	}
});
