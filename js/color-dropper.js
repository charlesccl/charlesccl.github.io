class Dropper extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
       // this.canvas = canvasReal;
    }
    onMouseDown(coord, event) {
        this.dropColor(coord);
     }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }

    dropColor(coord) {
        let color = this.context.getImageData(coord[0], coord[1], 1, 1);
        contextReal.fillStyle = "rgb(" + color.data[0] + "," + color.data[1] + "," + color.data[2] + ")";
        contextDraft.fillStyle = "rgb(" + color.data[0] + "," + color.data[1] + "," + color.data[2] + ")";
        contextReal.strokeStyle = "rgb(" + color.data[0] + "," + color.data[1] + "," + color.data[2] + ")";
        document.getElementsByClassName('jscolor')[0].style.backgroundColor = "rgb(" + color.data[0] + "," + color.data[1] + "," + color.data[2] + ")";
    }
}