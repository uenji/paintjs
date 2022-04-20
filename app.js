//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// load시 백그라운드 화이트로 설정해줌
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(e) {
    painting = false;
}

function startPainting() {
    // painting = true;
    if(filling === false) {
        painting = true;
    }
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) { // painting if문이 true일 때 실행  // if(!painting) is the same as if(painting === false)
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { // painting if문이 false일 때 실행 => 클릭해서 그림을 그릴 때!
        ctx.lineTo(x, y); 
        ctx.stroke();
    }
}

// 색상변경
function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 범위
function chaneRange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
}

//fill 버튼 클릭
function handleModeClick(e) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}


//채우기
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg"); // png는 canvas.toDataURL() 이렇게 써주면 됨
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //우클릭 이벤트
}

Array.from(colors).forEach(potato => 
    potato.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", chaneRange);
}


if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
