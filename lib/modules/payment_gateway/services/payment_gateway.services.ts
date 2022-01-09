// Here we define fuctions to perform CRUD operations on our database

const { Pool } = require('pg')

export class PaymentInfo {
    public insertCreditCardInfo = async (query: string, values: Array<string>) => {
        try {
            const pool = new Pool()
            await pool.query(query, values)
            await pool.end()
        }
        catch (error) {
            return error;
        }
    }

}
