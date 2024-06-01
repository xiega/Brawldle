//Zeby dzialalo : npm install --save-dev jest supertest

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = require('./app'); 

const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

describe('API Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should get a list of all Brawlers', async () => {
    const res = await request(app).get('/api/brawlers-list');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get the names of all Brawlers', async () => {
    const res = await request(app).get('/api/brawlers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((name) => {
      expect(typeof name).toBe('string');
    });
  });

  it('should start a game and select a random Brawler', async () => {
    const res = await request(app).get('/api/start');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Gra rozpoczęta! Spróbuj odgadnąć Brawlera.');
  });

  it('should guess the selected Brawler correctly', async () => {
    await request(app).get('/api/start');
    const selectedBrawler = await getRandomBrawler();
    const res = await request(app).post('/api/guess').send({ name: selectedBrawler.name });
    expect(res.statusCode).toEqual(200);
    expect(res.body.result.name).toBe(true);
    expect(res.body.isWinner).toBe(true);
  });

  it('should handle incorrect Brawler guesses', async () => {
    const res = await request(app).post('/api/guess').send({ name: 'NonExistentBrawler' });
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe('Nie znaleziono Brawlera');
  });

  it('should create a help request', async () => {
    const helpRequest = {
      name: 'Test User',
      email: 'test@example.com',
      issue: 'Test Issue',
      description: 'This is a test description',
    };

    const res = await request(app).post('/help').send(helpRequest);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(helpRequest.name);
    expect(res.body.email).toBe(helpRequest.email);
    expect(res.body.issue).toBe(helpRequest.issue);
    expect(res.body.description).toBe(helpRequest.description);
  });
});

async function getRandomBrawler() {
  const count = await prisma.brawlers.count();
  const randomIndex = Math.floor(Math.random() * count);
  const brawler = await prisma.brawlers.findMany({
    take: 1,
    skip: randomIndex,
  });
  return brawler[0];
}
