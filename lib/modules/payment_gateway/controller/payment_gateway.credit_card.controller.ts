// Here we handle our api calls.

import { Request, Response } from 'express'
import errorHandler from '../../../commons/handler/error.handler'
import { PaymentInfo } from "../services/payment_gateway.services"
const { Pool } = require('pg')
const luhn = require("luhn");

// To encrypt card number and cvv
const bcrypt = require('bcryptjs');

const joiValidation =  require("../../../commons/validation/joi_validation");

const Joi = require('joi').extend(require('@joi/date'));

export default class PaymentGatewayCreditCard {
    public add = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                credit_card_number: Joi.string().length(16).regex(/^\d+$/).required(),
                credit_card_cvv: Joi.string().length(3).regex(/^\d+$/).required(),
                credit_card_holder_name: Joi.string().regex(/^[ a-zA-Z]+$/).min(4).max(30).required(),
                credit_card_expiration_date: Joi.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/).required()
            })

            const validate = await joiValidation(schema, req.body)
            if (validate.error) {
              throw {
                status: 400,
                message: validate.error.details[0].message.replace(/['"]/g, ''),
                name: "request-validation-error"
              }
            }

            const is_valid = luhn.validate(validate.value.credit_card_number);
            if(!is_valid){
                throw{
                    status: 400,
                    message: "Credit card number is invalid"
                }
            }

            const hashedCreditCardNumber = bcrypt.hashSync(validate.value.credit_card_number, Number(process.env.BCRYPT_SALT));
            const hashedCreditCardCVV = bcrypt.hashSync(validate.value.credit_card_cvv, Number(process.env.BCRYPT_SALT));

            const paymentInfo = new PaymentInfo();
            await paymentInfo.insertCreditCardInfo('INSERT INTO payment_info(card_number, cvv, name, card_expiry) VALUES($1, $2, $3, $4)', [hashedCreditCardNumber, hashedCreditCardCVV, validate.value.credit_card_holder_name, validate.value.credit_card_expiration_date]);

            return res.status(200).send({
                message: 'Credit card info added successfully !',
                success: true
            })
        } catch (error) {
            const errorDoc = errorHandler(error)
            return res.status(errorDoc.status).send(errorDoc)
        }
    };
}
