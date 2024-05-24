document.addEventListener('DOMContentLoaded', async () => {
  await fetch('/start');

  const jsConfetti = new JSConfetti();

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
    const resultTbody = document.getElementById('result');

    if (data.error) {
      resultTbody.innerHTML += `<tr><td colspan="5">${data.error}</td></tr>`;
    } else {
      const guessedBrawler = data.guessedBrawler;
      const result = data.result;
      const comparisons = data.comparisons;

      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${guessedBrawler.name}</td>
        <td class="${result.rarity ? 'correct' : 'incorrect'}">${guessedBrawler.rarity}</td>
        <td class="${result.wallbreaker ? 'correct' : 'incorrect'}">${guessedBrawler.wallbreaker ? 'Yes' : 'No'}</td>
        <td class="${result.base_health ? 'correct' : 'incorrect'}">${guessedBrawler.base_health} <span class="${comparisons.base_health === '↑' ? 'up' : comparisons.base_health === '↓' ? 'down' : ''}">${comparisons.base_health}</span></td>
        <td class="${result.release_year ? 'correct' : 'incorrect'}">${guessedBrawler.release_year} <span class="${comparisons.release_year === '↑' ? 'up' : comparisons.release_year === '↓' ? 'down' : ''}">${comparisons.release_year}</span></td>
      `;

      resultTbody.appendChild(row);

      if (result.name && result.rarity && result.wallbreaker && result.base_health && result.release_year) {
        jsConfetti.addConfetti()
        setTimeout(function() {
          location.reload();
      }, 4000);
      }
    }

    document.getElementById('guessForm').reset();
  });
});