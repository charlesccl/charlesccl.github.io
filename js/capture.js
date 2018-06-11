class Capture extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.orig = null;
        this.newOrig = [0, 0];
        this.capWidth = null;
        this.capHeight = null;
        this.doneSizing = false;
        this.canMove = false;
        this.dragOrigDiff = null;
        this.imgData = null;
        this.inAreaY = null;
        this.inAreaX = null;
    }
    onMouseDown(coord) {
        if (!this.doneSizing) {
            this.orig = coord;
        } else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            this.inAreaX = inArea(this.capWidth, this.dragOrigDiff[0]);
            this.inAreaY = inArea(this.capHeight, this.dragOrigDiff[1]);
            this.canMove = (this.inAreaX && this.inAreaY);
        }
    }
    onDragging(coord) {
        if (!this.doneSizing) {
            this.capWidth = coord[0] - this.orig[0];
            this.capHeight = coord[1] - this.orig[1];
            this.drawDotRect(this.contextDraft, this.orig, this.capWidth, this.capHeight);
        } else if (this.canMove) {
            this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
            this.drawDotRect(this.contextDraft, this.orig, this.capWidth, this.capHeight);
            this.drawCapture(this.contextDraft, this.orig, this.capWidth, this.capHeight);
        }
    }
    
    onMouseMove() { }
    
    onMouseUp(coord) {
        if (!this.doneSizing && !this.canMove) {
            this.imgData = contextReal.getImageData(this.orig[0], this.orig[1], this.capWidth, this.capHeight);
            this.drawCapture(this.contextDraft, this.orig, this.capWidth, this.capHeight);
            this.doneSizing = true;
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }
    onRightClick(key) {
        if (this.doneSizing && (key == 3 || key == 'doubletap')) {
            this.drawCapture(this.contextReal, this.orig, this.capWidth, this.capHeight);
            this.origin = null;
            this.capWidth = null;
            this.capHeight = null;
            screenSave()
        }
    }

    drawDotRect(context, coord, width, height) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        context.setLineDash([5]);
        context.rect(coord[0], coord[1], width, height);
        context.stroke();
        context.setLineDash([]);
    }
    
    drawCapture(context, orig, width, height) { 
        if(context == this.contextReal) {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        }
        let newCanvas = $("<canvas>")
            .attr("width", Math.abs(width))
            .attr("height", Math.abs(height))[0];
        newCanvas.getContext("2d").putImageData(this.imgData, 0, 0);
        if (!this.doneSizing) {
            this.contextReal.clearRect(orig[0], orig[1], width, height);
        };
        (width > 0) ? this.newOrig[0] = orig[0] : this.newOrig[0] = orig[0] + width;
        (height > 0) ? this.newOrig[1] = orig[1] : this.newOrig[1] = orig[1] + height;
        context.drawImage(newCanvas, this.newOrig[0], this.newOrig[1]);
    }
}

