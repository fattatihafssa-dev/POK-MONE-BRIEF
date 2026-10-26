const creatures = [
  {
    id: "#001",
    name: "Guzzlord",
    type: "Feu",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/guzzlord.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#002",
    name: "Tidalix",
    type: "Eau",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png",
    description: "Une courte description de la créature."
  },
  {
    id: "#003",
    name: "Salazzle",
    type: "Plante",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/salazzle.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#004",
    name: "Weavile",
    type: "Électrik",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/weavile.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#005",
    name: "Salandit",
    type: "Glace",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/salandit.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#006",
    name: "Zekrom",
    type: "Ténèbres",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/zekrom.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#007",
    name: "Darkrai",
    type: "Feu",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/darkrai.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#008",
    name: "Xurkitree",
    type: "Eau",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/xurkitree.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#009",
    name: "Snorlax",
    type: "Plante",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/snorlax.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#010",
    name: "Houdour",
    type: "Électrik",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/houndour.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#011",
    name: "Sneasel",
    type: "Glace",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/sneasel.avif",
    description: "Une courte description de la créature."
  },
  {
    id: "#012",
    name: "Giratina",
    type: "Ténèbres",
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://pokemon.gishan.cc/static/i/p/2x/giratina-altered.avif",
    description: "Une courte description de la créature."
  }
];
 const grid = document.querySelector("#grid");

 const searchInput = document.getElementById("search"); 

 const filters = document.getElementById("filters");
 
 const creatureForm = document.getElementById("creature-form");

     let selectedType = "Tous";

function displayCreatures(list = creatures) {
    
  if (!grid) {
    console.error("Cannot find the grid. Check the id in index.html.");
    return;
  }

  grid.innerHTML = list.map(creature => {
    const total = creature.stats.hp
      + creature.stats.attack
      + creature.stats.defence;

    return `
      <article data-id="${creature.id}" class="flex min-w-0 flex-col gap-4 rounded-card bg-white p-4 pb-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

  <div class="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-brand-light">
    <img
      src="${creature.image}"
      alt="${creature.name}"
      class="h-24 w-24 object-contain"
    >

    <span class="absolute left-3 top-2 font-mono text-sm text-muted">
      ${creature.id}
    </span>
  </div>

        <div class="flex items-center justify-between gap-2">
          <h3 class="font-display text-xl font-semibold">
            ${creature.name}
          </h3>
          <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">
            ${creature.type}
          </span>
        </div>

        <p class="text-sm text-muted">
          ${creature.level} · Total ${total}
        </p>

        <button type="button" class="btn-outline">
          Ajouter à l'équipe
        </button>

      </article>
    `;
  }).join("");
}

    
function displayFilteredCreatures() {
    const searchText = searchInput.value.toLowerCase();

    const filteredCreatures = creatures.filter(function(creature) {
        const matchesName = creature.name.toLowerCase().includes(searchText);

        const matchesType =
            selectedType === "Tous" || creature.type === selectedType;

        return matchesName && matchesType;
    });

    displayCreatures(filteredCreatures);
}

filters.addEventListener("click", function(event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    }

    selectedType = event.target.textContent.trim();

    displayFilteredCreatures();
});


displayCreatures();
searchInput.addEventListener("input", function() {
    displayFilteredCreatures();
});
displayCreatures();

searchInput.addEventListener("input", function() {
    displayFilteredCreatures();
});

grid.addEventListener("click", function(event) {
    const card = event.target.closest("article");

    if (card) {
        const id = card.dataset.id;

        const pokemon = creatures.find(function(creature) {
            return String(creature.id) === id;
        });

        if (pokemon) {
            document.getElementById("detail-name").textContent = pokemon.name;

            document.getElementById("detail-image").innerHTML = `
                <img
                    src="${pokemon.image}"
                    alt="${pokemon.name}"
                    class="h-40 w-40 object-contain"
                >
            `;
        }
    }
});
   

    

grid.addEventListener("click", function(event) {
    const card = event.target.closest("article");

    if (card) {
        const id = card.dataset.id;

        const pokemon = creatures.find(function(creature) {
            return String(creature.id) === id;
        });

        if (pokemon) {
            document.getElementById("detail-name").textContent = pokemon.name;

            document.getElementById("detail-image").innerHTML = `
                <img
                    src="${pokemon.image}"
                    alt="${pokemon.name}"
                    class="h-40 w-40 object-contain"
                >
            `;
        }
    }
});
