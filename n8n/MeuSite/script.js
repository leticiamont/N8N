document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('relatorio-container');
    const botao = document.getElementById('btnAtualizar');

    // Dados simulados (O "Node" do n8n)
    const nodeData = {
        compliance_status: "FAIL", // Tente mudar para "PASS" ou "ERROR"
        text: "Contrato analisado com sucesso.",
        risk_score: 85,
        violations_count: 3,
        details: "Cláusula 4.2 ausente; Validade expirada.",
        recommendations: "Revisar anexo B e atualizar datas."
    };

    function gerarRelatorio(data) {
        // Lógica idêntica ao seu snippet do n8n
        const statusLine = data.compliance_status === "FAIL" 
            ? "🚨 ALERTA DE RISCO - VIOLAÇÃO DETECTADA" 
            : (data.compliance_status === "PASS" 
                ? "✅ AUDITORIA CONCLUÍDA - SEM VIOLAÇÕES" 
                : "⚠️ ERRO/DADOS VAZIOS - VERIFICAR FLUXO");

        const docStatus = data.text ? "Recebido com sucesso." : "Arquivo vazio/Extração falhou.";
        const riskScore = data.risk_score || 0;
        const violations = data.violations_count || '0';
        const details = data.details || 'Aguardando detalhes da IA.';
        const recommendations = data.recommendations || 'Recomendação não fornecida.';

        // Montando o TEXTO PURO (respeitando quebras de linha com \n)
        const relatorioFinal = `${statusLine}
-------------------------------------------------------
*Documento:* ${docStatus}
*Score de Risco:* ${riskScore}/100
*Violações Encontradas:* ${violations}
*Detalhes da Análise:* ${details}
*Recomendação:* ${recommendations}
-------------------------------------------------------`;

        // Inserindo como texto puro no HTML
        container.innerText = relatorioFinal;
        
        // Mantive a mudança de cor da borda apenas para ajudar visualmente
        container.className = "relatorio-terminal"; // Reseta classes
        if (data.compliance_status === "FAIL") container.classList.add("fail");
        else if (data.compliance_status === "PASS") container.classList.add("pass");
    }

    gerarRelatorio(nodeData);

    // Botão de teste
    botao.addEventListener('click', () => {
        // Alterna entre FAIL e PASS para você testar
        nodeData.compliance_status = nodeData.compliance_status === "FAIL" ? "PASS" : "FAIL";
        gerarRelatorio(nodeData);
    });
});