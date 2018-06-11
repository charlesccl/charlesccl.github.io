class DrawingOval extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.radiusX = 0;
        this.radiusY = 0;
        this.orig = 0;
        this.controlPointArray = [];
        this.onControlPt = null;
        this.resizeMode = null;
        this.doneSizing = false;
        this.canMove = false;
        this.shiftOn = false;
        this.dragOrigDiff = null;
    }

    onMouseDown(coord, event) {
        if (this.controlPointArray.length !== 0) {
            this.onControlPt = ifOnPath(this.controlPointArray, coord);
        }
        if (!this.doneSizing) {
            this.orig = coord;
        } else if (this.onControlPt == this.controlPointArray[6]) {
            this.resizeMode = 'right';
        } else if (this.onControlPt == this.controlPointArray[1]) {
            this.resizeMode = 'left';
        } else if (this.onControlPt == this.controlPointArray[3]) {
            this.resizeMode = 'top';
        } else if (this.onControlPt == this.controlPointArray[4]) {
            this.resizeMode = 'bottom';
        } else if (this.onControlPt == this.controlPointArray[0]) {
            this.resizeMode = 'top-left';
        } else if (this.onControlPt == this.controlPointArray[2]) {
            this.resizeMode = 'bottom-left';
        } else if (this.onControlPt == this.controlPointArray[5]) {
            this.resizeMode = 'top-right';
        } else if (this.onControlPt == this.controlPointArray[7]) {
            this.resizeMode = 'bottom-right';
        } else {
            this.resizeMode = null;
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            if (Math.abs(this.dragOrigDiff[0]) <= this.radiusX && Math.abs(this.dragOrigDiff[1]) <= this.radiusY) {
                this.canMove = true;
            };
        };
    }
    
    onDragging(coord, event) {
        if (!this.doneSizing) {
            this.radiusX = Math.abs((this.orig[0] - coord[0]));
            this.radiusY = Math.abs((this.orig[1] - coord[1]));
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
        } else if (this.resizeMode === 'right' || this.resizeMode === 'left') {
            this.radiusX = Math.abs(coord[0] - this.orig[0]);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
        } else if (this.resizeMode === 'top' || this.resizeMode === 'bottom') {
            this.radiusY = Math.abs(coord[1] - this.orig[1]);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
        } else if (this.resizeMode === 'top-right' || this.resizeMode === 'top-left' || this.resizeMode === 'bottom-right' || this.resizeMode === 'bottom-left') {
            this.radiusX = Math.abs(coord[0] - this.orig[0]);
            this.radiusY = Math.abs(coord[1] - this.orig[1]);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
        } else if (this.canMove) {
                this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
                this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
            }
    }

    onMouseMove(coord) { }

    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.canMove = false;
                this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
            }
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }

    onRightClick(key) {
        if (this.doneSizing || key == 'doubletap') {
            this.drawOval(this.contextReal, this.orig, this.radiusX, this.radiusY);
            this.rectWidth = 0;
            this.rectHeight = 0;
            this.controlPointArray = [];
            this.onControlPt = null;
            this.resizeMode = null;
            this.doneSizing = false;
            this.canMove = false;
            this.dragOrigDiff = null;
            screenSave()
        }    
    }

    onKeyDown(key) {
        if (key === 16) {
            (this.shiftOn)? this.shiftOn = false : this.shiftOn = true;
        }
    }

    drawOval(context, coord, radiusX, radiusY) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.controlPointArray = [];
        context.beginPath();
        context.ellipse(coord[0], coord[1], radiusX, radiusY, 0, 0, 2 * Math.PI);
        context.fill();
        if (this.shiftOn) {
            (this.radiusX >= this.radiusY) ? this.radiusY = this.radiusX : this.radiusX = this.radiusY;
        };
        if (context != this.contextReal && !this.canMove) {
            drawControlPt(this.controlPointArray, [this.orig[0] - this.radiusX, this.orig[1] - this.radiusY], this.radiusX * 2, this.radiusY * 2);    
        }
    }
}