import { connectDatabase } from "@/data/helper-functions/databaseFn";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

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
				res.status(200).json(postDatabaseRes);
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
