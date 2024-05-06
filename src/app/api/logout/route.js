import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";

export async function GET(request) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set({
      name: "token",
      value: "",
      path: "/",
    });
    return response;
  }