// Creamos el lienzo
var lienzo = document.getElementById("lienzo");
var lienzofondo = document.getElementById("lienzofondo");
var contexto = lienzo.getContext("2d");
var contextofondo = lienzofondo.getContext("2d");

var empezar = false;
var temporizador;

var posx = 0;
var posy = 0;
var color;
var colorR;
var colorG;
var colorB;
var tampixel = 15;

// Cargamos la imagen
var imagen = new Image();
imagen.onload = function() {empezar = true;};
imagen.src = "seta.jpg";


function cargando() {
    if (empezar) {                                                              // Cuando la imagen esta cargada pasamos a pixelarla
        console.log("PIXELIZAR");
        contextofondo.drawImage(imagen, 0, 0, lienzofondo.width, lienzofondo.height);
        pixelizar();
    } else {
        setTimeout("cargando()", 33);
    }
}


function pixelizar() {
    for (posy = 0; posy <= lienzofondo.height; posy+=tampixel) {
        for (posx = 0; posx <= lienzofondo.width; posx+=tampixel) {
            // Cogemos el color RGB del pixel
            color = contextofondo.getImageData(posx, posy, 1, 1);	// Miro el color en ese punto
            colorR = color.data[0];
            colorG = color.data[1];
            colorB = color.data[2];
            
            
            contexto.fillStyle = "rgb("+colorR+", "+colorG+", "+colorB+")";
            // Pixeliza con Rectangulos
            //contexto.fillRect(posx, posy, tampixel, tampixel);
            
            // Pixeliza con Circulos
        	contexto.beginPath();
        	contexto.arc(posx, posy, tampixel*0.5, 0, Math.PI*2, true);
        	contexto.fill();
        	contexto.closePath();
        }
    }
    
    console.log("Pixelizacion completada");
    //contextofondo.clearRect(0, 0, lienzofondo.width, lienzofondo.height);
}

cargando();
