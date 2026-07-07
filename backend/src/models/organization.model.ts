import { model, Schema } from "mongoose";
import { IOrganization } from "@/interfaces/models/i-organization";

const organizationSchema = new Schema<IOrganization>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const OrganizationModel = model<IOrganization>(
    "Organization",
    organizationSchema,
);