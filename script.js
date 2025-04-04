const form = document.getElementById("form-agendamento");

const customAlertErro = document.getElementById('customAlert');
const customAlertSucesso = document.getElementById('customAlert1');

const closeAlertBtnErro = document.getElementById('closeAlertBtnErro');
const closeAlertBtnSucesso = document.getElementById('closeAlertBtnSucesso');

closeAlertBtnErro.addEventListener('click', () => {
    customAlertErro.style.display = 'none';
});

closeAlertBtnSucesso.addEventListener('click', () => {
    customAlertSucesso.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === customAlertErro) {
        customAlertErro.style.display = 'none';
    }
    if (event.target === customAlertSucesso) {
        customAlertSucesso.style.display = 'none';
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = document.getElementById("data").value;
    const linguagem = document.getElementById('linguagem').value;

    if (!nome || !data || !linguagem) {
        customAlertErro.style.display = 'block';
        return;
    }

    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const mensagem = `Nome: ${nome}, Data agendada: ${dataFormatada}, Linguagem selecionada: ${linguagem}.`;
    const link = `https://wa.me/5562981369705?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');

    customAlertSucesso.style.display = 'block';

    form.reset();
});
