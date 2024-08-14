import Joi from 'joi';

export const productValidationSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.base': 'Title should be a type of \'text\'',
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title should have a minimum length of {#limit}',
            'any.required': 'Title is required'
        }),
    slug: Joi.string()
        .lowercase()
        .messages({
            'string.base': 'Slug should be a type of \'text\'',
            'any.required': 'Slug is required'
        }),
    description: Joi.string()
        .min(30)
        .max(2000)
        .required()
        .messages({
            'string.base': 'Description should be a type of \'text\'',
            'string.empty': 'Description cannot be empty',
            'string.min': 'Description should have a minimum length of {#limit}',
            'string.max': 'Description should have a maximum length of {#limit}',
            'any.required': 'Description is required'
        }),
    imageCover: Joi.string()
        .uri()
        .allow('')
        .messages({
            'string.uri': 'ImageCover must be a valid URI'
        }),
    image: Joi.array()
        .items(Joi.string().uri())
        .messages({
            'array.base': 'Images should be an array of URIs',
            'string.uri': 'Each image must be a valid URI'
        }),
    price: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Price should be a type of \'number\'',
            'number.min': 'Price should be greater than or equal to {#limit}',
            'any.required': 'Price is required'
        }),
    priceAfterDiscount: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'PriceAfterDiscount should be a type of \'number\'',
            'number.min': 'PriceAfterDiscount should be greater than or equal to {#limit}',
            'any.required': 'PriceAfterDiscount is required'
        }),
    sold: Joi.number()
        .min(0)
        .allow('')
        .messages({
            'number.base': 'Sold should be a type of \'number\'',
            'number.min': 'Sold should be greater than or equal to {#limit}'
        }),
    stock: Joi.number()
        .min(0)
        .allow('')
        .messages({
            'number.base': 'Stock should be a type of \'number\'',
            'number.min': 'Stock should be greater than or equal to {#limit}'
        }),
    category: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'Category must be a valid ObjectId',
            'string.length': 'Category must be a 24-character hex string'
        }),
    subcategory: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'Subcategory must be a valid ObjectId',
            'string.length': 'Subcategory must be a 24-character hex string'
        }),
    brand: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'Brand must be a valid ObjectId',
            'string.length': 'Brand must be a 24-character hex string'
        }),
    rateAvg: Joi.number()
        .min(0)
        .max(5)
        .allow('')
        .messages({
            'number.base': 'RateAvg should be a type of \'number\'',
            'number.min': 'RateAvg should be greater than or equal to {#limit}',
            'number.max': 'RateAvg should be less than or equal to {#limit}'
        }),
    rateCount: Joi.number()
        .min(0)
        .allow('')
        .messages({
            'number.base': 'RateCount should be a type of \'number\'',
            'number.min': 'RateCount should be greater than or equal to {#limit}'
        }),
    createdBy: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'CreatedBy must be a valid ObjectId',
            'string.length': 'CreatedBy must be a 24-character hex string'
        })
});
