export const VALIDATION_MESSAGES = {
  ORGANIZATION_NAME_REQUIRED: "Organization name is required.",

  ORGANIZATION_NAME_LENGTH: "Organization name must be between 3 and 50 characters.",

  INVALID_ORGANIZATION_ID: "Invalid organization id.",

  INVALID_PAGE: "Page must be greater than 0.",

  INVALID_LIMIT: "Limit must be between 1 and 100.",

  INVALID_SORT_ORDER: "Sort order must be asc or desc.",

  EMAIL_REQUIRED: "Email is required.",

  INVALID_EMAIL: "Please enter a valid email address.",

  PASSWORD_REQUIRED: "Password is required.",

  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters.",

  NAME_REQUIRED: "Name is required.",

  NAME_LENGTH: "Name must be between 3 and 50 characters.",

  ORGANIZATION_ID_REQUIRED: "Organization ID is required.",

  INVALID_USER_ID: "Invalid user ID.",

} as const;
