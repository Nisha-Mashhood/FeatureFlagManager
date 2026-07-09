export const TYPES = {
    // Repositories
    OrganizationRepository: Symbol.for("OrganizationRepository"),
    UserRepository: Symbol.for("UserRepository"),
    FeatureFlagRepository: Symbol.for("FeatureFlagRepository"),

    // Services
    OrganizationService: Symbol.for("OrganizationService"),
    AuthService: Symbol.for("AuthService"),
    UserService: Symbol.for("UserService"),
    FeatureFlagService: Symbol.for("FeatureFlagService"),
    

    // Controllers
    OrganizationController: Symbol.for("OrganizationController"),
    AuthController: Symbol.for("AuthController"),
    UserController: Symbol.for("UserController"),
    FeatureFlagController: Symbol.for("FeatureFlagController"),

} as const;