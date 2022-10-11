import Knex from '../index'

class WalletRepo {

    /**
     *
     * @param body
     */
    static async create(body: any) {
        return await Knex('wallets').insert(body)
    }

    /**
     *
     * @param column
     * @param value
     */
    static async getRecord(column: string, value: any) {
        return await Knex('wallets').select('*').where(column, value).first();
    }

    /**
     *
     * @param payload
     * @param column
     * @param value
     */
    static async updateRecord(payload: object, column: string, value: any) {
        return await Knex('wallets').update(payload).where(column, value);
    }
}

export {WalletRepo}
