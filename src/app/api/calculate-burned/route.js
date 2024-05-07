import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const duration = searchParams.get('duration');
    const exercise = searchParams.get('exercise');
    const intensity = searchParams.get('intensity');
    const caloriesBurned = calculateCaloriesBurned(duration, intensity, exercise);
    return NextResponse.json({ caloriesBurned }, { status: 200, headers: { "content-type": "application/json" } });
}

function calculateCaloriesBurned(duration, intensity, exercise) {
    let caloriesBurned = 0;
    if (exercise === 'Running') {
        caloriesBurned = duration * 9.76;
    } else if (exercise === 'Cycling') {
        caloriesBurned = duration * 8;
    } else {
        caloriesBurned = duration * 5; 
    }
    return caloriesBurned;
}
