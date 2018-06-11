/* Line width */
var lineWidth= document.getElementById("line-width");
var outputLine = document.getElementById("lineWidth");
outputLine.innerHTML = lineWidth.value;

lineWidth.oninput = function() {
  outputLine.innerHTML = this.value;
  contextReal.lineWidth = Number(this.value);
  contextDraft.lineWidth = Number(this.value);

}
/* plus  and minus section of Line width*/
document.getElementsByClassName("fa-plus")[0].addEventListener('click', () => {
  this.lineWidth.value++;
  outputLine.innerHTML = this.lineWidth.value;
  contextReal.lineWidth++;
  contextDraft.lineWidth++ ;
});

document.getElementsByClassName("fa-minus")[0].addEventListener('click', () => {
  this.lineWidth.value--;
  outputLine.innerHTML = this.lineWidth.value;
  contextReal.lineWidth--;
  contextDraft.lineWidth--;

});
/* Polygon side*/
var sideValue = document.getElementById("sides");
var outputSide = document.getElementById("sideValue");
outputSide.innerHTML = sideValue.value;

sideValue.oninput = function() {
  outputSide.innerHTML = this.value;
  sides = Number(this.value);
};

/* plus  and minus section of Polygon*/
document.getElementsByClassName("fa-plus")[1].addEventListener('click', () => {
  this.sideValue.value++;
  outputSide.innerHTML = this.sideValue.value;
  sides++;
});

document.getElementsByClassName("fa-minus")[1].addEventListener('click', () => {
  this.sideValue.value--;
  outputSide.innerHTML = this.sideValue.value;
  sides--;
});

