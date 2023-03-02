import { connectDatabase } from "@/data/helper-functions/databaseFn";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { client, db } = await connectDatabase();
	try {
		switch (req.method) {
			case "GET":
				const allNotes = await db.collection("notes").find().toArray();
			case "POST":
				const newNote = JSON.parse(req.body);
				const postDatabaseRes = await db.collection("notes").insertOne(newNote);
				res.status(200).json(postDatabaseRes);
		}
	} finally {
		await client.close();
	}
}
