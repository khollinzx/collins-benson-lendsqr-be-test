import Knex from '../index'

class WalletRepo {

    /**
     * create a user wallet
     * @param body
     */
    static async create(body: any) {
        return await Knex('wallets').insert(body)
    }

    /**
     * get a user wallet by user id
     * @param column
     * @param value
     */
    static async getRecord(column: string, value: any) {
        return await Knex('wallets').select('*').where(column, value).first();
    }

    /**
     * update a user wallet by user id
     * @param payload
     * @param column
     * @param value
     */
    static async updateRecord(payload: object, column: string, value: any) {
        return await Knex('wallets').update(payload).where(column, value);
    }
}

export {WalletRepo}
