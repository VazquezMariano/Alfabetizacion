document.addEventListener("DOMContentLoaded", function(){


    let arr = [

        {
            pregunta: "Árbol",
                opciones: [
                    {
                        id: 0, 
                        texto: "Marmol",
                        verdad: false
                    },
                    {
                        id: 1, 
                        texto: "Yarbol",
                        verdad: false
                    },
                    {
                        id: 2, 
                        texto: "Árbol",
                        verdad: true
                    }
                ]
        },
        {
            pregunta: "Perros",
                opciones: [
                    {
                        id: 0, 
                        texto: "Perros",
                        verdad: true
                    },
                    {
                        id: 1, 
                        texto: "Yerros",
                        verdad: false
                    },
                    {
                        id: 2, 
                        texto: "Canteros",
                        verdad: false
                    }
                ]
        },
        {
            pregunta: "Gatos",
                opciones: [
                    {
                        id: 0, 
                        texto: "Cuartos",
                        verdad: false
                    },
                    {
                        id: 1, 
                        texto: "Patos",
                        verdad: false
                    },
                    {
                        id: 2, 
                        texto: "Gatos",
                        verdad: true
                    }
                ]
        },
        {
            pregunta: "Pasteles",
                opciones: [
                    {
                        id: 0, 
                        texto: "Carteles",
                        verdad: false
                    },
                    {
                        id: 1, 
                        texto: "Cuarteles",
                        verdad: false
                    },
                    {
                        id: 2, 
                        texto: "Pasteles",
                        verdad: true
                    }
                ]
        }

    ]

    let opciones = document.querySelectorAll("li");
    let titulo = document.querySelector("h1");
    let iterador = 0;
    let puntos = 0;
    let resultados = document.querySelector(".resultados");
    let audioBien = new Audio('assets/bien.mp3');
    audioBien.volume = 0.3;
    let audioMal = new Audio('assets/mal.mp3');


    function cargarDatos(j){
        removerAtributos(j);
        titulo.textContent = arr[j].pregunta;
        for(let i = 0; i < arr[j].opciones.length; i++){
            opciones[i].textContent = arr[j].opciones[i].texto;
        }
    }

    function removerAtributos(j){
        for(let i = 0; i < arr[j].opciones.length; i++){
            opciones[i].classList.remove("correcto");
            opciones[i].classList.remove("erroneo");
        }
    }
    cargarDatos(iterador);

    opciones.forEach(elem => {
        elem.addEventListener("click", function (){
            let booleano = true;
            let resultado = document.querySelector(".cartel");
        
        
        for(let i = 0; i < arr[iterador].opciones.length; i++){
            if(elem.textContent === arr[iterador].opciones[i].texto && arr[iterador].opciones[i].verdad){
                elem.classList.toggle("correcto");
                booleano = false;
                puntos++;
                audioBien.play();
            }
        }

            if(booleano){
                elem.classList.toggle("erroneo");
                audioMal.play();
            }


            if(iterador + 1 < arr.length){
                setTimeout(function() {
                    cargarDatos(iterador + 1);
                    iterador = iterador + 1;
                    cargarBotones1();
                    cargarBotones2();
                }, 500);
            } else {
                resultado.innerHTML = "Puntaje: " + puntos + "/" + (arr.length);
                console.log(puntos);
                resultados.classList.add("visibilidad");
            }
        })
    })

    let botones1 = document.querySelectorAll(".boton1");
    let botones2 = document.querySelectorAll(".boton2");

    function partir(string){
        return string.split("").join("-");
    }

    function cargarBotones1(){
        for(let i = 0; i < botones1.length; i++){
            if(i === 0){
                botones1[i].setAttribute("string-sil", partir(titulo.textContent));
            } else {
                botones1[i].setAttribute("string-sil", partir(opciones[i - 1].textContent));
            }
        }
    }
    function cargarBotones2(){
        for(let i = 0; i < botones2.length; i++){
            if(i === 0){
                botones2[i].setAttribute("string-sil", titulo.textContent);
            } else {
                botones2[i].setAttribute("string-sil", opciones[i - 1].textContent);
            }
        }
    }
    cargarBotones1();
    cargarBotones2();
    botones1.forEach((elem, indx) => {
        elem.addEventListener("click", function(){
            let texto = elem.getAttribute("string-sil");
            hablar(texto);
            pintarLetraIndice(indx);
        })
    })
    botones2.forEach(elem => {
        elem.addEventListener("click", function(){
            let texto = elem.getAttribute("string-sil");
            hablar(texto);
        })
    })


    function hablar(texto){
        responsiveVoice.speak(texto, 'Spanish Female');
    }

    function pintarLetras(elem){
        let contenido = elem.textContent;
        let nuevoContenido = "";

        for (let i = 0; i < contenido.length; i++) {
            nuevoContenido = nuevoContenido + "<span>" + contenido.charAt(i) + "</span>";
        }

        elem.innerHTML = nuevoContenido;

        let spans = elem.querySelectorAll("span");

        spans.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add("letra");

                setTimeout(() => {
                    el.classList.remove("letra");

                    if (index === spans.length - 1) {
                        setTimeout(() => {
                            elem.innerHTML = contenido;
                        }, 430);
                    }
                }, 430);

            }, index * 430);
        });
    }

    function pintarLetraIndice(indx){
        if(indx === 0){
            pintarLetras(titulo);
        } else {
            pintarLetras(opciones[indx - 1]);
        }
    }

    let botonJugarAgain = document.querySelector(".jugarOtraVez");

    botonJugarAgain.addEventListener("click", function() {
        resultados.classList.remove("visibilidad");
        iterador = 0;
        puntos = 0;
        cargarDatos(iterador);
    })
});