function splitIntoLines(text, wordsInLine) {
    var words = text.split(' ');
    var linesAmount = Math.floor(words.length / wordsInLine);
    var lines = [];
    for (var line = 0; line <= linesAmount; line += 1) {
        lines.push(words.slice(line * wordsInLine, (line + 1) * wordsInLine).join(' '));
    }
    return lines;
}
