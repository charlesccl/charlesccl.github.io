 window.onload =  () => {
     if(window.innerWidth <= 992) {
         canvasReal.width = 812;
         canvasReal.height = 414;
         canvasDraft.width = 812;
         canvasDraft.height = 414;
     }
     else if (window.innerWidth <= 768) {
         canvasReal.width = 640;
         canvasReal.height = 360;
         canvasDraft.width = 640;
         canvasDraft.height = 360;
     }
     else if (window.innterWidth <= 576) {
         canvasReal.width = 486;
         canvasReal.height = 200;
         canvasDraft.width = 486;
         canvasDraft.height = 200;
     }
    }
 
 



