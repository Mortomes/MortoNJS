function init() {
    var canvas = document.getElementById("MortoNJS");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.clientWidth, canvas.clientHeight);
    ctx.stroke();
}