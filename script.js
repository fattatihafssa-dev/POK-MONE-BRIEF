
const creatures = [
  {
    id: "#001",
    name: "Emberkit",
    type: "Feu",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png",
    total: 309
  },
  {
    id: "#002",
    name: "Tidalix",
    type: "Eau",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png",
    total: 314
  },
  {
    id: "#003",
    name: "Mossling",
    type: "Plante",
    image: "https://static.vecteezy.com/system/resources/previews/054/749/917/non_2x/bulbasaur-pokemon-character-free-vector.jpg",
    total: 318
  },
  {
    id: "#004",
    name: "Voltmaw",
    type: "Électrik",
    image: "https://images.immediate.co.uk/production/volatile/sites/3/2024/05/Untitled-design-73-f8023d0.png",
    total: 405
  },
  {
    id: "#005",
    name: "Frostail",
    type: "Glace",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/471.png",
    total: 420
  },
  {
    id: "#006",
    name: "Mossling 2",
    type: "Plante",
    image: "https://static.vecteezy.com/system/resources/previews/054/749/917/non_2x/bulbasaur-pokemon-character-free-vector.jpg",
    total: 420
  }
];

const grid = document.querySelector("#grid");

function displayCreatures() {
  if (!grid) {
    console.error('Cannot find the grid. Check the id in index.html.');
    return;
  }

  grid.innerHTML = "";

  creatures.forEach(creature => {
    grid.innerHTML += `
      <article class="flex min-w-0 flex-col gap-3 rounded-card bg-white p-4 shadow-sm">
      <div class="flex h-40 items-center justify-center rounded-xl bg-brand-light">
    <img
      src="${creature.image}"
      alt="${creature.name}"
      class="h-24 w-24 object-contain sm:h-28 sm:w-28"
    >
  </div>
</article>
    `;
  });
}

displayCreatures();
