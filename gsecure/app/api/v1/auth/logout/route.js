import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Create response
    const response = NextResponse.json(
      { success: true, data: {}, message: "Logout successfully" },
      { status: 200 }
    );

    // Clear cookie
    response.cookies.set('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}