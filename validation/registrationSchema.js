import * as Joi from 'joi';

const registrationSchema = Joi.object({
    // check general email address, DON'T check the part of an email address after the last dot (.com, .org, ...)
    // user@example.abc --> valid when we defined {tlds: false}
    email: Joi.string()
        .email({ tlds: false })
        .messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        })
        .required(),
    
    password: Joi.string()
        .min(4)
        .required()
        .messages({
            "string.min": "Password must be at least 4 characters",
            'any.required': "Password is required"
        }),
        
    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Confirm password must match password"
        })
});

export default registrationSchema;