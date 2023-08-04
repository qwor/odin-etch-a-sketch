const modes = {
    COLOR: 0,
    RAINBOW: 1,
    ERASER: 2
}

const grid = document.querySelector('#grid')
const inputColorPen = document.querySelector('#color-pen')
const inputColorGrid = document.querySelector('#color-grid')
const btnColor = document.querySelector('#btn-color')
const btnRainbow = document.querySelector('#btn-rainbow')
const btnEraser = document.querySelector('#btn-eraser')
const btnClear = document.querySelector('#btn-clear')
const checkBorder = document.querySelector('#check-border')
const inputPx = document.querySelector('#px-input')
const outputPx = document.querySelector('#px-value')


let mode = modes.COLOR
let size = 16
let penColor = inputColorPen.value
let gridColor = inputColorGrid.value
let mouseDown = false

grid.onmousedown = e => mouseDown = true
grid.onmouseup = e => mouseDown = false

inputColorPen.oninput = e => penColor = e.target.value
inputColorGrid.oninput = e => {
    gridColor = e.target.value
    drawGrid()
}
btnColor.onclick = e => changeMode(modes.COLOR)
btnRainbow.onclick = e => changeMode(modes.RAINBOW)
btnEraser.onclick = e => changeMode(modes.ERASER)
btnClear.onclick = e => drawGrid()
checkBorder.oninput = e => grid.classList.toggle('border')
inputPx.oninput = e => {
    outputPx.textContent = e.target.value + ' px'
    size = e.target.value
    drawGrid()
}

function changeMode(newMode) {
    mode = newMode
    document.querySelectorAll('button').forEach(el => el.classList.remove('active'));
    let targetBtn = btnColor
    if (mode === modes.RAINBOW) {
        targetBtn = btnRainbow
    } else if (mode === modes.ERASER) {
        targetBtn = btnEraser
    }
    targetBtn.classList.add('active')
}
function changeCellColor(e) {
    if (e.type === 'mouseover' && !mouseDown) 
        return
    let targetColor
    switch(mode) {
        case modes.COLOR:
            targetColor = penColor
            break
        case modes.RAINBOW:
            let r = Math.round(Math.random() * 255)
            let g = Math.round(Math.random() * 255)
            let b = Math.round(Math.random() * 255)
            targetColor = `rgb(${r}, ${g}, ${b})`
            break
        case modes.ERASER:
            targetColor = gridColor
    }
    e.target.style.backgroundColor = targetColor
}

function drawGrid() {
    grid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`
    let nodes = []
    for (let i = 0; i < size ** 2; i++) {
        let node = document.createElement('div')
        node.style.backgroundColor = gridColor
        node.onmousedown = changeCellColor
        node.onmouseover = changeCellColor
        nodes.push(node)
    }
    grid.replaceChildren(...nodes)
}

drawGrid()
