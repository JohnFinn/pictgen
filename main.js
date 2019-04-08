function randomBetween(from, to) {
    return from + Math.random() * (to - from);
}

class RandomCollage {
/*
    represents four images, and their relative sizes like in the picture below:
    +-------+
    |     | |
    |     | |
    |-----+-+ < y
    |     | |
    +-----+-+
          ^
          x
    where images are in the following order
    1 2
    3 4
*/

    /// accepts list of Image
    constructor(image1, image2, image3, image4) {
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        this.x = randomBetween(0.3, 0.7);
        this.y = randomBetween(0.3, 0.7);
    }

    draw(canvas) {
        var y = canvas.height * this.y;
        var x = canvas.width * this.x;
        var canvasContext = canvas.getContext('2d');
        this.image1.onload = function() { canvasContext.drawImage(this, 0, 0, x,            y);             }
        this.image2.onload = function() { canvasContext.drawImage(this, x, 0, canvas.width, y);             }
        this.image3.onload = function() { canvasContext.drawImage(this, 0, y, x,            canvas.height); }
        this.image4.onload = function() { canvasContext.drawImage(this, x, y, canvas.width, canvas.height); }
    }
}

function getQuote(callback){
    var request = new XMLHttpRequest({mozSystem: true});
    request.open('POST', 'https://api.forismatic.com/api/1.0/', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.onerror = function() {
        console.log('error loading text');
    };
    request.onload = function() {
        console.log('text loaded');
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.responseText, "text/xml");
        callback(xmlDoc.getElementsByTagName('quoteText')[0].textContent);
    };
    request.send('method=getQuote');
}

function main() {
    var canvas = document.createElement('canvas');
    canvas.height = 1000;
    canvas.width = 1000;
    document.body.appendChild(canvas);
    var image1 = new Image();
    image1.src = 'https://source.unsplash.com/collection/1127166';
    var image2 = new Image();
    image2.src = 'https://source.unsplash.com/collection/1127168';
    var image3 = new Image();
    image3.src = 'https://source.unsplash.com/collection/1127169';
    var image4 = new Image();
    image4.src = 'https://source.unsplash.com/collection/1127160';
    var collage = new RandomCollage(image1, image2, image3, image4);
    collage.draw(canvas);
    var canvasContext = canvas.getContext('2d');
    getQuote(function(text){
        setTimeout(function(){
            console.log(text);
            canvasContext.font = "40pt Calibri";
            canvasContext.fillStyle = '#ffffff'
            canvasContext.fillText(text, 0, 500);
        }, 2000);
    });
}

window.onload = main;
