let pokemonRepository =(function(){
  let pokemonList =[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon){
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ){
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll () {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function (){
      showModal(pokemon);
    })
  }
/* pokemon Modal */

  function showModal(pokemon) {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.innerText= '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    let title = document.createElement('h1');
    title.innerText = pokemon.name;

    let pokemonPicture = document.createElement('img');
    pokemonPicture.src = pokemon.imageUrl;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innertext = "Height: " +pokemon.height;

    modal.appendChild(closeButtonElement);
    modal.appendChild(title);
    modal.appendChild(pokemonPicture);
    modal.appendChild(pokemonHeight);
    modalContainer.appendChild(modal)

    modalContainer.classList.add('is-visible');}

    document.querySelector('#show-modal').addEventListener('click', ()=>{
      showModal();
    })

    modalContainer.addEventListener('click', (e)=>{
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });


  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
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
          detailsUrl: item.url
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
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  }

})()

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


