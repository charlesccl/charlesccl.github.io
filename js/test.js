var text = "rgba(145,250,66,1)";
textArray = text.match(/[0-9,]/g).join('').split(',').map(data => { return Number(data) });