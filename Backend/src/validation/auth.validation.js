import { body ,  validationResult } from "express-validator"


function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0]?.msg || "Validation failed",
            errors: errors.array()
        });
    }
    next();
}

export const validateRegisteration = [
    body("email")
        .trim()
        .isEmail().withMessage("Invalid email address"),
    body("phoneno")
        .trim()
        .notEmpty().withMessage("Phone number is required")
        .custom((val) => {
            const digitsOnly = String(val).replace(/[\s\-\(\)\+]/g, '');
            if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                throw new Error("Phone number must contain between 7 and 15 digits");
            }
            return true;
        }),
    body("fullname")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 2 }).withMessage("Full name must be at least 2 characters long"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("isSeller")
        .optional()
        .isBoolean().withMessage("isSeller must be a boolean value"),
    validateRequest
];

export const validateLogin = [
    body("email")
        .trim()
        .isEmail().withMessage("Valid email address is required"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    validateRequest
];