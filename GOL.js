let unitLength = 20;
let boxColor = 1;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let modelIsOpen = false;
let red;
let blue;
let green;
let fr = 10;
let radius = 0;
let tableSize = 360
let opa = 1
let backgroundColor = 'rgba(0,0,0,0)'
function setup() {

    red = color(255, 0, 0);
    blue = color(0, 0, 255);
    green = color(0, 255, 0);
    black = color(255, 255, 255)


    /* Set the canvas to be under the element #canvas*/
    let canvas = createCanvas(tableSize, tableSize);
    canvas.parent(document.querySelector('#canvas'));


    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }

    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard



}
function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}

function windowResized() {
    setup();
    draw()
}


function draw() {
    background(255);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill(boxColor);
            } else {
                fill(255);
            }
            stroke(strokeColor);
            // stroke(strokeColor);
            // noStroke()
            rect(i * unitLength, j * unitLength, unitLength, unitLength, radius);
        }


    }
    frameRate(fr)
}


let loneliness = 2
let Overpopulation = 3
let reproduction = 3

function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < loneliness) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > Overpopulation) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == reproduction) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }

    }


    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}



/**
 * When mouse is dragged
 */

function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    if (mouseX < 0 || mouseY < 0) {
        return;
    }
    if (modelIsOpen) {
        return
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}


function mousePressed() {
    noLoop();
    mouseDragged();
}


const buttonElement = document.getElementById('start-game');
buttonElement.addEventListener('click', function () {
    loop();
})

document.querySelector('#stop-game')
    .addEventListener('click', function () {
        init();

    });


document.querySelector('#reset-game')
    .addEventListener('click', function () {
        init();
        draw();
    });

document.querySelector('#randoms')
    .addEventListener('click', function () {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j] = random() > 0.8 ? 1 : 0;
                nextBoard[i][j] = 0;
            }
        }
        draw()
    }
    );

const speed = document.getElementById('speed');
speed.addEventListener('change', function () {
    fr = parseInt(speed.value)
    frameRate(fr);

})

const radiuss = document.getElementById('radous');
radiuss.addEventListener('change', function () {
    radius = parseInt(radiuss.value)

    init();
    draw()
})

const smallblock = document.getElementById('block-size');
smallblock.addEventListener('change', function () {
    unitLength = parseInt(smallblock.value)
    setup();
    draw()
})


const SIZE = document.querySelector('#size');
//for (i = 10; i < 100; i++) {
//    const SIZE_OPTION = new Option(i)
//    SIZE.add(SIZE_OPTION, undefined)
//}
SIZE.addEventListener('change', () => {
    tableSize = parseInt(SIZE.value)
    setup();
    draw()
})
let colorsInput = document.getElementById('colorcolor')
colorsInput.addEventListener('change', function () {
    boxColor = colorsInput.value


})

const introduction = document.getElementById('intro');
introduction.addEventListener('click', function () {
    modelIsOpen = true
})


const models = document.getElementById('setting');
models.addEventListener('click', function () {
    modelIsOpen = true
})


const cross = document.getElementById('modelclose');
const cross1 = document.getElementById('modelclose1');

let arr = [cross, cross1]

for (let ele of arr) {
    ele.addEventListener('click', function () {
        modelIsOpen = false
    })
}

const lonely = document.getElementById('loneliness')
lonely.addEventListener('change', function () {
    loneliness = lonely.value
})

const Overpo = document.getElementById('Overpopulation')
Overpo.addEventListener('change', function () {
    Overpopulation = Overpo.value
})

const repro = document.getElementById('reproduction')
repro.addEventListener('change', function () {
    reproduction = repro.value
})


//var canvas = document.getElementById('canvas');
//canvas.style.opacity=opa

const opacity = document.getElementById('opacity')
opacity.addEventListener('change', function () {

    opa = parseFloat(opacity.value)

    canvas.style.opacity = opa
    console.log(opacity.value)
    setup();
    draw()
})