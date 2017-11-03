var tankObject1 = document.getElementById("tank");
var tankObject2 = document.getElementById("tankEnemy");

var start  = Date.now(); // тут хранить время начала
var handle; // через эту глобальную переменную будем останавилвать вот так: clearInterval(handle);
var timeOfGame = 117000; //сколько будет работать вся игра


function startGame() {
    start = Date.now();
    clearInterval(handle);
    handle = setInterval(function () {
        // вычислить сколько времени прошло с начала анимации
        var timePassed = Date.now() - start;

        if (timePassed >= timeOfGame) {
            clearInterval(handle); // конец через столько-то секунд
            return;
        }

        // получили случайное направление
        var randomDirection = getRandomDirection();
        var randomDirection2 = getRandomDirection();
        //переместили объект согласно полученному случайному направлению
        draw(timePassed, tankObject1, randomDirection, randomDirection2);

    }, 1000)
}


function pauseGame() {
    clearInterval(handle);
}


function endGame() {
    var timeOfWholeGame = Math.floor((Date.now() - start)/1000);
    clearInterval(handle);
    console.log("игра длилась " + timeOfWholeGame + " сек.");
    // start = Date.now();
}

//endGame();
//startGame();
//pauseGame();
//draw(0, tankObject2, "left");


// тут примем любой танк-объект и его направления движения (1 напр-ние или, если диагональ, то 2)  и отрисуем смещение
function draw(timePassed, movingObject, direction, optionalDirection) {
    var lefter = getCssProperty(movingObject, "left");
    var topper = getCssProperty(movingObject, "top");

    //сдвинуть влево на 1 клетку
    if (direction == "left" || optionalDirection == "left") movingObject.style.left = lefter + 20 + 'px';

    //сдвинуть вправо на 1 клетку
    if (direction == "right" || optionalDirection == "right") movingObject.style.left = lefter - 20 + 'px';

    //сдвинуть вверх на 1 клетку
    if (direction == "bottom" || optionalDirection == "bottom") movingObject.style.top = topper + 20 + 'px';

    //сдвинуть вниз на 1 клетку
    if (direction == "top" || optionalDirection == "top") movingObject.style.top = topper - 20 + 'px';
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
    handleGun = setInterval(function() {
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




