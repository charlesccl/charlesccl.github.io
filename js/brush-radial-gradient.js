class BrushRadialGradient extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.orig = null;
        this.pathSave = [];
        this.dragPathDiff = [];
        this.doneDrawing = false;
        this.canMove = false;
    }

    onMouseDown(coord, event) {
        if (!this.doneDrawing) {
            this.orig = coord;
            this.pathSave.push(coord);
        } else if (this.ifOnPath(coord)) {
            this.dragPathDiff = this.pathSave.map(point => {
                return [coord[0] - point[0], coord[1] - point[1]]
            });
            this.canMove = true;
        }

    }

    onDragging(coord, event) {
        if (!this.doneDrawing) {
            this.pathSave.push(coord);
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.drawfromPath(this.contextDraft);
        } else if (this.canMove) {
            this.pathSave = this.pathSave.map((point, index) => {
                return [coord[0] - this.dragPathDiff[index][0], coord[1] - this.dragPathDiff[index][1]];
            });
            this.drawfromPath(this.contextDraft);
        }
    }

    onMouseMove() { }

    onMouseUp(coord) {
        if (!this.doneDrawing) {
            this.doneDrawing = true;
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }

    onRightClick(key) {
        if (this.doneDrawing && (key == 3 || key == 'doubletap')) {
            this.drawfromPath(this.contextReal);
            this.pathSave = [];
            this.doneDrawing = false;
            this.canMove = false;
            screenSave()
        }
    }

    drawfromPath(context) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.pathSave.forEach((point, index) => {
            if (index === 0) {
                context.beginPath();
                context.moveTo(point[0], point[1]);
            }
            this.draw(context, point[0], point[1]);
        }, this);
    }

    draw(context, x, y) {
        context.lineTo(x, y);
        context.moveTo(x, y);
        context.stroke();
        context.closePath();
    }

    ifOnPath(coord) {
        let onPath = this.pathSave.filter(point => {
            if (Math.sqrt(Math.pow(coord[0] - point[0], 2) + Math.pow(coord[1] - point[1], 2)) <= 30) {
                return point;
            }
        }, this);
        return onPath[0];
    }


    draw(context, x, y) {
        var radgrad = context.createRadialGradient(
            x, y, 10, x, y, 20);
        radgrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b}, 1)`);
        radgrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.5)`);
        radgrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b}, 0)`);
        context.fillStyle = radgrad;
        context.fillRect(x - 20, y - 20, 40, 40);
    }

}