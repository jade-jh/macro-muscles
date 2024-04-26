import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const result = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
      headers: {
        'X-Api-Key': process.env.NINJAS_API_KEY
      }
    });
    const data = await result.json();
    const calories = data.reduce((acc, item) => acc + item.calories, 0);
    return NextResponse.json({ calories }, { status: 200, headers: { "content-type": "application/json" } });
}