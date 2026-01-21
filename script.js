let carrinho = [];

const taxasPorBairro = {
    "Retirada no Local": 0.00,
    "Centro": 4.00,
    "Herval": 4.00,
    "Lagoa": 4.00,
    "Planalto Universitário": 4.00,
    "Alto S.F.": 5.00,
    "Alto da Boa Vista": 5.00,
    "Assentamento Jean Silva": 5.00,
    "Baviera": 5.00,
    "Campo Novo": 5.00,
    "Campo Velho": 5.00,
    "Carrascal 1 e 2": 5.00,
    "Combate": 5.00,
    "Dert": 5.00,
    "Irajá": 5.00,
    "Lot. Novo Baviera": 5.00,
    "Putiú": 5.00,
    "Remanso da Paz": 5.00,
    "Renascer": 5.00,
    "Rua da Palha": 5.00,
    "São João": 5.00,
    "Triângulo": 5.00,
    "Assentamento São João (CE-060)": 6.00,
    "Cohab": 6.00,
    "Holanda Park": 6.00,
    "Jardim dos Monólitos": 6.00,
    "Jerusalém": 6.00,
    "Lot. Ipiranga Ville": 6.00,
    "Lot. Nova Aurora": 6.00,
    "Lot. Renato Carneiro": 6.00,
    "Lot. Santa Clotilde": 6.00,
    "Monte Alegre": 6.00,
    "Apart. Jardim (Gessario Maia)": 7.00,
    "Assentamento Boa Vile": 7.00,
    "Bôto (Até as 18h)": 7.00,
    "Curicaca": 7.00,
    "Posto Gessaria até Estácio": 7.00,
    "Universidades (UFC / IFCE)": 7.00,
    "Cohab (Pós Agrocentro)": 8.00,
    "Praça 99 / Kartinha": 8.00,
    "Peixada do Orleans": 10.00,
    "Residencial (Até as 22h)": 12.00
};


window.onload = function() {
    const select = document.getElementById("bairro-select");
    
    const nomesBairros = Object.keys(taxasPorBairro).sort();
    
    nomesBairros.forEach(bairro => {
        const option = document.createElement("option");
        option.value = bairro;
        option.textContent = `${bairro} - R$ ${taxasPorBairro[bairro].toFixed(2)}`;
        select.appendChild(option);
    });
};

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("aberto");
    document.getElementById("overlay").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("aberto");
    document.getElementById("overlay").classList.remove("ativo");
}

function adicionarItem(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    abrirCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const subtotalEl = document.getElementById("subtotal");
    const taxaEl = document.getElementById("taxa-entrega");
    const totalEl = document.getElementById("total");
    const contadorEl = document.getElementById("contador-carrinho");
    const selectBairro = document.getElementById("bairro-select");

    lista.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach((item, index) => {
        subtotal += item.preco;
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small>R$ ${item.preco.toFixed(2).replace('.', ',')}</small>
            </div>
            <button onclick="removerItem(${index})" style="color:red; font-weight:bold;">X</button>
        `;
        lista.appendChild(li);
    });

    const bairroNome = selectBairro.value;
    const taxa = bairroNome ? taxasPorBairro[bairroNome] : 0.00;
    
    
    const taxaFinal = carrinho.length > 0 ? taxa : 0;
    const total = subtotal + taxaFinal;

    subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    taxaEl.textContent = `R$ ${taxaFinal.toFixed(2).replace('.', ',')}`;
    totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    
    if(contadorEl) {
        contadorEl.textContent = carrinho.length;
    }
}
function adicionarBebida() {
    const select = document.getElementById("sabor-refri");
    const sabor = select.value;

    if (sabor === "") {
        alert("Por favor, escolha o sabor do refrigerante antes de adicionar!");
        select.focus(); 
        return;
    }

    
    adicionarItem(`Refrigerante (${sabor})`, 5.50);

    
    select.value = ""; 
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const selectBairro = document.getElementById("bairro-select");
    const inputRua = document.getElementById("rua-input");
    
    const bairro = selectBairro.value;
    const rua = inputRua.value.trim();

    if (!bairro) {
        alert("Por favor, selecione seu BAIRRO para calcular a entrega.");
        selectBairro.focus();
        return;
    }

    if (!rua && bairro !== "Retirada no Local") {
        alert("Por favor, digite o nome da RUA e o NÚMERO.");
        inputRua.focus();
        return;
    }

    const taxa = taxasPorBairro[bairro];
    let subtotal = 0;
    
    let mensagem = "*Novo Pedido - RANGÔ*\n\n";
    mensagem += "*Itens:*\n";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')})\n`;
        subtotal += item.preco;
    });

    const total = subtotal + taxa;

    mensagem += `\n📍 *Entrega:* ${bairro}`;
    if(rua) mensagem += `\n🏠 *Endereço:* ${rua}`;
    
    mensagem += `\n\n💰 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    mensagem += `\n🛵 *Taxa:* R$ ${taxa.toFixed(2).replace('.', ',')}`;
    mensagem += `\n✅ *TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}`;
    mensagem += `\n\nAguardo confirmação!`;

    
    const telefone = "5588920019387"; 
    
    window.open(
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}