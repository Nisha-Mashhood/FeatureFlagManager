import { Types } from "mongoose";

import { Environment } from "@/constants/environment";

export interface IFeatureFlag {
    id?: string;

    name: string;

    key: string;

    description?: string;

    organizationId: Types.ObjectId;

    isEnabled: boolean;

    rolloutPercentage: number;

    environment: Environment;

    createdBy: Types.ObjectId;

    createdAt?: Date;

    updatedAt?: Date;
}