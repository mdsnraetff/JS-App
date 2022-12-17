let pokemonRepository =(function(){
  let pokemonList =[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonListElement = $('.pokemon-list');

  function add(pokemon){
    pokemonList.push(pokemon);
  
  
    /*  if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ){
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
*/
  }
  function getAll () {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }


  function addListItem(pokemon) {
    let listItem = $('<li class="list-group-item"></li>');
    let button = $('<button class="pokemon-button btn btn-warning" data target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');
    listItem.append(button);
    pokemonListElement.append(listItem);
    button.on('click', function(){
      showDetails(pokemon);
    });
  } 
}


   /* let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });

  }*/


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

  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function (){
      showDetailsModal(pokemon);
    })
  }
/* pokemon Modal */

  function showDetailsModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
   // let modalContainer = document.querySelector('#modal-container');
   // modalContainer.innerText= '';

   // let modal = document.createElement('div');
   // modal.classList.add('modal');

   modalTitle.empty();
   modalBody.empty();

  //  let closeButtonElement = document.createElement('button');
  //  closeButtonElement.classList.add('modal-close');
  //  closeButtonElement.innerText = 'Close';
  //  closeButtonElement.addEventListener('click', hideModal);

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");

    let pokemonPicture = $('<img class="pokemon-img" src="' + pokemon.imageUrl +'"/>');

    let typesElement = $("<p>" + "Types: " + pokemon.types + "</p>");


    modalTitle.append(pokemonName);
    modalBody.append(typesElement);
    modalBody.append(pokemonPicture);
    modalBody.append(pokemonHeight);
    
   // modal.appendChild(closeButtonElement);
   // modal.appendChild(titleElement);
   // modal.appendChild(pokemonPicture);
   // modal.appendChild(pokemonHeight);
   // modalContainer.appendChild(modal);

   // modalContainer.classList.add('is-visible');

  //  function hideModal (){
  //  let modalContainer = document.querySelector('#modal-container');
  //    modalContainer.classList.remove('is-visible');
  //  }

  //  modalContainer.addEventListener('click', (e)=>{
  //    let target = e.target;
  //    if (target === modalContainer) {
  //      hideModal();
  //    }
  //  })

  //  window.addEventListener('keydown', (e) => {
  //    let modalContainer = document.querySelector('#modal-container');
  //    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //      hideModal();
  //    }
  //  });
  //}



  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,

  }

})()

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});




