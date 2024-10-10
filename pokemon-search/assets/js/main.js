class PesquisaPokemon {
  constructor() {
    this.form = document.querySelector('.form');
    this.eventos();
  }

  eventos(){
    this.form.addEventListener('submit', event => {
      this.handleSubmit(event);
    })
  }

  handleSubmit(event){
    event.preventDefault();

    const validaPesquisa = this.isValid();
    const inputPokemon = this.form.querySelector('.inputPokemon');

    if (validaPesquisa) {
      this.pesquisaPokemon(inputPokemon.value.toLowerCase());
    }
  }

  isValid() {
    let valid = true;

    const pesquisa = this.form.querySelector('.inputPokemon');

    for(let errorText of this.form.querySelectorAll('.erroMsg')) {
      errorText.remove();
    }

    if (!(pesquisa.value.match(/^[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+)*$/g))){
      this.criaErro('Sua pesquisa deve conter apenas letras e números.');
      valid = false;
    }

    return valid;
  }

  pesquisaPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.exibeResultado(json);
      })
      .catch(() => {
        this.criaErro(`Pokémon não encontrado.`)
        return;
      })
  }

  formataID(id) {
    if (id.length === 1) {
      return ('0000' + id).slice(-4);
    } else if ((id.length) === 2) {
      return ('0000' + id).slice(-4);
    } else if (id.length === 3) {
      return ('0000' + id).slice(-4);
    }
  }

  filterType(arrayType){
    let types = [];
    let upperTypes = [];

    for (let type of arrayType) {
      types.push(type['type']['name']);
    }

    upperTypes = types.map((type) => {
      return type.toUpperCase();
    });

    if (types.length === 1) {
      return upperTypes[0];
    } else if (types.length === 2) {
      return `${upperTypes[0]}/${upperTypes[1]}`;
    }
  }

  exibeResultado(json) {
    const resultado = document.querySelector('.resultado');
    
    const pokemonSprite = json['sprites']['front_default'];
    const img = document.createElement('img');
    
    const id = json['id'];
    const idFormatado = this.formataID(id.toString());
    
    const pokemonName = `#${idFormatado} ${json['name']}`;
    const pokemonPName = document.createElement('p');
    
    const pokemonType = this.filterType(json['types']);
    const pokemonPType = document.createElement('p');
    

    for(let resultadoPesquisa of resultado.querySelectorAll('.resultadoPesquisa')) {
      resultadoPesquisa.remove();
    }

    img.src = pokemonSprite;
    img.classList.add('pokemonSprite', 'resultadoPesquisa');
    resultado.appendChild(img);

    pokemonPName.innerText = pokemonName.toUpperCase();
    pokemonPName.classList.add('resultadoPesquisa');
    resultado.appendChild(pokemonPName);

    pokemonPType.innerText = `TYPE: ${pokemonType}`;
    pokemonPType.classList.add('resultadoPesquisa');
    resultado.appendChild(pokemonPType);
  }

  criaErro(msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('erroMsg');
    inputPokemon.insertAdjacentElement('afterend', div);

  }
}

const pesquisa = new PesquisaPokemon();