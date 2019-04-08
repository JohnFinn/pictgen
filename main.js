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
        console.log(text);
        setTimeout(function(){
            canvasContext.font = "40pt Calibri";
            canvasContext.fillStyle = '#ffffff'
            var lines = splitIntoLines(text, 4);
            for (var i = 0; i < lines.length; i += 1) {
                canvasContext.fillText(lines[i], 0, 500 + 50*i);
            }
        }, 1000);
    });
}

window.onload = main;
