import { PasswordCheck } from '@/lib/utils/core/PasswordCheck';
import { ApiResponse } from '@/lib/utils/format/ApiResponse';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json(
                new ApiResponse(400, null, "Password is required"),
                { status: 400 }
            );
        }

        const pwnedCount = await PasswordCheck(password);

        if (pwnedCount === -1) {
            return NextResponse.json(
                new ApiResponse(500, null, "Error checking password breach status"),
                { status: 500 }
            );
        } else if (pwnedCount > 0) {
            return NextResponse.json(
                new ApiResponse(200, { compromised: true, count: pwnedCount }, 
                    "Your password was found in data breaches. Please change your password."),
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                new ApiResponse(200, { compromised: false }, 
                    "Password not found in any known data breaches"),
                { status: 200 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            new ApiResponse(500, null, error.message || "Internal server error"),
            { status: 500 }
        );
    }
}