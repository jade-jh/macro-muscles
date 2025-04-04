import { connectToDatabase } from '../../dashboard/mongodb.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    const meals = await db.collection('meals').find({}).toArray();

    console.log('GET /api/get-meals:', meals);
    return NextResponse.json({ meals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection('meals').deleteMany({});

    return NextResponse.json({ message: 'Successfully cleared meals collection' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing meals collection:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
