import { connectToDatabase } from '../../dashboard/meal/mongodb.js';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { mealCategory, calories, mealDate, mealNotes } = body;
        const client = await connectToDatabase();
        const db = client.db();

        // Store meal data in the database
        const result = await db.collection('meals').insertOne({
            mealCategory,
            calories,
            mealDate,
            mealNotes
        });
        console.log('Inserted document ID:', result.insertedId);

        console.log('POST', body);
        console.log('Data inserted successfully');
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } });
        return response;
    } catch (error) {
        console.error('Error storing data:', error);
        return NextResponse.json({ success: false }, { status: 403, headers: { "content-type": "application/json" }});
    }
}
