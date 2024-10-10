// Declaração da Classe PesquisaPokemon
class PesquisaPokemon {
  // No constructor captamos o form e disparamos o this.eventos()
  constructor() {
    this.form = document.querySelector('.form');
    this.eventos();
  }

  // Esse método pera o evento "click" do form
  eventos(){
    this.form.addEventListener('submit', event => {
      // Quando houve um click, ele capturará o evento e o eviará pro método handleSubmit() desta classe
      this.handleSubmit(event);
    })
  }

  // handleSubmit() recebe um evento
  handleSubmit(event){
    // Usamos o preventDefault para evitar um comportamento padrão ao instanciar nossa classe
    event.preventDefault();

    // Captamos o objeto inputPokemon
    const inputPokemon = this.form.querySelector('.inputPokemon');

    // Essa variavél recebe o retorno do método isValid()
    const validaPesquisa = this.isValid(inputPokemon.value);    

    // Se o texto do inputPokemon for válido, eviamos o texto para o método pesquisaPokemon()
    if (validaPesquisa) {
      this.pesquisaPokemon(inputPokemon.value.toLowerCase());
    }
  }

  // Método utilizado para validar a pesquisa
  isValid(inputPokemon) {
    // Iniciamos nossa validação como verdadeira
    let valid = true;

    // Se uma validação falhou anteriormente, eu as excluo com um loop for
    for(let errorText of this.form.querySelectorAll('.erroMsg')) {
      errorText.remove();
    }

    // Se a pesquisa não atender à REGEX do bloco IF, retornamos uma mensagem de erro
    if (!(inputPokemon.match(/^[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+)*$/g))){
      this.criaErro('Sua pesquisa deve conter apenas letras e números.');
      valid = false;
    }

    // Retornamos a validação ao término do método
    return valid;
  }

  // Método que envia uma requisição pra API Pokémon
  pesquisaPokemon(pokemon) {
    // Utilizamos Fetch() pra enviar nossa requisição
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      // armazenamos a resposta num objeto json de nome response
      .then(response => response.json())
      // Com enviamos o json para o método exibeResultado() 
      .then(json => {
        this.exibeResultado(json);
      })
      // Se nossa requisição retornar um erro, mandamos uma mensagem dizendo que o Pokémon não foi encontrado
      .catch(() => {
        this.criaErro(`Pokémon não encontrado.`)
        return;
      })
  }

  // Função para formatar o Número do Pokémon
  formataID(id) {
    if (id.length === 1) {
      return ('0000' + id).slice(-4);
    } else if ((id.length) === 2) {
      return ('0000' + id).slice(-4);
    } else if (id.length === 3) {
      return ('0000' + id).slice(-4);
    }
  }

  // Função que filtra o tipo de pokémon
  filterType(arrayType){
    let types = [];
    let upperTypes = [];

    // Loop for pra armazenar os tipos
    for (let type of arrayType) {
      types.push(type['type']['name']);
    }

    // Loop for pra armazenar os tipos em caixa alta
    upperTypes = types.map((type) => {
      return type.toUpperCase();
    });

    // Se tivermos 1 tipo, retornamos o array upperTypes na posição 0
    if (types.length === 1) {
      return upperTypes[0];
      // Senão se tiver 2 tipos, retornamos upperTypes na posição 0 e 1 com template strings
    } else if (types.length === 2) {
      return `${upperTypes[0]}/${upperTypes[1]}`;
    }
  }

  // Método que monta nosso resultado pro usuário
  exibeResultado(json) {
    const resultado = document.querySelector('.resultado');
    
    // Captamos o link do Sprite do Pokémon de dentro do json
    const pokemonSprite = json['sprites']['front_default'];
    // Criamos um objeto img
    const img = document.createElement('img');
    
    // Captamos o ID do Pokémon de dentro do json
    const id = json['id'];
    // Formatamos o ID com o método formataID()
    const idFormatado = this.formataID(id.toString());
    
    // Armazenamos os ID e Nome do Pokémon de forma concatenada com template strings
    const pokemonName = `#${idFormatado} ${json['name']}`;
    // Criamos o  objeto P que irá armazenar nossa string Nome
    const pokemonPName = document.createElement('p');
    
    // Armazenamos o tipo do Pokémon usando o método filterType()
    const pokemonType = this.filterType(json['types']);
    // Criamos o objeto P que irá armazenar nossa string Type
    const pokemonPType = document.createElement('p');
    
    // Se houver resultados de uma busca anterior, o loop for irá correr todos os elementos e remove-los
    for(let resultadoPesquisa of resultado.querySelectorAll('.resultadoPesquisa')) {
      resultadoPesquisa.remove();
    }

    // Mandamos o Sprite do Pokémon pro usuário
    img.src = pokemonSprite;
    img.classList.add('pokemonSprite', 'resultadoPesquisa');
    resultado.appendChild(img);

    // Mandamos o nome do Pokémon
    pokemonPName.innerText = pokemonName.toUpperCase();
    pokemonPName.classList.add('resultadoPesquisa');
    resultado.appendChild(pokemonPName);

    // Mandamos o Tipo do Pokémon
    pokemonPType.innerText = `TYPE: ${pokemonType}`;
    pokemonPType.classList.add('resultadoPesquisa');
    resultado.appendChild(pokemonPType);
  }

  // Método que cria nossas mensagens de erro
  criaErro(msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('erroMsg');
    inputPokemon.insertAdjacentElement('afterend', div);

  }
}

// Instância da nossa classe PesquisaPokemon
const pesquisa = new PesquisaPokemon();