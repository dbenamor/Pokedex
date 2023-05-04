const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const formPokemon = document.querySelector('.form');
const inputPokemon = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);    

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }    
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';    
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id + ' -';
        pokemonImage.src = 
            data['sprites']
                ['versions']
                ['generation-v']
                ['black-white']
                ['animated']
                ['front_default'];
        
    inputPokemon.value = '';
    searchPokemon = data.id;
    } 
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

formPokemon.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputPokemon.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
 });

renderPokemon(searchPokemon);
