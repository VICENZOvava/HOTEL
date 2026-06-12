const urlQuarto = "http://localhost:3000/quarto";
const urlReserva = "http://localhost:3000/reservas";

const quartos = [];
const reservas = [];

let quartoAtual = null;
let reservaAtual = null;

carregarQuartos();
carregarReservas();

function carregarQuartos() {

    fetch(urlQuarto + "/listar")
        .then(res => res.json())
        .then(data => {

            quartos.length = 0;
            quartos.push(...data);

            listarQuartos();
        })
        .catch(() => alert("Erro ao carregar quartos"));
}

function listarQuartos() {

    const lista = document.querySelector("#listaQuartos");

    lista.innerHTML = "";

    quartos.forEach(quarto => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>Quarto ${quarto.numero}</h3>
            <p>Tipo: ${quarto.tipo}</p>
        `;

        card.onclick = () => abrirQuarto(quarto);

        lista.appendChild(card);
    });
}

function abrirQuarto(quarto) {

    quartoAtual = quarto;

    tituloQuarto.innerText = "Quarto " + quarto.numero;
    tipoEdit.value = quarto.tipo;

    detalhesQuarto.classList.remove("oculto");
}

document.querySelector("#formQuarto")
?.addEventListener("submit", e => {

    e.preventDefault();

    const novoQuarto = {
        tipo: tipo.value
    };

    fetch(urlQuarto + "/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoQuarto)
    })
    .then(() => {
        modalQuarto.classList.add("oculto");
        carregarQuartos();
    })
    .catch(() => alert("Erro ao cadastrar quarto"));
});

function salvarEdicaoQuarto() {

    fetch(urlQuarto + "/atualizar/" + quartoAtual.numero, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tipo: tipoEdit.value
        })
    })
    .then(() => {
        detalhesQuarto.classList.add("oculto");
        carregarQuartos();
    });
}

function excluirQuarto() {

    if (!confirm("Deseja excluir este quarto?")) return;

    fetch(urlQuarto + "/excluir/" + quartoAtual.numero, {
        method: "DELETE"
    })
    .then(() => {
        detalhesQuarto.classList.add("oculto");
        carregarQuartos();
    });
}




function carregarReservas() {

    fetch(urlReserva + "/listar")
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(data => {

            reservas.length = 0;
            reservas.push(...data);

            listarReservas();
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao carregar reservas");
        });
}

function listarReservas() {

    const lista = document.querySelector("#listaReservas");

    lista.innerHTML = "";

    reservas.forEach(reserva => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${reserva.nome}</h3>
            <p>Entrada: ${reserva.dataEntrada}</p>
            <p>Saída: ${reserva.dataSaida}</p>
            <p>Quarto: ${reserva.numeroQuarto}</p>
        `;

        card.onclick = () => abrirReserva(reserva);

        lista.appendChild(card);
    });
}

function abrirReserva(reserva) {

    reservaAtual = reserva;

    tituloReserva.innerText = "Reserva #" + reserva.id;

    nomeEdit.value = reserva.nome;
    entradaEdit.value = reserva.dataEntrada;
    saidaEdit.value = reserva.dataSaida;

    detalhesReserva.classList.remove("oculto");
}

document.querySelector("#formReserva")
?.addEventListener("submit", e => {

    e.preventDefault();

      const quartoJaReservado = reservas.some(
        reserva => reserva.numeroQuarto == Number(numeroQuarto.value)
    );

    if (quartoJaReservado) {
        alert("Este quarto já possui uma reserva.");
        return;
    }

    const novaReserva = {
        nome: nome.value,
        dataEntrada: entrada.value,
        dataSaida: saida.value,
        numeroQuarto: Number(numeroQuarto.value)
    };

    fetch(urlReserva + "/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaReserva)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        modalReserva.classList.add("oculto");
        carregarReservas();
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao cadastrar reserva");
    });
});

function salvarEdicaoReserva() {

    const reservaEditada = {
        nome: nomeEdit.value,
        dataEntrada: entradaEdit.value,
        dataSaida: saidaEdit.value
    };

    fetch(urlReserva + "/atualizar/" + reservaAtual.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaEditada)
    })
    .then(() => {
        detalhesReserva.classList.add("oculto");
        carregarReservas();
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao atualizar reserva");
    });
}

function excluirReserva() {

    if (!confirm("Deseja excluir esta reserva?")) return;

    fetch(urlReserva + "/excluir/" + reservaAtual.id, {
        method: "DELETE"
    })
    .then(() => {
        detalhesReserva.classList.add("oculto");
        carregarReservas();
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao excluir reserva");
    });
}

function mostrarTela(tela){

    const telaQuartos =
        document.getElementById("telaQuartos");

    const telaReservas =
        document.getElementById("telaReservas");

    if(tela === "quartos"){

        telaQuartos.classList.remove("oculto");
        telaReservas.classList.add("oculto");
    }

    if(tela === "reservas"){

        telaReservas.classList.remove("oculto");
        telaQuartos.classList.add("oculto");

        listarReservas();
    }
}

function abrirCadastroReserva(){

    if(quartoAtual){
        numeroQuarto.value = quartoAtual.numero;
    }

    modalReserva.classList.remove("oculto");
}

function listarReservasDoQuarto(numero){

    const lista =
        document.querySelector("#listaReservas");

    lista.innerHTML = "";

    const reservasDoQuarto =
        reservas.filter(r =>
            r.numeroQuarto == numero
        );

    reservasDoQuarto.forEach(reserva => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${reserva.nome}</h3>
            <p>Entrada: ${reserva.dataEntrada}</p>
            <p>Saída: ${reserva.dataSaida}</p>
            <p>Quarto: ${reserva.numeroQuarto}</p>
        `;

        card.onclick = () =>
            abrirReserva(reserva);

        lista.appendChild(card);
    });
}