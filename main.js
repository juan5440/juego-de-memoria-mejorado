//iniciacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporalizador = false;
let timer = 60;
let tiempoRegresivoId = null;
let timerInicial = 60;

let clikAudio = new Audio('./saunds/boton.wav');
let corectoAudio = new Audio('./saunds/corecto.wav');
let falzoAudio = new Audio('./saunds/falzo.wav');
let parAudio = new Audio('./saunds/par.wav');
let unoAudio = new Audio('./saunds/1.wav');


//apuntando a documento HTML
let mostrandoMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Generacion de numeros aliatorios 
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

//funciones
function conatarTienpo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer < 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(numeros);
            falzoAudio.play();
            mostrarTiempo.innerHTML = `El tiempo a terminado vuelve a intentarlo 🥲`;
            setTimeout("location.href='index.html'", 5000);
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id) {
    if (temporalizador == false) {
        conatarTienpo();
        temporalizador = true;
    }


    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`;
        clikAudio.play();

        //desabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`;

        //desabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimiento
        movimientos++;
        mostrandoMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `aciertos: ${aciertos}`;
            corectoAudio.play();

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrandoMovimientos.innerHTML = `aciertos: ${aciertos} Felicidades!🥳`;
                mostrarTiempo.innerHTML = `Felicidades!🎉Sólo demorastes ${timerInicial - timer} segundos`;
                setTimeout("location.href='index.html'", 7000);
                mostrandoMovimientos.innerHTML = `Movimientos: ${movimientos}😎🤟`;

            }

        } else {
            unoAudio.play();
            //mostrar momentaneamente valores y volver tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}