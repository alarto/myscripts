const sizeX = 10; //-- размерность поля по оси X
const sizeY = 10; //-- размерность поля по оси Y

let timerId; //-- таймер для того, чтобы вызывать функцию, которая отображает изменния на поле.

let actionSnake = 'down'; //-- направление движения змейки
let actionGame = 'stop'; //-- текущее состояние игры stop,play

let snake = [{x: 0, y: 0}]; //-- массив в котором храним координаты каждого элемента туловища змейки, присваиваем сразу координаты x=0 и y=0 ячейке массива с индексом "0" "голова змейки" (в текущей версии пока используем только ее голову, координаты которой хранятся в ячейке с индексом "0")
let apple = {x: 0, y: 0};

//-- Функция, которая присваевае ячейке поля по ее координатам, указанный в параметре "classCell" стиль CSS (с помощью стилей меняют отображение ячейки, например голова змейки, это закрашивание ячейки красным цветом)
function draw(point = {x ,y}, classCell) {
    let idCell = "x" + point.x + "y" + point.y;
    const cell = document.getElementById(idCell);
    if (cell) {
        cell.className = classCell;
    }
}

//-- Функция, которая окрашивает ячейку поля в первоначальный цвет, "стирает" змейку из этой ячейки
function clearCell(point = {x,y}) {
    draw(point, "cell")
}

//-- обработчик события окончание загрузки страницы
window.addEventListener("load", function () {

    //-- "рисуем" на поле "голову" змейки
    draw(snake[0], "head");

    //-- обрабатываем нажатия клавишь на клавиатуре
    document.addEventListener('keydown', function(event) {
        if ((event.code === 'ArrowRight') && (actionSnake !== 'left')) {
            actionSnake = 'right'
        } else if ((event.code === 'ArrowLeft') && (actionSnake !== 'right')) {
            actionSnake = 'left'
        } else if ((event.code === 'ArrowUp') && (actionSnake !== 'down')) {
            actionSnake = 'up'
        } else if ((event.code === 'ArrowDown') && (actionSnake !== 'up')) {
            actionSnake = 'down'
        } else if ((event.code === 'Space') && (actionGame !== 'stop')) {
            actionGame = 'stop';
            clearInterval(timerId);
        } else if ((event.code === 'Space') && (actionGame === 'stop')) {
            actionGame = 'play';
            timerId = setInterval(stepGame, 150);
        }
    });
});

//--
function stepGame()
{
    let x = snake[0].x;
    let y = snake[0].y;

    if (actionSnake === "left") {
        if(x > 0)
        {
            x -= 1;
        }
        else
        {
            x += 9;

        }
    } else if (actionSnake === "right")
    {
        if(x < sizeX - 1)
        {
            x += 1;
        }
        else
        {
            x -= 9;

        }
        
    } else if (actionSnake === "up")
    {
        if(y > 0)
        {
            y -= 1;
        }
        else
        {
            y += 9;
 
        }
        
    } else if (actionSnake === "down") 
    {
        if(y < sizeY - 1)
        {
            y += 1;
        }
        else
        {
            y -= 9;

        }
        
    }

    if ((x === snake[0].x) && (y === snake[0].y))
    {

    } else {
        clearCell(snake[0]);
        snake[0].x = x;
        snake[0].y = y;
        draw(snake[0], 'head');
    }
}