const request = require('supertest');
const app = require('../app');
const {sequelize,checkConnection} = require('../services/database.config');

describe('Collection API', () => {
    beforeAll(async () => {
        await checkConnection();
    });
    afterAll(async () => {
        await sequelize.close();
    })
    describe('GET /api/v1/collections', () => {
        test('it should get all collections', async () => {
            const response = await request(app)
            .get('/api/v1/collections')
            .expect('Content-Type', /json/)
            .expect(200);

            expect(response.body).toBeInstanceOf(Array);
        })
    });
    describe('POST /api/v1/collections', () => {
        const reqBody = {
            diseaseTerm: 'test',
            title: 'test',
        }
        const incompleteReqBody = {
            diseaseTerm: '',
            title: '',
        }
        test('it should create a new collection', async () => {
            const response = await request(app)
            .post('/api/v1/collections')
            .send(reqBody)
            .expect('Content-Type', /json/)
            .expect(201);
        })
        test('it should not create a new collection if collection already exists', async () => {
            const response = await request(app)
            .post('/api/v1/collections')
            .send(reqBody)
            .expect('Content-Type', /json/)
            .expect(400);
        })
        test('it should not create a new collection if request body is incomplete', async () => {
            const response = await request(app)
            .post('/api/v1/collections')
            .send(incompleteReqBody)
            .expect('Content-Type', /json/)
            .expect(400);
        })
    })
    describe('POST /api/v1/collections/:collectionId/samples', () => {
        const reqBody = {
            donorCount: 10,
            materialType: 'test',
        }
        test('it should add a new sample to a collection', async () => {
            const response = await request(app)
            .post('/api/v1/collections/11/samples')
            .send(reqBody)
            .expect('Content-Type', /json/)
            .expect(201);
        })
        test('it should not add a new sample to a collection if request body is incomplete', async () => {
            const response = await request(app)
            .post('/api/v1/collections/11/samples')
            .send({})
            .expect('Content-Type', /json/)
            .expect(400);
        })
        test('it should not add a new sample to a collection if collection does not exist', async () => {
            const response = await request(app)
            .post('/api/v1/collections/1000/samples')
            .send(reqBody)
            .expect('Content-Type', /json/)
            .expect(404);
        })
        test('it should not add a new sample to a collection if donorCount is not a number', async () => {
            const response = await request(app)
            .post('/api/v1/collections/11/samples')
            .send({
                donorCount: 'test',
                materialType: 'test',
            })
            .expect('Content-Type', /json/)
            .expect(400);
        })
    });
    describe('GET /api/v1/collections/:collectionId/samples', () => {
        test('it should get all samples in a collection', async () => {
            const response = await request(app)
            .get('/api/v1/collections/11/samples')
            .expect('Content-Type', /json/)
            .expect(200);
        })
        test('it should not get all samples in a collection if collection does not exist', async () => {
            const response = await request(app)
            .get('/api/v1/collections/1000/samples')
            .expect('Content-Type', /json/)
            .expect(404);
        })
    })
})