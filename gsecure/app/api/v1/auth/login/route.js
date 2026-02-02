import { NextResponse } from 'next/server';
import connectingtoDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { generateAccessToken } from '@/lib/utils/jwt';

export async function POST(req) {
  try {
    await connectingtoDB();

    const body = await req.json();
    
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Request body is missing" },
        { status: 400 }
      );
    }

    const { uname, upassword } = body;

    if (!uname) {
      return NextResponse.json(
        { success: false, message: "User doesnot exist on our systems." },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({
      $or: [{ username:uname }]
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesnot exist on our systems." },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValid = await user.isPasswordCorrect(upassword);

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Try with different (you have only 3 attempts and you will temporary blocked.)" },
        { status: 401 }
      );
    }

    // Generate access token
    const { authToken } = await generateAccessToken(user._id);

    // Create response with cookie
    const response = NextResponse.json(
      { success: true, data: {
        user:{
          username:user.username,
          email:user.email
        }
      }, message: "User logged in successfully" },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('authToken', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days, adjust as needed
    });

    return response;

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}