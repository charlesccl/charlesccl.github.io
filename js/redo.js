let tempSave = [];
let count = 0;

$(document).ready(() => screenSave());

function screenSave() {
    let newSave = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    tempSave = tempSave.slice(0, count).concat(newSave);
    (tempSave.length > 21) ? tempSave.shift() : null;
    count = tempSave.length;
}


$('#undo').click(() => {
    if (count > 1) {
        count -= 1;
        contextReal.putImageData(tempSave[count - 1], 0, 0);
    }
})

$('#redo').click(() => {
    if (count < tempSave.length) {
        count += 1;
        contextReal.putImageData(tempSave[count - 1], 0, 0);
    }
})