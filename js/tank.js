//вызовы через:
// endGame();//конец игры с выводом времени
// startGame();//запуск игры
// pauseGame();//пауза игры
// draw(0, tankObject2, "left"); //ход танком вверх-вниз-право-лево
// draw(0, tankObject2, "left", "top")//ход танком по диагонали
// startGun();//выстрел из танка

var tankObject1 = document.getElementById("tank");
var tankObject2 = document.getElementById("tankEnemy");
var start; // тут хранить время начала
var handle; // через эту глобальную переменную будем останавилвать вот так: clearInterval(handle);
var timeOfGame = 717000; //сколько будет работать один сеанс игры до паузы
var timePassed; //тут будем хранить время, прошедшее ДО паузы, чтоб учитывать в общем времени игру ДО паузы через pauseGame()
var timeOfWholeGame = 0;// тут хранить длительность всей игры с учетом пауз

function startGame() {


    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
//метод был стандартизирован в ECMA-262 5-го издания. Отсутствие этого метода в движках,
// которые не были обновлены для его поддержки, можно обойти следующей прокладкой

    start = Date.now();// точка 1: взяли время старта функции startGame

    console.log("игра в конкретном сеансе стартовала в  " + new Date(start).toString().slice(16, -27));

    clearInterval(handle); // на всякий случай отменили этот же setInterval, если запущен уже
    handle = setInterval(function () {
        // вычислить сколько времени прошло с начала анимации
        timePassed = Date.now() - start;
        console.log("в этом сеансе прошло   " + timePassed / 1000 + "секунд");

        if (timePassed >= timeOfGame) {
            console.log("истекло максимальное время сеанса, оно составляло " + timeOfGame);
            clearInterval(handle); // конец через столько-то секунд
            return;
        }

        // получили случайное направление для вверх-вниз-вбок и для диагонали
        var randomDirection = getRandomDirection();
        var randomDirectionByDiagonal = getRandomDirection();
        //переместили объект согласно полученному случайному направлению
        draw(timePassed, tankObject1, randomDirection, randomDirectionByDiagonal);

    }, 1000)
}

function pauseGame() {
    timeOfWholeGame += timePassed / 1000; // плюсуем время конкрктного сеанса до pauseGame()
    console.log("запомнил, что до паузы в этом сеансе игры прошло   " + timePassed / 1000 + " секунд");
    console.log("сейчас общее время игры   " + timeOfWholeGame + " секунд");
    // добавляем время, которое прошло перед паузой через pauseGame()
    clearInterval(handle);
}

function endGame() {
    timeOfWholeGame += timePassed / 1000; // плюсуем время конкрктного сеанса до endGame()
    clearInterval(handle);
    if (timeOfWholeGame) console.log("игра длилась " + timeOfWholeGame + " сек.");
    else if (!timeOfWholeGame) console.log("нет данных о длительности игры");
    // start = Date.now();
    timeOfWholeGame = 0;
    console.log("конец игры, счетчик времени игры обнулён");
}

// тут примем любой танк-объект и его направления движения (1 напр-ние или, если диагональ, то 2)  и отрисуем смещение
function draw(timePassed, movingObject, direction, optionalDirection) {
    var lefter = getCssProperty(movingObject, "left");
    var topper = getCssProperty(movingObject, "top");
    console.log("lefter =   " + lefter);
    console.log("topper =   " + topper);

    switch (direction) {
        case "left":
            if (lefter <= 360) movingObject.style.left = lefter + 20 + 'px';
            if (optionalDirection === "top" && topper >= 20 ) movingObject.style.top = topper - 20 + 'px';
            if (optionalDirection === "bottom" && topper <= 360) movingObject.style.top = topper + 20 + 'px';
            break;
        case "right":
            if (lefter >= 20) movingObject.style.left = lefter - 20 + 'px';
            if (optionalDirection === "top" && topper >= 20 ) movingObject.style.top = topper - 20 + 'px';
            if (optionalDirection === "bottom" && topper <= 360) movingObject.style.top = topper + 20 + 'px';
            break;
        case "bottom":
            if (topper <= 360)  movingObject.style.top = topper + 20 + 'px';
            if (optionalDirection === "right" && lefter >= 20 ) movingObject.style.top = topper - 20 + 'px';
            if (optionalDirection === "left" && lefter <= 360) movingObject.style.top = topper + 20 + 'px';
            break;
        case "top":
            if (topper >= 20) movingObject.style.top = topper - 20 + 'px';
            if (optionalDirection === "right" && lefter >= 20 ) movingObject.style.top = topper - 20 + 'px';
            if (optionalDirection === "left" && lefter <= 360) movingObject.style.top = topper + 20 + 'px';
            break;

        default:
            movingObject.style.top = topper;
            movingObject.style.left = lefter;
    }


}

//получаем значение любого css-свойства
function getCssProperty(elem, property) {
    return parseFloat(window.getComputedStyle(elem, null).getPropertyValue(property));
}

//генерируем направления случайного сдвига
function getRandomDirection() {
    var randomNumber = Math.floor(11 * Math.random());
    //For a random integer in the range from M to N (where M and N are two integers, M < N) use:
    //num = Math.floor(M + (1+N-M)*Math.random())
    // num is random integer from M to N
    if (randomNumber < 2) return "right";
    if (randomNumber < 5) return "left";
    if (randomNumber < 8) return "top";
    if (randomNumber < 11) return "bottom";
}

//рисуем пулю
var gun = document.getElementById("gun1");
var start1 = Date.now(); // сохранить время начала
var handleGun;
function startGun() {
    start1 = Date.now();
    clearInterval(handle);
    handleGun = setInterval(function () {
        // вычислить сколько времени прошло с начала анимации
        var timePassed = Date.now() - start1;

        if (timePassed >= 9000) {
            clearInterval(handleGun); // конец через 2 секунды
            return;
        }

        // рисует состояние анимации, соответствующее времени timePassed
        drawGun(timePassed);

    }, 20);

    startGame();
}
//startGun();

// в то время как timePassed идёт от 0 до 2000
// left принимает значения от 0 до 400px
function drawGun(timePassed) {
    gun.style.left = timePassed / 10 + 'px';
}


//привязываем кнопки к конкретным вызовам
document.getElementById("up-button").onclick = toTop;
function toTop() {
    draw(0, tankObject2, "top");
}

document.getElementById("bottom-button").onclick = toBottom;
function toBottom() {
    draw(0, tankObject2, "bottom");
}

document.getElementById("right-button").onclick = toRight;
function toRight() {
    draw(0, tankObject2, "left");
}

document.getElementById("left-button").onclick = toLeft;
function toLeft() {
    draw(0, tankObject2, "right");
}

document.getElementById("left-up-button").onclick = toLeftUp;
function toLeftUp() {
    draw(0, tankObject2, "right", "top");
}

document.getElementById("left-bottom-button").onclick = toLeftBottom;
function toLeftBottom() {
    draw(0, tankObject2, "right", "bottom");
}

document.getElementById("right-up-button").onclick = toRightUp;
function toRightUp() {
    draw(0, tankObject2, "left", "top");
}

document.getElementById("right-bottom-button").onclick = toRightBottom;
function toRightBottom() {
    draw(0, tankObject2, "left", "bottom");
}

document.getElementById("shot-button").onclick = shot;
function shot() {
    startGun(); }

    document.getElementById("pause-button").onclick = toPause;
    function toPause() {
        pauseGame(); }

        document.getElementById("start-button").onclick = toStart;
        function toStart() {
            startGame();  }


document.getElementById("stop-button").onclick = toEnd;
function toEnd() {
    endGame();  }