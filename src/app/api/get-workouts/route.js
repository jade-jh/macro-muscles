import { connectToDatabase } from '../../dashboard/mongodb.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    const workouts = await db.collection('workouts').find({}).toArray();

    console.log('GET /api/get-workouts:', workouts);
    return NextResponse.json({ workouts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
