const createCard = (pokemon) => {
    const cards = document.querySelector(".container .cards");

    let tipos = "";
    let tipo = "";
    let tipo_base = pokemon.types[0].type.name;

    for(let i = 0; i < pokemon.types.length; i++) {
        tipo = pokemon.types[i].type.name;
        tipos += `<li class="${tipo}">${tipo}</li>`;
    }

    cards.innerHTML += `
        <div class="card ${tipo_base}">
            <span class="id ${tipo_base}">#${pokemon.id}</span>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="" class="photo">
            <span class="name ${tipo_base}">${pokemon.name}</span>
            <ul class="list_types">
                ${tipos}
            </ul>
        </div>
    `;
}
const getPokemon = pokeID => {
    const limit = 600;
    const ajax = new XMLHttpRequest();

    ajax.open("get", "https://pokeapi.co/api/v2/pokemon/" + pokeID);
    ajax.send();

    ajax.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200) {
            pokemonCarregado = true;
            let pokemon = JSON.parse(this.responseText);
            createCard(pokemon);
            if (pokeID < limit) {
                pokeID++;
                getPokemon(pokeID);
            }
        }
    }
}

getPokemon(1);