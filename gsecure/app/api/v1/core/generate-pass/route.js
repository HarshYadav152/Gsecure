import { GeneratePassword } from '@/lib/utils/core/GeneratePassword';
import { PasswordStrength } from '@/lib/utils/core/PasswordStrength';
import { ApiResponse } from '@/lib/utils/format/ApiResponse';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        
        const options = {
            length: body.plength,
            keyword: body.keyword || '',
        };
        
        const gpassword = GeneratePassword(options);

        // Analyze the generated password's strength
        const strengthAnalysis = PasswordStrength(gpassword.password);
        
        return NextResponse.json(
            new ApiResponse(200, {
                gresponse: gpassword,
                strength: {
                    score: strengthAnalysis.score,
                    rating: strengthAnalysis.rating,
                    feedback: strengthAnalysis.feedback
                }
            }, "Strong password generated successfully"),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            new ApiResponse(400, null, error.message || "Failed to generate password"),
            { status: 400 }
        );
    }
}