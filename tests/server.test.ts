import request from 'supertest';
import app from '../src/server';

describe('Calculator API', () => {
  describe('GET /', () => {
    it('ana sayfaya ulaşmalı', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.text).toContain('Hesap Makinesi API');
    });
  });

  describe('GET /api/calculate/add/:a/:b', () => {
    it('iki sayıyı toplamalı', async () => {
      const res = await request(app).get('/api/calculate/add/5/3');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'add',
        a: 5,
        b: 3,
        result: 8
      });
    });

    it('geçersiz parametreler için hata döndürmeli', async () => {
      const res = await request(app).get('/api/calculate/add/abc/3');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/calculate/subtract/:a/:b', () => {
    it('bir sayıdan diğerini çıkarmalı', async () => {
      const res = await request(app).get('/api/calculate/subtract/8/3');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'subtract',
        a: 8,
        b: 3,
        result: 5
      });
    });
  });

  describe('GET /api/calculate/multiply/:a/:b', () => {
    it('iki sayıyı çarpmalı', async () => {
      const res = await request(app).get('/api/calculate/multiply/4/5');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'multiply',
        a: 4,
        b: 5,
        result: 20
      });
    });
  });

  describe('GET /api/calculate/divide/:a/:b', () => {
    it('bir sayıyı diğerine bölmeli', async () => {
      const res = await request(app).get('/api/calculate/divide/10/2');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'divide',
        a: 10,
        b: 2,
        result: 5
      });
    });

    it('sıfıra bölme için hata döndürmeli', async () => {
      const res = await request(app).get('/api/calculate/divide/10/0');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: 'Sıfıra bölme hatası'
      });
    });
  });

  describe('POST /api/calculate', () => {
    it('toplama işlemi yapmalı', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'add',
          a: 5,
          b: 3
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'add',
        a: 5,
        b: 3,
        result: 8
      });
    });

    it('çıkarma işlemi yapmalı', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'subtract',
          a: 8,
          b: 3
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'subtract',
        a: 8,
        b: 3,
        result: 5
      });
    });

    it('çarpma işlemi yapmalı', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'multiply',
          a: 4,
          b: 5
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'multiply',
        a: 4,
        b: 5,
        result: 20
      });
    });

    it('bölme işlemi yapmalı', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'divide',
          a: 10,
          b: 2
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        operation: 'divide',
        a: 10,
        b: 2,
        result: 5
      });
    });

    it('sayısal olmayan değerler için hata döndürmeli', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'add',
          a: 'abc',
          b: 3
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('geçersiz işlem için hata döndürmeli', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'invalid',
          a: 5,
          b: 3
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('sıfıra bölme için hata döndürmeli', async () => {
      const res = await request(app)
        .post('/api/calculate')
        .send({
          operation: 'divide',
          a: 10,
          b: 0
        });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: 'Sıfıra bölme hatası'
      });
    });
  });
});