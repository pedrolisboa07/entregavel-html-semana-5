console.log("===== PARTE 1 - PEDIDOS =====");

const pedidos = [
    { cliente: "Bia", valor: 120, status: "pago" },
    { cliente: "João", valor: 80, status: "pendente" },
    { cliente: "", valor: 50, status: "pago" },
    { cliente: "Maria", valor: -20, status: "pago" },
    { cliente: "Carlos", valor: 200, status: "pago" }
];

// Validar pedidos
const pedidosValidos = pedidos.filter(function(pedido) {
    return pedido.cliente.trim() !== "" &&
           typeof pedido.valor === "number" &&
           pedido.valor > 0;
});

console.log("Pedidos válidos:", pedidosValidos);

// Filtrar apenas os pedidos pagos
const pedidosPagos = pedidosValidos.filter(function(pedido) {
    return pedido.status === "pago";
});

console.log("Pedidos pagos:", pedidosPagos);

// Calcular total faturado
const totalFaturado = pedidosPagos.reduce(function(total, pedido) {
    return total + pedido.valor;
}, 0);

console.log("Total faturado: R$ " + totalFaturado.toFixed(2));

// Gerar textos
pedidosPagos.forEach(function(pedido) {
    console.log(
        pedido.cliente + " — R$ " + pedido.valor.toFixed(2)
    );
});


console.log("===== PARTE 2 - BUSCADOR DE CEP =====");

const formCep = document.querySelector("#formCep");
const campoCep = document.querySelector("#cep");
const botaoCep = document.querySelector("#botaoCep");
const statusCep = document.querySelector("#statusCep");
const resultadoCep = document.querySelector("#resultadoCep");
const historicoCep = document.querySelector("#historicoCep");

const historico = [];


formCep.addEventListener("submit", async function(event) {
    event.preventDefault();

    const cep = campoCep.value.trim();

    // Validar CEP
    if (!/^\d{8}$/.test(cep)) {
        statusCep.textContent = "Digite um CEP válido com 8 dígitos.";
        resultadoCep.replaceChildren();
        return;
    }

    // Estado carregando
    statusCep.textContent = "Buscando...";
    botaoCep.disabled = true;
    resultadoCep.replaceChildren();

    try {
        const response = await fetch(
            "https://viacep.com.br/ws/" + cep + "/json/"
        );

        // Verificar erro HTTP
        if (!response.ok) {
            throw new Error("Erro na conexão");
        }

        const dados = await response.json();

        // Estado vazio / não encontrado
        if (dados.erro) {
            statusCep.textContent = "CEP não encontrado";
            return;
        }

        // Estado sucesso
        resultadoCep.replaceChildren();

        const ruaTitulo = document.createElement("dt");
        ruaTitulo.textContent = "Rua";

        const ruaValor = document.createElement("dd");
        ruaValor.textContent = dados.logradouro;

        const bairroTitulo = document.createElement("dt");
        bairroTitulo.textContent = "Bairro";

        const bairroValor = document.createElement("dd");
        bairroValor.textContent = dados.bairro;

        const cidadeTitulo = document.createElement("dt");
        cidadeTitulo.textContent = "Cidade";

        const cidadeValor = document.createElement("dd");
        cidadeValor.textContent = dados.localidade;

        const ufTitulo = document.createElement("dt");
        ufTitulo.textContent = "UF";

        const ufValor = document.createElement("dd");
        ufValor.textContent = dados.uf;

        resultadoCep.append(
            ruaTitulo,
            ruaValor,
            bairroTitulo,
            bairroValor,
            cidadeTitulo,
            cidadeValor,
            ufTitulo,
            ufValor
        );

        statusCep.textContent = "";

        // Histórico
        historico.push({
            cep: cep,
            cidade: dados.localidade,
            uf: dados.uf
        });

        mostrarHistorico();

    } catch (erro) {
        statusCep.textContent = "Falha na conexão.";
        resultadoCep.replaceChildren();

    } finally {
        botaoCep.disabled = false;
    }
});


function mostrarHistorico() {
    historicoCep.replaceChildren();

    historico.forEach(function(item) {
        const li = document.createElement("li");

        li.textContent =
            item.cep + " - " +
            item.cidade + "/" +
            item.uf;

        historicoCep.append(li);
    });
}


console.log("===== PARTE 3 - MINI POKÉDEX =====");

const formPokemon = document.querySelector("#formPokemon");
const campoPokemon = document.querySelector("#pokemon");
const botaoPokemon = document.querySelector("#botaoPokemon");
const statusPokemon = document.querySelector("#statusPokemon");
const resultadoPokemon = document.querySelector("#resultadoPokemon");


formPokemon.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = campoPokemon.value.trim().toLowerCase();

    // Validar nome
    if (nome === "") {
        statusPokemon.textContent = "Digite o nome de um Pokémon.";
        resultadoPokemon.replaceChildren();
        return;
    }

    // Estado carregando
    statusPokemon.textContent = "Buscando Pokémon...";
    botaoPokemon.disabled = true;
    resultadoPokemon.replaceChildren();

    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + nome
        );

        // Verificar erro HTTP
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Pokemon não encontrado");
            }

            throw new Error("Erro na conexão");
        }

        const dados = await response.json();

        // Estado sucesso
        resultadoPokemon.replaceChildren();

        const nomePokemon = document.createElement("h2");
        nomePokemon.textContent = dados.name;

        const imagem = document.createElement("img");
        imagem.src = dados.sprites.front_default;
        imagem.alt = dados.name;

        const tituloTipos = document.createElement("p");
        tituloTipos.textContent = "Tipos:";

        const listaTipos = document.createElement("ul");

        dados.types.forEach(function(tipo) {
            const li = document.createElement("li");

            li.textContent = tipo.type.name;

            listaTipos.append(li);
        });

        resultadoPokemon.append(
            nomePokemon,
            imagem,
            tituloTipos,
            listaTipos
        );

        statusPokemon.textContent = "";

    } catch (erro) {

        if (erro.message === "Pokemon não encontrado") {
            statusPokemon.textContent = "Pokémon não encontrado";
        } else {
            statusPokemon.textContent = "Falha na conexão.";
        }

        resultadoPokemon.replaceChildren();

    } finally {
        botaoPokemon.disabled = false;
    }
});