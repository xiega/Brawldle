document.addEventListener('DOMContentLoaded', async () => {
  await fetch('/start');

  document.getElementById('guessForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const brawlerName = document.getElementById('brawlerName').value;
    const response = await fetch('/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: brawlerName })
    });

    const data = await response.json();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
    } else {
      const guessedBrawler = data.guessedBrawler;
      const result = data.result;
      const comparisons = data.comparisons;

      resultDiv.innerHTML = `
        <p>Name: <span class="${result.name ? 'correct' : 'incorrect'}">${guessedBrawler.name}</span></p>
        <p>Rarity: <span class="${result.rarity ? 'correct' : 'incorrect'}">${guessedBrawler.rarity}</span></p>
        <p>Wallbreaker: <span class="${result.wallbreaker ? 'correct' : 'incorrect'}">${guessedBrawler.wallbreaker}</span></p>
        <p>Base Health: <span class="${result.base_health ? 'correct' : 'incorrect'}">${guessedBrawler.base_health} ${comparisons.base_health}</span></p>
        <p>Release Year: <span class="${result.release_year ? 'correct' : 'incorrect'}">${guessedBrawler.release_year} ${comparisons.release_year}</span></p>
      `;
    }
  });
});