import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        // Only local (username/password) accounts need a password. OAuth
        // accounts (e.g. GitHub) authenticate with the provider instead.
        required: [
            function () { return this.authProvider === "local"; },
            "Password can't be blank"
        ]
    },
    keyword: { // as G-tag
        type: String,
        // Required for local sign-ups only; OAuth accounts don't set one.
        required: function () { return this.authProvider === "local"; },
    },
    authProvider: {
        type: String,
        enum: ["local", "github"],
        default: "local"
    },
    githubId: {
        // GitHub numeric account id (stored as string). Sparse + unique so
        // existing local users (no githubId) are excluded from the index and
        // never collide on null.
        type: String,
        unique: true,
        sparse: true
    },
    passwordChangedAt: {
        type: Date
    }
}, { timestamps: true });

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 5)
    this.passwordChangedAt = new Date();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            time: this.createdAt
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
