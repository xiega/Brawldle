// Funkcja do pobierania nazw brawlerów z bazy danych
async function fetchBrawlerNames() {
    const response = await fetch('/brawlers');
    const data = await response.json();
    return data;
  }

  // Aktualizacja listy nazw brawlerów w elemencie <datalist>
  async function updateBrawlerNameList() {
    const brawlerNames = await fetchBrawlerNames();
    const datalist = document.getElementById('brawlerNames');
    datalist.innerHTML = '';
    brawlerNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      datalist.appendChild(option);
    });
  }

  // Wywołanie funkcji do aktualizacji listy nazw brawlerów na stronie
  updateBrawlerNameList();
  