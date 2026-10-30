/**
 * Byte Burger & Co. - Lógica da Simulação de Compra
 * Arquivo: script.js
 * Descrição: Recebe as quantidades dos produtos via prompt(), converte com Number(),
 * calcula os valores, verifica direito a desconto e exibe o resumo com alert().
 */

// Tabela de Preços dos Produtos (correspondem aos valores apresentados na página)
const PRECO_BURGER_CLASSICO = 28.00;
const PRECO_SMASH_BACON = 34.00;
const PRECO_BATATA_RUSTICA = 18.00;
const PRECO_BEBIDA = 8.00;

// Regra de Desconto: Compras a partir de R$ 60,00 ganham 10% de desconto
const VALOR_MINIMO_DESCONTO = 60.00;
const PERCENTUAL_DESCONTO = 0.10; // 10%

/**
 * Função utilitária para formatar valores numéricos no padrão de moeda brasileira (R$ 00,00)
 * @param {number} valor 
 * @returns {string} Valor formatado
 */
function formatarMoeda(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

/**
 * Função principal responsável pela simulação da compra.
 * É acionada pelo atributo onclick do botão "Simular compra" no index.html.
 */
function simularCompra() {
  // 1. Coleta das quantidades desejadas de cada produto através do prompt()
  let resposta1 = prompt(
    "1/4 - Quantos 'Byte Burger Clássico' (R$ 28,00 cada) você deseja?\n(Digite 0 se não quiser este item):",
    "0"
  );

  // Se o usuário clicou em 'Cancelar' em qualquer prompt, encerramos a simulação
  if (resposta1 === null) {
    alert("Simulação de compra cancelada pelo usuário.");
    return;
  }

  let resposta2 = prompt(
    "2/4 - Quantos 'Mega Smash Bacon' (R$ 34,00 cada) você deseja?\n(Digite 0 se não quiser este item):",
    "0"
  );
  if (resposta2 === null) {
    alert("Simulação de compra cancelada pelo usuário.");
    return;
  }

  let resposta3 = prompt(
    "3/4 - Quantas porções de 'Batata Rústica Especial' (R$ 18,00 cada) você deseja?\n(Digite 0 se não quiser este item):",
    "0"
  );
  if (resposta3 === null) {
    alert("Simulação de compra cancelada pelo usuário.");
    return;
  }

  let resposta4 = prompt(
    "4/4 - Quantas 'Bebidas Geladas' (R$ 8,00 cada) você deseja?\n(Digite 0 se não quiser este item):",
    "0"
  );
  if (resposta4 === null) {
    alert("Simulação de compra cancelada pelo usuário.");
    return;
  }

  // 2. Conversão explícita das respostas de texto para números utilizando Number()
  let qtdClassico = Number(resposta1);
  let qtdSmash = Number(resposta2);
  let qtdBatata = Number(resposta3);
  let qtdBebida = Number(resposta4);

  // 3. Validação dos dados informados (verificar se é número válido e não negativo)
  if (
    isNaN(qtdClassico) || qtdClassico < 0 ||
    isNaN(qtdSmash) || qtdSmash < 0 ||
    isNaN(qtdBatata) || qtdBatata < 0 ||
    isNaN(qtdBebida) || qtdBebida < 0
  ) {
    alert("⚠️ Erro: Por favor, informe apenas números válidos e positivos (ex: 0, 1, 2...). Tente novamente!");
    return;
  }

  // Arredondar para inteiro caso o usuário tenha digitado número fracionado
  qtdClassico = Math.floor(qtdClassico);
  qtdSmash = Math.floor(qtdSmash);
  qtdBatata = Math.floor(qtdBatata);
  qtdBebida = Math.floor(qtdBebida);

  // 4. Verificação: Se todas as quantidades forem zero, avisa que nenhum produto foi selecionado
  if (qtdClassico === 0 && qtdSmash === 0 && qtdBatata === 0 && qtdBebida === 0) {
    alert("⚠️ Nenhum produto foi selecionado.\nVocê não adicionou nenhum item ao pedido. Volte sempre ao Byte Burger & Co.!");
    
    // Oculta painel na página caso tenha estado visível antes
    const painelResumo = document.getElementById("painel-resumo");
    if (painelResumo) {
      painelResumo.classList.add("hidden");
    }
    return;
  }

  // 5. Cálculo dos valores: preço × quantidade de cada produto
  let subtotalClassico = PRECO_BURGER_CLASSICO * qtdClassico;
  let subtotalSmash = PRECO_SMASH_BACON * qtdSmash;
  let subtotalBatata = PRECO_BATATA_RUSTICA * qtdBatata;
  let subtotalBebida = PRECO_BEBIDA * qtdBebida;

  // Soma de todos os subtotais para encontrar o subtotal da compra
  let valorSubtotal = subtotalClassico + subtotalSmash + subtotalBatata + subtotalBebida;

  // 6. Verificação do direito a desconto
  let valorDesconto = 0;
  let mensagemDesconto = "";

  if (valorSubtotal >= VALOR_MINIMO_DESCONTO) {
    valorDesconto = valorSubtotal * PERCENTUAL_DESCONTO;
    mensagemDesconto = `🎉 Desconto Especial (10%): -${formatarMoeda(valorDesconto)}\n`;
  } else {
    let valorFaltante = VALOR_MINIMO_DESCONTO - valorSubtotal;
    mensagemDesconto = `ℹ️ Dica: Faltaram ${formatarMoeda(valorFaltante)} para ganhar 10% de desconto!\n`;
  }

  // Valor total a pagar após aplicação do desconto
  let valorTotal = valorSubtotal - valorDesconto;

  // 7. Montagem do texto do alert()
  let mensagemAlert = "🍔 BYTE BURGER & CO. - RESUMO DO SEU PEDIDO 🍔\n";
  mensagemAlert += "========================================\n\n";
  mensagemAlert += `• Byte Burger Clássico:\n  Quantidade: ${qtdClassico} un. | Preço un: ${formatarMoeda(PRECO_BURGER_CLASSICO)} | Subtotal: ${formatarMoeda(subtotalClassico)}\n\n`;
  mensagemAlert += `• Mega Smash Bacon:\n  Quantidade: ${qtdSmash} un. | Preço un: ${formatarMoeda(PRECO_SMASH_BACON)} | Subtotal: ${formatarMoeda(subtotalSmash)}\n\n`;
  mensagemAlert += `• Batata Rústica Especial:\n  Quantidade: ${qtdBatata} un. | Preço un: ${formatarMoeda(PRECO_BATATA_RUSTICA)} | Subtotal: ${formatarMoeda(subtotalBatata)}\n\n`;
  mensagemAlert += `• Bebida Gelada:\n  Quantidade: ${qtdBebida} un. | Preço un: ${formatarMoeda(PRECO_BEBIDA)} | Subtotal: ${formatarMoeda(subtotalBebida)}\n\n`;
  mensagemAlert += "========================================\n";
  mensagemAlert += `Subtotal: ${formatarMoeda(valorSubtotal)}\n`;
  mensagemAlert += mensagemDesconto;
  mensagemAlert += `TOTAL DA COMPRA: ${formatarMoeda(valorTotal)}\n`;
  mensagemAlert += "========================================\n";
  mensagemAlert += "Obrigado por comprar conosco! Seu pedido está sendo preparado com muito carinho.";

  // Exibição do resumo completo utilizando alert() conforme exigido pelo desafio
  alert(mensagemAlert);

  // 8. Atualização opcional do resumo na própria página web para melhor visualização
  atualizarResumoNaPagina({
    qtdClassico, subtotalClassico,
    qtdSmash, subtotalSmash,
    qtdBatata, subtotalBatata,
    qtdBebida, subtotalBebida,
    valorSubtotal,
    valorDesconto,
    valorTotal
  });
}

/**
 * Atualiza o painel visual de resumo dentro da página HTML
 * @param {object} dados 
 */
function atualizarResumoNaPagina(dados) {
  const painelResumo = document.getElementById("painel-resumo");
  const conteudoResumo = document.getElementById("conteudo-resumo");

  if (!painelResumo || !conteudoResumo) return;

  let html = `
    <div class="resumo-item">
      <span>Byte Burger Clássico (${dados.qtdClassico}x ${formatarMoeda(PRECO_BURGER_CLASSICO)}):</span>
      <strong>${formatarMoeda(dados.subtotalClassico)}</strong>
    </div>
    <div class="resumo-item">
      <span>Mega Smash Bacon (${dados.qtdSmash}x ${formatarMoeda(PRECO_SMASH_BACON)}):</span>
      <strong>${formatarMoeda(dados.subtotalSmash)}</strong>
    </div>
    <div class="resumo-item">
      <span>Batata Rústica Especial (${dados.qtdBatata}x ${formatarMoeda(PRECO_BATATA_RUSTICA)}):</span>
      <strong>${formatarMoeda(dados.subtotalBatata)}</strong>
    </div>
    <div class="resumo-item">
      <span>Bebida Gelada (${dados.qtdBebida}x ${formatarMoeda(PRECO_BEBIDA)}):</span>
      <strong>${formatarMoeda(dados.subtotalBebida)}</strong>
    </div>
    <div class="resumo-item" style="border-top: 1px solid #CBD5E1; margin-top: 8px; padding-top: 8px;">
      <span>Subtotal:</span>
      <strong>${formatarMoeda(dados.valorSubtotal)}</strong>
    </div>
  `;

  if (dados.valorDesconto > 0) {
    html += `
      <div class="resumo-item desconto">
        <span>🎉 Desconto Especial (10%):</span>
        <strong>-${formatarMoeda(dados.valorDesconto)}</strong>
      </div>
    `;
  }

  html += `
    <div class="resumo-item total">
      <span>Valor Final a Pagar:</span>
      <span style="color: var(--primary-color); font-size: 1.3rem;">${formatarMoeda(dados.valorTotal)}</span>
    </div>
  `;

  conteudoResumo.innerHTML = html;
  painelResumo.classList.remove("hidden");
}

