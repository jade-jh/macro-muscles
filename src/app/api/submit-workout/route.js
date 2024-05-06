import { connectToDatabase } from '../../dashboard/mongodb.js';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { exercise, intensity, duration, workoutDate, workoutNotes } = body;
        const client = await connectToDatabase();
        const db = client.db();

        // Store meal data in the database
        const result = await db.collection('workouts').insertOne({
            exercise,
            intensity,
            duration,
            workoutDate,
            workoutNotes
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