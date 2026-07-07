export const ROLE = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ORGANIZATION_ADMIN: "ORGANIZATION_ADMIN",
    END_USER: "END_USER",
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];