/* https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf */

function exportCanvasAsPNG(canvas) {

    let fileName = prompt("Please enter file name:");
    if (!fileName) {
        fileName = "Untitled.png"
    }
    else {
        fileName += '.png'
    }
    var MIME_TYPE = "image/png";
    var imgURL = canvas.toDataURL(MIME_TYPE, 1);
    var dlLink = document.createElement('a');
    
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

function exportCanvasAsJPEG(canvas) {

    let fileName = prompt("Please enter file name:");
    if (!fileName) {
        fileName = "Untitled.jpeg"
    }
    else {
        fileName += '.jpeg'
    }
    var MIME_TYPE = "image/jpeg";
    var imgURL = canvas.toDataURL(MIME_TYPE, 1);
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}