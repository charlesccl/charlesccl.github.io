function uploadImage(ctx, canvas, event) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (event) {
        let img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }
}