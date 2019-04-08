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

function download_canvas(el) {
    var image = canvas.toDataURL('image/jpg');
    el.href = image;
};

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
    getQuote(function(text){
        console.log(text);
        var textAndImage = new TextAndImage(new RandomCollage(image1, image2, image3, image4), text);
        textAndImage.draw(canvas);
    });
    var saveButton = document.createElement('a');
    saveButton.innerText = 'save';
    saveButton.onclick   = 'download_canvas(this);';
    saveButton.download  = 'collage.jpg';
    saveButton.href      = '';
    document.body.appendChild(saveButton);
}

window.onload = main;
