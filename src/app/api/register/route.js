import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
import { connectToDatabase } from './mongodb';

export async function POST(request) {
  const body = await request.json();
  console.log("POST", body);
  if (body.username != null && body.password != null) {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const newUser = {
        username: body.username,
        password: body.password
    };

    try {
        const result = await usersCollection.insertOne(newUser);
        console.log('User registered successfully:', result.insertedId);
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );
        return response;
    } catch (error) {
        console.error('Error registering user:', error);
    }

  }
  return NextResponse.json({ success: false }, { status: 403, headers: { "content-type": "application/json" }});
}
