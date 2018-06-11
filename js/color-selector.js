

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function update() {

    let hex = document.getElementById('color_value').value;
    contextDraft.fillStyle = '#' + hex;
    contextDraft.strokeStyle = '#' + hex;
    contextReal.fillStyle = '#' + hex;
    contextReal.strokeStyle = '#' + hex;
    rgb = hexToRgb(hex);

}