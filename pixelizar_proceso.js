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
        bucle();
    } else {
        setTimeout("cargando()", 33);
    }
}


function bucle() {
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
	
	// Pasamos al siguiente "pixel". 
    posx += tampixel;
    if (posx>lienzo.width) {
        posx = 0;
        posy += tampixel;
    }
    if (posy > lienzo.height) {
        console.log("Pixelizacion completada");
        //contextofondo.clearRect(0, 0, lienzofondo.width, lienzofondo.height);
    } else {
        clearTimeout(temporizador);
	    temporizador = setTimeout("bucle()", 10);
    }
}

cargando();