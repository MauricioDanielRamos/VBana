let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;
const intentosMaximos = 3;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    if (intentos >= intentosMaximos) {
        asignarTextoElemento('p', 'Has alcanzado el número máximo de intentos. El juego ha terminado.');
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Ganaste un helado en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    } else {
        // El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor.');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor.');
        }
        limpiarCaja();
    }

    if (intentos >= intentosMaximos) {
        asignarTextoElemento('p', 'Has alcanzado el número máximo de intentos. El juego ha terminado.');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
    } else {
        // Si el número generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Llevate un helado acertando');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Asignar el manejador de eventos al botón de reiniciar
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

// Asignar el manejador de eventos al botón de verificar
document.getElementById('verificar').addEventListener('click', verificarIntento);

condicionesIniciales();
