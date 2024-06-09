import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Upewnij się, że używasz .js na końcu, aby wskazać plik modułu

describe("API Endpoints", () => {
  describe("GET /api/brawlers-list", () => {
    it("should return a list of all brawlers", async () => {
      const res = await request(app).get("/api/brawlers-list");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /api/brawlers", () => {
    it("should return the names of all brawlers", async () => {
      const res = await request(app).get("/api/brawlers");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.be.a("string");
    });
  });

  describe("GET /api/start", () => {
    it("should start the game and select a random brawler", async () => {
      const res = await request(app).get("/api/start");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Gra rozpoczęta! Spróbuj odgadnąć Brawlera.");
    });
  });

  describe("POST /api/guess", () => {
    it("should guess the brawler correctly", async () => {
      // Start the game first
      await request(app).get("/api/start");

      const guessedBrawlerName = "dynamike"; // Use an example name for testing

      const res = await request(app)
        .post("/api/guess")
        .send({ name: guessedBrawlerName });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isWinner").that.is.a("boolean");
      expect(res.body).to.have.property("result").that.is.an("object");
    });
  });

  describe("POST /api/help", () => {
    it("should create a help request", async () => {
      const helpRequest = {
        name: "John Doe",
        email: "johndoe@example.com",
        issue: "Issue example",
        description: "Description of the issue",
      };

      const res = await request(app).post("/api/help").send(helpRequest);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", helpRequest.name);
      expect(res.body).to.have.property("email", helpRequest.email);
      expect(res.body).to.have.property("issue", helpRequest.issue);
      expect(res.body).to.have.property("description", helpRequest.description);
    });
  });
});
