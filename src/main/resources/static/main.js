function getValor(arr){
    const elem = []
    arr.forEach(element => {
        elem.push(element.value)
    });
    return elem;
}

function handleClick() {
    const ladoDireito = getValor(document.querySelectorAll(".direito")).join(",");
    const ladoEsquerdo = getValor(document.querySelectorAll(".esquerdo")).join(",");
    const mod = getValor(document.querySelectorAll(".mod")).join(",");

function getValor(arr){
    const elem = []
    arr.forEach(element => {
        elem.push(element.value)
    });
    return elem;
}

async function handleClick() {
    const ladoDireito = getValor(document.querySelectorAll(".direito")).join(",");
    const ladoEsquerdo = getValor(document.querySelectorAll(".esquerdo")).join(",");
    const mod = getValor(document.querySelectorAll(".mod")).join(",");

     try {
        const response = await fetch("http://localhost:8080/test?ladoEsquerdo=" + ladoEsquerdo + "&ladoDireito=" + ladoDireito + "&mod=" + mod);

        if (!response.ok) {
            return "Erro na requisicao";
        }

        const data = await response.text();
        return data;

     } catch (error) {
        return "Erro: " + error.message;
     }
}


function onClick() {
    handleClick().then(result => {
            alert(result);
        });
}
