const cache = {};
let currentPokemon = null;

document.getElementById("searchBtn").addEventListener("click", () => {
    const input = document.getElementById("pokemonInput").value.toLowerCase().trim();
    if (!input) return;
    fetchPokemon(input);
});

function fetchPokemon(name) {

    // Check cache first
    if (cache[name]) {
        displayPokemon(cache[name]);
        return;
    }

    fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(res => {
            if (!res.ok) throw new Error("Not found");
            return res.json();
        })
        .then(data => {
            cache[name] = data; // store in cache
            displayPokemon(data);
        })
        .catch(() => {
            alert("Pokemon not found");
        });
}

function displayPokemon(data) {

    currentPokemon = data;

    document.getElementById("pokemonImage").src =
        data.sprites.front_default;

    if (data.cries && data.cries.latest) {
        document.getElementById("pokemonAudio").src =
            data.cries.latest;
    }

    const selects = ["move1", "move2", "move3", "move4"];

    selects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = "";

        data.moves.forEach(moveObj => {
            const option = document.createElement("option");
            option.value = moveObj.move.name;
            option.textContent = moveObj.move.name;
            select.appendChild(option);
        });
    });
}

document.getElementById("addBtn").addEventListener("click", () => {

    if (!currentPokemon) return;

    const teamDiv = document.getElementById("team");

    const member = document.createElement("div");
    member.className = "team-member";

    const img = document.createElement("img");
    img.src = currentPokemon.sprites.front_default;

    const moveList = document.createElement("ul");

    for (let i = 1; i <= 4; i++) {
        const li = document.createElement("li");
        li.textContent =
            document.getElementById("move" + i).value;
        moveList.appendChild(li);
    }

    member.appendChild(img);
    member.appendChild(moveList);

    teamDiv.appendChild(member);
});
