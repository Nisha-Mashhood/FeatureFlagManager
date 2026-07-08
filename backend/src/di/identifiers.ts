export const TYPES = {
    // Repositories
    OrganizationRepository: Symbol.for("OrganizationRepository"),
    UserRepository: Symbol.for("UserRepository"),

    // Services
    OrganizationService: Symbol.for("OrganizationService"),
    AuthService: Symbol.for("AuthService"),
    UserService: Symbol.for("UserService"),

    // Controllers
    OrganizationController: Symbol.for("OrganizationController"),
    AuthController: Symbol.for("AuthController"),
    UserController: Symbol.for("UserController"),

} as const;