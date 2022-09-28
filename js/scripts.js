
let pokemonList = [
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
];

pokemonList.forEach(function(pokemon){
  if(pokemon.height > 0.7){
    document.write(pokemon.name + ' (height: '+ pokemon.height + ') - What a big guy!' + '<br>')
  }
  else {
    document.write(pokemon.name + ' (height: '+ pokemon.height+ ') <br>')
  }
})

//Pokemon Forloop// Older code - saving just in case
// for (let i=0; i < pokemonList.length; i++)
//  if(pokemonList[i].height > 0.7){
//    document.write(pokemonList[i].name+' ' + '(height: ' + pokemonList[i].height + ') - What a big guy!' + '<br>');
//  }
//  else {
//    document.write(pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')<br>');
//  }
