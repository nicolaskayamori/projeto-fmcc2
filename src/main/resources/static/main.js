function getValor(arr) {
    const elem = []
    arr.forEach(element => {
        elem.push(element.value)
    });
    return elem.join(",");
}

async function handleClick() {
    const ladoDireito = getValor(document.querySelectorAll(".direito"));
    const ladoEsquerdo = getValor(document.querySelectorAll(".esquerdo"));
    const mod = getValor(document.querySelectorAll(".mod"));

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

function clicar() {
    handleClick().then(result => {
        alert(result);
    });
}


