// List of Pokémon types
const typeList = [
    "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying",
    "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

// Type effectiveness chart data. New types can be added if needed. But probably never will :)
const typeEffectiveness = {
    Normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
    Fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
    Water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
    Electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
    Grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
    Ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
    Fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
    Poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
    Ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
    Flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
    Psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
    Bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
    Rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
    Ghost: [0, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 2, 1, 2, 0.5, 1],
    Dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
    Dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
    Steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
    Fairy: [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1]
};

// Listing base stats for each Pokémon. Followed by comments indicating the Pokémon's name for clarity. Multiple forms are not included in this list. Nor are regional forms. Gender variations are also not included (other then Nidoran♀ and Nidoran♂) for obvious reasons...or maybe not.
const pokemonBaseStats = [
    { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },   // Bulbasaur
    { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 },   // Ivysaur
    { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 }, // Venusaur
    { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },   // Charmander
    { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 },   // Charmeleon
    { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, // Charizard
    { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },   // Squirtle
    { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 },   // Wartortle
    { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 }, // Blastoise
    { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 },   // Caterpie
    { hp: 50, atk: 20, def: 55, spa: 25, spd: 25, spe: 30 },   // Metapod
    { hp: 60, atk: 45, def: 50, spa: 90, spd: 80, spe: 70 },   // Butterfree
    { hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50 },   // Weedle
    { hp: 45, atk: 25, def: 50, spa: 25, spd: 25, spe: 35 },   // Kakuna
    { hp: 65, atk: 90, def: 40, spa: 45, spd: 80, spe: 75 },   // Beedrill
    { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 },   // Pidgey
    { hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 71 },   // Pidgeotto
    { hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101 },  // Pidgeot
    { hp: 30, atk: 56, def: 35, spa: 25, spd: 35, spe: 72 },   // Rattata
    { hp: 55, atk: 81, def: 60, spa: 50, spd: 70, spe: 97 },   // Raticate
    { hp: 40, atk: 60, def: 30, spa: 31, spd: 31, spe: 70 },   // Spearow
    { hp: 65, atk: 90, def: 65, spa: 61, spd: 61, spe: 100 },  // Fearow
    { hp: 35, atk: 60, def: 44, spa: 40, spd: 54, spe: 55 },   // Ekans
    { hp: 60, atk: 95, def: 69, spa: 65, spd: 79, spe: 80 },   // Arbok
    { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 },   // Pikachu
    { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110 },  // Raichu
    { hp: 50, atk: 75, def: 85, spa: 20, spd: 30, spe: 40 },   // Sandshrew
    { hp: 75, atk: 100, def: 110, spa: 45, spd: 55, spe: 65 }, // Sandslash
    { hp: 55, atk: 47, def: 52, spa: 40, spd: 40, spe: 41 },   // Nidoran♀
    { hp: 70, atk: 62, def: 67, spa: 55, spd: 55, spe: 56 },   // Nidorina
    { hp: 90, atk: 92, def: 87, spa: 75, spd: 85, spe: 76 },   // Nidoqueen
    { hp: 46, atk: 57, def: 40, spa: 40, spd: 40, spe: 50 },   // Nidoran♂
    { hp: 61, atk: 72, def: 57, spa: 55, spd: 55, spe: 65 },   // Nidorino
    { hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 85 },  // Nidoking
    { hp: 70, atk: 45, def: 48, spa: 60, spd: 65, spe: 35 },   // Clefairy
    { hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60 },   // Clefable
    { hp: 38, atk: 41, def: 40, spa: 50, spd: 65, spe: 65 },   // Vulpix
    { hp: 73, atk: 76, def: 75, spa: 81, spd: 100, spe: 100 }, // Ninetales
    { hp: 115, atk: 45, def: 20, spa: 45, spd: 25, spe: 20 },  // Jigglypuff
    { hp: 140, atk: 70, def: 45, spa: 85, spd: 50, spe: 45 },  // Wigglytuff
    { hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55 },   // Zubat
    { hp: 75, atk: 80, def: 70, spa: 65, spd: 75, spe: 90 },   // Golbat
    { hp: 45, atk: 50, def: 55, spa: 75, spd: 65, spe: 30 },   // Oddish
    { hp: 60, atk: 65, def: 70, spa: 85, spd: 75, spe: 40 },   // Gloom
    { hp: 75, atk: 80, def: 85, spa: 110, spd: 90, spe: 50 },  // Vileplume
    { hp: 35, atk: 70, def: 55, spa: 45, spd: 55, spe: 25 },   // Paras
    { hp: 60, atk: 95, def: 80, spa: 60, spd: 80, spe: 30 },   // Parasect
    { hp: 60, atk: 55, def: 50, spa: 40, spd: 55, spe: 45 },   // Venonat
    { hp: 70, atk: 65, def: 60, spa: 90, spd: 75, spe: 90 },   // Venomoth
    { hp: 10, atk: 55, def: 25, spa: 35, spd: 45, spe: 95 },   // Diglett
    { hp: 35, atk: 100, def: 50, spa: 50, spd: 70, spe: 120 }, // Dugtrio
    { hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 90 },   // Meowth
    { hp: 65, atk: 70, def: 60, spa: 65, spd: 65, spe: 115 },  // Persian
    { hp: 50, atk: 52, def: 48, spa: 65, spd: 50, spe: 55 },   // Psyduck
    { hp: 80, atk: 82, def: 78, spa: 95, spd: 80, spe: 85 },   // Golduck
    { hp: 40, atk: 80, def: 35, spa: 35, spd: 45, spe: 70 },   // Mankey
    { hp: 65, atk: 105, def: 60, spa: 60, spd: 70, spe: 95 },  // Primeape
    { hp: 55, atk: 70, def: 45, spa: 70, spd: 50, spe: 60 },   // Growlithe
    { hp: 90, atk: 110, def: 80, spa: 100, spd: 80, spe: 95 }, // Arcanine
    { hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90 },   // Poliwag
    { hp: 65, atk: 65, def: 65, spa: 50, spd: 50, spe: 90 },   // Poliwhirl
    { hp: 90, atk: 95, def: 95, spa: 70, spd: 90, spe: 70 },   // Poliwrath
    { hp: 25, atk: 20, def: 15, spa: 105, spd: 55, spe: 90 },  // Abra
    { hp: 40, atk: 35, def: 30, spa: 120, spd: 70, spe: 105 }, // Kadabra
    { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 }, // Alakazam
    { hp: 70, atk: 80, def: 50, spa: 35, spd: 35, spe: 35 },   // Machop
    { hp: 80, atk: 100, def: 70, spa: 50, spd: 60, spe: 45 },  // Machoke
    { hp: 90, atk: 130, def: 80, spa: 65, spd: 85, spe: 55 },  // Machamp
    { hp: 50, atk: 75, def: 35, spa: 70, spd: 30, spe: 40 },   // Bellsprout
    { hp: 65, atk: 90, def: 50, spa: 85, spd: 45, spe: 55 },   // Weepinbell
    { hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70 }, // Victreebel
    { hp: 40, atk: 40, def: 35, spa: 50, spd: 100, spe: 70 },  // Tentacool
    { hp: 80, atk: 70, def: 65, spa: 80, spd: 120, spe: 100 }, // Tentacruel
    { hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20 },  // Geodude
    { hp: 55, atk: 95, def: 115, spa: 45, spd: 45, spe: 35 },  // Graveler
    { hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45 }, // Golem
    { hp: 50, atk: 85, def: 55, spa: 65, spd: 65, spe: 90 },   // Ponyta
    { hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105 }, // Rapidash
    { hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15 },   // Slowpoke
    { hp: 95, atk: 75, def: 110, spa: 100, spd: 80, spe: 30 }, // Slowbro
    { hp: 25, atk: 35, def: 70, spa: 95, spd: 55, spe: 45 },   // Magnemite
    { hp: 50, atk: 60, def: 95, spa: 120, spd: 70, spe: 70 },  // Magneton
    { hp: 52, atk: 65, def: 55, spa: 58, spd: 62, spe: 60 },   // Farfetch’d
    { hp: 35, atk: 85, def: 45, spa: 35, spd: 35, spe: 75 },   // Doduo
    { hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 100 }, // Dodrio
    { hp: 65, atk: 45, def: 55, spa: 45, spd: 70, spe: 45 },   // Seel
    { hp: 90, atk: 70, def: 80, spa: 70, spd: 95, spe: 70 },   // Dewgong
    { hp: 80, atk: 80, def: 50, spa: 40, spd: 50, spe: 25 },   // Grimer
    { hp: 105, atk: 105, def: 75, spa: 65, spd: 100, spe: 50 },// Muk
    { hp: 30, atk: 65, def: 100, spa: 45, spd: 25, spe: 40 },  // Shellder
    { hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70 },  // Cloyster
    { hp: 30, atk: 35, def: 30, spa: 100, spd: 35, spe: 80 },  // Gastly
    { hp: 45, atk: 50, def: 45, spa: 115, spd: 55, spe: 95 },  // Haunter
    { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 }, // Gengar
    { hp: 35, atk: 45, def: 160, spa: 30, spd: 45, spe: 70 },  // Onix
    { hp: 60, atk: 48, def: 45, spa: 43, spd: 90, spe: 42 },   // Drowzee
    { hp: 85, atk: 73, def: 70, spa: 73, spd: 115, spe: 67 },  // Hypno
    { hp: 30, atk: 105, def: 90, spa: 25, spd: 25, spe: 50 },  // Krabby
    { hp: 55, atk: 130, def: 115, spa: 50, spd: 50, spe: 75 }, // Kingler
    { hp: 40, atk: 30, def: 50, spa: 55, spd: 55, spe: 100 },  // Voltorb
    { hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 140 },  // Electrode
    { hp: 60, atk: 40, def: 80, spa: 60, spd: 45, spe: 40 },   // Exeggcute
    { hp: 95, atk: 95, def: 85, spa: 125, spd: 65, spe: 55 },  // Exeggutor
    { hp: 50, atk: 50, def: 95, spa: 40, spd: 50, spe: 35 },   // Cubone
    { hp: 60, atk: 80, def: 110, spa: 50, spd: 80, spe: 45 },  // Marowak
    { hp: 50, atk: 120, def: 53, spa: 35, spd: 110, spe: 87 }, // Hitmonlee
    { hp: 50, atk: 105, def: 79, spa: 35, spd: 110, spe: 76 }, // Hitmonchan
    { hp: 90, atk: 55, def: 75, spa: 60, spd: 75, spe: 30 },   // Lickitung
    { hp: 40, atk: 65, def: 95, spa: 60, spd: 45, spe: 35 },   // Koffing
    { hp: 65, atk: 90, def: 120, spa: 85, spd: 70, spe: 60 },  // Weezing
    { hp: 80, atk: 85, def: 95, spa: 30, spd: 30, spe: 25 },   // Rhyhorn
    { hp: 105, atk: 130, def: 120, spa: 45, spd: 45, spe: 40 },// Rhydon
    { hp: 250, atk: 5, def: 5, spa: 35, spd: 105, spe: 50 },   // Chansey
    { hp: 65, atk: 55, def: 115, spa: 100, spd: 40, spe: 60 }, // Tangela
    { hp: 105, atk: 95, def: 80, spa: 40, spd: 80, spe: 90 },  // Kangaskhan
    { hp: 30, atk: 40, def: 70, spa: 70, spd: 25, spe: 60 },   // Horsea
    { hp: 55, atk: 65, def: 95, spa: 95, spd: 45, spe: 85 },   // Seadra
    { hp: 45, atk: 67, def: 60, spa: 35, spd: 50, spe: 63 },   // Goldeen
    { hp: 80, atk: 92, def: 65, spa: 65, spd: 80, spe: 68 },   // Seaking
    { hp: 30, atk: 45, def: 55, spa: 70, spd: 55, spe: 85 },   // Staryu
    { hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115 }, // Starmie
    { hp: 40, atk: 45, def: 65, spa: 100, spd: 120, spe: 90 }, // Mr. Mime
    { hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105 }, // Scyther
    { hp: 65, atk: 50, def: 35, spa: 115, spd: 95, spe: 95 },  // Jynx
    { hp: 65, atk: 83, def: 57, spa: 95, spd: 85, spe: 105 },  // Electabuzz
    { hp: 65, atk: 95, def: 57, spa: 100, spd: 85, spe: 93 },  // Magmar
    { hp: 65, atk: 125, def: 100, spa: 55, spd: 70, spe: 85 }, // Pinsir
    { hp: 75, atk: 100, def: 95, spa: 40, spd: 70, spe: 110 }, // Tauros
    { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 },   // Magikarp
    { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 }, // Gyarados
    { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 },  // Lapras
    { hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48 },   // Ditto
    { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 },   // Eevee
    { hp: 130, atk: 65, def: 60, spa: 110, spd: 95, spe: 65 }, // Vaporeon
    { hp: 65, atk: 65, def: 60, spa: 110, spd: 95, spe: 130 }, // Jolteon
    { hp: 65, atk: 130, def: 60, spa: 95, spd: 110, spe: 65 }, // Flareon
    { hp: 65, atk: 60, def: 70, spa: 85, spd: 75, spe: 40 },   // Porygon
    { hp: 35, atk: 40, def: 100, spa: 90, spd: 55, spe: 35 },  // Omanyte
    { hp: 70, atk: 60, def: 125, spa: 115, spd: 70, spe: 55 }, // Omastar
    { hp: 30, atk: 80, def: 90, spa: 55, spd: 45, spe: 55 },   // Kabuto
    { hp: 60, atk: 115, def: 105, spa: 65, spd: 70, spe: 80 }, // Kabutops
    { hp: 80, atk: 105, def: 65, spa: 60, spd: 75, spe: 130 }, // Aerodactyl
    { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },// Snorlax
    { hp: 90, atk: 85, def: 100, spa: 95, spd: 125, spe: 85 }, // Articuno
    { hp: 90, atk: 90, def: 85, spa: 125, spd: 90, spe: 100 }, // Zapdos
    { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 }, // Moltres
    { hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50 },   // Dratini
    { hp: 61, atk: 84, def: 65, spa: 70, spd: 70, spe: 70 },   // Dragonair
    { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },// Dragonite
    { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 },// Mewtwo
    { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 } // Mew
];

//**sigh** Pokemon names listed out similarly to the base stats.
const pokemonNames = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
    "Nidoran♂",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch’d",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
    "Chikorita",
    "Bayleef",
    "Meganium",
    "Cyndaquil",
    "Quilava",
    "Typhlosion",
    "Totodile",
    "Croconaw",
    "Feraligatr",
    "Sentret",
    "Furret",
    "Hoothoot",
    "Noctowl",
    "Ledyba",
    "Ledian",
    "Spinarak",
    "Ariados",
    "Crobat",
    "Chinchou",
    "Lanturn",
    "Pichu",
    "Cleffa",
    "Igglybuff",
    "Togepi",
    "Togetic",
    "Natu",
    "Xatu",
    "Mareep",
    "Flaaffy",
    "Ampharos",
    "Bellossom",
    "Marill",
    "Azumarill",
    "Sudowoodo",
    "Politoed",
    "Hoppip",
    "Skiploom",
    "Jumpluff",
    "Aipom",
    "Sunkern",
    "Sunflora",
    "Yanma",
    "Wooper",
    "Quagsire",
    "Espeon",
    "Umbreon",
    "Murkrow",
    "Slowking",
    "Misdreavus",
    "Unown",
    "Wobbuffet",
    "Girafarig",
    "Pineco",
    "Forretress",
    "Dunsparce",
    "Gligar",
    "Steelix",
    "Snubbull",
    "Granbull",
    "Qwilfish",
    "Scizor",
    "Shuckle",
    "Heracross",
    "Sneasel",
    "Teddiursa",
    "Ursaring",
    "Slugma",
    "Magcargo",
    "Swinub",
    "Piloswine",
    "Corsola",
    "Remoraid",
    "Octillery",
    "Delibird",
    "Mantine",
    "Skarmory",
    "Houndour",
    "Houndoom",
    "Kingdra",
    "Phanpy",
    "Donphan",
    "Porygon2",
    "Stantler",
    "Smeargle",
    "Tyrogue",
    "Hitmontop",
    "Smoochum",
    "Elekid",
    "Magby",
    "Miltank",
    "Blissey",
    "Raikou",
    "Entei",
    "Suicune",
    "Larvitar",
    "Pupitar",
    "Tyranitar",
    "Lugia",
    "Ho-Oh",
    "Celebi",
    "Treecko",
    "Grovyle",
    "Sceptile",
    "Torchic",
    "Combusken",
    "Blaziken",
    "Mudkip",
    "Marshtomp",
    "Swampert",
    "Poochyena",
    "Mightyena",
    "Zigzagoon",
    "Linoone",
    "Wurmple",
    "Silcoon",
    "Beautifly",
    "Cascoon",
    "Dustox",
    "Lotad",
    "Lombre",
    "Ludicolo",
    "Seedot",
    "Nuzleaf",
    "Shiftry",
    "Taillow",
    "Swellow",
    "Wingull",
    "Pelipper",
    "Ralts",
    "Kirlia",
    "Gardevoir",
    "Surskit",
    "Masquerain",
    "Shroomish",
    "Breloom",
    "Slakoth",
    "Vigoroth",
    "Slaking",
    "Nincada",
    "Ninjask",
    "Shedinja",
    "Whismur",
    "Loudred",
    "Exploud",
    "Makuhita",
    "Hariyama",
    "Azurill",
    "Nosepass",
    "Skitty",
    "Delcatty",
    "Sableye",
    "Mawile",
    "Aron",
    "Lairon",
    "Aggron",
    "Meditite",
    "Medicham",
    "Electrike",
    "Manectric",
    "Plusle",
    "Minun",
    "Volbeat",
    "Illumise",
    "Roselia",
    "Gulpin",
    "Swalot",
    "Carvanha",
    "Sharpedo",
    "Wailmer",
    "Wailord",
    "Numel",
    "Camerupt",
    "Torkoal",
    "Spoink",
    "Grumpig",
    "Spinda",
    "Trapinch",
    "Vibrava",
    "Flygon",
    "Cacnea",
    "Cacturne",
    "Swablu",
    "Altaria",
    "Zangoose",
    "Seviper",
    "Lunatone",
    "Solrock",
    "Barboach",
    "Whiscash",
    "Corphish",
    "Crawdaunt",
    "Baltoy",
    "Claydol",
    "Lileep",
    "Cradily",
    "Anorith",
    "Armaldo",
    "Feebas",
    "Milotic",
    "Castform",
    "Kecleon",
    "Shuppet",
    "Banette",
    "Duskull",
    "Dusclops",
    "Tropius",
    "Chimecho",
    "Absol",
    "Wynaut",
    "Snorunt",
    "Glalie",
    "Spheal",
    "Sealeo",
    "Walrein",
    "Clamperl",
    "Huntail",
    "Gorebyss",
    "Relicanth",
    "Luvdisc",
    "Bagon",
    "Shelgon",
    "Salamence",
    "Beldum",
    "Metang",
    "Metagross",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Turtwig",
    "Grotle",
    "Torterra",
    "Chimchar",
    "Monferno",
    "Infernape",
    "Piplup",
    "Prinplup",
    "Empoleon",
    "Starly",
    "Staravia",
    "Staraptor",
    "Bidoof",
    "Bibarel",
    "Kricketot",
    "Kricketune",
    "Shinx",
    "Luxio",
    "Luxray",
    "Budew",
    "Roserade",
    "Cranidos",
    "Rampardos",
    "Shieldon",
    "Bastiodon",
    "Burmy",
    "Wormadam",
    "Mothim",
    "Combee",
    "Vespiquen",
    "Pachirisu",
    "Buizel",
    "Floatzel",
    "Cherubi",
    "Cherrim",
    "Shellos",
    "Gastrodon",
    "Ambipom",
    "Drifloon",
    "Drifblim",
    "Buneary",
    "Lopunny",
    "Mismagius",
    "Honchkrow",
    "Glameow",
    "Purugly",
    "Chingling",
    "Stunky",
    "Skuntank",
    "Bronzor",
    "Bronzong",
    "Bonsly",
    "Mime Jr.",
    "Happiny",
    "Chatot",
    "Spiritomb",
    "Gible",
    "Gabite",
    "Garchomp",
    "Munchlax",
    "Riolu",
    "Lucario",
    "Hippopotas",
    "Hippowdon",
    "Skorupi",
    "Drapion",
    "Croagunk",
    "Toxicroak",
    "Carnivine",
    "Finneon",
    "Lumineon",
    "Mantyke",
    "Snover",
    "Abomasnow",
    "Weavile",
    "Magnezone",
    "Lickilicky",
    "Rhyperior",
    "Tangrowth",
    "Electivire",
    "Magmortar",
    "Togekiss",
    "Yanmega",
    "Leafeon",
    "Glaceon",
    "Gliscor",
    "Mamoswine",
    "Porygon-Z",
    "Gallade",
    "Probopass",
    "Dusknoir",
    "Froslass",
    "Rotom (Normal)",
    "Uxie",
    "Mesprit",
    "Azelf",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina (Altered)",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin (Land)",
    "Arceus (Normal)",
    "Victini",
    "Snivy",
    "Servine",
    "Serperior",
    "Tepig",
    "Pignite",
    "Emboar",
    "Oshawott",
    "Dewott",
    "Samurott",
    "Patrat",
    "Watchog",
    "Lillipup",
    "Herdier",
    "Stoutland",
    "Purrloin",
    "Liepard",
    "Pansage",
    "Simisage",
    "Pansear",
    "Simisear",
    "Panpour",
    "Simipour",
    "Munna",
    "Musharna",
    "Pidove",
    "Tranquill",
    "Unfezant",
    "Blitzle",
    "Zebstrika",
    "Roggenrola",
    "Boldore",
    "Gigalith",
    "Woobat",
    "Swoobat",
    "Drilbur",
    "Excadrill",
    "Audino",
    "Timburr",
    "Gurdurr",
    "Conkeldurr",
    "Tympole",
    "Palpitoad",
    "Seismitoad",
    "Throh",
    "Sawk",
    "Sewaddle",
    "Swadloon",
    "Leavanny",
    "Venipede",
    "Whirlipede",
    "Scolipede",
    "Cottonee",
    "Whimsicott",
    "Petilil",
    "Lilligant",
    "Basculin",
    "Sandile",
    "Krokorok",
    "Krookodile",
    "Darumaka",
    "Darmanitan",
    "Maractus",
    "Dwebble",
    "Crustle",
    "Scraggy",
    "Scrafty",
    "Sigilyph",
    "Yamask",
    "Cofagrigus",
    "Tirtouga",
    "Carracosta",
    "Archen",
    "Archeops",
    "Trubbish",
    "Garbodor",
    "Zorua",
    "Zoroark",
    "Minccino",
    "Cinccino",
    "Gothita",
    "Gothorita",
    "Gothitelle",
    "Solosis",
    "Duosion",
    "Reuniclus",
    "Ducklett",
    "Swanna",
    "Vanillite",
    "Vanillish",
    "Vanilluxe",
    "Deerling",
    "Sawsbuck",
    "Emolga",
    "Karrablast",
    "Escavalier",
    "Foongus",
    "Amoonguss",
    "Frillish",
    "Jellicent",
    "Alomomola",
    "Joltik",
    "Galvantula",
    "Ferroseed",
    "Ferrothorn",
    "Klink",
    "Klang",
    "Klinklang",
    "Tynamo",
    "Eelektrik",
    "Eelektross",
    "Elgyem",
    "Beheeyem",
    "Litwick",
    "Lampent",
    "Chandelure",
    "Axew",
    "Fraxure",
    "Haxorus",
    "Cubchoo",
    "Beartic",
    "Cryogonal",
    "Shelmet",
    "Accelgor",
    "Stunfisk (Standard)",
    "Mienfoo",
    "Mienshao",
    "Druddigon",
    "Golett",
    "Golurk",
    "Pawniard",
    "Bisharp",
    "Bouffalant (Standard)",
    "Rufflet (Standard)",
    "Braviary (Standard)",
    "Vullaby (Standard)",
    "Mandibuzz (Standard)",
    "Heatmor (Standard)",
    "Durant (Standard)",
    "Deino",
    "Zweilous",
    "Hydreigon",
    "Larvesta",
    "Volcarona",
    "Cobalion",
    "Terrakion",
    "Virizion",
    "Tornadus (Incarnate)",
    "Thundurus (Incarnate)",
    "Reshiram",
    "Zekrom",
    "Landorus (Incarnate)",
    "Kyurem (Standard)",
    "Keldeo (Ordinary)",
    "Meloetta (Aria)",
    "Genesect (Standard)",
    "Chespin",
    "Quilladin",
    "Chesnaught",
    "Fennekin",
    "Braixen",
    "Delphox",
    "Froakie",
    "Frogadier",
    "Greninja",
    "Bunnelby",
    "Diggersby",
    "Fletchling",
    "Fletchinder",
    "Talonflame",
    "Scatterbug",
    "Spewpa",
    "Vivillon (Modern)",
    "Litleo",
    "Pyroar",
    "Flabébé (Red)",
    "Floette (Red)",
    "Florges (Red)",
    "Skiddo",
    "Gogoat",
    "Pancham",
    "Pangoro",
    "Furfrou (Heart)",
    "Espurr",
    "Meowstic",
    "Honedge",
    "Doublade",
    "Aegislash",
    "Spritzee",
    "Aromatisse",
    "Swirlix",
    "Slurpuff",
    "Inkay",
    "Malamar",
    "Binacle",
    "Barbaracle",
    "Skrelp",
    "Dragalge",
    "Clauncher",
    "Clawitzer",
    "Helioptile",
    "Heliolisk",
    "Tyrunt",
    "Tyrantrum",
    "Amaura",
    "Aurorus",
    "Sylveon",
    "Hawlucha",
    "Dedenne",
    "Carbink",
    "Goomy",
    "Sliggoo",
    "Goodra",
    "Klefki",
    "Phantump",
    "Trevenant",
    "Pumpkaboo (Average)",
    "Gourgeist (Average)",
    "Bergmite",
    "Avalugg (Standard)",
    "Noibat",
    "Noivern (Standard)",
    "Xerneas (Neutral)",
    "Yveltal (Standard)",
    "Zygarde (50%)",
    "Diancie (Standard)",
    "Hoopa (Confined)",
    "Volcanion",
    "Rowlet",
    "Dartrix",
    "Decidueye",
    "Litten",
    "Torracat",
    "Incineroar",
    "Popplio",
    "Brionne",
    "Primarina",
    "Pikipek",
    "Trumbeak",
    "Toucannon",
    "Yungoos",
    "Gumshoos",
    "Grubbin",
    "Charjabug",
    "Vikavolt",
    "Crabrawler",
    "Crabominable",
    "Oricorio",
    "Cutiefly",
    "Ribombee",
    "Rockruff",
    "Lycanroc",
    "Wishiwashi",
    "Mareanie",
    "Toxapex",
    "Mudbray",
    "Mudsdale",
    "Dewpider",
    "Araquanid",
    "Fomantis",
    "Lurantis",
    "Morelull",
    "Shiinotic",
    "Salandit",
    "Salazzle",
    "Stufful",
    "Bewear",
    "Bounsweet",
    "Steenee",
    "Tsareena",
    "Comfey",
    "Oranguru",
    "Passimian",
    "Wimpod",
    "Golisopod",
    "Sandygast",
    "Palossand",
    "Pyukumuku",
    "Type: Null",
    "Silvally (Normal)",
    "Minior (Meteor)",
    "Komala",
    "Turtonator",
    "Togedemaru",
    "Mimikyu (Disguised)",
    "Bruxish (Standard)",
    "Drampa (Standard)",
    "Dhelmise (Standard)",
    "Jangmo-o",
    "Hakamo-o",
    "Kommo-o (Standard)",
    "Tapu Koko (Standard)",
    "Tapu Lele (Standard)",
    "Tapu Bulu (Standard)",
    "Tapu Fini (Standard)",
    "Cosmog",
    "Cosmoem",
    "Solgaleo (Standard)",
    "Lunala (Standard)",
    "Nihilego (Standard)",
    "Buzzwole (Standard)",
    "Pheromosa (Standard)",
    "Xurkitree (Standard)",
    "Celesteela (Standard)",
    "Kartana (Standard)",
    "Guzzlord (Standard)",
    "Necrozma (Standard)",
    "Magearna (Standard)",
    "Marshadow (Standard)",
    "Poipole",
    "Naganadel",
    "Stakataka",
    "Blacephalon",
    "Zeraora",
    "Meltan",
    "Melmetal",
    "Grookey",
    "Thwackey",
    "Rillaboom",
    "Scorbunny",
    "Raboot",
    "Cinderace",
    "Sobble",
    "Drizzile",
    "Inteleon",
    "Skwovet",
    "Greedent",
    "Rookidee",
    "Corvisquire",
    "Corviknight",
    "Blipbug",
    "Dottler",
    "Orbeetle",
    "Nickit",
    "Thievul",
    "Gossifleur",
    "Eldegoss",
    "Wooloo",
    "Dubwool",
    "Chewtle",
    "Drednaw",
    "Yamper",
    "Boltund",
    "Rolycoly",
    "Carkol",
    "Coalossal",
    "Applin",
    "Flapple (Standard)",
    "Appletun (Standard)",
    "Silicobra",
    "Sandaconda (Standard)",
    "Cramorant (Gulping)",
    "Cramorant (Gorging)",
    "Arrokuda",
    "Barraskewda",
    "Toxel (Standard)",
    "Toxtricity (Amped)",
    "Toxtricity (Low-Key)",
    "Sizzlipede",
    "Centiskorch (Standard)",
    "Clobbopus",
    "Grapploct",
    "Sinistea (Phony)",
    "Polteageist (Phony)",
    "Hatenna",
    "Hattrem",
    "Hatterene",
    "Impidimp",
    "Morgrem",
    "Grimmsnarl",
    "Obstagoon",
    "Perrserker",
    "Cursola",
    "Sirfetch’d",
    "Mr. Rime",
    "Runerigus",
    "Milcery (Standard)",
    "Alcremie (Standard)",
    "Falinks (Standard)",
    "Pincurchin (Standard)",
    "Snom",
    "Frosmoth (Standard)",
    "Stonjourner (Standard)",
    "Eiscue (Ice Face)",
    "Indeedee (Standard)",
    "Morpeko (Full Belly)",
    "Morpeko (Hangry)",
    "Cufant",
    "Copperajah (Standard)",
    "Dracozolt",
    "Arctozolt",
    "Dracovish",
    "Arctovish",
    "Duraludon (Standard)",
    "Dreepy",
    "Drakloak",
    "Dragapult (Standard)",
    "Zacian (Hero of Many Battles)",
    "Zamazenta (Hero of Many Battles)",
    "Eternatus (Standard)",
    "Kubfu",
    "Urshifu (Single Strike)",
    "Urshifu (Rapid Strike)",
    "Zarude (Standard)",
    "Regieleki (Standard)",
    "Regidrago (Standard)",
    "Glastrier (Standard)",
    "Spectrier (Standard)",
    "Calyrex (Standard)",
    "Calyrex (Ice Rider)",
    "Calyrex (Shadow Rider)",
    "Wyrdeer",
    "Kleavor",
    "Ursaluna",
    "Basculegion (Standard)",
    "Sneasler",
    "Overqwil",
    "Enamorus (Incarnate)",
    "Enamorus (Therian)",
    "Sprigatito",
    "Floragato",
    "Meowscarada",
    "Fuecoco",
    "Crocalor",
    "Skeledirge",
    "Quaxly",
    "Quaxwell",
    "Quaquaval",
    "Lechonk",
    "Oinkologne",
    "Tarountula",
    "Spidops",
    "Nymble",
    "Lokix",
    "Pawmi",
    "Pawmo",
    "Pawmot",
    "Tandemaus",
    "Maushold (Family of Four)",
    "Maushold (Family of Three)",
    "Fidough",
    "Dachsbun",
    "Smoliv",
    "Dolliv",
    "Arboliva",
    "Squawkabilly (Green)",
    "Squawkabilly (Blue)",
    "Squawkabilly (Yellow)",
    "Squawkabilly (White)",
    "Nacli",
    "Naclstack",
    "Garganacl",
    "Charcadet",
    "Armarouge",
    "Ceruledge",
    "Tadbulb",
    "Bellibolt",
    "Wattrel",
    "Kilowattrel",
    "Maschiff",
    "Mabosstiff",
    "Shroodle",
    "Grafaiai",
    "Bramblin",
    "Brambleghast",
    "Toedscool",
    "Toedscruel",
    "Klawf",
    "Capsakid",
    "Scovillain (Standard)",
    "Rellor",
    "Rabsca",
    "Flittle",
    "Espathra (Standard)",
    "Tinkaton (Standard)",
    "Wiglett (Standard)",
    "Wugtrio (Standard)",
    "Bombirdier (Standard)",
    "Finizen (Standard)",
    "Palafin (Hero Forme)",
    "Varoom",
    "Revavroom",
    "Cyclizar",
    "Orthworm",
    "Glimmet",
    "Glimora",
    "Greavard",
    "Houndstone",
    "Flamigo (Standard)",
    "Cetoddle",
    "Cetitan (Standard)",
    "Veluza (Standard)",
    "Dondozo (Standard)",
    "Tatsugiri (Standard)",
    "Annihilape",
    "Clodsire",
    "Farigiraf",
    "Dudunsparce (Standard)",
    "Kingambit (Standard)",
    "Great Tusk (Standard)",
    "Scream Tail (Standard)",
    "Brute Bonnet (Standard)",
    "Flutter Mane (Standard)",
    "Slither Wing (Standard)",
    "Sandy Shocks (Standard)",
    "Iron Treads (Standard)",
    "Iron Bundle (Standard)",
    "Iron Hands (Standard)",
    "Iron Jugulis (Standard)",
    "Iron Moth (Standard)",
    "Iron Thorns (Standard)",
    "Frigibax",
    "Arctibax",
    "Baxcalibur",
    "Gimmighoul (Chest)",
    "Gimmighoul (Roaming)",
    "Greavard",
    "Houndstone",
    "Wo-Chien (Standard)",
    "Chi-Yu (Standard)",
    "Ting-Lu (Standard)",
    "Chien-Pao (Standard)",
    "Roaring Moon (Standard)",
    "Iron Valiant (Standard)",
    "Walking Wake (Standard)",
    "Iron Leaves (Standard)",
    "Ogerpon (Standard)",
    "Terapagos (Standard)",
    "Pawmot",
    "Lokix",
    "Kilowattrel",
    "Arboliva",
    "Ceruledge",
    "Espathra",
    "Tinkaton",
    "Glimora",
    "Houndstone",
    "Cetitan",
    "Annihilape",
    "Clodsire",
    "Farigiraf",
    "Dudunsparce",
    "Great Tusk",
    "Scream Tail",
    "Brute Bonnet",
    "Flutter Mane",
    "Slither Wing",
    "Sandy Shocks",
    "Iron Treads",
    "Iron Bundle",
    "Iron Hands",
    "Iron Jugulis",
    "Iron Moth",
    "Iron Thorns",
    "Frigibax",
    "Arctibax",
    "Baxcalibur",
    "Gimmighoul (Chest)",
    "Gimmighoul (Roaming)",
    "Wo-Chien",
    "Chi-Yu",
    "Ting-Lu",
    "Chien-Pao",
    "Roaring Moon",
    "Iron Valiant",
    "Walking Wake",
    "Iron Leaves",
    "Ogerpon",
    "Terapagos"
];


// A list of Pokémon types corresponding to the Pokémon names above. Names are commented for clarity as well. Helps with finding what broke everything.
const pokemonTypes = [
    ["Grass", "Poison"], // Bulbasaur
    ["Grass", "Poison"], // Ivysaur
    ["Grass", "Poison"], // Venusaur
    ["Fire"], // Charmander
    ["Fire"], // Charmeleon
    ["Fire", "Flying"], // Charizard
    ["Water"], // Squirtle
    ["Water"], // Wartortle
    ["Water"], // Blastoise
    ["Bug"], // Caterpie
    ["Bug"], // Metapod
    ["Bug", "Flying"], // Butterfree
    ["Bug", "Poison"], // Weedle
    ["Bug", "Poison"], // Kakuna
    ["Bug", "Poison"], // Beedrill
    ["Normal", "Flying"], // Pidgey
    ["Normal", "Flying"], // Pidgeotto
    ["Normal", "Flying"], // Pidgeot
    ["Normal"], // Rattata
    ["Normal"], // Raticate
    ["Normal", "Flying"], // Spearow
    ["Normal", "Flying"], // Fearow
    ["Poison"], // Ekans
    ["Poison"], // Arbok
    ["Electric"], // Pikachu
    ["Electric"], // Raichu
    ["Ground"], // Sandshrew
    ["Ground"], // Sandslash
    ["Poison"], // Nidoran♀
    ["Poison"], // Nidorina
    ["Poison", "Ground"], // Nidoqueen
    ["Poison"], // Nidoran♂
    ["Poison"], // Nidorino
    ["Poison", "Ground"], // Nidoking
    ["Fairy"], // Clefairy
    ["Fairy"], // Clefable
    ["Fire"], // Vulpix
    ["Fire"], // Ninetales
    ["Normal", "Fairy"], // Jigglypuff
    ["Normal", "Fairy"], // Wigglytuff
    ["Poison", "Flying"], // Zubat
    ["Poison", "Flying"], // Golbat
    ["Grass", "Poison"], // Oddish
    ["Grass", "Poison"], // Gloom
    ["Grass", "Poison"], // Vileplume
    ["Bug", "Grass"], // Paras
    ["Bug", "Grass"], // Parasect
    ["Bug", "Poison"], // Venonat
    ["Bug", "Poison"], // Venomoth
    ["Ground"], // Diglett
    ["Ground"], // Dugtrio
    ["Normal"], // Meowth
    ["Normal"], // Persian
    ["Water"], // Psyduck
    ["Water"], // Golduck
    ["Fighting"], // Mankey
    ["Fighting"], // Primeape
    ["Fire"], // Growlithe
    ["Fire"], // Arcanine
    ["Water"], // Poliwag
    ["Water"], // Poliwhirl
    ["Water", "Fighting"], // Poliwrath
    ["Psychic"], // Abra
    ["Psychic"], // Kadabra
    ["Psychic"], // Alakazam
    ["Fighting"], // Machop
    ["Fighting"], // Machoke
    ["Fighting"], // Machamp
    ["Grass", "Poison"], // Bellsprout
    ["Grass", "Poison"], // Weepinbell
    ["Grass", "Poison"], // Victreebel
    ["Water", "Poison"], // Tentacool
    ["Water", "Poison"], // Tentacruel
    ["Rock", "Ground"], // Geodude
    ["Rock", "Ground"], // Graveler
    ["Rock", "Ground"], // Golem
    ["Fire"], // Ponyta
    ["Fire"], // Rapidash
    ["Water", "Psychic"], // Slowpoke
    ["Water", "Psychic"], // Slowbro
    ["Electric"], // Magnemite
    ["Electric"], // Magneton
    ["Normal", "Flying"], // Farfetch’d
    ["Normal", "Flying"], // Doduo
    ["Normal", "Flying"], // Dodrio
    ["Water"], // Seel
    ["Water", "Ice"], // Dewgong
    ["Poison"], // Grimer
    ["Poison"], // Muk
    ["Water"], // Shellder
    ["Water", "Ice"], // Cloyster
    ["Ghost", "Poison"], // Gastly
    ["Ghost", "Poison"], // Haunter
    ["Ghost", "Poison"], // Gengar
    ["Rock", "Ground"], // Onix
    ["Psychic"], // Drowzee
    ["Psychic"], // Hypno
    ["Water"], // Krabby
    ["Water"], // Kingler
    ["Electric"], // Voltorb
    ["Electric"], // Electrode
    ["Grass", "Psychic"], // Exeggcute
    ["Grass", "Psychic"], // Exeggutor
    ["Ground"], // Cubone
    ["Ground"], // Marowak
    ["Fighting"], // Hitmonlee
    ["Fighting"], // Hitmonchan
    ["Normal"], // Lickitung
    ["Poison"], // Koffing
    ["Poison"], // Weezing
    ["Ground", "Rock"], // Rhyhorn
    ["Ground", "Rock"], // Rhydon
    ["Normal"], // Chansey
    ["Grass"], // Tangela
    ["Normal"], // Kangaskhan
    ["Water"], // Horsea
    ["Water"], // Seadra
    ["Water"], // Goldeen
    ["Water"], // Seaking
    ["Water", "Psychic"], // Staryu
    ["Water", "Psychic"], // Starmie
    ["Psychic", "Fairy"], // Mr. Mime
    ["Bug", "Flying"], // Scyther
    ["Ice", "Psychic"], // Jynx
    ["Electric"], // Electabuzz
    ["Fire"], // Magmar
    ["Bug"], // Pinsir
    ["Normal"], // Tauros
    ["Water"], // Magikarp
    ["Water", "Flying"], // Gyarados
    ["Water", "Ice"], // Lapras
    ["Normal"], // Ditto
    ["Normal"], // Eevee
    ["Water"], // Vaporeon
    ["Electric"], // Jolteon
    ["Fire"], // Flareon
    ["Normal"], // Porygon
    ["Rock", "Water"], // Omanyte
    ["Rock", "Water"], // Omastar
    ["Rock", "Water"], // Kabuto
    ["Rock", "Water"], // Kabutops
    ["Rock", "Flying"], // Aerodactyl
    ["Normal"], // Snorlax
    ["Ice", "Flying"], // Articuno
    ["Electric", "Flying"], // Zapdos
    ["Fire", "Flying"], // Moltres
    ["Dragon"], // Dratini
    ["Dragon"], // Dragonair
    ["Dragon", "Flying"], // Dragonite
    ["Psychic"], // Mewtwo
    ["Psychic"], // Mew
    ["Grass"], // Chikorita
    ["Grass"], // Bayleef
    ["Grass"], // Meganium
    ["Fire"], // Cyndaquil
    ["Fire"], // Quilava
    ["Fire"], // Typhlosion
    ["Water"], // Totodile
    ["Water"], // Croconaw
    ["Water"], // Feraligatr
    ["Normal"], // Sentret
    ["Normal"], // Furret
    ["Normal", "Flying"], // Hoothoot
    ["Normal", "Flying"], // Noctowl
    ["Bug", "Flying"], // Ledyba
    ["Bug", "Flying"], // Ledian
    ["Bug", "Poison"], // Spinarak
    ["Bug", "Poison"], // Ariados
    ["Poison", "Flying"], // Crobat
    ["Water", "Electric"], // Chinchou
    ["Water", "Electric"], // Lanturn
    ["Electric"], // Pichu
    ["Fairy"], // Cleffa
    ["Normal", "Fairy"], // Igglybuff
    ["Fairy"], // Togepi
    ["Fairy", "Flying"], // Togetic
    ["Psychic", "Flying"], // Natu
    ["Psychic", "Flying"], // Xatu
    ["Electric"], // Mareep
    ["Electric"], // Flaaffy
    ["Electric"], // Ampharos
    ["Grass"], // Bellossom
    ["Water", "Fairy"], // Marill
    ["Water", "Fairy"], // Azumarill
    ["Rock"], // Sudowoodo
    ["Water"], // Politoed
    ["Grass", "Flying"], // Hoppip
    ["Grass", "Flying"], // Skiploom
    ["Grass", "Flying"], // Jumpluff
    ["Normal"], // Aipom
    ["Grass"], // Sunkern
    ["Grass"], // Sunflora
    ["Bug", "Flying"], // Yanma
    ["Water", "Ground"], // Wooper
    ["Water", "Ground"], // Quagsire
    ["Psychic"], // Espeon
    ["Dark"], // Umbreon
    ["Dark", "Flying"], // Murkrow
    ["Water", "Psychic"], // Slowking
    ["Ghost"], // Misdreavus
    ["Psychic"], // Unown
    ["Psychic"], // Wobbuffet
    ["Normal", "Psychic"], // Girafarig
    ["Bug"], // Pineco
    ["Bug", "Steel"], // Forretress
    ["Normal"], // Dunsparce
    ["Ground", "Flying"], // Gligar
    ["Steel", "Ground"], // Steelix
    ["Fairy"], // Snubbull
    ["Fairy"], // Granbull
    ["Water", "Poison"], // Qwilfish
    ["Bug", "Steel"], // Scizor
    ["Bug", "Rock"], // Shuckle
    ["Bug", "Fighting"], // Heracross
    ["Dark", "Ice"], // Sneasel
    ["Normal"], // Teddiursa
    ["Normal"], // Ursaring
    ["Fire"], // Slugma
    ["Fire", "Rock"], // Magcargo
    ["Ice", "Ground"], // Swinub
    ["Ice", "Ground"], // Piloswine
    ["Water", "Rock"], // Corsola
    ["Water"], // Remoraid
    ["Water"], // Octillery
    ["Ice", "Flying"], // Delibird
    ["Water", "Flying"], // Mantine
    ["Steel", "Flying"], // Skarmory
    ["Dark", "Fire"], // Houndour
    ["Dark", "Fire"], // Houndoom
    ["Water", "Dragon"], // Kingdra
    ["Ground"], // Phanpy
    ["Ground"], // Donphan
    ["Normal"], // Porygon2
    ["Normal"], // Stantler
    ["Normal"], // Smeargle
    ["Fighting"], // Tyrogue
    ["Fighting"], // Hitmontop
    ["Ice", "Psychic"], // Smoochum
    ["Electric"], // Elekid
    ["Fire"], // Magby
    ["Normal"], // Miltank
    ["Normal"], // Blissey
    ["Electric"], // Raikou
    ["Fire"], // Entei
    ["Water"], // Suicune
    ["Rock", "Ground"], // Larvitar
    ["Rock", "Ground"], // Pupitar
    ["Rock", "Dark"], // Tyranitar
    ["Psychic", "Flying"], // Lugia
    ["Fire", "Flying"], // Ho-Oh
    ["Psychic", "Grass"], // Celebi
    ["Grass"], // Treecko
    ["Grass"], // Grovyle
    ["Grass"], // Sceptile
    ["Fire"], // Torchic
    ["Fire", "Fighting"], // Combusken
    ["Fire", "Fighting"], // Blaziken
    ["Water"], // Mudkip
    ["Water", "Ground"], // Marshtomp
    ["Water", "Ground"], // Swampert
    ["Dark"], // Poochyena
    ["Dark"], // Mightyena
    ["Normal"], // Zigzagoon
    ["Normal"], // Linoone
    ["Bug"], // Wurmple
    ["Bug"], // Silcoon
    ["Bug", "Flying"], // Beautifly
    ["Bug"], // Cascoon
    ["Bug", "Poison"], // Dustox
    ["Water", "Grass"], // Lotad
    ["Water", "Grass"], // Lombre
    ["Water", "Grass"], // Ludicolo
    ["Grass"], // Seedot
    ["Grass", "Dark"], // Nuzleaf
    ["Grass", "Dark"], // Shiftry
    ["Normal", "Flying"], // Taillow
    ["Normal", "Flying"], // Swellow
    ["Water", "Flying"], // Wingull
    ["Water", "Flying"], // Pelipper
    ["Psychic", "Fairy"], // Ralts
    ["Psychic", "Fairy"], // Kirlia
    ["Psychic", "Fairy"], // Gardevoir
    ["Bug", "Water"], // Surskit
    ["Bug", "Flying"], // Masquerain
    ["Grass"], // Shroomish
    ["Grass", "Fighting"], // Breloom
    ["Normal"], // Slakoth
    ["Normal"], // Vigoroth
    ["Normal"], // Slaking
    ["Bug", "Ground"], // Nincada
    ["Bug", "Flying"], // Ninjask
    ["Bug", "Ghost"], // Shedinja
    ["Normal"], // Whismur
    ["Normal"], // Loudred
    ["Normal"], // Exploud
    ["Fighting"], // Makuhita
    ["Fighting"], // Hariyama
    ["Normal", "Fairy"], // Azurill
    ["Rock"], // Nosepass
    ["Normal"], // Skitty
    ["Normal"], // Delcatty
    ["Dark", "Ghost"], // Sableye
    ["Steel", "Fairy"], // Mawile
    ["Steel", "Rock"], // Aron
    ["Steel", "Rock"], // Lairon
    ["Steel", "Rock"], // Aggron
    ["Fighting", "Psychic"], // Meditite
    ["Fighting", "Psychic"], // Medicham
    ["Electric"], // Electrike
    ["Electric"], // Manectric
    ["Electric"], // Plusle
    ["Electric"], // Minun
    ["Bug"], // Volbeat
    ["Bug"], // Illumise
    ["Grass", "Poison"], // Roselia
    ["Poison"], // Gulpin
    ["Poison"], // Swalot
    ["Water", "Dark"], // Carvanha
    ["Water", "Dark"], // Sharpedo
    ["Water"], // Wailmer
    ["Water"], // Wailord
    ["Fire", "Ground"], // Numel
    ["Fire", "Ground"], // Camerupt
    ["Fire"], // Torkoal
    ["Psychic"], // Spoink
    ["Psychic"], // Grumpig
    ["Normal"], // Spinda
    ["Ground"], // Trapinch
    ["Ground", "Dragon"], // Vibrava
    ["Ground", "Dragon"], // Flygon
    ["Grass"], // Cacnea
    ["Grass", "Dark"], // Cacturne
    ["Normal", "Flying"], // Swablu
    ["Dragon", "Flying"], // Altaria
    ["Normal"], // Zangoose
    ["Poison"], // Seviper
    ["Rock", "Psychic"], // Lunatone
    ["Rock", "Psychic"], // Solrock
    ["Water", "Ground"], // Barboach
    ["Water", "Ground"], // Whiscash
    ["Water"], // Corphish
    ["Water", "Dark"], // Crawdaunt
    ["Ground", "Psychic"], // Baltoy
    ["Ground", "Psychic"], // Claydol
    ["Rock", "Grass"], // Lileep
    ["Rock", "Grass"], // Cradily
    ["Rock", "Bug"], // Anorith
    ["Rock", "Bug"], // Armaldo
    ["Water"], // Feebas
    ["Water"], // Milotic
    ["Normal"], // Castform
    ["Normal"], // Kecleon
    ["Ghost"], // Shuppet
    ["Ghost"], // Banette
    ["Ghost"], // Duskull
    ["Ghost"], // Dusclops
    ["Grass", "Flying"], // Tropius
    ["Psychic"], // Chimecho
    ["Dark"], // Absol
    ["Psychic"], // Wynaut
    ["Ice"], // Snorunt
    ["Ice"], // Glalie
    ["Ice", "Water"], // Spheal
    ["Ice", "Water"], // Sealeo
    ["Ice", "Water"], // Walrein
    ["Water"], // Clamperl
    ["Water"], // Huntail
    ["Water"], // Gorebyss
    ["Water", "Rock"], // Relicanth
    ["Water"], // Luvdisc
    ["Dragon"], // Bagon
    ["Dragon"], // Shelgon
    ["Dragon", "Flying"], // Salamence
    ["Steel", "Psychic"], // Beldum
    ["Steel", "Psychic"], // Metang
    ["Steel", "Psychic"], // Metagross
    ["Rock"], // Regirock
    ["Ice"], // Regice
    ["Steel"], // Registeel
    ["Dragon", "Psychic"], // Latias
    ["Dragon", "Psychic"], // Latios
    ["Water"], // Kyogre
    ["Ground"], // Groudon
    ["Dragon", "Flying"], // Rayquaza
    ["Steel", "Psychic"], // Jirachi
    ["Psychic"], // Deoxys
    ["Grass"], // Turtwig
    ["Grass", "Ground"], // Grotle
    ["Grass", "Ground"], // Torterra
    ["Fire"], // Chimchar
    ["Fire", "Fighting"], // Monferno
    ["Fire", "Fighting"], // Infernape
    ["Water"], // Piplup
    ["Water"], // Prinplup
    ["Water", "Steel"], // Empoleon
    ["Normal", "Flying"], // Starly
    ["Normal", "Flying"], // Staravia
    ["Normal", "Flying"], // Staraptor
    ["Normal"], // Bidoof
    ["Normal", "Water"], // Bibarel
    ["Bug"], // Kricketot
    ["Bug"], // Kricketune
    ["Electric"], // Shinx
    ["Electric"], // Luxio
    ["Electric"], // Luxray
    ["Grass", "Poison"], // Budew
    ["Grass", "Poison"], // Roserade
    ["Rock"], // Cranidos
    ["Rock"], // Rampardos
    ["Rock", "Steel"], // Shieldon
    ["Rock", "Steel"], // Bastiodon
    ["Bug"], // Burmy
    ["Bug", "?"], // Wormadam
    ["Bug", "Flying"], // Mothim
    ["Bug", "Flying"], // Combee
    ["Bug", "Flying"], // Vespiquen
    ["Electric"], // Pachirisu
    ["Water"], // Buizel
    ["Water"], // Floatzel
    ["Grass"], // Cherubi
    ["Grass"], // Cherrim
    ["Water"], // Shellos
    ["Water", "Ground"], // Gastrodon
    ["Normal"], // Ambipom
    ["Ghost", "Flying"], // Drifloon
    ["Ghost", "Flying"], // Drifblim
    ["Normal"], // Buneary
    ["Normal"], // Lopunny
    ["Ghost"], // Mismagius
    ["Dark", "Flying"], // Honchkrow
    ["Normal"], // Glameow
    ["Normal"], // Purugly
    ["Psychic"], // Chingling
    ["Poison", "Dark"], // Stunky
    ["Poison", "Dark"], // Skuntank
    ["Steel", "Psychic"], // Bronzor
    ["Steel", "Psychic"], // Bronzong
    ["Rock"], // Bonsly
    ["Psychic", "Fairy"], // Mime Jr.
    ["Normal"], // Happiny
    ["Normal", "Flying"], // Chatot
    ["Ghost", "Dark"], // Spiritomb
    ["Dragon", "Ground"], // Gible
    ["Dragon", "Ground"], // Gabite
    ["Dragon", "Ground"], // Garchomp
    ["Normal"], // Munchlax
    ["Fighting"], // Riolu
    ["Fighting", "Steel"], // Lucario
    ["Ground"], // Hippopotas
    ["Ground"], // Hippowdon
    ["Poison", "Bug"], // Skorupi
    ["Poison", "Dark"], // Drapion
    ["Poison", "Fighting"], // Croagunk
    ["Poison", "Fighting"], // Toxicroak
    ["Grass"], // Carnivine
    ["Water"], // Finneon
    ["Water"], // Lumineon
    ["Water", "Flying"], // Mantyke
    ["Grass", "Ice"], // Snover
    ["Grass", "Ice"], // Abomasnow
    ["Dark", "Ice"], // Weavile
    ["Electric", "Steel"], // Magnezone
    ["Normal"], // Lickilicky
    ["Ground", "Rock"], // Rhyperior
    ["Grass"], // Tangrowth
    ["Electric"], // Electivire
    ["Fire"], // Magmortar
    ["Fairy", "Flying"], // Togekiss
    ["Bug", "Flying"], // Yanmega
    ["Grass"], // Leafeon
    ["Ice"], // Glaceon
    ["Ground", "Flying"], // Gliscor
    ["Ice", "Ground"], // Mamoswine
    ["Normal"], // Porygon-Z
    ["Psychic", "Fighting"], // Gallade
    ["Rock", "Steel"], // Probopass
    ["Ghost"], // Dusknoir
    ["Ice", "Ghost"], // Froslass
    ["Electric", "Ghost"], // Rotom
    ["Psychic"], // Uxie
    ["Psychic"], // Mesprit
    ["Psychic"], // Azelf
    ["Steel", "Dragon"], // Dialga
    ["Water", "Dragon"], // Palkia
    ["Fire", "Steel"], // Heatran
    ["Normal"], // Regigigas
    ["Ghost", "Dragon"], // Giratina (Altered Forme)
    ["Psychic"], // Cresselia
    ["Water"], // Phione
    ["Water"], // Manaphy
    ["Dark"], // Darkrai
    ["Grass"], // Shaymin (Land Forme)
    ["Normal"], // Arceus
    ["Psychic", "Fire"], // Victini
    ["Grass"], // Snivy
    ["Grass"], // Servine
    ["Grass"], // Serperior
    ["Fire"], // Tepig
    ["Fire", "Fighting"], // Pignite
    ["Fire", "Fighting"], // Emboar
    ["Water"], // Oshawott
    ["Water"], // Dewott
    ["Water", "Fighting"], // Samurott
    ["Normal"], // Patrat
    ["Normal"], // Watchog
    ["Normal"], // Lillipup
    ["Normal"], // Herdier
    ["Normal"], // Stoutland
    ["Dark"], // Purrloin
    ["Dark"], // Liepard
    ["Grass"], // Pansage
    ["Grass"], // Simisage
    ["Fire"], // Pansear
    ["Fire"], // Simisear
    ["Water"], // Panpour
    ["Water"], // Simipour
    ["Psychic"], // Munna
    ["Psychic"], // Musharna
    ["Normal", "Flying"], // Pidove
    ["Normal", "Flying"], // Tranquill
    ["Normal", "Flying"], // Unfezant
    ["Electric"], // Blitzle
    ["Electric"], // Zebstrika
    ["Rock"], // Roggenrola
    ["Rock"], // Boldore
    ["Rock"], // Gigalith
    ["Psychic", "Flying"], // Woobat
    ["Psychic", "Flying"], // Swoobat
    ["Ground"], // Drilbur
    ["Ground", "Steel"], // Excadrill
    ["Normal"], // Audino
    ["Fighting"], // Timburr
    ["Fighting"], // Gurdurr
    ["Fighting"], // Conkeldurr
    ["Water", "Ground"], // Tympole
    ["Water", "Ground"], // Palpitoad
    ["Water", "Ground"], // Seismitoad
    ["Fighting"], // Throh
    ["Fighting"], // Sawk
    ["Bug", "Grass"], // Sewaddle
    ["Bug", "Grass"], // Swadloon
    ["Bug", "Grass"], // Leavanny
    ["Bug", "Poison"], // Venipede
    ["Bug", "Poison"], // Whirlipede
    ["Bug", "Poison"], // Scolipede
    ["Grass", "Fairy"], // Cottonee
    ["Grass", "Fairy"], // Whimsicott
    ["Grass"], // Petilil
    ["Grass"], // Lilligant
    ["Water"], // Basculin (Red-Striped)
    ["Ground", "Dark"], // Sandile
    ["Ground", "Dark"], // Krokorok
    ["Ground", "Dark"], // Krookodile
    ["Fire"], // Darumaka
    ["Fire"], // Darmanitan (Standard)
    ["Grass"], // Maractus
    ["Bug", "Rock"], // Dwebble
    ["Bug", "Rock"], // Crustle
    ["Dark", "Fighting"], // Scraggy
    ["Dark", "Fighting"], // Scrafty
    ["Psychic", "Flying"], // Sigilyph
    ["Ghost"], // Yamask
    ["Ghost"], // Cofagrigus
    ["Water", "Rock"], // Tirtouga
    ["Water", "Rock"], // Carracosta
    ["Rock", "Flying"], // Archen
    ["Rock", "Flying"], // Archeops
    ["Poison"], // Trubbish
    ["Poison"], // Garbodor
    ["Dark"], // Zorua
    ["Dark"], // Zoroark
    ["Normal"], // Minccino
    ["Normal"], // Cinccino
    ["Psychic"], // Gothita
    ["Psychic"], // Gothorita
    ["Psychic"], // Gothitelle
    ["Psychic"], // Solosis
    ["Psychic"], // Duosion
    ["Psychic"], // Reuniclus
    ["Water", "Flying"], // Ducklett
    ["Water", "Flying"], // Swanna
    ["Ice"], // Vanillite
    ["Ice"], // Vanillish
    ["Ice"], // Vanilluxe
    ["Normal", "Grass"], // Deerling
    ["Normal", "Grass"], // Sawsbuck
    ["Electric", "Flying"], // Emolga
    ["Bug"], // Karrablast
    ["Bug", "Steel"], // Escavalier
    ["Grass", "Poison"], // Foongus
    ["Grass", "Poison"], // Amoonguss
    ["Water", "Ghost"], // Frillish
    ["Water", "Ghost"], // Jellicent
    ["Water"], // Alomomola
    ["Bug", "Electric"], // Joltik
    ["Bug", "Electric"], // Galvantula
    ["Grass", "Steel"], // Ferroseed
    ["Grass", "Steel"], // Ferrothorn
    ["Steel"], // Klink
    ["Steel"], // Klang
    ["Steel"], // Klinklang
    ["Electric"], // Tynamo
    ["Electric"], // Eelektrik
    ["Electric"], // Eelektross
    ["Psychic"], // Elgyem
    ["Psychic"], // Beheeyem
    ["Ghost", "Fire"], // Litwick
    ["Ghost", "Fire"], // Lampent
    ["Ghost", "Fire"], // Chandelure
    ["Dragon"], // Axew
    ["Dragon"], // Fraxure
    ["Dragon"], // Haxorus
    ["Ice"], // Cubchoo
    ["Ice"], // Beartic
    ["Ice"], // Cryogonal
    ["Bug"], // Shelmet
    ["Bug"], // Accelgor
    ["Ground", "Electric"], // Stunfisk (Standard)
    ["Fighting"], // Mienfoo
    ["Fighting"], // Mienshao
    ["Dragon"], // Druddigon
    ["Ground", "Ghost"], // Golett
    ["Ground", "Ghost"], // Golurk
    ["Dark", "Steel"], // Pawniard
    ["Dark", "Steel"], // Bisharp
    ["Normal"], // Bouffalant (Standard)
    ["Normal", "Flying"], // Rufflet (Standard)
    ["Normal", "Flying"], // Braviary (Standard)
    ["Dark", "Flying"], // Vullaby (Standard)
    ["Dark", "Flying"], // Mandibuzz (Standard)
    ["Fire"], // Heatmor (Standard)
    ["Bug", "Steel"], // Durant (Standard)
    ["Dark", "Dragon"], // Deino
    ["Dark", "Dragon"], // Zweilous
    ["Dark", "Dragon"], // Hydreigon
    ["Bug", "Fire"], // Larvesta
    ["Bug", "Fire"], // Volcarona
    ["Steel", "Fighting"], // Cobalion
    ["Rock", "Fighting"], // Terrakion
    ["Grass", "Fighting"], // Virizion
    ["Flying"], // Tornadus (Incarnate)
    ["Electric", "Flying"], // Thundurus (Incarnate)
    ["Dragon", "Fire"], // Reshiram
    ["Dragon", "Electric"], // Zekrom
    ["Ground", "Flying"], // Landorus (Incarnate)
    ["Dragon", "Ice"], // Kyurem (Standard)
    ["Water", "Fighting"], // Keldeo (Ordinary)
    ["Normal", "Psychic"], // Meloetta (Aria)
    ["Bug", "Steel"], // Genesect (Standard)
    ["Grass"], // Chespin
    ["Grass"], // Quilladin
    ["Grass", "Fighting"], // Chesnaught
    ["Fire"], // Fennekin
    ["Fire", "Psychic"], // Braixen
    ["Fire", "Psychic"], // Delphox
    ["Water"], // Froakie
    ["Water"], // Frogadier
    ["Water", "Dark"], // Greninja
    ["Normal"], // Bunnelby
    ["Normal", "Ground"], // Diggersby
    ["Normal", "Flying"], // Fletchling
    ["Fire", "Flying"], // Fletchinder
    ["Fire", "Flying"], // Talonflame
    ["Bug"], // Scatterbug
    ["Bug"], // Spewpa
    ["Bug", "Flying"], // Vivillon
    ["Fire", "Normal"], // Litleo
    ["Fire", "Normal"], // Pyroar
    ["Fairy"], // Flabébé
    ["Fairy"], // Floette
    ["Fairy"], // Florges
    ["Grass"], // Skiddo
    ["Grass"], // Gogoat
    ["Fighting"], // Pancham
    ["Fighting", "Dark"], // Pangoro
    ["Normal"], // Furfrou
    ["Psychic"], // Espurr
    ["Psychic"], // Meowstic
    ["Steel", "Ghost"], // Honedge
    ["Steel", "Ghost"], // Doublade
    ["Steel", "Ghost"], // Aegislash
    ["Fairy"], // Spritzee
    ["Fairy"], // Aromatisse
    ["Fairy"], // Swirlix
    ["Fairy"], // Slurpuff
    ["Dark", "Psychic"], // Inkay
    ["Dark", "Psychic"], // Malamar
    ["Rock", "Water"], // Binacle
    ["Rock", "Water"], // Barbaracle
    ["Poison", "Water"], // Skrelp
    ["Poison", "Dragon"], // Dragalge
    ["Water"], // Clauncher
    ["Water"], // Clawitzer
    ["Electric", "Normal"], // Helioptile
    ["Electric", "Normal"], // Heliolisk
    ["Rock", "Dragon"], // Tyrunt
    ["Rock", "Dragon"], // Tyrantrum
    ["Rock", "Ice"], // Amaura
    ["Rock", "Ice"], // Aurorus
    ["Fairy"], // Sylveon
    ["Fighting", "Flying"], // Hawlucha
    ["Electric", "Fairy"], // Dedenne
    ["Rock", "Fairy"], // Carbink
    ["Dragon"], // Goomy
    ["Dragon"], // Sliggoo
    ["Dragon"], // Goodra
    ["Steel", "Fairy"], // Klefki
    ["Ghost", "Grass"], // Phantump
    ["Ghost", "Grass"], // Trevenant
    ["Ghost", "Grass"], // Pumpkaboo (Average)
    ["Ghost", "Grass"], // Gourgeist (Average)
    ["Ice"], // Bergmite
    ["Ice"], // Avalugg
    ["Flying", "Dragon"], // Noibat
    ["Flying", "Dragon"], // Noivern
    ["Fairy"], // Xerneas
    ["Dark", "Flying"], // Yveltal
    ["Dragon", "Ground"], // Zygarde (50%)
    ["Rock", "Fairy"], // Diancie
    ["Psychic", "Ghost"], // Hoopa (Confined)
    ["Fire", "Water"], // Volcanion
    ["Grass", "Flying"], // Rowlet
    ["Grass", "Flying"], // Dartrix
    ["Grass", "Ghost"], // Decidueye
    ["Fire"], // Litten
    ["Fire"], // Torracat
    ["Fire", "Dark"], // Incineroar
    ["Water"], // Popplio
    ["Water"], // Brionne
    ["Water", "Fairy"], // Primarina
    ["Normal", "Flying"], // Pikipek
    ["Normal", "Flying"], // Trumbeak
    ["Normal", "Flying"], // Toucannon
    ["Normal"], // Yungoos
    ["Normal"], // Gumshoos
    ["Bug", "Electric"], // Grubbin
    ["Bug", "Electric"], // Charjabug
    ["Bug", "Electric"], // Vikavolt
    ["Fighting"], // Crabrawler
    ["Fighting", "Ice"], // Crabominable
    ["Flying", "Electric"], // Oricorio
    ["Bug", "Fairy"], // Cutiefly
    ["Bug", "Fairy"], // Ribombee
    ["Rock"], // Rockruff
    ["Rock"], // Lycanroc
    ["Water"], // Wishiwashi
    ["Water", "Poison"], // Mareanie
    ["Water", "Poison"], // Toxapex
    ["Ground"], // Mudbray
    ["Ground"], // Mudsdale
    ["Water", "Bug"], // Dewpider
    ["Water", "Bug"], // Araquanid
    ["Grass"], // Fomantis
    ["Grass"], // Lurantis
    ["Grass", "Fairy"], // Morelull
    ["Grass", "Fairy"], // Shiinotic
    ["Poison", "Fire"], // Salandit
    ["Poison", "Fire"], // Salazzle
    ["Normal", "Fighting"], // Stufful
    ["Normal", "Fighting"], // Bewear
    ["Grass"], // Bounsweet
    ["Grass"], // Steenee
    ["Grass"], // Tsareena
    ["Fairy"], // Comfey
    ["Normal", "Psychic"], // Oranguru
    ["Fighting"], // Passimian
    ["Bug", "Water"], // Wimpod
    ["Bug", "Water"], // Golisopod
    ["Ghost", "Ground"], // Sandygast
    ["Ghost", "Ground"], // Palossand
    ["Water"], // Pyukumuku
    ["Normal"], // Type: Null
    ["Normal"], // Silvally
    ["Rock", "Flying"], // Minior
    ["Normal"], // Komala
    ["Fire", "Dragon"], // Turtonator
    ["Electric", "Steel"], // Togedemaru
    ["Ghost", "Fairy"], // Mimikyu (Disguised)
    ["Water", "Psychic"], // Bruxish (Standard)
    ["Normal", "Dragon"], // Drampa (Standard)
    ["Ghost", "Grass"], // Dhelmise (Standard)
    ["Dragon"], // Jangmo-o
    ["Dragon", "Fighting"], // Hakamo-o
    ["Dragon", "Fighting"], // Kommo-o (Standard)
    ["Electric", "Fairy"], // Tapu Koko (Standard)
    ["Psychic", "Fairy"], // Tapu Lele (Standard)
    ["Grass", "Fairy"], // Tapu Bulu (Standard)
    ["Water", "Fairy"], // Tapu Fini (Standard)
    ["Psychic"], // Cosmog
    ["Psychic"], // Cosmoem
    ["Psychic", "Steel"], // Solgaleo (Standard)
    ["Psychic", "Ghost"], // Lunala (Standard)
    ["Rock", "Poison"], // Nihilego (Standard)
    ["Bug", "Fighting"], // Buzzwole (Standard)
    ["Bug", "Fighting"], // Pheromosa (Standard)
    ["Electric"], // Xurkitree (Standard)
    ["Steel", "Flying"], // Celesteela (Standard)
    ["Grass", "Steel"], // Kartana (Standard)
    ["Dark", "Dragon"], // Guzzlord (Standard)
    ["Psychic"], // Necrozma (Standard)
    ["Steel", "Fairy"], // Magearna (Standard)
    ["Fighting", "Ghost"], // Marshadow (Standard)
    ["Poison"], // Poipole
    ["Poison", "Dragon"], // Naganadel
    ["Rock", "Steel"], // Stakataka
    ["Fire", "Ghost"], // Blacephalon
    ["Electric"], // Zeraora
    ["Steel"], // Meltan
    ["Steel"], // Melmetal
    ["Grass"], // Grookey
    ["Grass"], // Thwackey
    ["Grass"], // Rillaboom
    ["Fire"], // Scorbunny
    ["Fire"], // Raboot
    ["Fire"], // Cinderace
    ["Water"], // Sobble
    ["Water"], // Drizzile
    ["Water"], // Inteleon
    ["Normal"], // Skwovet
    ["Normal"], // Greedent
    ["Flying"], // Rookidee
    ["Flying"], // Corvisquire
    ["Flying", "Steel"], // Corviknight
    ["Bug"], // Blipbug
    ["Bug", "Psychic"], // Dottler
    ["Bug", "Psychic"], // Orbeetle
    ["Dark"], // Nickit
    ["Dark"], // Thievul
    ["Grass"], // Gossifleur
    ["Grass"], // Eldegoss
    ["Normal"], // Wooloo
    ["Normal"], // Dubwool
    ["Water"], // Chewtle
    ["Water", "Rock"], // Drednaw
    ["Electric"], // Yamper
    ["Electric"], // Boltund
    ["Rock"], // Rolycoly
    ["Rock", "Fire"], // Carkol
    ["Rock", "Fire"], // Coalossal
    ["Grass", "Dragon"], // Applin
    ["Grass", "Dragon"], // Flapple
    ["Grass", "Dragon"], // Appletun
    ["Ground"], // Silicobra
    ["Ground"], // Sandaconda
    ["Flying", "Water"], // Cramorant (Gulping)
    ["Flying", "Water"], // Cramorant (Gorging)
    ["Water"], // Arrokuda
    ["Water"], // Barraskewda
    ["Electric"], // Toxel
    ["Electric", "Poison"], // Toxtricity (Amped)
    ["Electric", "Poison"], // Toxtricity (Low-Key)
    ["Fire", "Bug"], // Sizzlipede
    ["Fire", "Bug"], // Centiskorch
    ["Fighting"], // Clobbopus
    ["Fighting"], // Grapploct
    ["Ghost"], // Sinistea
    ["Ghost"], // Polteageist
    ["Psychic"], // Hatenna
    ["Psychic"], // Hattrem
    ["Psychic", "Fairy"], // Hatterene
    ["Dark", "Fairy"], // Impidimp
    ["Dark", "Fairy"], // Morgrem
    ["Dark", "Fairy"], // Grimmsnarl
    ["Dark", "Normal"], // Obstagoon
    ["Steel"], // Perrserker
    ["Ghost"], // Cursola
    ["Fighting"], // Sirfetch’d
    ["Ice", "Psychic"], // Mr. Rime
    ["Ground", "Ghost"], // Runerigus
    ["Fairy"], // Milcery
    ["Fairy"], // Alcremie
    ["Fighting"], // Falinks
    ["Electric"], // Pincurchin
    ["Ice", "Bug"], // Snom
    ["Ice", "Bug"], // Frosmoth
    ["Rock"], // Stonjourner
    ["Ice"], // Eiscue (Ice Face)
    ["Psychic", "Normal"], // Indeedee (Standard)
    ["Electric", "Dark"], // Morpeko (Full Belly)
    ["Electric", "Dark"], // Morpeko (Hangry)
    ["Steel"], // Cufant
    ["Steel"], // Copperajah
    ["Electric", "Dragon"], // Dracozolt
    ["Electric", "Ice"], // Arctozolt
    ["Water", "Dragon"], // Dracovish
    ["Water", "Ice"], // Arctovish
    ["Steel", "Dragon"], // Duraludon
    ["Dragon", "Ghost"], // Dreepy
    ["Dragon", "Ghost"], // Drakloak
    ["Dragon", "Ghost"], // Dragapult
    ["Fairy", "Steel"], // Zacian (Hero of Many Battles)
    ["Fighting", "Steel"], // Zamazenta (Hero of Many Battles)
    ["Poison", "Dragon"], // Eternatus
    ["Fighting"], // Kubfu
    ["Fighting", "Dark"], // Urshifu (Single Strike)
    ["Fighting", "Water"], // Urshifu (Rapid Strike)
    ["Dark", "Grass"], // Zarude
    ["Electric"], // Regieleki
    ["Dragon"], // Regidrago
    ["Ice"], // Glastrier
    ["Ghost"], // Spectrier
    ["Psychic", "Grass"], // Calyrex
    ["Psychic", "Ice"], // Calyrex (Ice Rider)
    ["Psychic", "Ghost"], // Calyrex (Shadow Rider)
    ["Normal", "Psychic"], // Wyrdeer
    ["Bug", "Rock"], // Kleavor
    ["Ground", "Normal"], // Ursaluna
    ["Water", "Ghost"], // Basculegion (Standard)
    ["Fighting", "Poison"], // Sneasler
    ["Dark", "Poison"], // Overqwil
    ["Fairy", "Flying"], // Enamorus (Incarnate)
    ["Fairy", "Flying"], // Enamorus (Therian)
    ["Grass"], // Sprigatito
    ["Grass"], // Floragato
    ["Grass", "Dark"], // Meowscarada
    ["Fire"], // Fuecoco
    ["Fire"], // Crocalor
    ["Fire", "Ghost"], // Skeledirge
    ["Water"], // Quaxly
    ["Water"], // Quaxwell
    ["Water", "Fighting"], // Quaquaval
    ["Normal"], // Lechonk
    ["Normal"], // Oinkologne
    ["Bug"], // Tarountula
    ["Bug"], // Spidops
    ["Bug"], // Nymble
    ["Bug", "Dark"], // Lokix
    ["Electric"], // Pawmi
    ["Electric", "Fighting"], // Pawmo
    ["Electric", "Fighting"], // Pawmot
    ["Normal"], // Tandemaus
    ["Normal"], // Maushold (Family of Four)
    ["Normal"], // Maushold (Family of Three)
    ["Fairy"], // Fidough
    ["Fairy"], // Dachsbun
    ["Grass", "Normal"], // Smoliv
    ["Grass", "Normal"], // Dolliv
    ["Grass", "Normal"], // Arboliva
    ["Normal", "Flying"], // Squawkabilly (Green)
    ["Normal", "Flying"], // Squawkabilly (Blue)
    ["Normal", "Flying"], // Squawkabilly (Yellow)
    ["Normal", "Flying"], // Squawkabilly (White)
    ["Rock"], // Nacli
    ["Rock"], // Naclstack
    ["Rock"], // Garganacl
    ["Fire"], // Charcadet
    ["Fire", "Psychic"], // Armarouge
    ["Fire", "Ghost"], // Ceruledge
    ["Electric"], // Tadbulb
    ["Electric"], // Bellibolt
    ["Electric", "Flying"], // Wattrel
    ["Electric", "Flying"], // Kilowattrel
    ["Dark"], // Maschiff
    ["Dark"], // Mabosstiff
    ["Poison", "Normal"], // Shroodle
    ["Poison", "Normal"], // Grafaiai
    ["Grass", "Ghost"], // Bramblin
    ["Grass", "Ghost"], // Brambleghast
    ["Ground", "Grass"], // Toedscool
    ["Ground", "Grass"], // Toedscruel
    ["Rock"], // Klawf
    ["Grass", "Fire"], // Capsakid
    ["Grass", "Fire"], // Scovillain
    ["Bug"], // Rellor
    ["Bug", "Psychic"], // Rabsca
    ["Psychic"], // Flittle
    ["Psychic"], // Espathra
    ["Fairy", "Steel"], // Tinkaton
    ["Water"], // Wiglett
    ["Water"], // Wugtrio
    ["Flying", "Dark"], // Bombirdier
    ["Water"], // Finizen
    ["Water"], // Palafin (Hero Forme)
    ["Steel", "Poison"], // Varoom
    ["Steel", "Poison"], // Revavroom
    ["Dragon", "Normal"], // Cyclizar
    ["Steel"], // Orthworm
    ["Rock", "Poison"], // Glimmet
    ["Rock", "Poison"], // Glimora
    ["Ghost"], // Greavard
    ["Ghost"], // Houndstone
    ["Flying", "Fighting"], // Flamigo
    ["Ice"], // Cetoddle
    ["Ice"], // Cetitan
    ["Water", "Psychic"], // Veluza
    ["Water"], // Dondozo
    ["Dragon", "Water"], // Tatsugiri
    ["Fighting", "Ghost"], // Annihilape
    ["Poison", "Ground"], // Clodsire
    ["Normal", "Psychic"], // Farigiraf
    ["Normal"], // Dudunsparce
    ["Dark", "Steel"], // Kingambit
    ["Ground", "Fighting"], // Great Tusk
    ["Fairy", "Psychic"], // Scream Tail
    ["Grass", "Dark"], // Brute Bonnet
    ["Ghost", "Fairy"], // Flutter Mane
    ["Bug", "Fighting"], // Slither Wing
    ["Electric", "Ground"], // Sandy Shocks
    ["Ground", "Steel"], // Iron Treads
    ["Ice", "Water"], // Iron Bundle
    ["Fighting", "Electric"], // Iron Hands
    ["Dark", "Flying"], // Iron Jugulis
    ["Fire", "Poison"], // Iron Moth
    ["Rock", "Electric"], // Iron Thorns
    ["Dragon", "Ice"], // Frigibax
    ["Dragon", "Ice"], // Arctibax
    ["Dragon", "Ice"], // Baxcalibur
    ["Ghost"], // Gimmighoul (Chest)
    ["Ghost"], // Gimmighoul (Roaming)
    ["Dark", "Grass"], // Wo-Chien
    ["Dark", "Fire"], // Chi-Yu
    ["Dark", "Ground"], // Ting-Lu
    ["Dark", "Ice"], // Chien-Pao
    ["Dragon", "Dark"], // Roaring Moon
    ["Fairy", "Fighting"], // Iron Valiant
    ["Water", "Dragon"], // Walking Wake
    ["Grass", "Psychic"], // Iron Leaves
    ["Grass"], // Ogerpon
    ["Dragon"], // Terapagos
];