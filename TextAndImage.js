class TextAndImage{
    constructor(image, text) {
        this.image = image;
        this.text = text;
    }

    draw(canvas) {
        this.image.draw(canvas);
        var canvasContext = canvas.getContext('2d');
        var text = this.text;
        setTimeout(function(){
            canvasContext.font = "40pt Calibri";
            canvasContext.fillStyle = '#ffffff'
            var lines = splitIntoLines(text, 4);
            for (var i = 0; i < lines.length; i += 1) {
                canvasContext.fillText(lines[i], 0, 450 + 50*i);
            }
        }, 1000);
    }
}
