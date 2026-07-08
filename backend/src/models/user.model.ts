import { model, Schema } from "mongoose";
import { IUser } from "@/interfaces/models/i-user";
import { ROLE } from "@/constants/roles";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: Object.values(ROLE),
            required: true,
        },

        isApproved: {
            type: Boolean,
            default: false,
        },

        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const UserModel = model<IUser>("User", userSchema);