document.querySelectorAll(".answer").forEach((button) => {
  button.addEventListener("click", function () {
    this.parentNode.querySelectorAll(".answer").forEach((btn) => btn.classList.remove("selected"));
    this.classList.add("selected");
  });
});

document.getElementById("submit").addEventListener("click", function () {
  const selectedAnswers = document.querySelectorAll(".answer.selected");
  if (selectedAnswers.length === 6) {
    let typeScores = {
      fire: 0,
      water: 0,
      grass: 0,
      electric: 0,
      flying: 0,
      ground: 0,
      bug: 0,
      ghost: 0,
      dragon: 0,
    };
    // Trying to calculate scores
    selectedAnswers.forEach((answer, index) => {
      if (answer.dataset.answer === "true") {
        switch (index) {
          case 0: // Prefer daylight water, ground, fire, flying, bug else: electric, ghost, dragon
            typeScores["fire"] += 1;
            typeScores["water"] += 1;
            typeScores["ground"] += 1;
            typeScores["flying"] += 1;
            typeScores["bug"] += 1;
            typeScores["grass"] += 1;
            break;
          case 1: // Likes water water, grass, ground  else: fire, electric, flying
            typeScores["water"] += 1;
            typeScores["grass"] += 1;
            typeScores["ground"] += 1;
            typeScores["dragon"] += 1;
            break;
          case 2: // Good at cold
            typeScores["water"] += 1;
            typeScores["ground"] += 1;
            typeScores["flying"] += 1;
            typeScores["ghost"] += 1;
            typeScores["dragon"] += 1;
            break;
          case 3: // heights
            typeScores["electric"] += 1;
            typeScores["flying"] += 1;
            typeScores["bug"] += 1;
            typeScores["ghost"] += 1;
            typeScores["dragon"] += 1;
            break;
          case 4: // fantasy
            typeScores["fire"] += 1;
            typeScores["electric"] += 1;
            typeScores["flying"] += 1;
            typeScores["ghost"] += 1;
            typeScores["dragon"] += 1;
            break;

          case 5: // like pokemon
            typeScores["water"] += 1;
            typeScores["grass"] += 1;
            typeScores["ground"] += 1;
            typeScores["fire"] += 1;
            typeScores["electric"] += 1;
            typeScores["flying"] += 1;
            typeScores["bug"] += 1;
            typeScores["ghost"] += 1;
            typeScores["dragon"] += 1;
            break;
        }
      } else {
        switch (index) {
          case 0: // Prefer daylight water, ground, fire, flying, bug else: electric, ghost, dragon
            typeScores["electric"] += 1;
            typeScores["ghost"] += 1;
            typeScores["dragon"] += 1;
            break;
          case 1: // Likes water water, grass, ground  else: fire, electric, flying
            typeScores["fire"] += 1;
            typeScores["electric"] += 1;
            typeScores["flying"] += 1;
            typeScores["bug"] += 1;
            typeScores["ghost"] += 1;
            break;
          case 2: // Good at cold
            typeScores["grass"] += 1;
            typeScores["fire"] += 1;
            typeScores["electric"] += 1;
            typeScores["bug"] += 1;
            break;
          case 3: // heights
            typeScores["water"] += 1;
            typeScores["grass"] += 1;
            typeScores["ground"] += 1;
            typeScores["fire"] += 1;
            break;
          case 4: // fantasy
            typeScores["water"] += 1;
            typeScores["grass"] += 1;
            typeScores["ground"] += 1;
            typeScores["bug"] += 1;
            break;

          case 5: // like pokemon
            break;
        }
      }
    });

    let maxType = Object.keys(typeScores).reduce((a, b) => (typeScores[a] > typeScores[b] ? a : b));
    console.log(typeScores);
    console.log(maxType);
    // Fetch the pokemons from the maxType
    fetch(`https://pokeapi.co/api/v2/type/${maxType}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonList = data.pokemon;
        const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)].pokemon;
        return fetch(randomPokemon.url);
      })
      .then((response) => response.json())
      .then((data) => {
        const pokemonImage = data.sprites.front_default;
        const pokemonName = data.name;
        const pokemonSpeciesUrl = data.species.url;
        const pokemonType = data.types[0].type.name;
        console.log(pokemonType);

        // Fetch the species description
        fetch(pokemonSpeciesUrl)
          .then((response) => response.json())
          .then((speciesData) => {
            const speciesDescription = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en").flavor_text;

            document.getElementById("pokemonName").textContent = `Name: ${pokemonName}`;
            document.getElementById("pokemonImage").src = pokemonImage;
            document.getElementById("pokemonImage").alt = `${pokemonName} image`;
            document.getElementById("pokemonType").textContent = `Type: ${pokemonType}`;
            document.getElementById("pokemonDescription").textContent = `Description: ${speciesDescription}`; // Display species description
            document.getElementById("result").style.display = "block";
          })
          .catch((error) => {
            console.error("Error fetching species data: ", error);
            alert("Failed to fetch Pokemon species details. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data: ", error);
        alert("Failed to fetch Pokemon. Please try again.");
      });
  } else {
    alert("Please answer all questions before submitting.");
  }
});
