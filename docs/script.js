function searchNameNumber() {
  var identifier = document.getElementById("userInput").value;
  identifier = identifier.toLowerCase();
  var reqUrl = "https://pokeapi.co/api/v2/pokemon/" + identifier;

  fetch(reqUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const pokemon = {
        name: data.name,
        id: data.id,
        sprite: data.sprites["front_default"],
        spriteShiny: data.sprites["front_shiny"],
        type: data.types.map((type) => type.type.name).join(", "),
      };
      console.log(pokemon);

      document.getElementById("sprite").src = pokemon.sprite;
      document.getElementById("spriteShiny").src = pokemon.spriteShiny;
      document.getElementById("name").innerHTML = "Name: " + pokemon.name;
      document.getElementById("idNum").innerHTML = "PokeDex ID: " + pokemon.id;
      document.getElementById("type").innerHTML = "Type: " + pokemon.type;
      document.getElementById("nameShiny").innerHTML = "Name: " + pokemon.name;
      document.getElementById("idNumShiny").innerHTML =
        "PokeDex ID: " + pokemon.id;
      document.getElementById("typeShiny").innerHTML = "Type: " + pokemon.type;
    })
    .catch((error) => console.log("ERROR"));
}

function searchType(type) {
  // var identifier = document.getElementById("userInput").value;
  // identifier = identifier.toLowerCase();
  document.getElementById('mylist').innerHTML = "";

  var reqUrl = `https://pokeapi.co/api/v2/type/${type}/`;
  
  fetch(reqUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.pokemon);
      let i = 0
      let toAdd = document.createDocumentFragment();
      let pokeArray = [];
      data.pokemon.forEach(poke =>{
          //ensures no intangibles pokemons arise, e.g 'pikachu-mega'
          if(poke.pokemon.name.indexOf('-')<1){
              pokeArray.push(poke.pokemon.name)
          }
      })
      pokeArray = pokeArray.sort();
      console.log(pokeArray)
      pokeArray.forEach(poke =>{
          console.log(poke)
          let newDiv = document.createElement('div');
          newDiv.id = 'r'+i
          i++;
          newDiv.className='pokemonEntry';
          fetch("https://pokeapi.co/api/v2/pokemon/" + poke)
          .then((res) =>{
              return res.json();
          })
          .then((data) =>{
              let statString = document.createElement('ul');
              statString.className='stats';
              let hp_stat = document.createElement('li');
              hp_stat.className='hp'
              hp_stat.innerHTML = `${data.stats[1].base_stat}`
              let attack_stat = document.createElement('li')
              attack_stat.className='attack'
              attack_stat.innerHTML = `${data.stats[2].base_stat}`
              let defense_stat = document.createElement('li');
              defense_stat.className='defense'
              defense_stat.innerHTML = `${data.stats[3].base_stat}`
              let speed_stat = document.createElement('li');
              speed_stat.className='speed'
              speed_stat.innerHTML = `${data.stats[5].base_stat}`
              // statString.innerHTML= `hp:${data.stats[1].base_stat} | attack:${data.stats[2].base_stat} 
              //     | defense:${data.stats[3].base_stat} | speed:${data.stats[5].base_stat}`;
              statString.appendChild(hp_stat)
              statString.appendChild(attack_stat)
              statString.appendChild(defense_stat)
              statString.appendChild(speed_stat)
              let img = document.createElement('img');
              img.className='sprites';
              img.src = data.sprites["front_default"];
              newDiv.appendChild(statString)
              newDiv.appendChild(img)
          })
          let pokename = document.createElement('name')
          pokename.innerHTML = poke;
          pokename.className='names'
          newDiv.appendChild(pokename);

          toAdd.appendChild(newDiv)
      })
      document.getElementById('mylist').appendChild(toAdd);
    })
    .catch((error) => console.log("ERROR"));
}