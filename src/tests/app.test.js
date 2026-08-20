const request = require('supertest');
const { app, sum, isValidEmail } = require('../src/app');

describe('función sum', () => {
  test('suma dos números positivos', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('suma con números negativos', () => {
    expect(sum(-2, 5)).toBe(3);
  });

  test('lanza error si un argumento no es número', () => {
    expect(() => sum('a', 2)).toThrow(TypeError);
  });
});

describe('función isValidEmail', () => {
  test('acepta un correo válido', () => {
    expect(isValidEmail('persona@correo.com')).toBe(true);
  });

  test('rechaza un correo sin arroba', () => {
    expect(isValidEmail('persona-correo.com')).toBe(false);
  });
});

describe('GET /health', () => {
  test('responde 200 con status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /sum', () => {
  test('devuelve el resultado correcto', async () => {
    const res = await request(app).get('/sum?a=4&b=6');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(10);
  });

  test('devuelve 400 si faltan parámetros válidos', async () => {
    const res = await request(app).get('/sum?a=hola&b=6');
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /users', () => {
  test('crea un usuario válido', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Ana', email: 'ana@correo.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ name: 'Ana', email: 'ana@correo.com' });
  });

  test('rechaza un usuario sin email', async () => {
    const res = await request(app).post('/users').send({ name: 'Ana' });
    expect(res.statusCode).toBe(400);
  });
});
