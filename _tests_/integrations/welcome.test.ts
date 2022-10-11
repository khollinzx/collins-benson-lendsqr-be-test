import request from 'supertest'
import app from '../../app';

describe('Welcome Endpoints', () => {
    it('should get the welcome message', async () => {
        // expect(true).toBe(true)
        const res = await request(app)
            .get('/api/v1/welcome')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200)
    })
})
