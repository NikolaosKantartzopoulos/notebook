import { Document, MongoClient, Db } from "mongodb";

export const dbConnectionLink = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_CODE}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export async function connectDatabase() {
	const client = await MongoClient.connect(dbConnectionLink);
	const db = client.db();

	return { client: client, db: db };
}

export async function insertDocument(
	db: Db,
	collection: string,
	document: Document
) {
	const result = await db.collection(collection).insertOne(document);
	return result;
}

export async function updateDocument(
	db: Db,
	collection: string,
	filter: {},
	document: Document
) {
	const result = await db.collection(collection).updateOne(filter, document);
	return result;
}

export async function getAllDocuments(db: Db, collection: string, sort: {}) {
	const documents = await db.collection(collection).find().sort(sort).toArray();
	return documents;
}
