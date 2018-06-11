class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.doneSizing= false;
        this.canMove = false;
        this.dragOrigDiff = null;
    }

    onMouseDown(coord) {
        if (!this.doneSizing) {
            this.orig = coord;
        }else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            if (Math.sqrt(Math.pow(this.dragOrigDiff[0], 2)
            + Math.pow(this.dragOrigDiff[1], 2)) <= this.radius) {
                this.canMove = true;
            };
        };
    }
    onDragging(coord) {
        if (!this.doneSizing) {
            this.radius = Math.sqrt(Math.pow((this.orig[0] - coord[0]), 2) 
            + Math.pow((this.orig[1] - coord[1]), 2));
            this.drawPolygon(this.contextDraft, this.orig, this.radius)
        } else {
            if (this.canMove) {
                    this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
                    this.drawPolygon(this.contextDraft, this.orig, this.radius)
                }
        }
    }
    onMouseMove() { }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }

    onRightClick(key) {
        if (this.doneSizing && (key == 3 || key == 'doubletap')) {
            this.drawPolygon(this.contextReal, this.orig, this.radius);
            this.doneSizing = false;
            this.canMove = false;
            this.dragOrigDiff = null;
            screenSave()
        }
    }

    drawPolygon(context, coord, radius) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        
        var angle = ((sides - 2) * 180) / sides;
        var coordinates = [],
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: coord[0] + this.radius * Math.cos(angle), y: coord[1] - this.radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
    context.fill();
}
    }
    

    
