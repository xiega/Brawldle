CREATE DATABASE brawl_stars;

USE brawl_stars;

CREATE TABLE brawlers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    wallbreaker BOOLEAN NOT NULL,
    base_health INT NOT NULL,
    release_year INT NOT NULL
);

INSERT INTO brawlers (name, rarity, wallbreaker, base_health, release_year) VALUES
('Shelly', 'Common', TRUE, 3600, 2018),
('Colt', 'Common', FALSE, 2800, 2018),
('Bull', 'Common', TRUE, 4900, 2018),
('Brock', 'Rare', TRUE, 2400, 2018),
('Rico', 'Super Rare', FALSE, 2600, 2018),
('Spike', 'Legendary', FALSE, 3200, 2018),
('Crow', 'Legendary', FALSE, 2400, 2018),
('Bo', 'Super Rare', TRUE, 3600, 2018),
('Nita', 'Common', FALSE, 3800, 2018),
('Jessie', 'Rare', FALSE, 3200, 2018),
('Dynamike', 'Super Rare', TRUE, 2400, 2018),
('El Primo', 'Rare', TRUE, 5800, 2018),
('Barley', 'Rare', FALSE, 2400, 2018),
('Poco', 'Rare', FALSE, 3800, 2018),
('Mortis', 'Mythic', FALSE, 3200, 2018),
('Tara', 'Mythic', FALSE, 3200, 2018),
('Pam', 'Epic', FALSE, 3800, 2018),
('Frank', 'Epic', TRUE, 6100, 2018),
('Piper', 'Epic', FALSE, 2400, 2018),
('Spike', 'Legendary', FALSE, 2400, 2018),
('Crow', 'Legendary', FALSE, 2400, 2018),
('Leon', 'Legendary', FALSE, 3200, 2018),
('Sandy', 'Legendary', FALSE, 3200, 2019),
('Gene', 'Mythic', FALSE, 3600, 2019),
('Mr. P', 'Mythic', FALSE, 3200, 2020),
('Max', 'Mythic', FALSE, 3000, 2019),
('Jacky', 'Super Rare', TRUE, 4700, 2020),
('Gale', 'Chromatic', FALSE, 3200, 2020),
('Surge', 'Chromatic', FALSE, 3100, 2020),
('Colette', 'Chromatic', FALSE, 3200, 2020),
('Lou', 'Chromatic', FALSE, 3200, 2020),
('Ruffs', 'Chromatic', FALSE, 3000, 2021),
('Belle', 'Chromatic', FALSE, 2800, 2021),
('Buzz', 'Chromatic', FALSE, 4800, 2021),
('Ash', 'Chromatic', TRUE, 4200, 2021),
('Lola', 'Chromatic', FALSE, 3700, 2021),
('Fang', 'Chromatic', TRUE, 4400, 2022),
('Eve', 'Chromatic', FALSE, 2900, 2022),
('Janet', 'Chromatic', FALSE, 3200, 2022),
('Bonnie', 'Chromatic', FALSE, 4800, 2022),
('Otis', 'Chromatic', FALSE, 3200, 2022),
('Sam', 'Chromatic', FALSE, 4700, 2022),
('Buster', 'Chromatic', TRUE, 5000, 2022),
('Gray', 'Chromatic', TRUE, 4000, 2023),
('Mandy', 'Chromatic', FALSE, 2800, 2023),
('R-T', 'Chromatic', TRUE, 4900, 2023),
('Willow', 'Chromatic', FALSE, 2600, 2023),
('Maisie', 'Chromatic', FALSE, 3600, 2023);

CREATE TABLE brawler_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brawler_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (brawler_id) REFERENCES brawlers(id) ON DELETE CASCADE
);

INSERT INTO brawler_images (brawler_id, image_url) VALUES
(1, 'https://cdn-fankit.brawlify.com/shelly_pin.png'),
(2, 'https://cdn-fankit.brawlify.com/colt_pin.png'),
(3, 'https://cdn-fankit.brawlify.com/bull_pin.png'),
(4, 'https://cdn-fankit.brawlify.com/brock_pin.png'),
(5, 'https://cdn-fankit.brawlify.com/rico_pin.png'),
(6, 'https://cdn-fankit.brawlify.com/spike_pin.png'),
(7, 'https://cdn-fankit.brawlify.com/crow_pin.png'),
(8, 'https://cdn-fankit.brawlify.com/bo_pin.png'),
(9, 'https://cdn-fankit.brawlify.com/nita_pin.png'),
(10, 'https://cdn-fankit.brawlify.com/jessie_pin.png'),
(11, 'https://cdn-fankit.brawlify.com/dynamike_pin.png'),
(12, 'https://cdn-fankit.brawlify.com/el_primo_pin.png'),
(13, 'https://cdn-fankit.brawlify.com/barley_pin.png'),
(14, 'https://cdn-fankit.brawlify.com/poco_pin.png'),
(15, 'https://cdn-fankit.brawlify.com/mortis_pin.png'),
(16, 'https://cdn-fankit.brawlify.com/tara_pin.png'),
(17, 'https://cdn-fankit.brawlify.com/pam_pin.png'),
(18, 'https://cdn-fankit.brawlify.com/frank_pin.png'),
(19, 'https://cdn-fankit.brawlify.com/piper_pin.png'),
(20, 'https://cdn-fankit.brawlify.com/spike_pin.png'),
(21, 'https://cdn-fankit.brawlify.com/crow_pin.png'),
(22, 'https://cdn-fankit.brawlify.com/leon_pin.png'),
(23, 'https://cdn-fankit.brawlify.com/sandy_pin.png'),
(24, 'https://cdn-fankit.brawlify.com/gene_pin.png'),
(25, 'https://cdn-fankit.brawlify.com/mr_p_pin.png'),
(26, 'https://cdn-fankit.brawlify.com/max_pin.png'),
(27, 'https://cdn-fankit.brawlify.com/jacky_pin.png'),
(28, 'https://cdn-fankit.brawlify.com/gale_pin.png'),
(29, 'https://cdn-fankit.brawlify.com/surge_pin.png'),
(30, 'https://cdn-fankit.brawlify.com/colette_pin.png'),
(31, 'https://cdn-fankit.brawlify.com/lou_pin.png'),
(32, 'https://cdn-fankit.brawlify.com/ruffs_pin.png'),
(33, 'https://cdn-fankit.brawlify.com/belle_pin.png'),
(34, 'https://cdn-fankit.brawlify.com/buzz_pin.png'),
(35, 'https://cdn-fankit.brawlify.com/ash_pin.png'),
(36, 'https://cdn-fankit.brawlify.com/lola_pin.png'),
(37, 'https://cdn-fankit.brawlify.com/fang_pin.png'),
(38, 'https://cdn-fankit.brawlify.com/eve_pin.png'),
(39, 'https://cdn-fankit.brawlify.com/janet_pin.png'),
(40, 'https://cdn-fankit.brawlify.com/bonnie_pin.png'),
(41, 'https://cdn-fankit.brawlify.com/otis_pin.png'),
(42, 'https://cdn-fankit.brawlify.com/sam_pin.png'),
(43, 'https://cdn-fankit.brawlify.com/buster_pin.png'),
(44, 'https://cdn-fankit.brawlify.com/gray_pin.png'),
(45, 'https://cdn-fankit.brawlify.com/mandy_pin.png'),
(46, 'https://cdn-fankit.brawlify.com/rt_pin.png'),
(47, 'https://cdn-fankit.brawlify.com/willow_pin.png'),
(48, 'https://cdn-fankit.brawlify.com/maisie_pin.png');