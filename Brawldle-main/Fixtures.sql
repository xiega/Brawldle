DROP DATABASE IF EXISTS brawl_stars;
CREATE DATABASE brawl_stars;
USE brawl_stars;

CREATE TABLE brawlers (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    rarity VARCHAR(50),
    wallbreaker BOOLEAN,
    base_health INT,
    release_year INT,
    image_url VARCHAR(255)
);

CREATE TABLE help_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    issue VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO brawlers (id, name, rarity, wallbreaker, base_health, release_year, image_url) VALUES
(1, 'Shelly', 'Common', 1, 3600, 2018, 'https://cdn-fankit.brawlify.com/shelly_pin.png'),
(2, 'Colt', 'Common', 0, 2800, 2018, 'https://cdn-fankit.brawlify.com/colt_pin.png'),
(3, 'Bull', 'Common', 1, 4900, 2018, 'https://cdn-fankit.brawlify.com/bull_pin.png'),
(4, 'Brock', 'Rare', 1, 2400, 2018, 'https://cdn-fankit.brawlify.com/brock_pin.png'),
(5, 'Rico', 'Super Rare', 0, 2600, 2018, 'https://cdn-fankit.brawlify.com/rico_pin.png'),
(6, 'Spike', 'Legendary', 0, 3200, 2018, 'https://cdn-fankit.brawlify.com/spike_pin.png'),
(7, 'Crow', 'Legendary', 0, 2400, 2018, 'https://cdn-fankit.brawlify.com/crow_pin.png'),
(8, 'Bo', 'Super Rare', 1, 3600, 2018, 'https://cdn-fankit.brawlify.com/bo_pin.png'),
(9, 'Nita', 'Common', 0, 3800, 2018, 'https://cdn-fankit.brawlify.com/nita_pin.png'),
(10, 'Jessie', 'Rare', 0, 3200, 2018, 'https://cdn-fankit.brawlify.com/jessie_pin.png'),
(11, 'Dynamike', 'Super Rare', 1, 2400, 2018, 'https://cdn-fankit.brawlify.com/dynamike_pin.png'),
(12, 'El Primo', 'Rare', 1, 5800, 2018, 'https://cdn-fankit.brawlify.com/primo_pin.png'),
(13, 'Barley', 'Rare', 0, 2400, 2018, 'https://cdn-fankit.brawlify.com/barley_pin.png'),
(14, 'Poco', 'Rare', 0, 3800, 2018, 'https://cdn-fankit.brawlify.com/poco_pin.png'),
(15, 'Mortis', 'Mythic', 0, 3200, 2018, 'https://cdn-fankit.brawlify.com/mortis_pin.png'),
(16, 'Tara', 'Mythic', 0, 3200, 2018, 'https://cdn-fankit.brawlify.com/tara_pin.png'),
(17, 'Pam', 'Epic', 0, 3800, 2018, 'https://cdn-fankit.brawlify.com/pam_pin.png'),
(18, 'Frank', 'Epic', 1, 6100, 2018, 'https://cdn-fankit.brawlify.com/frank_pin.png'),
(19, 'Piper', 'Epic', 0, 2400, 2018, 'https://cdn-fankit.brawlify.com/piper_pin.png'),
(20, 'Spike', 'Legendary', 0, 2400, 2018, 'https://cdn-fankit.brawlify.com/spike_pin.png'),
(21, 'Crow', 'Legendary', 0, 2400, 2018, 'https://cdn-fankit.brawlify.com/crow_pin.png'),
(22, 'Leon', 'Legendary', 0, 3200, 2018, 'https://cdn-fankit.brawlify.com/leon_pin.png'),
(23, 'Sandy', 'Legendary', 0, 3200, 2019, 'https://cdn-fankit.brawlify.com/sandy_pin.png'),
(24, 'Gene', 'Mythic', 0, 3600, 2019, 'https://cdn-fankit.brawlify.com/gene_pin.png'),
(25, 'Mr. P', 'Mythic', 0, 3200, 2020, 'https://cdn-fankit.brawlify.com/mrp_pin.png'),
(26, 'Max', 'Mythic', 0, 3000, 2019, 'https://cdn-fankit.brawlify.com/max_pin.png'),
(27, 'Jacky', 'Super Rare', 1, 4700, 2020, 'https://cdn-fankit.brawlify.com/jacky_pin.png'),
(28, 'Gale', 'Chromatic', 0, 3200, 2020, 'https://cdn-fankit.brawlify.com/gale_pin.png'),
(29, 'Surge', 'Chromatic', 0, 3100, 2020, 'https://cdn-fankit.brawlify.com/surge_pin.png'),
(30, 'Colette', 'Chromatic', 0, 3200, 2020, 'https://cdn-fankit.brawlify.com/colette_pin.png'),
(31, 'Lou', 'Chromatic', 0, 3200, 2020, 'https://cdn-fankit.brawlify.com/lou_pin.png'),
(32, 'Ruffs', 'Chromatic', 0, 3000, 2021, 'https://cdn-fankit.brawlify.com/ruffs_pin.png'),
(33, 'Belle', 'Chromatic', 0, 2800, 2021, 'https://cdn-fankit.brawlify.com/belle_pin.png'),
(34, 'Buzz', 'Chromatic', 0, 4800, 2021, 'https://cdn-fankit.brawlify.com/buzz_pin.png'),
(35, 'Ash', 'Chromatic', 1, 4200, 2021, 'https://cdn-fankit.brawlify.com/ash_pin.png'),
(36, 'Lola', 'Chromatic', 0, 3700, 2021, 'https://cdn-fankit.brawlify.com/lolla_pin.png'),
(37, 'Fang', 'Chromatic', 1, 4400, 2022, 'https://cdn-fankit.brawlify.com/fang_pin.png'),
(38, 'Eve', 'Chromatic', 0, 2900, 2022, 'https://cdn-fankit.brawlify.com/eve_pin.png'),
(39, 'Janet', 'Chromatic', 0, 3200, 2022, 'https://cdn-fankit.brawlify.com/janet_pin.png'),
(40, 'Bonnie', 'Chromatic', 0, 4800, 2022, 'https://cdn-fankit.brawlify.com/bonnie_pin.png'),
(41, 'Otis', 'Chromatic', 0, 3200, 2022, 'https://cdn-fankit.brawlify.com/otis_pin.png'),
(42, 'Sam', 'Chromatic', 0, 4700, 2022, 'https://cdn-fankit.brawlify.com/sam_facepalm_pin.png'),
(43, 'Buster', 'Chromatic', 1, 5000, 2022, 'https://cdn-fankit.brawlify.com/buster_pin.png'),
(44, 'Gray', 'Chromatic', 1, 4000, 2023, 'https://cdn-fankit.brawlify.com/gray_pin.png'),
(45, 'Mandy', 'Chromatic', 0, 2800, 2023, 'https://cdn-fankit.brawlify.com/mandy_pin.png'),
(46, 'R-T', 'Chromatic', 1, 4900, 2023, 'https://cdn-fankit.brawlify.com/rt_pin.png'),
(47, 'Willow', 'Chromatic', 0, 2600, 2023, 'https://cdn-fankit.brawlify.com/willow_pin.png'),
(48, 'Maisie', 'Chromatic', 0, 3600, 2023, 'https://cdn-fankit.brawlify.com/maisie_pin.png');