import { ApiResponse } from '@/lib/utils/format/ApiResponse';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const headers = request.headers;
        
        let ipAddress = headers.get('x-forwarded-for') || 
                       headers.get('x-real-ip') ||
                       headers.get('x-client-ip') ||
                       request.ip ||
                       null;
        
        // If x-forwarded-for contains multiple IPs, get the first one (client IP)
        if (ipAddress && ipAddress.includes(',')) {
            ipAddress = ipAddress.split(',')[0].trim();
        }
        
        // Remove the IPv6 prefix if present (common in Node.js environments)
        if (ipAddress && ipAddress.startsWith('::ffff:')) {
            ipAddress = ipAddress.substring(7);
        }
        
        // Handle the IPv6 loopback address
        if (ipAddress === '::1') {
            ipAddress = '127.0.0.1';  // Convert IPv6 localhost to IPv4 format
        }

        if (!ipAddress) {
            return NextResponse.json(
                new ApiResponse(500, null, "Some error occurred for accessing ip"),
                { status: 500 }
            );
        }

        return NextResponse.json(
            new ApiResponse(200, ipAddress, "IP address fetched"),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            new ApiResponse(500, null, error.message || "Internal server error"),
            { status: 500 }
        );
    }
}