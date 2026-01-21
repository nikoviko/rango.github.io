let carrinho = [];

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("aberto");
    document.getElementById("overlay").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("aberto");
    document.getElementById("overlay").classList.remove("ativo");
}

function adicionarItem(nome, preco) {
    // Adiciona o item ao array
    carrinho.push({ nome, preco });
    
    // Atualiza a tela
    atualizarCarrinho();
    
    // Opcional: Abre o carrinho automaticamente ao adicionar
    abrirCarrinho(); 
}

function removerItem(index) {
    carrinho.splice(index, 1); // Remove o item pelo índice
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total");
    const contadorEl = document.getElementById("contador-carrinho");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;

        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong>
                <br>
                <small>R$ ${item.preco.toFixed(2).replace('.', ',')}</small>
            </div>
            <button onclick="removerItem(${index})" style="color:red; font-weight:bold;">X</button>
        `;
        lista.appendChild(li);
    });

    // Atualiza o total e o contador do botão flutuante
    totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    
    // Atualiza o número no botão "Ver pedido"
    if(contadorEl) {
        contadorEl.textContent = carrinho.length;
    }
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Configure seu número aqui (apenas números, com código do país e DDD)
    const telefone = "5585999999999"; 
    
    let mensagem = "*Olá! Gostaria de fazer o seguinte pedido:*\n\n";

    let total = 0;
    carrinho.forEach(item => {
        mensagem += `🍽 ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
        total += item.preco;
    });

    mensagem += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    mensagem += `\n\nAguardo confirmação!`;

    window.open(
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}