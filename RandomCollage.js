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

    draw(canvas, callback) {
        var y = canvas.height * this.y;
        var x = canvas.width * this.x;
        var canvasContext = canvas.getContext('2d');
        var toLoad = 4;
        this.image1.onload = function() { --toLoad; canvasContext.drawImage(this, 0, 0, x,            y            ); if (toLoad == 0) callback(); }
        this.image2.onload = function() { --toLoad; canvasContext.drawImage(this, x, 0, canvas.width, y            ); if (toLoad == 0) callback(); }
        this.image3.onload = function() { --toLoad; canvasContext.drawImage(this, 0, y, x,            canvas.height); if (toLoad == 0) callback(); }
        this.image4.onload = function() { --toLoad; canvasContext.drawImage(this, x, y, canvas.width, canvas.height); if (toLoad == 0) callback(); }
    }
}
