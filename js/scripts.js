let pokemonRepository =(function(){
  let repository =[
  {
    name: "Bulbasaur",
    height: 0.7,
    abilities: ['Chlorophyll', 'Overgrow']
  },
  {
    name: "Sandslash",
    height: 1,
    abilities: ['Sand-veil', 'Sand-rush']
  },
  {
    name: "Paras",
    height: 0.3,
    abilities: ['Damp', 'Effect-spore']
  }
]

  function getAll () {
    return repository;
  }

  function add(pokemon) {
    repository.push(pokemon);
  }

  function showDetails(pokemon){
    console.log(pokemon.name)
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', showDetails);

  }



  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  }

})()

pokemonRepository.add({
  name: "Nidoking",
  height: 1.4,
  abilities: ['Poison', 'Force']
})
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})
