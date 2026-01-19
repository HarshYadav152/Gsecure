import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import connectingtoDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    await connectingtoDB();

    const body = await req.json();
    const { uname, uemail, upassword, keyword } = body;
    console.log(body)

    console.log("username",uname)
    // Validate fields
    if ([uemail, upassword, uname, keyword].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existedUser = await User.findOne({
      $or: [{ username:uname }, { email:uemail }]
    });

    // Create user
    const user = await User.create({
      username: uname.toLowerCase(),
      email:uemail,
      password:upassword,
      keyword
    });

    return NextResponse.json(
      { success: true, data: {}, message: "User created successfully." },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}