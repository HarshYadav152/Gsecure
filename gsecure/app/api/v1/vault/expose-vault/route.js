import Vault from "@/lib/models/Vault";
import { verifyAccessToken } from "@/lib/utils/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Get the token from cookies
        const token = cookies().get("authToken")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Authentication token is missing." },
                { status: 401 }
            );
        }

        // Verify the token
        const decoded = await verifyAccessToken(token);

        // Fetch vault entries for the user
        const vaultEntries = await Vault.find({ owner: decoded._id })
            .sort({ updatedAt: -1 })
            .select("website username upassword notes createdAt updatedAt");

        const validEntries = vaultEntries.map((entry) => ({
            id: entry._id,
            website: entry.website,
            username: entry.username,
            password: entry.upassword,
            notes: entry.notes,
            lastUpdated: entry.updatedAt,
            created: entry.createdAt,
        }));

        return NextResponse.json(
            {
                success: true,
                data: {
                    count: validEntries.length,
                    savedPass: validEntries,
                },
                message: "Password entries fetched successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching vault entries:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch password entries." },
            { status: 500 }
        );
    }
}