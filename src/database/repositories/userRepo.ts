import Knex from '../index'


class UserRepo {

    /**
     * Create a user account
     * @param body
     */
    static async create(body: object) {
        return await Knex('users').insert(body).then(async () => {
            const result = await Knex.raw('select LAST_INSERT_ID() as id');
            const id = result[0][0].id;
            return await Knex.from('users').where('id', id).first();
        });;
    }

    /**
     * get a user detail
     * @param column
     * @param value
     */
    static async getUserRecord(column: string, value: any) {
        return await Knex('users').select('*').where(column, value).first();
    }
}

export {UserRepo}
