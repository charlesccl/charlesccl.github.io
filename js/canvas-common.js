let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let toolBar = $('.toolBar');
contextReal.strokeStyle = "#000";
contextDraft.strokeStyle = "#000";
contextReal.fillStyle = "#000"
contextDraft.fillStyle = "#000"; //hexdeciaml color code for test
contextReal.lineWidth = 3;
contextDraft.lineWidth = 3;
let currentFunction;
let currentDrawBrush;
let currentMode = 'desktop';
let dragging = false;
let sides = 3;
let rgb = {r: 0, g: 0, b: 0};


function mobileMode() {
    currentMode = 'mobile';
    let hammertime = new Hammer(canvasDraft);
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on('pan panmove panstart panend pancancel singletap tap doubletap press swipe', function (ev) {
    });

    hammertime.on('doubletap', function (ev) {
        currentFunction.onRightClick(ev.type);
        screenSave();
    });
    
    hammertime.on('panstart', function (ev) {
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop - toolBar.outerHeight(true);;
        currentFunction.onMouseDown([mouseX, mouseY], ev);
        dragging = true;
    });

    hammertime.on('panmove', function (ev) {
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop - toolBar.outerHeight(true);;
        if (dragging) {
            currentFunction.onDragging([mouseX, mouseY], ev);
        }
    });

    hammertime.on('pan', function (ev) {
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop - toolBar.outerHeight(true);
            currentFunction.onMouseMove([mouseX, mouseY], ev);
    });


    hammertime.on('panend', function (ev) {
        dragging = false;
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop - toolBar.outerHeight(true);
        currentFunction.onMouseUp([mouseX, mouseY], ev);
    });
}

function desktopMode() {
    currentMode = 'desktop';
    $(window).keydown(event => {
        let key = event.which;
            currentFunction.onKeyDown(key);
    });

    $('#canvas-draft').contextmenu(function () {
        return false;
    });

    $('#canvas-draft').mousedown(function (e) {
        if (e.which === 1) {
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop - toolBar.outerHeight(true);
            currentFunction.onMouseDown([mouseX, mouseY], e);
            dragging = true;
        } else if (e.which === 3) {
            let key = e.which;
            currentFunction.onRightClick(key);
        }
    });
    $('#canvas-draft').mousemove(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop - toolBar.outerHeight(true);
        if (dragging) {
            currentFunction.onDragging([mouseX, mouseY], e);
        }
        currentFunction.onMouseMove([mouseX, mouseY], e);
    });
    $('#canvas-draft').mouseup(function (e) {
        dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop - toolBar.outerHeight(true);
        currentFunction.onMouseUp([mouseX, mouseY], e);
    });
    $('#canvas-draft').mouseleave(function (e) {
        dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop - toolBar.outerHeight(true);
        currentFunction.onMouseLeave([mouseX, mouseY], e);
    });
    
    $('#canvas-draft').mouseenter(function (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop - toolBar.outerHeight(true);
        currentFunction.onMouseEnter([mouseX, mouseY], e);
    });

}

$(document).ready(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() <= 770) {
        mobileMode();
    } else{
        desktopMode();
    }
});

class PaintFunction {
    constructor() { }
    onMouseDown() { }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
    onRightClick() { }
}    

