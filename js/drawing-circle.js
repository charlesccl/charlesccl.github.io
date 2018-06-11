class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.orig = 0;
        this.radius = 0;
        this.controlPointArray = [];
        this.doneSizing = false;
        this.canMove = false;
        this.resizeMode = null;
        this.onControlPt = null;
        this.dragOrigDiff = null;
    }

    onMouseDown(coord, event) {
        if (this.controlPointArray.length !== 0) {
            this.onControlPt = ifOnPath(this.controlPointArray, coord);
        }
        if (!this.doneSizing) {
            this.orig = coord;
        } else if (typeof this.onControlPt !== 'undefined') {
            this.resizeMode = 'enable';
        } else {
            this.resizeMode = null;
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            if (Math.abs(this.dragOrigDiff[0]) <= this.radius && Math.abs(this.dragOrigDiff[1]) <= this.radius) {
                this.canMove = true;
            };
        };
    }

    onDragging(coord, event) {
        if (!this.doneSizing) {
            this.radius = this.calRadius(this.orig, coord);
            this.drawCircle(this.contextDraft, this.orig, this.radius);
        } else if (this.resizeMode === 'enable') {
            this.radius = this.calRadius(this.orig, coord);
            this.drawCircle(this.contextDraft, this.orig, this.radius);
        } else if (this.canMove) {
            this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
            this.drawCircle(this.contextDraft, this.orig, this.radius);
        }
    }

    onMouseMove(coord) {}

    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.canMove = false;
                this.drawCircle(this.contextDraft, this.orig, this.radius);
            }
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }

    onRightClick(key) {
        if (this.doneSizing && (key == 3 || key == 'doubletap')) {
            this.drawCircle(this.contextReal, this.orig, this.radius);
            this.orig = 0;
            this.radius = 0;
            this.controlPointArray = [];
            this.doneSizing = false;
            this.canMove = false;
            this.resizeMode = null;
            this.onControlPt = null;
            this.dragOrigDiff = null;
            screenSave()
        }
    }

    drawCircle(context, coord, radius) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.controlPointArray = [];
        context.beginPath();
        context.arc(coord[0], coord[1], radius, 0, 2 * Math.PI);
        context.fill();
        if (context != this.contextReal && !this.canMove) {
            drawControlPt(this.controlPointArray, [this.orig[0] - this.radius, this.orig[1] - this.radius], this.radius * 2, this.radius * 2);    
        }
    }

    calRadius(orig, coord) {
        return (Math.sqrt(Math.pow(orig[0] - coord[0], 2) + Math.pow(orig[1] - coord[1], 2)) / 2);
    }
    
}