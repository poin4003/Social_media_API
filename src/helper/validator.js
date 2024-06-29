// Import module for validating
const Joi = require('@hapi/joi')

// Middleware function for validating body
const validateBody = (schema, name) => {
  try {
    return (req, res, next) => {
      // console.log(req.body)
      const validatorResult = schema.validate(req.body)

      // console.log(validatorResult)
      if (validatorResult.error) {
        return res.status(400).json(validatorResult.error)
      } else {
        if (!req.value) req.value = {}
        if (!req.value['params']) req.value.params = {}

        req.value.body = validatorResult.value
        next()
      }
    }
  } catch (error) { 
    next(error)
  }
}

// Middleware function for validating param
const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] })
    
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error)
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}

      req.value.params[name] = req.params[name]
      next()
    }
  }
}

const schemas = {
  // Validate schemas
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  userSchema: Joi.object().keys({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number(),
    posts: Joi.array().items(
      Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    )
  }),

  userOptionalSchema: Joi.object().keys({
    name: Joi.string().min(2),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6),
    role: Joi.number(),
    posts: Joi.array().items(
      Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    )
  }),

  postSchema: Joi.object().keys({
    title: Joi.string().min(2).required(),
    content: Joi.string().required(),
    createdOn: Joi.string().required(),
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  postOptionalSchema: Joi.object().keys({
    title: Joi.string().min(2),
    content: Joi.string(),
    createdOn: Joi.string()
  })
}

// Export modules
module.exports = {
  validateBody,
  validateParam,
  schemas
}