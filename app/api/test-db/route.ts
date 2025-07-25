import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json(
      { message: "MONGODB_URI is not set in .env file." },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connection successful. Pinging database...");
    await client.db("admin").command({ ping: 1 });
    console.log("Ping successful.");
    return NextResponse.json({ message: "Database connection successful!" });
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { message: "Database connection failed", error: error.message },
      { status: 500 }
    );
  } finally {
    console.log("Closing connection.");
    await client.close();
  }
}
