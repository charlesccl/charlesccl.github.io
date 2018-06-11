class zoomIn extends PlainFunction {
    constructor(contextReal, contextDraft){
        super();
        this.context = contextReal;
        this.convas = canvasReal;
        this.orig = null;
        this.capWidth = null;
        this.capHeight = null;
    }
    onMouseDown(coord) {
        this.orig = coord;
     }
    onDragging(coord) {
        this.capWidth = coord[0] - this.orig[0];
        this.capHeight = coord[1] - this.orig[1];
     }
    onMouseMove() { }
    onMouseUp() {
        contextReal.getImageData(this.orig[0], this.orig[1], this.capWidth, this.capHeight);
    }
    onMouseLeave() { }
    onMouseEnter() { }
}
