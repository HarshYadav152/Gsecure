import connectingtoDB from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import Vault from "@/lib/models/Vault";
import { verifyAccessToken } from "@/lib/utils/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectingtoDB();
        const body = await req.json(); // Parse the request body
        const { website, username, password, note, keyword } = body;

        // Get the token from cookies
        const token = (await cookies()).get("authToken")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Authentication token is missing." },
                { status: 401 }
            );
        }

        // Verify the token
        const decoded = await verifyAccessToken(token);
        console.log("decoded at route : ",decoded._id)

        // Find the user by ID from the token payload
        const owner = await User.findById(decoded._id);
        console.log("ownere is : ",owner);
        if (!owner) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 }
            );
        }

        // Create a new vault item
        await Vault.create({
            owner: owner._id,
            website,
            username,
            upassword: password,
            keyword,
            note,
        });

        return NextResponse.json(
            { success: true, message: "Password saved successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving password:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save password. Try again." },
            { status: 500 }
        );
    }
}