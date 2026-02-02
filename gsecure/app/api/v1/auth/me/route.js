import connectingtoDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { verifyAccessToken } from '@/lib/utils/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectingtoDB();
    const token = (await cookies()).get("authToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    // Verify token and get user
    const decoded = await verifyAccessToken(token);

    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true, data: {
          user: {
            username: user.username,
            email: user.email
          }
        }, message: "User fetched successfully."
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}