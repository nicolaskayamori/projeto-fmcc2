const fs = require('fs');
function getValor(arr){
    const elem = []
    arr.forEach(element => {
        elem.push(element.value)
    });
    return elem;
}

function handleClick(){
    const dados = {
        direitoArray : getValor(document.querySelectorAll(".direito")),
        esquerdo: getValor(document.querySelectorAll(".esquerdo")),
        mod: getValor(document.querySelectorAll(".mod")),
    }
    
    return dados;
}

function enviarJson(){
    const dadosEnviados = JSON.parse(fs.readFileSync('dados.json', 'utf8'));
    dadosEnviados.push(handleClick())
    fs.writeFileSync('dados.json', JSON.stringify(dados, null, 2));
}