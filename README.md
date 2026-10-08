# Semana 05 - Objetos, Dados e Assincronismo

Projeto desenvolvido para praticar objetos, arrays, Fetch API, Promises, async/await e manipulação do DOM.

## Parte 1 - Pedidos

Foi criado um array de objetos representando pedidos.

Os pedidos são:

- Validados;
- Filtrados pelo status "pago";
- Somados utilizando reduce;
- Exibidos no formato "Cliente — R$ 0.00".

## Parte 2 - Buscador de CEP

O projeto utiliza a API ViaCEP para buscar informações de um CEP.

Foram utilizados:

- fetch;
- async/await;
- try/catch;
- validação com expressão regular;
- createElement;
- textContent;
- replaceChildren.

Também foi criado um histórico dos CEPs pesquisados.

A tela possui quatro estados:

- Carregando;
- Erro;
- Não encontrado;
- Sucesso.

## Parte 3 - Mini Pokédex

Foi utilizada a PokéAPI para pesquisar Pokémon pelo nome.

São exibidos:

- Nome;
- Imagem;
- Tipos.

Também foram tratados os estados de carregamento, erro, Pokémon não encontrado e sucesso.

## Parte 4 - Promise.all

O Promise.all pode ser mais rápido que vários await seguidos porque, quando usamos await de forma sequencial, uma requisição precisa terminar antes que a próxima seja iniciada.

Com Promise.all, várias Promises podem ser iniciadas ao mesmo tempo e o JavaScript espera todas terminarem.

Assim, quando as requisições são independentes, o Promise.all aproveita melhor o tempo de rede.

## Tecnologias

- HTML
- JavaScript
- Fetch API
- ViaCEP
- PokéAPI
