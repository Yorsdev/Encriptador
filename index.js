var botonEncriptar = document.querySelector(".btn-encriptar");
var botonDesencriptar = document.querySelector(".btn-desencriptar");
var munieco = document.querySelector(".contenedor-munieco");
var h3 = document.querySelector(".contenedor-h3");
var parrafo = document.querySelector(".contenedor-parrafo");
var resultado = document.querySelector(".text-resultado"); //Contiene el contenido del parrafo en la seccion 2
var botonEscuchar = document.querySelector(".btn-escuchar");//Boton para escuchar por el navegador.
var botonCopiar = document.querySelector(".btn-copiar");//Boton del parrafo de la seccion 2
var textArea = document.querySelector(".area");
var seccionPrincipal = document.querySelector(".seccion1");//llamado a seccion1

//CORREGIR LA SALIDA DE LAS FUNCIONES

function validarMensaje() {
    //borrando errores 
    var erroresPrevios = seccionPrincipal.querySelectorAll(".error");
    for(var err of erroresPrevios) {
        seccionPrincipal.removeChild(err);
    }

    var mensaje = textArea.value;
    var letrasValidas = "abcdefghijklmnñopqrstuvwxyz ";
    var mensajeError = document.createDocumentFragment();

    for(var letra of mensaje) {
        if(!letrasValidas.includes(letra)) {
            var p = document.createElement("p");
            p.setAttribute("class", "error");
            p.textContent = `La letra ${letra} no es válida`;
            mensajeError.appendChild(p);
        }
    }

    seccionPrincipal.appendChild(mensajeError);

    if(mensajeError.children.length === 0) {
        return true;
    }
    return false;
    
}


function encriptar() {
    ocultarFront();
    var area = recuperarTexto();
    resultado.textContent = encriptarTexto(area);
    if(!validarMensaje()) return;
}

function desencriptar() {
    ocultarFront();
    var area = recuperarTexto();
    resultado.textContent = desencriptarTexto(area);
    if(!validarMensaje()) return;
}

function recuperarTexto() {
    var area = document.querySelector(".area");
    return area.value;
}

function ocultarFront() {
    munieco.classList.add("ocultar");
    h3.classList.add("ocultar");
    parrafo.classList.add("ocultar");
}

function encriptarTexto(mensaje) {
    var texto = mensaje;
    var textoFinal = "";
                                            /*Se realiza busqueda Indice por indice*/
    for(var i = 0; i < texto.length; i++) {
        if(texto[i] == "a") {
            textoFinal += "ai";
        }
        else if(texto[i] == "e") {
            textoFinal += "enter";
        }
        else if(texto[i] == "i") {
            textoFinal += "imes";
        }
        else if(texto[i] == "o") {
            textoFinal += "ober";
        }
        else if(texto[i] == "u") {
            textoFinal += "ufat";
        }else {
            textoFinal += texto[i];
        }    
    }
    return textoFinal;

    
}

function desencriptarTexto(mensaje) {
    var texto = mensaje;
    var textoFinal = "";
                                            /*Cuando se encuentra la letra seleccionada en el indice, se saltea su valor esperado: u(ufat) u + 3*/
    for(var i = 0; i < texto.length; i++) {
        if(texto[i] == "a") {
            textoFinal += "a";
            i += 1;
        }
        else if(texto[i] == "e") {
            textoFinal += "e";
            i+= 4;
        }
        else if(texto[i] == "i") {
            textoFinal += "i";
            i += 3;
        }
        else if(texto[i] == "o") {
            textoFinal += "o";
            i += 3;
        }
        else if(texto[i] == "u") {
            textoFinal += "u";
            i += 3;
        }else {
            textoFinal += texto[i];
        }    
    }
    return textoFinal;
}


function copiar() {
    var mensajeEncriptado = resultado.textContent;
    navigator.clipboard.writeText(mensajeEncriptado);
}

function escuchar() {
    var mensajeEncriptado = resultado.textContent;
    let msg = new SpeechSynthesisUtterance();
    msg.text = mensajeEncriptado;
    msg.lang = "es-Es";
    window.speechSynthesis.speak(msg);
}


botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
botonCopiar.onclick = copiar;
botonEscuchar.onclick = escuchar;