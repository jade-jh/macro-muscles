import { NextResponse } from "next/server";
import { connectToDatabase } from '../../dashboard/mongodb.js';

export async function POST(request) {
  const body = await request.json();
    const { username, password, dob, height, weight } = body;
  if (username != null && password != null) {
    const client = await connectToDatabase();
    const db = client.db();
    const usersCollection = db.collection('users');

    const newUser = {
        username,
        password,
        dob,
        height,
        weight
    };

    try {
        const existing = usersCollection.findOne({username:username}).then(result => {
            if(result) {
              console.log('Username already exists');
              throw('Username already exists');
            } 
          });
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
