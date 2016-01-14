SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `bender_quotes` (
  `id` int(10) unsigned NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `audio` varchar(256) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `bender_quotes` (`id`, `text`, `audio`) VALUES
(1, 'Bite my shiny metal ass!', 'bite-my-shiny-metal-ass.mp3'),
(2, 'Yeah, well... I''m gonna go build my own theme park, with blackjack and hookers. In fact, forget the park!', 'blackjack-and-hookers.mp3'),
(3, 'Compare your lives to mine and then kill yourselves.', 'compare-your-lives-to-mine-and-then-kill-yourselves.mp3'),
(4, 'Fembot: Bender, honey, we love you. Bender: Shut up, baby, I know it!', 'shut-up-baby-i-know-it.mp3'),
(5, 'Bender is bored, Bender is bored Bender, Bender, Bender...', 'bender-is-bored.mp3'),
(6, 'Hasta la vista, meatbag!', 'hasta-la-vista-meatbag.mp3');


ALTER TABLE `bender_quotes`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_UNIQUE` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
