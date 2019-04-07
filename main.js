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

function main() {
    var canvas = document.createElement('canvas');
    canvas.height = 1000;
    canvas.width = 1000;
    document.body.appendChild(canvas);
    var image1 = new Image();
    image1.src = 'https://source.unsplash.com/collection/1127167/500x500';
    var image2 = new Image();
    image2.src = 'https://source.unsplash.com/collection/1127168/500x500';
    var image3 = new Image();
    image3.src = 'https://source.unsplash.com/collection/1127169/500x500';
    var image4 = new Image();
    image4.src = 'https://source.unsplash.com/collection/1127160/500x500';
    var collage = new RandomCollage(image1, image2, image3, image4);
    collage.draw(canvas);
}

window.onload = main;
