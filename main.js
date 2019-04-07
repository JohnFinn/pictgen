function main() {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    var canvasContext = canvas.getContext('2d');
    var image = new Image();
    image.src = '1.jpg';
    image.onload = function(){
        console.log('image loaded');
        canvasContext.drawImage(image, 0, 0, 100, 100);
    };
}

window.onload = main;
