// =============================================================
// script.js — Mon Dex Pokémon
// =============================================================

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

// =============================================================
// SELECT HTML ELEMENTS
// =============================================================

const grid = document.querySelector("#grid");
const searchInput = document.getElementById("search");
const filters = document.getElementById("filters");
const creatureForm = document.getElementById("creature-form");

const team = [];
const teamList = document.getElementById("team-list");
const teamCountDisplay = document.getElementById("team-count-display");

let selectedType = "Tous";

// =============================================================
// DISPLAY THE POKÉMON CARDS
// =============================================================

function displayCreatures(list = creatures) {
  if (!grid) {
    console.error("Cannot find the grid. Check the id in index.html.");
    return;
  }

  grid.innerHTML = list.map(function(creature) {
    const total =
      Number(creature.stats.hp) +
      Number(creature.stats.attack) +
      Number(creature.stats.defence);

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

        <button type="button" class="btn-outline add-to-team">
          Ajouter à l'équipe
        </button>

        <button
          type="button"
          class="delete-btn rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
        >
          Supprimer
        </button>

      </article>
    `;
  }).join("");
}

// =============================================================
// SEARCH AND FILTER POKÉMON TOGETHER
// =============================================================

function displayFilteredCreatures() {
  const searchText = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const filteredCreatures = creatures.filter(function(creature) {
    const matchesName = creature.name.toLowerCase().includes(searchText);

    const matchesType =
      selectedType === "Tous" || creature.type === selectedType;

    return matchesName && matchesType;
  });

  displayCreatures(filteredCreatures);
}

// =============================================================
// FILTER BUTTONS
// =============================================================

if (filters) {
  filters.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button || !filters.contains(button)) {
      return;
    }

    selectedType = button.textContent.trim();

    displayFilteredCreatures();
  });
}

// =============================================================
// LIVE SEARCH
// =============================================================

if (searchInput) {
  searchInput.addEventListener("input", function() {
    displayFilteredCreatures();
  });
}

// =============================================================
// DISPLAY THE TEAM
// =============================================================

function displayTeam() {
  if (!teamList) return;

  teamList.innerHTML = team.map(function(pokemon) {
    return `
      <div class="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm">

        <div class="flex items-center gap-3">
          <img
            src="${pokemon.image}"
            alt="${pokemon.name}"
            class="h-14 w-14 object-contain"
          >

          <div>
            <p class="font-semibold">${pokemon.name}</p>
            <p class="text-sm text-muted">${pokemon.type}</p>
          </div>
        </div>

        <button
          type="button"
          class="remove-from-team rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
          data-id="${pokemon.id}"
        >
          Retirer
        </button>

      </div>
    `;
  }).join("");

  if (teamCountDisplay) {
    teamCountDisplay.textContent = `${team.length}/6`;
  }
}

// =============================================================
// CARD CLICKS: ADD, DELETE OR SHOW DETAILS
// =============================================================

if (grid) {
  grid.addEventListener("click", function(event) {

    // Add a Pokémon to the team
    const addButton = event.target.closest(".add-to-team");

    if (addButton) {
      const card = addButton.closest("article");

      if (!card) return;

      const id = card.dataset.id;

      const pokemon = creatures.find(function(creature) {
        return String(creature.id) === id;
      });

      if (!pokemon) return;

      // Prevent duplicates
      if (team.some(function(member) {
        return member.id === pokemon.id;
      })) {
        alert("Ce Pokémon est déjà dans votre équipe.");
        return;
      }

      // Maximum of 6 Pokémon
      if (team.length >= 6) {
        alert("Votre équipe est complète : 6 Pokémon maximum.");
        return;
      }

      team.push(pokemon);
      displayTeam();
      return;
    }

    // Delete a Pokémon from the Dex
    const deleteButton = event.target.closest(".delete-btn");

    if (deleteButton) {
      const card = deleteButton.closest("article");

      if (!card) return;

      const id = card.dataset.id;

      const index = creatures.findIndex(function(creature) {
        return String(creature.id) === id;
      });

      if (index !== -1) {
        const deletedPokemon = creatures[index];

        creatures.splice(index, 1);

        // Also remove the Pokémon from the team if necessary
        const teamIndex = team.findIndex(function(member) {
          return member.id === deletedPokemon.id;
        });

        if (teamIndex !== -1) {
          team.splice(teamIndex, 1);
          displayTeam();
        }

        displayFilteredCreatures();
      }

      return;
    }

    // Show Pokémon details when the card is clicked
    const card = event.target.closest("article");

    if (!card) return;

    // Do not open details when clicking a button
    if (event.target.closest("button")) return;

    const id = card.dataset.id;

    const pokemon = creatures.find(function(creature) {
      return String(creature.id) === id;
    });

    if (pokemon) {
      const detailName = document.getElementById("detail-name");
      const detailImage = document.getElementById("detail-image");

      if (detailName) {
        detailName.textContent = pokemon.name;
      }

      if (detailImage) {
        detailImage.innerHTML = `
          <img
            src="${pokemon.image}"
            alt="${pokemon.name}"
            class="h-40 w-40 object-contain"
          >
        `;
      }
    }
  });
}

// =============================================================
// REMOVE A POKÉMON FROM THE TEAM
// Event delegation: one listener for the whole team
// =============================================================

if (teamList) {
  teamList.addEventListener("click", function(event) {
    const removeButton = event.target.closest(".remove-from-team");

    if (!removeButton) return;

    const id = removeButton.dataset.id;

    const index = team.findIndex(function(pokemon) {
      return String(pokemon.id) === id;
    });

    if (index !== -1) {
      team.splice(index, 1);
      displayTeam();
    }
  });
}

// =============================================================
// FORM VALIDATION
// =============================================================

// Find the error message associated with a field
function getErrorElement(field) {
  const label = field.closest("label");

  if (label) {
    const error = label.querySelector(".error-message");
    if (error) return error;
  }

  const parent = field.parentElement;

  return parent ? parent.querySelector(".error-message") : null;
}

// Display an error or success border
function showFieldResult(field, message) {
  const errorElement = getErrorElement(field);

  field.classList.remove("border-red-500", "border-green-500");

  if (message) {
    field.classList.add("border-red-500");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }
  } else {
    field.classList.add("border-green-500");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }
  }
}

// Check the value of one field
function validateField(field) {
  const value = field.value.trim();
  const name = field.name;
  let message = "";

  if (!value) {
    message = "Ce champ est obligatoire.";
  } else {
    switch (name) {
      case "id":
        if (!/^#\d{3}$/.test(value)) {
          message = "L'identifiant doit respecter le format #001.";
        } else if (creatures.some(function(creature) {
          return creature.id === value;
        })) {
          message = "Cet identifiant existe déjà.";
        }
        break;

      case "name":
        if (!/^[A-Za-zÀ-ÿ0-9 '\-]{2,30}$/.test(value)) {
          message = "Le nom doit contenir entre 2 et 30 caractères valides.";
        }
        break;

      case "type": {
        const allowedTypes = [
          "Feu",
          "Eau",
          "Plante",
          "Électrik",
          "Glace",
          "Ténèbres"
        ];

        if (!allowedTypes.includes(value)) {
          message = "Veuillez choisir un type valide.";
        }
        break;
      }

      case "level":
        if (!/^[A-Za-zÀ-ÿ0-9 '\-]{2,20}$/.test(value)) {
          message = "Le niveau doit contenir entre 2 et 20 caractères.";
        }
        break;

      case "stat1":
      case "stat2":
      case "stat3":
        if (!/^\d{1,3}$/.test(value) || Number(value) > 999) {
          message = "Entrez un nombre entier entre 0 et 999.";
        }
        break;

      case "image":
        try {
          const imageURL = new URL(value);

          if (
            imageURL.protocol !== "http:" &&
            imageURL.protocol !== "https:"
          ) {
            message = "Utilisez une adresse d'image HTTP ou HTTPS valide.";
          }
        } catch {
          message = "Veuillez entrer une URL d'image valide.";
        }
        break;

      case "description":
        if (value.length < 3 || value.length > 300) {
          message = "La description doit contenir entre 3 et 300 caractères.";
        }
        break;
    }
  }

  showFieldResult(field, message);

  return message === "";
}

// Validate fields when the user leaves them
if (creatureForm) {
  const formFields = creatureForm.querySelectorAll(
    "input[name], select[name], textarea[name]"
  );

  formFields.forEach(function(field) {
    field.addEventListener("blur", function() {
      validateField(field);
    });

    field.addEventListener("input", function() {
      if (field.classList.contains("border-red-500")) {
        validateField(field);
      }
    });

    field.addEventListener("change", function() {
      if (field.classList.contains("border-red-500")) {
        validateField(field);
      }
    });
  });

  // Add a new Pokémon using the form
  creatureForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let formIsValid = true;

    formFields.forEach(function(field) {
      if (!validateField(field)) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      alert("Veuillez corriger les champs signalés avant de continuer.");
      return;
    }

    const formData = new FormData(creatureForm);

    const id = String(formData.get("id")).trim();
    const name = String(formData.get("name")).trim();
    const type = String(formData.get("type")).trim();
    const level = String(formData.get("level")).trim();

    const stat1 = String(formData.get("stat1")).trim();
    const stat2 = String(formData.get("stat2")).trim();
    const stat3 = String(formData.get("stat3")).trim();

    const image = String(formData.get("image")).trim();
    const description = String(formData.get("description")).trim();

    // Create the new Pokémon
    const newCreature = {
      id: id,
      name: name,
      type: type,
      level: level,

      stats: {
        hp: Number(stat1),
        attack: Number(stat2),
        defence: Number(stat3)
      },

      image: image,
      description: description
    };

    creatures.push(newCreature);

    displayFilteredCreatures();
    creatureForm.reset();

    // Clear validation borders and messages after resetting
    formFields.forEach(function(field) {
      field.classList.remove("border-red-500", "border-green-500");

      const errorElement = getErrorElement(field);

      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
      }
    });

    alert("Créature ajoutée avec succès !");
  });
}

// =============================================================
// INITIAL DISPLAY
// =============================================================

displayCreatures();
displayTeam();