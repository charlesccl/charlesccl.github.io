class Erasing extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        this.old = {};
    }
    onMouseDown(coord) {
        dragging = true;
        this.context.globalCompositeOperation = 'destination-out';
        this.old = { x: coord[0], y: coord[1] };
        this.context.beginPath();
        this.context.arc(this.old.x, this.old.y, 30, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
    };

    onMouseUp(coord) {
        dragging = false;
        this.context.globalCompositeOperation = 'source-over';
    };

    onMouseMove(coord) {
        if (dragging) {
            let x = coord[0];
            let y = coord[1];

            this.context.globalCompositeOperation = 'destination-out';
    
            this.context.beginPath();
            this.context.arc(x, y, 30, 0, 2 * Math.PI);
            this.context.fill();
    
            this.context.lineWidth = 20;
            this.context.beginPath();
            this.context.moveTo(this.old.x, this.old.y);
            this.context.lineTo(x, y);
            this.context.stroke();
            this.old = { x: x, y: y };
        }
    }

    onMouseLeave() {
            contextReal.globalComopositeOperation = "source-over";
    }
}
