let pokemonRepository =(function(){
  let pokemonList =[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonListElement = $('.pokemon-list');

  function getAll () {
    return pokemonList;
  }
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function addListItem(pokemon) {
    let listItem = $('<li class="list-group-item"></li>');
    let button = $('<button class="pokemon-button btn btn-light" data-target="#modal-container" data-toggle="modal">' + pokemon.name + '</button>');
    listItem.append(button);
    pokemonListElement.append(listItem);
    button.on('click', function(){
      showDetails(pokemon);
    });
  } 
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map((type)=> type.type.name);
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon){
    loadDetails(pokemon).then(function (){
      showDetailsModal(pokemon);
    })
  }

/* pokemon Modal */

  function showDetailsModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
   modalTitle.empty();
   modalBody.empty();
    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let pokemonName = $('<h1>' + pokemon.name + '</h1>');

    let pokemonPicture = $('<img class="pokemon-img" src="' + pokemon.imageUrl +'"/>');

    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    modalTitle.append(pokemonName);
    modalBody.append(typesElement);
    modalBody.append(pokemonPicture);
    modalBody.append(pokemonHeight);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,

  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



