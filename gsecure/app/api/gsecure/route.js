import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { ApiResponse } from '@/lib/utils/format/ApiResponse';
import connectingtoDB from '@/lib/db/mongodb';

export async function GET(request) {
    try {
        // Ensure database connection
        if (mongoose.connection.readyState === 0) {
            await connectingtoDB();
        }

        // Check database connection
        const dbState = mongoose.connection.readyState;
        const dbStatus = {
            0: 'Disconnected',
            1: 'Connected',
            2: 'Connecting',
            3: 'Disconnecting'
        };

        // Collect system information
        const healthData = {
            status: 'UP',
            timestamp: new Date().toISOString(),
            uptime: `${Math.floor(process.uptime())} seconds`,
            database: {
                status: dbStatus[dbState],
                connected: dbState === 1
            },
            environment: process.env.NODE_ENV || 'development',
            memory: {
                rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
                heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
                heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
            }
        };

        // Determine overall health status
        const isHealthy = healthData.database.connected;
        const statusCode = isHealthy ? 200 : 503; // 503 Service Unavailable

        return NextResponse.json(
            new ApiResponse(
                statusCode,
                healthData,
                isHealthy ? "Service is healthy" : "Service is degraded"
            ),
            { status: statusCode }
        );

    } catch (error) {
        return NextResponse.json(
            new ApiResponse(
                500,
                { status: 'DOWN', error: error.message },
                "Health check failed"
            ),
            { status: 500 }
        );
    }
}