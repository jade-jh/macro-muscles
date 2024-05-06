import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
import { connectToDatabase } from '../../dashboard/mongodb.js';

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;
  const client = await connectToDatabase();
  const db = client.db();
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({username:username});
    if(user && user.password == password) {
      const token = await new SignJWT({
        username: user.username,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30m") 
        .sign(getJwtSecretKey());
        const response = NextResponse.json(
          { success: true },
          { status: 200, headers: { "content-type": "application/json" } }
        );
        response.cookies.set({
          name: "token",
          value: token,
          path: "/",
        });
        return response;
  }
console.log('error');
  return NextResponse.json({ success: false }, { status: 403, headers: { "content-type": "application/json" }});
}