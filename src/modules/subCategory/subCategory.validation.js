import Joi from 'joi';

export const subCategoryValidationSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.base': 'Name should be a type of \'text\'',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of {#limit}',
            'any.required': 'Name is required'
        }),
    slug: Joi.string()
        .lowercase()
        .required()
        .messages({
            'string.base': 'Slug should be a type of \'text\'',
            'any.required': 'Slug is required'
        }),
    category: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'Category must be a valid ObjectId',
            'string.length': 'Category must be a 24-character hex string'
        }),
    createdBy: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'CreatedBy must be a valid ObjectId',
            'string.length': 'CreatedBy must be a 24-character hex string'
        })
});
