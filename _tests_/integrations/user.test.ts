import request from 'supertest'
import app from '../../app';

describe('Users Endpoints Test', () => {
    let token: any;

    //sign up test
    it('should sign up user', async () => {
        const res = await request(app)
            .post('/api/v1/onboard/signUp')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name: "Collins Benson",
                email: 'collins@gmail.com',
                password: '12345678',
            })
        expect(res.statusCode).toEqual(200)
    })

    //sign up another user test
    it('should sign up another user', async () => {
        const res = await request(app)
            .post('/api/v1/onboard/signUp')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name: "Sunday Olumitutu",
                email: 'sunday@gmail.com',
                password: '12345678',
            })
        expect(res.statusCode).toEqual(200)
    })

    //login user test
    it('should login user', async () => {
        const res = await request(app)
            .post('/api/v1/onboard/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: 'collins@gmail.com',
                password: '12345678',
            })

        token = res.body.data.access_token
        expect(res.statusCode).toEqual(200)
    })

    //get user details test
    it('should get user details', async () => {
        const res = await request(app)
            .get('/api/v1/users/get')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
    })

    //get user wallet details test
    it('should get user wallet details', async () => {
        const res = await request(app)
            .get('/api/v1/users/wallet/get')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
    })

    //fund wallet test
    it('should fund wallet', async () => {
        const res = await request(app)
            .post('/api/v1/users/fund')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 40000,
            })
        expect(res.statusCode).toEqual(200)
    })

    //withdraw from wallet test
    it('should withdraw from wallet', async () => {
        const res = await request(app)
            .post('/api/v1/users/withdraw/fund')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 4000,
            })
        expect(res.statusCode).toEqual(200)
    })

    //transfer fund to another user wallet test
    it('should withdraw from wallet', async () => {
        const res = await request(app)
            .post('/api/v1/users/transfer/fund')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "amount": 2000,
                "receiver_id": 2
            })
        expect(res.statusCode).toEqual(200)
    })
})
