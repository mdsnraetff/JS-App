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
//Pokemon Forloop//
for (let i=0; i < pokemonList.length; i++)
  if(pokemonList[i]){
    document.write(pokemonList[i].name)
  }
