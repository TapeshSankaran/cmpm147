const fillers = {
  hero: ["Hero", "Soldier", "Citizen", "Fellow", "Champion", "$adventurer and $adventurer", "Chosen One"],
  pre: ["council", "house", "delegation", "corporation", "gathering", "conclave"],
  post: ["wizards", "ninjas", "lords","overseers", "appraisers", "old men", "CEO's"],
  help: ["protect", "aid", "assist", "safeguard", "shield", "preserve"],
  place: ["realms", "cities", "United States", "world", "land of liberty", "wallets", "countries", "people"],
  looty: ["gleaming", "valuable", "esteemed", "rare", "exalted", "scintillating", "kinda gross but still usefull", "complete garbage"],
  loots: ["power", "ability", "potential", "powers", "forces"],
  baddies: ["7 Deadly Sins", "$pre of destruction", "Hellish Bunch", "Evil One", "Cult of Antipowers", "Agents of Chaos", "Sudominian Mafia"],
  powery: ["Radiant", "Abyssal", "Vengeful", "Ethereal", "Majestic", "Merciless", "Eternal", "Savage", "Celestial", "Luminous", "Unyielding", "Fiery", "Frostbitten", "Ancient", "Cursed", "Lethal", "Divine", "Sinister", "Mystical", "Chaotic"],
  powers: ["Time Manipulation", "Invisibility", "Telekinesis", "Shapeshifting", "Elemental Control", "Healing Touch", "Teleportation", "Mind Reading", "Energy Absorption", "Super Strength", "Flight", "Illusion Creation", "Dimensional Travel", "Weather Manipulation", "Technomancy", "Gravity Control", "Sound Manipulation", "Reality Warping", "Summoning", "Foresight", "Chronoportation", 
           "Subatomic Manipulation", "Chronoception", "Bio-mimicry", "Tactile Teleportation", "Psychic Fabrication", "Dreamwalking", "Biokinesis", "Voidwalking", "Transmutation", "Memory Manipulation", "Precognition", "Soundscaping", "Aura Reading","Shadowmancy", "Quantum Tunneling", "Dreamweaving", "Linguistic Enchantment", "Lightbending", "Molecular Densification"]
};

const template = `Hello $hero,
I am the last of the $pre of $post, sworn to $help the $place from the $baddies.\n
But I have grown weak and seek a $hero to inherit my $looty $loots. My $loots are $powery $powers.
\n\n
Do you accept?
`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);
}

/* global clicker */
$("#clicker").click(generate);

generate();
