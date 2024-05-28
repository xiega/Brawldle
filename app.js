const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let selectedBrawler;

// Funkcja do losowania brawlera z bazy danych
async function getRandomBrawler() {
  const count = await prisma.brawlers.count();
  const randomIndex = Math.floor(Math.random() * count);
  const brawler = await prisma.brawlers.findMany({
    take: 1,
    skip: randomIndex
  });
  return brawler[0];
}

app.get('/brawlers', async (req, res) => {
  try {
    const brawlers = await prisma.brawlers.findMany();
    const brawlerNames = brawlers.map(brawler => brawler.name);
    res.json(brawlerNames);
  } catch (error) {
    console.error('Error fetching brawler names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Endpoint do inicjalizacji gry
app.get('/start', async (req, res) => {
  selectedBrawler = await getRandomBrawler();
  console.log(selectedBrawler);
  res.json({ message: 'Game started! Try to guess the brawler.' });
});

// Endpoint do sprawdzania zgadywanego brawlera
app.post('/guess', async (req, res) => {
  const { name } = req.body;
  const guessedBrawler = await prisma.brawlers.findFirst({
    where: { name }
});

  if (!guessedBrawler) {
    return res.json({ error: 'Brawler not found' });
  }

  const result = {
    name: guessedBrawler.name === selectedBrawler.name,
    rarity: guessedBrawler.rarity === selectedBrawler.rarity,
    wallbreaker: guessedBrawler.wallbreaker === selectedBrawler.wallbreaker,
    base_health: guessedBrawler.base_health === selectedBrawler.base_health,
    release_year: guessedBrawler.release_year === selectedBrawler.release_year,
  };

  const comparisons = {
    base_health: guessedBrawler.base_health > selectedBrawler.base_health ? '↓' : guessedBrawler.base_health < selectedBrawler.base_health ? '↑' : '',
    release_year: guessedBrawler.release_year > selectedBrawler.release_year ? '↓' : guessedBrawler.release_year < selectedBrawler.release_year ? '↑' : ''
  };

  res.json({ result, guessedBrawler, comparisons });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});