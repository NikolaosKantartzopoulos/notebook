import { connectDatabase } from "@/data/helper-functions/databaseFn";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import Note from "@/data/interfaces/note.model";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { client, db } = await connectDatabase();
	try {
		switch (req.method) {
			case "GET":
				const allNotes = await db.collection("notes").find().toArray();
				break;

			case "POST":
				const newNote = JSON.parse(req.body);
				const postDatabaseRes = await db.collection("notes").insertOne(newNote);
				if (postDatabaseRes.acknowledged) {
					res.status(200).json({ _id: postDatabaseRes.insertedId.toString() });
				} else {
					res.status(500);
				}
				break;

			case "PATCH":
				const replacementNote: Note = JSON.parse(req.body);
				const toPatch = { ...replacementNote };
				delete toPatch._id;

				const putRes = await db
					.collection("notes")
					.replaceOne({ _id: new ObjectId(replacementNote._id) }, toPatch);

				if (putRes.acknowledged) {
					res.status(200).json({ type: "ok", text: "Note edited" });
				} else {
					res.status(500);
				}
				break;

			case "DELETE":
				const dbDelRes = await db
					.collection("notes")
					.deleteOne({ _id: new ObjectId(req.body) });

				if (dbDelRes.acknowledged) {
					res
						.status(200)
						.json({ type: "ok", text: "Note deleted", _id: req.body });
				} else {
					res.status(500);
				}
				break;
		}
	} finally {
		await client.close();
	}
}
