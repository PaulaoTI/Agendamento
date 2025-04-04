

document.getElementById("form-agendamento").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const linguagem = document.getElementById('linguagem').value;

    if (!nome || !data || !linguagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const mensagem = `Nome: ${nome} ,Data agendada: ${dataFormatada} ,Linguagem selecionada: ${linguagem}.`;

    const link = `https://wa.me/5562981369705?text=${encodeURIComponent(mensagem)}`;

    window.open(link, '_blank');
});
