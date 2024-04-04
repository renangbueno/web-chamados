var enviar = document.getElementById("enviar");
var formulario = document.getElementById("form_criar_chamado");
var consulta_button = document.getElementById("ver_chamado");
var volta_button = document.getElementById("voltar");
var busca_chamado = document.getElementById("buscar_chamado");
var chamados = [];
var texto = document.getElementById("descricao");
var maxlen = 600;

function criaChamado(){
    var num_chamado = Math.floor(Math.random() * 999);
    var nome = document.getElementById("nome").value;
    var area = document.getElementById("seleciona_area").value;
    var categoria = document.getElementById("seleciona_categoria").value;
    var outro_problema = document.getElementById("outro_problema").value;
    var prioridade = document.getElementById("prioridade").value;
    var texto = document.getElementById("descricao").value;
    var txt_area = {
        "1": "Compras",
        "2": "Protocolo",
        "3": "Administração",
    };

    var txt_cat = {
        "1": "Hardware",
        "2": "Software",
        "3": "Rede",
        "4": "Outro"
    };
    var txt_prio = {
        "1": "Baixa",
        "2": "Média",
        "3": "Alta",
    };
    formulario.reset();

    const novo_chamado = {
        nome: nome,
        area: txt_area[area],
        categoria: txt_cat[categoria],
        outro_problema: outro_problema,
        num_chamado: num_chamado,
        prioridade: txt_prio[prioridade],
        texto: texto,
    };
    adicionaChamado(novo_chamado);
    console.log(num_chamado);
}

function mostraConsulta(){
    var consulta = document.getElementsByClassName("ver_chamados");
    var div_criar = document.getElementsByClassName("criar_chamado");
    if (consulta[0].style.display === "none"){
        consulta[0].style.display = "flex";
        div_criar[0].style.display = "none";

    } else {
        consulta[0].style.display = "none";
        div_criar[0].style.display = "flex";
        var div = document.getElementById("dados_chamado");
        div.innerHTML = "";
        var input_busca = document.getElementById("nro_chamado");
        input_busca.value = "";
    }
}

function adicionaChamado(new_chamado){
    const chamados = JSON.parse(localStorage.getItem('chamados')) || [];
    chamados.push(new_chamado);
    localStorage.setItem('chamados', JSON.stringify(chamados));
}

function consultaChamado(){
    const chamados = JSON.parse(localStorage.getItem('chamados')) || [];
    var num_busca = document.getElementById("nro_chamado").value;

    chamados.find(function(chamado){
        if (chamado.num_chamado == num_busca){
            var div = document.getElementById("dados_chamado");
            var table = document.createElement("table");
            var data = [
                ["Nome:", chamado.nome],
                ["Área:", chamado.area],
                ["Categoria:", chamado.categoria],
                ["Outro problema:", chamado.outro_problema],
                ["Número do chamado:", chamado.num_chamado],
                ["Prioridade:", chamado.prioridade],
                ["Descrição:", chamado.texto]
            ];
            
            data.forEach(function(rowData) {
                var row = document.createElement("tr");
                var th = document.createElement("th");
                th.textContent = rowData[0];
                var td = document.createElement("td");
                td.textContent = rowData[1];
                row.appendChild(th);
                row.appendChild(td);
                table.appendChild(row);
            });
            
            div.innerHTML = "";
            div.appendChild(table);        }
    });

}

texto.addEventListener("input", function(){
    var txt = texto.value;
    var len = txt.length;
    var rest = maxlen - len;
    var span = document.getElementById("restante");
    span.textContent = rest + " caracteres restantes";
});

enviar.addEventListener("click", criaChamado);
consulta_button.addEventListener("click", mostraConsulta);
volta_button.addEventListener("click", mostraConsulta);
busca_chamado.addEventListener("click", consultaChamado);