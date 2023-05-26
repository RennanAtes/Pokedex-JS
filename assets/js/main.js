let offset = 0;
const limit = 10;
const url= `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                
            </li>
    `
}


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        pokemonOl.innerHTML += pokemonList.map(convertPokemonToLi).join('')
    })
}
loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecords){
        const newLimit = qtdRecord - maxRecords
        loadPokemonItens(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset,limit)
    }
})


