// Here we validate our data in server side

const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (schema: any, data: any) => {
  try {
      return schema.validate(data)
  } catch (error) {
    return error
  }
}

