const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

let selectedBrawler;

// Umożliwienie CORS dla zapytań z frontendu
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const router = express.Router();
app.use("/api", router);

// Funkcja do pobrania losowego Brawlera z bazy danych
async function getRandomBrawler() {
  const count = await prisma.brawlers.count();
  const randomIndex = Math.floor(Math.random() * count);
  const brawler = await prisma.brawlers.findMany({
    take: 1,
    skip: randomIndex,
  });
  return brawler[0];
}

// Endpoint do pobrania listy wszystkich Brawlerów
router.get("/brawlers-list", async (req, res) => {
  try {
    const brawlers = await prisma.brawlers.findMany();
    res.json(brawlers);
  } catch (error) {
    console.error("Błąd podczas pobierania Brawlerów:", error);
    res.status(500).json({ error: "Błąd serwera wewnętrznego" });
  }
});

// Endpoint do pobrania nazw wszystkich Brawlerów
router.get("/brawlers", async (req, res) => {
  try {
    const brawlers = await prisma.brawlers.findMany();
    const brawlerNames = brawlers.map((brawler) => brawler.name);
    res.json(brawlerNames);
  } catch (error) {
    console.error("Błąd podczas pobierania nazw Brawlerów:", error);
    res.status(500).json({ error: "Błąd serwera wewnętrznego" });
  }
});

// Endpoint do zainicjowania gry poprzez wybranie losowego Brawlera
router.get("/start", async (req, res) => {
  try {
    selectedBrawler = await getRandomBrawler();
    console.log(selectedBrawler);
    res.json({ message: "Gra rozpoczęta! Spróbuj odgadnąć Brawlera." });
  } catch (error) {
    console.error("Błąd podczas rozpoczynania gry:", error);
    res.status(500).json({ error: "Błąd serwera wewnętrznego" });
  }
});

// Endpoint do sprawdzenia odgadniętego Brawlera
router.post("/guess", async (req, res) => {
  try {
    const { name } = req.body;
    const guessedBrawler = await prisma.brawlers.findFirst({
      where: { name },
    });

    if (!guessedBrawler) {
      return res.status(404).json({ error: "Nie znaleziono Brawlera" });
    }

    const isWinner = 
    guessedBrawler.name === selectedBrawler.name &&
    guessedBrawler.rarity === selectedBrawler.rarity &&
    guessedBrawler.wallbreaker === selectedBrawler.wallbreaker &&
    guessedBrawler.base_health === selectedBrawler.base_health &&
    guessedBrawler.release_year === selectedBrawler.release_year;

    const result = {
      name: guessedBrawler.name === selectedBrawler.name,
      rarity: guessedBrawler.rarity === selectedBrawler.rarity,
      wallbreaker: guessedBrawler.wallbreaker === selectedBrawler.wallbreaker,
      base_health: guessedBrawler.base_health === selectedBrawler.base_health,
      release_year: guessedBrawler.release_year === selectedBrawler.release_year,
    };

    const comparisons = {
      base_health:
        guessedBrawler.base_health > selectedBrawler.base_health
          ? "↓"
          : guessedBrawler.base_health < selectedBrawler.base_health
          ? "↑"
          : "",
      release_year:
        guessedBrawler.release_year > selectedBrawler.release_year
          ? "↓"
          : guessedBrawler.release_year < selectedBrawler.release_year
          ? "↑"
          : "",
    };

    res.json({ result, guessedBrawler, comparisons, isWinner });
  } catch (error) {
    console.error("Błąd podczas przetwarzania zgadywania:", error);
    res.status(500).json({ error: "Błąd serwera wewnętrznego" });
  }
});

// Endpoint do obsługi zgłoszeń pomocy
router.post('/help', async (req, res) => {
  const { name, email, issue, description } = req.body;
  try {
    console.log("Otrzymano zgłoszenie:", { name, email, issue, description });
    const newHelpRequest = await prisma.help_requests.create({
      data: {
        name,
        email,
        issue,
        description,
      },
    });
    res.status(200).json(newHelpRequest);
  } catch (error) {
    console.error('Błąd podczas tworzenia zgłoszenia pomocy:', error);
    res.status(500).json({ error: 'Błąd podczas tworzenia zgłoszenia pomocy' });
  }
});

// Uruchomienie serwera na porcie określonym w zmiennej środowiskowej PORT lub 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
