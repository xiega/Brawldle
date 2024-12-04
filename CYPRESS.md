# Dokumentacja Testowa Cypress

## Scenariusz Testowy 1: **Sprawdzanie funkcjonalności komponentu `GitHubCommits`**

### **Przypadek Testowy 1.1:** Sprawdzanie wyświetlania listy commitów

- **Tytuł:** Wyświetlanie listy commitów
- **Warunki wstępne:** Strona z komponentem `GitHubCommits` jest załadowana, serwer zwraca dane commitów z GitHub.
- **Kroki testowe:**
  1. Wejdź na stronę `/code`.
  2. Sprawdź, czy tytuł "Commit List" jest widoczny.
  3. Sprawdź, czy lista commitów zawiera dokładnie dwa elementy.
  4. Sprawdź szczegóły pierwszego commita (avatar, autor, wersja projektu).
  5. Sprawdź szczegóły drugiego commita.
- **Oczekiwany wynik:**
  - Tytuł "Commit List" jest widoczny.
  - Lista commitów zawiera dokładnie dwa elementy.
  - Szczegóły commitów są poprawnie wyświetlane.
- **Dane testowe:** Dwa fikcyjne commity: `Project1 v1.0.0 Fixed bug in authentication flow` oraz `Project2 v2.1.1 Improved UI/UX`.

### **Przypadek Testowy 1.2:** Sprawdzanie rozszerzania szczegółów commita

- **Tytuł:** Rozszerzanie szczegółów commita
- **Warunki wstępne:** Komponent `GitHubCommits` z załadowanymi danymi.
- **Kroki testowe:**
  1. Kliknij na pierwszy commit.
  2. Sprawdź, czy lista commitów ma klasę `expanded`.
  3. Sprawdź, czy szczegóły commita są widoczne (data, wiadomość, link do GitHub).
- **Oczekiwany wynik:**
  - Po kliknięciu na commit, jego szczegóły stają się widoczne.
  - Zawartość szczegółów commita jest poprawna.
- **Dane testowe:** Data i wiadomość commita, link do GitHub autora.

---

## Scenariusz Testowy 2: **Sprawdzanie nawigacji przycisków "Hire Me" na stronie "About Us"**

### **Przypadek Testowy 2.1:** Sprawdzanie linku do GitHub Xiega

- **Tytuł:** Sprawdzanie linku do GitHub Xiega
- **Warunki wstępne:** Strona `/about` jest załadowana.
- **Kroki testowe:**
  1. Kliknij na pierwszy przycisk "Hire Me" (odpowiadający Xiega).
  2. Sprawdź, czy link prowadzi do właściwego profilu na GitHub.
- **Oczekiwany wynik:** Link powinien prowadzić do `https://github.com/xiega`.
- **Dane testowe:** Xiega - `https://github.com/xiega`.

### **Przypadek Testowy 2.2:** Sprawdzanie linku do GitHub DajWaj

- **Tytuł:** Sprawdzanie linku do GitHub DajWaj
- **Warunki wstępne:** Strona `/about` jest załadowana.
- **Kroki testowe:**
  1. Kliknij na drugi przycisk "Hire Me" (odpowiadający DajWaj).
  2. Sprawdź, czy link prowadzi do właściwego profilu na GitHub.
- **Oczekiwany wynik:** Link powinien prowadzić do `https://github.com/DajWaj`.
- **Dane testowe:** DajWaj - `https://github.com/DajWaj`.

### **Przypadek Testowy 2.3:** Sprawdzanie linku do GitHub Dzilnoreq

- **Tytuł:** Sprawdzanie linku do GitHub Dzilnoreq
- **Warunki wstępne:** Strona `/about` jest załadowana.
- **Kroki testowe:**
  1. Kliknij na trzeci przycisk "Hire Me" (odpowiadający Dzilnoreq).
  2. Sprawdź, czy link prowadzi do właściwego profilu na GitHub.
- **Oczekiwany wynik:** Link powinien prowadzić do `https://github.com/Dzilne`.
- **Dane testowe:** Dzilnoreq - `https://github.com/Dzilne`.

---

## Scenariusz Testowy 3: **Sprawdzanie funkcjonalności formularza pomocy**

### **Przypadek Testowy 3.1:** Sprawdzanie komunikatu potwierdzającego po wysłaniu formularza

- **Tytuł:** Wysłanie formularza pomocy
- **Warunki wstępne:** Strona `/help` jest załadowana.
- **Kroki testowe:**
  1. Wypełnij formularz pomocy (imię, email, problem, opis).
  2. Wyślij formularz.
  3. Sprawdź, czy pojawia się komunikat potwierdzający.
- **Oczekiwany wynik:** Po wysłaniu formularza, pojawi się komunikat "Thank you for helping us 🧡".
- **Dane testowe:** Imię: Jan Kowalski, Email: jan.kowalski@example.com, Problem: Problem z logowaniem, Opis: Nie mogę się zalogować na swoje konto od kilku dni.

---

## Scenariusz Testowy 4: **Testy API backendu**

### **Przypadek Testowy 4.1:** Sprawdzanie listy brawlerów

- **Tytuł:** Pobieranie listy brawlerów
- **Warunki wstępne:** Serwer API jest uruchomiony.
- **Kroki testowe:**
  1. Wykonaj żądanie `GET` na endpoint `/brawlers-list`.
  2. Sprawdź, czy odpowiedź ma status 200.
- **Oczekiwany wynik:** Odpowiedź ma status 200.
- **Dane testowe:** Brak danych testowych.

### **Przypadek Testowy 4.2:** Sprawdzanie nazw brawlerów

- **Tytuł:** Pobieranie nazw brawlerów
- **Warunki wstępne:** Serwer API jest uruchomiony.
- **Kroki testowe:**
  1. Wykonaj żądanie `GET` na endpoint `/brawlers`.
  2. Sprawdź, czy odpowiedź ma status 200.
- **Oczekiwany wynik:** Odpowiedź ma status 200.
- **Dane testowe:** Brak danych testowych.

### **Przypadek Testowy 4.3:** Rozpoczęcie gry

- **Tytuł:** Rozpoczęcie gry
- **Warunki wstępne:** Serwer API jest uruchomiony.
- **Kroki testowe:**
  1. Wykonaj żądanie `GET` na endpoint `/start`.
  2. Sprawdź, czy odpowiedź zawiera wiadomość "Gra rozpoczęta! Spróbuj odgadnąć Brawlera."
- **Oczekiwany wynik:** Odpowiedź zawiera oczekiwaną wiadomość.
- **Dane testowe:** Brak danych testowych.

### **Przypadek Testowy 4.4:** Obsługa żądania pomocy

- **Tytuł:** Obsługa żądania pomocy
- **Warunki wstępne:** Serwer API jest uruchomiony.
- **Kroki testowe:**
  1. Wykonaj żądanie `POST` na endpoint `/help` z danymi pomocy.
  2. Sprawdź, czy odpowiedź ma status 200.
- **Oczekiwany wynik:** Odpowiedź ma status 200.
- **Dane testowe:** Imię: Test User, Email: test@example.com, Problem: Test issue, Opis: This is a test description.

---

## Instrukcja uruchamiania testów:

### 1. **Wymagania systemowe:**
   - Node.js
   - Cypress (do uruchamiania testów frontendowych)
   - Serwer backendowy uruchomiony na porcie 4000

### 2. **Konfiguracja środowiska:**
   - Zainstaluj zależności: `npm install`
   - Uruchom serwer backendowy: `npm start`
   - Uruchom testy Cypress: `npx cypress open`

### 3. **Uruchamianie testów:**
   - Uruchom testy z poziomu Cypress UI lub z terminala: `npx cypress run`

---

# Podsumowanie

Dokumentacja zawiera zestaw testów E2E dla komponentu `GitHubCommits`, przycisków nawigacyjnych na stronie "About Us", formularza pomocy oraz API backendowego. Wszystkie testy są zaimplementowane w Cypress i obejmują zarówno testy frontendowe, jak i backendowe.
