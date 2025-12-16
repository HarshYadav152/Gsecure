import { PasswordStrength } from '@/lib/utils/core/PasswordStrength';
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

        const strengthResult = PasswordStrength(password);

        return NextResponse.json(
            new ApiResponse(200, {
                score: strengthResult.score,
                rating: strengthResult.rating,
                feedback: strengthResult.feedback
            }, "Password strength evaluation completed"),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            new ApiResponse(500, null, error.message || "Internal server error"),
            { status: 500 }
        );
    }
}