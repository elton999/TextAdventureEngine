cena = {}
//cenas={}

//editorLink="https://dx3006.github.io/TextAdventureEngine/create/"
editorLink="https://elton999.github.io/TextAdventureEngine/create/"

function init() {

}

title = document.getElementById("title")
text = document.getElementById("text")
buttons = document.getElementById("buttons")
bloco = document.getElementById("bloco")

function sleepTime(timeS) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, timeS)
    })
}

async function setURL(cenaNome) {
    hash = decodeURI(document.location.hash)
    var match = hash.match(/&cena=([^&]+)/);
    if (match) {

        window.history.pushState("object or string", "Title", window.location.protocol + "//" + window.location.host + window.location.pathname + document.location.hash.replace(match[0], "&cena=" + cenaNome))

    } else {
        window.history.pushState("object or string", "Title", window.location.protocol + "//" + window.location.host + window.location.pathname + document.location.hash + "&cena=" + cenaNome)
    }

}

async function changeScene(cenaNome, ani) {
    if (cenaNome == undefined || cenas.cenas[cenaNome] == undefined) {
        k = Object.keys(cenas.cenas)
        cena = cenas.cenas[k[0]]
        localStorage.setItem("cena",k[0])
        //setURL(k[0])
    } else {
        cena = cenas.cenas[cenaNome]
        localStorage.setItem("cena",cenaNome)
    }
    console.log(cena)
    document.body.style.backgroundColor = cena.color
    bloco.style.opacity = 0
    if (ani) {
        await sleepTime(700);
    }

    if (cena.titulo != "") {
        text.style["font-size"] = "40px"
    } else {
        text.style["font-size"] = ""
    }
    //title.innerHTML = cena.titulo;
    //text.innerHTML = cena.texto;

    tituloTextPure = cena.titulo;
    textTextPure = cena.texto;

    for(i = 0; i < variaveis.length; i++){
        tituloTextPure = cena.titulo.replace("["+variaveis[i][0]+"]", variaveis[i][1]);
        textTextPure = cena.texto.replace("["+variaveis[i][0]+"]", variaveis[i][1]);
    }

    title.innerHTML = tituloTextPure.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    text.innerHTML = textTextPure.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    button = ""
    for (c = 0; cena.opcoes.length > c; c++) {
        if(cena.opcoes[c][2]["variableInput"] == "" ){
            button = button + "<button onclick='changeScene(\"" + cena.opcoes[c][1] + "\",true)' class=button >" + cena.opcoes[c][0] + "</button>"
        }
        
        if(cena.opcoes[c][2]["variableInput"] != "" ){
            
            for(var i = 0; i < variaveis.length; i++){
                console.log(cena.opcoes[c][2]["conditionalInput"]);
                if(
                    (cena.opcoes[c][2]["variableInput"] == variaveis[i][0] && cena.opcoes[c][2]["variableValueInput"] == variaveis[i][1] && cena.opcoes[c][2]["conditionalInput"] ==  "if_equals") ||
                    (cena.opcoes[c][2]["variableInput"] == variaveis[i][0] && cena.opcoes[c][2]["variableValueInput"] != variaveis[i][1] && cena.opcoes[c][2]["conditionalInput"] ==  "if_different"))
                    if(cena.opcoes[c][2]["variableSetValueInput"] != "")
                        button = button + "<button onclick='addValue(\""+cena.opcoes[c][2]["variableSetValueInput"] +"\", \""+cena.opcoes[c][2]["variableNewValueInput"] +"\");  changeScene(\"" + cena.opcoes[c][1] + "\",true)' class=button >" + cena.opcoes[c][0] + "</button>"
                    else
                        button = button + "<button onclick='changeScene(\"" + cena.opcoes[c][1] + "\",true)' class=button >" + cena.opcoes[c][0] + "</button>"
            }
        }
    }
    buttons.innerHTML = button
    bloco.style.opacity = 1


}

function addValue(variable, value){
    for(i = 0; i < variaveis.length; i++){
        if(variaveis[i][0] == variable){
            variaveis[i][1] = value;
        }
    }
}

//console.log(JSON.stringify(cenas))
//console.log(document.location.hash)
hash = decodeURI(document.location.hash)
//console.log(hash)
var variaveis = [];

var match = hash.match(/#cenas=([^&]+)/);
if (match) {
    cenas=JSON.parse(match[1])
    variaveis = cenas.variables;
    changeScene(cenas.inicio);
    
}else{
    window.location.href = editorLink;
}

/* 
var match = hash.match(/&cena=([^&]+)/);
if (match) {
    //console.log(match[1])
    changeScene(match[1])
} else {
    changeScene("start")
}

jogo="{\"inicio\":\"Inicio\",\"cenas\":{\"Inicio\":{\"titulo\":\"Jogo Teste\",\"texto\":\"feito em live com sono e amor\",\"color\":\"#27401c\",\"opcoes\":[[\"Jogar\",\"dialogo01\"]]},\"dialogo01\":{\"titulo\":\"\",\"texto\":\"DX começou a live morrendo de sono.\",\"color\":\"#762e2e\",\"opcoes\":[[\"Fechar a live\",\"Dormir\"],[\"Tentar fazer a live\",\"Fazer live\"]]},\"Dormir\":{\"titulo\":\"\",\"texto\":\"Vc avisa o chat q esta morrendo de sono e vai mimi\",\"color\":\"#80a2b3\",\"opcoes\":[[\"Continuar\",\"Dormir 2\"]]},\"Fazer live\":{\"titulo\":\"\",\"texto\":\"Vc tenta achar um assunto, mas tudo que consegue é enrolar\",\"color\":\"#2e5e76\",\"opcoes\":[[\"Tentar jogar \",\"jogar\"],[\"Assistir algo\",\"assistir\"]]},\"Dormir 2\":{\"titulo\":\"\",\"texto\":\"Mas vc fica com consciência pesada de ter abandonado a live \",\"color\":\"#76732e\",\"opcoes\":[[\"Abrir a live denovo\",\"dialogo01\"],[\"Dormir de quaquer jeito\",\"Dormir 3\"]]},\"Dormir 3\":{\"titulo\":\"\",\"texto\":\"Vc vai para cama e dormi lindamente\",\"color\":\"#92acb9\",\"opcoes\":[[\"Jogar denovo\",\"Inicio\"]]},\"jogar\":{\"titulo\":\"\",\"texto\":\"vc esta cansado demais para jogar\",\"color\":\"#2e7630\",\"opcoes\":[[\"Fazer outra coisa\",\"Fazer live\"],[\"Deistir e ir domir\",\"Dormir\"]]},\"assistir\":{\"titulo\":\"\",\"texto\":\"vc tenta assistir algo mas caindo de sono\",\"color\":\"#522e76\",\"opcoes\":[[\"Deistir e ir domir\",\"Dormir\"]]}}}"
cenas=JSON.parse(jogo)
console.log(cenas)
cena=localStorage.getItem("cena")
if(cena){
    changeScene(cena)
}else{
    changeScene(cenas.inicio)
}
 */
