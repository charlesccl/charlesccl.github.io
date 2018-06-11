class ColorBucket extends PaintFunction {
    constructor(canvasReal, contextReal) {
        super();
        this.context = contextReal;
        this.canvas = canvasReal;
        this.imgDataArray = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
        let oldR, oldG, oldB, OldA;
    }

    onMouseDown(coord, event) {
        let pixelStack = [coord];
        let pixelStart = (coord[1] * this.canvas.width + coord[0]) * 4;
        let x, y;
        let hex = this.context.fillStyle;
        let fillR = parseInt(hex.slice(1, 3), 16);
        let fillG = parseInt(hex.slice(3, 5), 16);
        let fillB = parseInt(hex.slice(5, 7), 16);
        let opacity = 255;
        this.oldR = this.imgDataArray.data[pixelStart];
        this.oldG = this.imgDataArray.data[pixelStart + 1];
        this.oldB = this.imgDataArray.data[pixelStart + 2];
        this.oldA = this.imgDataArray.data[pixelStart + 3];

        if (!(fillR == this.oldR && fillG == this.oldG && fillB == this.oldB && this.oldA == opacity)) {
            while (pixelStack.length) {
                let newPixel = pixelStack.pop();
                x = newPixel[0];
                y = newPixel[1];
                let pixelPos = (y * this.canvas.width + x) * 4;

                while (y >= 0 && this.matchStartColor(pixelPos)) {
                    pixelPos -= this.canvas.width * 4;
                    y--;
                }

                pixelPos += this.canvas.width * 4;
                ++y;
                let leftDone = false;
                let rightDone = false;

                while (y <= this.canvas.height - 1 && this.matchStartColor(pixelPos)) {
                    this.colorPixel(pixelPos, fillR, fillG, fillB, opacity);

                    if (x > 0) {
                        if (this.matchStartColor(pixelPos - 4)) {
                            if (!leftDone) {
                                pixelStack.push([x - 1, y]);
                                leftDone = true;
                            }
                        } else if (leftDone) {
                            leftDone = false;
                        }
                    }

                    if (x <= this.canvas.width - 1) {
                        if (this.matchStartColor(pixelPos + 4)) {
                            if (!rightDone) {
                                pixelStack.push([x + 1, y]);
                                rightDone = true;
                            }
                        } else if (rightDone) {
                            rightDone = false;
                        }
                    }
                    y++;
                    pixelPos += this.canvas.width * 4;

                }
            }

        }
        this.context.putImageData(this.imgDataArray, 0, 0);
        screenSave();
    }

    matchStartColor(pos) {
        let NewR = this.imgDataArray.data[pos];
        let NewG = this.imgDataArray.data[pos + 1];
        let NewB = this.imgDataArray.data[pos + 2];
        let NewA = this.imgDataArray.data[pos + 3];
        return (NewR == this.oldR && NewG == this.oldG && NewB == this.oldB && NewA == this.oldA);
    }

    colorPixel(pos, colorR, colorG, colorB, opacity) {
        this.imgDataArray.data[pos] = colorR;
        this.imgDataArray.data[pos + 1] = colorG;
        this.imgDataArray.data[pos + 2] = colorB;
        this.imgDataArray.data[pos + 3] = opacity;
    }



    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
}