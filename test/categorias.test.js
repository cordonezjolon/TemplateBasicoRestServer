//generate test with jest and supertest for the categorias controller
const request = require('supertest');
const app = require('../app');
const { Categoria } = require('../models');

describe('Categorias', () => {
    describe('GET /categorias', () => {
        it('should return all categorias', async () => {
        const res = await request(app).get('/categorias');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('categorias');
        });
    });
    
});
describe('GET /categorias/:id', () => {
    it('should return a categoria', async () => {
    const categoria = await Categoria.create({ nome: 'categoria' });
    const res = await request(app).get(`/categorias/${categoria.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('categoria');
    });
});

describe('POST /categorias', () => {
    it('should create a new categoria', async () => {
    const res = await request(app)
        .post('/categorias')
        .send({ nome: 'categoria' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('categoria');
    });
});

describe('PUT /categorias/:id', () => {
    it('should update a categoria', async () => {
    const categoria = await Categoria.create({ nome: 'categoria' });
    const res = await request(app)
        .put(`/categorias/${categoria.id}`)
        .send({ nome: 'categoria2' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('categoria');
    });
});

describe('DELETE /categorias/:id', () => {
    it('should delete a categoria', async () => {
    const categoria = await Categoria.create({ nome: 'categoria' });
    const res = await request(app).delete(`/categorias/${categoria.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('s');
    });
});
