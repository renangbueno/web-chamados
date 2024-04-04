const chamados = JSON.parse(localStorage.getItem('chamados')) || [];
const responsaveis = JSON.parse(localStorage.getItem('responsaveis')) || {};
var responsaveisPermitidos = {
    "Renan": true,
    "Ivan": true,
    "Ronaldo": true
    // adicione mais nomes conforme necessário
};

chamados.forEach(function(chamado){
    var tbody = document.querySelector("#tabelaChamados tbody");
    var tr = document.createElement("tr");
    var td_num = document.createElement("td");
    var td_resp = document.createElement("td");
    var td_exc = document.createElement("td");
    var button_resp = document.createElement("button");
    var button_exc = document.createElement("button");

    td_num.textContent = chamado.num_chamado;
    button_resp.textContent = responsaveis[chamado.num_chamado] || "Atribuir chamado";
    button_exc.textContent = "Excluir";

    if (button_resp.textContent != "Atribuir chamado") {
        button_resp.style.backgroundColor = "transparent";
        button_resp.style.color = "black";
        button_resp.style.border = "none";
    }

    button_resp.addEventListener("click", function(){
        var responsavel = prompt("Digite o nome do responsável");
        if (responsavel && responsaveisPermitidos[responsavel]) {
            td_resp.textContent = responsavel;
            responsaveis[chamado.num_chamado] = responsavel;
            localStorage.setItem('responsaveis', JSON.stringify(responsaveis));
        } else {
            alert("Nome do responsável não permitido.");
        }
    });
    setTimeout(function() {
        if (!responsaveis[chamado.num_chamado]) {
            var responsaveisKeys = Object.keys(responsaveisPermitidos);
            var responsavelAleatorio = responsaveisKeys[Math.floor(Math.random() * responsaveisKeys.length)];
            td_resp.textContent = responsavelAleatorio;
            responsaveis[chamado.num_chamado] = responsavelAleatorio;
            localStorage.setItem('responsaveis', JSON.stringify(responsaveis));
        }
    }, 10000);

    button_exc.addEventListener("click", function(){
        var index = chamados.findIndex(function(c) {
            return c.num_chamado === chamado.num_chamado;
        });
        if (index !== -1) {
            chamados.splice(index, 1);
            delete responsaveis[chamado.num_chamado];
            localStorage.setItem('chamados', JSON.stringify(chamados));
            localStorage.setItem('responsaveis', JSON.stringify(responsaveis));
        }
        tr.remove();
    });

    td_resp.appendChild(button_resp);
    td_exc.appendChild(button_exc);
    tr.appendChild(td_num);
    tr.appendChild(td_resp);
    tr.appendChild(td_exc);
    tbody.appendChild(tr);
});