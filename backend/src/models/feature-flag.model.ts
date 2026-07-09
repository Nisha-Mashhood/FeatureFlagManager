import { model, Schema } from "mongoose";

import { ENVIRONMENT } from "@/constants/environment";
import { IFeatureFlag } from "@/interfaces/models/i-feature-flag";

const featureFlagSchema = new Schema<IFeatureFlag>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        key: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        description: {
            type: String,
            trim: true,
        },

        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        isEnabled: {
            type: Boolean,
            default: false,
        },

        rolloutPercentage: {
            type: Number,
            default: 100,
            min: 0,
            max: 100,
        },

        environment: {
            type: String,
            enum: Object.values(ENVIRONMENT),
            default: ENVIRONMENT.DEVELOPMENT,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

featureFlagSchema.index(
    {
        organizationId: 1,
        key: 1,
    },
    {
        unique: true,
    },
);

export const FeatureFlagModel =
    model<IFeatureFlag>(
        "FeatureFlag",
        featureFlagSchema,
    );