CREATE DATABASE tienda_mangas CHARACTER SET UTF8mb4 COLLATE utf8mb4_unicode_ci;
use tienda_mangas;

INSERT INTO Anime (title, author, pub_year, description, img_route) VALUES
('Naruto', 'Masashi Kishimoto', '1999', 'Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the village leader.', ''),
('One Piece', 'Eiichiro Oda', '1997', 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.', ''),
('Attack on Titan', 'Hajime Isayama', '2009', 'In a world where humanity resides within enormous walled cities due to the sudden emergence of the Titans, gigantic humanoid creatures.', ''),
('Fullmetal Alchemist', 'Hiromu Arakawa', '2001', 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.', ''),
('Death Note', 'Tsugumi Ohba', '2003', 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim\'s name while picturing their face.', ''),
('Dragon Ball Z', 'Akira Toriyama', '1989', 'After learning that he is from another planet, a warrior named Goku and his friends are prompted to defend it from an onslaught of extraterrestrial enemies.', ''),
('Sword Art Online', 'Reki Kawahara', '2009', 'Thousands of players get trapped in a new virtual MMORPG and the lone wolf player, Kirito, works to escape.', ''),
('My Hero Academia', 'Kohei Horikoshi', '2014', 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.', ''),
('Fairy Tail', 'Hiro Mashima', '2006', 'Lucy, an aspiring wizard, teams up with Natsu, an unusual boy, who is part of one of the world\'s most infamous mage guilds.', ''),
('Tokyo Ghoul', 'Sui Ishida', '2011', 'A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh.', ''),
('Demon Slayer', 'Koyoharu Gotouge', '2016', 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.', ''),
('Hunter x Hunter', 'Yoshihiro Togashi', '1998', 'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness.', ''),
('Bleach', 'Tite Kubo', '2001', 'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers and protects the living from evil spirits.', ''),
('Neon Genesis Evangelion', 'Hideaki Anno', '1995', 'A teenage boy finds himself recruited as a member of an elite team of pilots by his father.', ''),
('Black Clover', 'Yūki Tabata', '2015', 'Asta and Yuno were abandoned at the same church on the same day. While Yuno is gifted with exceptional magical powers, Asta is the only one in this world without any.', ''),
('JoJo\'s Bizarre Adventure', 'Hirohiko Araki', '1987', 'The story of the Joestar family, who are possessed with intense psychic strength, and the adventures each member encounters throughout their lives.', ''),
('Steins;Gate', 'Naotaka Hayashi', '2009', 'After discovering time travel, a university student and his friends must use their knowledge of it to stop an evil organization and their diabolical plans.', ''),
('Cowboy Bebop', 'Hajime Yatate', '1998', 'The futuristic misadventures and tragedies of an easygoing bounty hunter and his partners.', ''),
('Code Geass', 'Ichirō Ōkouchi', '2006', 'After being given a mysterious power of absolute obedience, an outcast prince becomes the masked leader of the rebellion against an all-powerful empire.', ''),
('One Punch Man', 'ONE', '2009', 'The story of Saitama, a hero that does it just for fun & can defeat his enemies with a single punch.', '');

select * from anime;