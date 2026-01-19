import Vault from "@/lib/models/Vault";
import { verifyAccessToken } from "@/lib/utils/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id"); // Get the `id` from query params
        const body = await req.json();
        const { keyword } = body;

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

        // Find the vault entry
        const vaultEntry = await Vault.findOne({
            _id: id,
            owner: decoded._id,
        });

        if (!vaultEntry) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password entry not found or you don't have permission to delete it.",
                },
                { status: 404 }
            );
        }

        // Check if the keyword matches
        if (vaultEntry.keyword !== keyword) {
            return NextResponse.json(
                { success: false, message: "Keyword does not match. Try again." },
                { status: 409 }
            );
        }

        // Delete the vault entry
        await Vault.findByIdAndDelete(vaultEntry._id);

        return NextResponse.json(
            { success: true, message: "Selected entry has been deleted." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting vault entry:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete entry. Try again." },
            { status: 500 }
        );
    }
}