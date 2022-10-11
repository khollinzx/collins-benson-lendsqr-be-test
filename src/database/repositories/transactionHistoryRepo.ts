import Knex from "../index";

class TransactionHistoryRepo {

    /**
     * create a transaction history
     * @param body
     */
    static async create(body: object) {
        return await Knex('transaction_histories').insert(body)
    }

    /**
     * get All transaction Histories
     * @param column
     * @param value
     */
    static async getHistoryRecord(column: string, value: any) {
        return await Knex('transaction_histories').select('*').where(column, value);
    }
}

export {TransactionHistoryRepo}
