








window.addEventListener('load', () => {
  anime({
    targets: '.lobby-button',
    translateY: '-43vh',
    scale: 1.75,
    duration: 1000,
    easing: 'easeInOutExpo',
  })

  setTimeout(() => {
    // Запускаем анимацию loading-animation через секунду после начала анимации
    document.querySelector('.lobby-button').classList.add('animate');

    // Анимация баров
    anime({
      targets: '.bar.a',
      height: [
        { value: '2px', duration: 200 },
        { value: '12px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '8px', duration: 200 },
        { value: '16px', duration: 200 },
        { value: '5px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '5px', duration: 200 },
        { value: '9px', duration: 200 },
        { value: '4.5px', duration: 200 }
      ],
      easing: 'easeOutSine'
    });

    anime({
      targets: '.bar.b',
      height: [
        { value: '15px', duration: 200 },
        { value: '5px', duration: 200 },
        { value: '16px', duration: 200 },
        { value: '6px', duration: 200 },
        { value: '12px', duration: 200 },
        { value: '16px', duration: 200 },
        { value: '6px', duration: 200 },
        { value: '15px', duration: 200 },
        { value: '5px', duration: 200 },
        { value: '12px', duration: 200 }
      ],
      easing: 'easeOutSine',
      delay: 150
    });

    anime({
      targets: '.bar.c',
      height: [
        { value: '4px', duration: 200 },
        { value: '18px', duration: 200 },
        { value: '8px', duration: 200 },
        { value: '14px', duration: 200 },
        { value: '2px', duration: 200 },
        { value: '15px', duration: 200 },
        { value: '7px', duration: 200 },
        { value: '11px', duration: 200 },
        { value: '2px', duration: 200 },
        { value: '9px', duration: 200 },
      ],
      easing: 'easeOutSine',
    });

    anime({
      targets: '.bar.d',
      height: [
        { value: '8px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '4px', duration: 200 },
        { value: '16px', duration: 200 },
        { value: '7px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '8px', duration: 200 },
        { value: '17px', duration: 200 },
        { value: '8px', duration: 200 },
        { value: '15px', duration: 200 },
      ],
      easing: 'easeOutSine',
      delay: 150
    });

    anime({
      targets: '.bar.e',
      height: [
        { value: '18px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '15px', duration: 200 },
        { value: '5px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '6px', duration: 200 },
        { value: '16px', duration: 200 },
        { value: '2px', duration: 200 },
        { value: '10px', duration: 200 },
        { value: '6px', duration: 200 },
      ],
      easing: 'easeOutSine',
    });

    anime({
      targets: '.lobby-button',
      scale: 5,
      opacity: [1, 0],
      duration: 400,
      easing: 'easeInOutExpo',
      delay: 2000,
    })



    setTimeout(() => {
      anime({
        targets: '.loading-page',
        opacity: 0,
        duration: 400,
        easing: 'easeInOutExpo',
        complete: () => {
          document.querySelector('.loading-page').remove();
        }
      });
    }, 2200);



  }, 700);
});
























































const Back = document.querySelector('#go-back')

Back.addEventListener('click', () => {
    window.history.back();
  });


const MoneyCircle = document.querySelector('.change');
const moneyCircleElement = document.querySelector('.money-circle');
const translateXValue = MoneyCircle.offsetWidth - moneyCircleElement.offsetWidth - 6;
let isMovingRight = true;

const balance = 500; // Объявляем переменную balance
const profitElement = document.getElementById('profit'); // Получаем доступ к элементу с числом
const textElement = document.querySelector('.gray-text'); // Получаем доступ к элементу с текстом
const Percent = document.querySelector('.percent');
let infoChanged = false; // Флаг, указывающий, была ли информация изменена
  
MoneyCircle.addEventListener('click', () => {
    infoChanged = false; // Сбрасываем флаг при каждом нажатии кнопки
    if (isMovingRight) {
      anime({
        targets: '.money-circle',
        translateX: `${translateXValue}px`,
        duration: 500,
        easing: 'easeInOutExpo',
        update: (anim) => {
          const progress = anim.currentTime;
          if (progress < 250) {
            profitElement.style.opacity = 1 - (progress / 250);
            textElement.style.opacity = 1 - (progress / 250);
            Percent.style.opacity = 1 - (progress / 250);
          } else {
            if (!infoChanged) {
              profitElement.textContent = balance;
              textElement.textContent = 'Current balance';
              infoChanged = true; // Устанавливаем флаг, чтобы не менять информацию снова
            }
            profitElement.style.opacity = (progress - 250) / 250;
            textElement.style.opacity = (progress - 250) / 250;
            Percent.style.opacity = 0;
            document.getElementById('lob-icon').style.display = 'none';
            document.getElementById('wal-icon').style.display = 'block';
          }
        },
        complete: () => {
          isMovingRight = false;
        }
      });
    } else {
      anime({
        targets: '.money-circle',
        translateX: '0',
        duration: 500,
        easing: 'easeInOutExpo',
        update: (anim) => {
          const progress = anim.currentTime;
          if (progress < 250) {
            profitElement.style.opacity = 1 - (progress / 250);
            textElement.style.opacity = 1 - (progress / 250);
            Percent.style.opacity = 0;
          } else {
            if (!infoChanged) {
              profitElement.textContent = 105;
              textElement.textContent = 'Investment profit';
              infoChanged = true; // Устанавливаем флаг, чтобы не менять информацию снова
            }
            profitElement.style.opacity = (progress - 250) / 250;
            textElement.style.opacity = (progress - 250) / 250;
            Percent.style.opacity = (progress - 250) / 250;
            document.getElementById('wal-icon').style.display = 'none';
            document.getElementById('lob-icon').style.display = 'block';
          }
        },
        complete: () => {
          isMovingRight = true;
        }
      });
    }
  });

















/*

// Объект с значениями last-percent для каждого блока
const lastPercentValues = {
  'last-a': 0,
  'last-b': 0,
  'last-c': 110,
  'last-d': 896
};

// Получаем все блоки.percent-item
const percentItems = document.querySelectorAll('.percent-item');

// Функция для подстановки значений переменных в HTML
function setLastPercentValues() {
  Object.keys(lastPercentValues).forEach((id) => {
    const percentItem = document.getElementById(id);
    const lastPercentElement = percentItem.querySelector('.last-percent');
    lastPercentElement.textContent = lastPercentValues[id];
  });
}

// Функция для выбора SVG-элемента в зависимости от значения last-percent
function chooseSvg(percentItem) {
  const lastPercentText = percentItem.querySelector('.last-percent').textContent;
  const lastPercent = parseInt(lastPercentText);

  let svgSrc;

  if (lastPercent === 0) {
    svgSrc = 'assets/0.svg';
  } else if (lastPercent >= 101 && lastPercent <= 139) {
    svgSrc = 'assets/1.svg';
  } else if (lastPercent >= 140 && lastPercent <= 299) {
    svgSrc = 'assets/2.svg';
  } else if (lastPercent >= 300) {
    svgSrc = 'assets/3.svg';
  }

  // Устанавливаем выбранный SVG-элемент
  percentItem.querySelector('.tt').src = svgSrc;
}

// Вызываем функцию для подстановки значений переменных в HTML
setLastPercentValues();

// Вызываем функцию для каждого блока.percent-item
percentItems.forEach((percentItem) => {
  chooseSvg(percentItem);
});


*/









const bigbox = document.querySelector('.bigbox');
const percentItemA = document.querySelector('.percent-item.a');
const percentItemB = document.querySelector('.percent-item.b');
const percentItemC = document.querySelector('.percent-item.c');
const percentItemD = document.querySelector('.percent-item.d');

// Объект с значениями last-percent для каждого блока
let lastPercentValues = {
    'last-a': 20,
    'last-b': 500,
    'last-c': 160,
    'last-d': 896
};

// Получаем все блоки .percent-item
const percentItems = document.querySelectorAll('.percent-item');

// Функция для подстановки значений переменных в HTML
function setLastPercentValues() {
    Object.keys(lastPercentValues).forEach((id) => {
        const percentItem = document.getElementById(id);
        const lastPercentElement = percentItem.querySelector('.last-percent');
        lastPercentElement.textContent = lastPercentValues[id];
    });
}

// Функция для выбора SVG-элемента в зависимости от значения last-percent
function chooseSvg(percentItem) {
    const lastPercentText = percentItem.querySelector('.last-percent').textContent;
    const lastPercent = parseInt(lastPercentText);

    let svgSrc;

    if (lastPercent === 0) {
        svgSrc = 'assets/0.svg';
    } else if (lastPercent >= 1 && lastPercent <= 139) {
        svgSrc = 'assets/1.svg';
    } else if (lastPercent >= 140 && lastPercent <= 299) {
        svgSrc = 'assets/2.svg';
    } else if (lastPercent >= 300) {
        svgSrc = 'assets/3.svg';
    }

    // Устанавливаем выбранный SVG-элемент
    percentItem.querySelector('.tt').src = svgSrc;
}

// Вызываем функцию для подстановки значений переменных в HTML
setLastPercentValues();

// Вызываем функцию для каждого блока .percent-item
percentItems.forEach((percentItem) => {
    chooseSvg(percentItem);
});

bigbox.addEventListener('click', () => {
    const timeline = anime.timeline({ loop: false, });

    timeline
        .add({ 
            targets: 
            percentItemD, 
            opacity: 0, 
            easing: 'easeOutSine', 
            duration: 800, 
        })
        .add({ 
            targets: ['.percent-item.a', '.percent-item.b', '.percent-item.c'], 
            marginLeft: '21.5vw', 
            easing: 'easeOutSine', 
            duration: 800, })
        .add({
            begin: () => {
                const percentItemD = document.querySelector('.percent-item.d');
                const percentItemC = document.querySelector('.percent-item.c');
                const percentItemB = document.querySelector('.percent-item.b');
                const percentItemA = document.querySelector('.percent-item.a');

                // Перемещение значений
                setTimeout(() => {
                percentItemD.innerHTML = percentItemC.innerHTML;
                percentItemD.style.opacity = 1;
              }, 5);
                
                setTimeout(function() {
                  percentItemC.style.opacity = 0;
                  percentItemC.style.marginLeft = '0';
                  percentItemC.innerHTML = percentItemB.innerHTML;
                  percentItemC.style.opacity = 1;
                
                  setTimeout(function() {
                    percentItemB.style.opacity = 0;
                    percentItemB.style.marginLeft = '0';
                    percentItemB.innerHTML = percentItemA.innerHTML;
                    percentItemB.style.opacity = 1;

                
                    setTimeout(function() {
                      percentItemA.style.opacity = 0;
                      percentItemA.style.marginLeft = '0';
                      percentItemA.innerHTML = `
                        <img src="assets/0.svg" alt="SVG Image" class="tt">
                        <div class="last-percent">55</div>
                      `;
                      chooseSvg(percentItemA);
                    }, 0); // задержка перед анимацией percentItemA
                  }, 3); // задержка перед анимацией percentItemB
                }, 5); // задержка перед анимацией percentItemC

                anime({
                    targets: percentItemA,
                    opacity: [0, 1],
                    easing: 'easeInOutSine',
                    duration: 800,
                    
                        
                    
                });
            }
        });

});


























const amounts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
let currentIndex = 0;
let currentAmountValue = amounts[currentIndex]; 
const betAmount = document.querySelector('.bet-amount');
let isAnimating = false;

const animationConfig = {
  duration: 300,
  easing: 'easeInOutExpo'
};

function changeAmount(direction) {
  if (isAnimating) return;
  isAnimating = true;

  let newIndex;
  const isMore = direction === 'more';

  if (isMore) {
    newIndex = (currentIndex + 1) % amounts.length;
  } else {
    newIndex = (currentIndex - 1 + amounts.length) % amounts.length;
  }

  // Анимация исчезновения текущего числа
  anime({
    targets: betAmount,
    translateY: isMore? '100%' : '-100%',
    opacity: 0,
   ...animationConfig,
    complete: () => {
      betAmount.innerText = amounts[newIndex];
      currentAmountValue = amounts[newIndex];
      currentIndex = newIndex;

      betAmount.style.transform = 'translateY(0)';
      betAmount.style.opacity = 0;

      // Анимация нового числа
      anime({
        targets: betAmount,
        translateY: isMore? ['-100%', '0%'] : ['100%', '0%'],
        opacity: [0, 1],
       ...animationConfig,
        complete: () => {
          isAnimating = false;
        }
      });
    }
  });
}

// Добавляем обработчики событий для кнопок "more" и "less"
const moreButton = document.querySelector('.bet-circle.more');
const lessButton = document.querySelector('.bet-circle.less');

moreButton.addEventListener('click', () => {
  changeAmount('more');
});

lessButton.addEventListener('click', () => {
  changeAmount('less');
});





















const BetIconElement = document.querySelector('.bet-icon');
const translateXBetBox = BetIconElement.offsetWidth + 6;

const buyButton = document.querySelector('.buy-button');
const betBox = document.querySelector('.bet-box');
const betCircleLess = document.querySelector('.bet-circle.less');
const betCircleMore = document.querySelector('.bet-circle.more');

buyButton.addEventListener('click', animateBetBox);

function animateBetBox() {
  // Создаем анимацию исчезновения кнопки buyButton
  anime({
    targets: buyButton,
    opacity: [1, 0], // Изменяем прозрачность от 1 до 0
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Уменьшаем ширину betBox
  anime({
    targets: betBox,
    width: `${translateXBetBox}px`, // Уменьшаем ширину
    height: `${translateXBetBox}px`,
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Вращаем элемент.bet-circle.less по часовой стрелке
  anime({
    targets: betCircleLess,
    rotate: ['0deg', '360deg'], // Вращаем от 0 до 360 градусов
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Вращаем элемент.bet-circle.more против часовой стрелки
  anime({
    targets: betCircleMore,
    rotate: ['0deg', '-360deg'], // Вращаем от 0 до -360 градусов
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Прячем.bet-amount в начале анимации
  anime({
    targets: document.querySelector('.bet-amount'),
    opacity: [1, 0], // Изменяем прозрачность от 1 до 0
    duration: 250,
    easing: 'easeInOutSine',
  });

  // Меняем иконку.bet-icon за 10 мс до конца анимации
  setTimeout(() => {
    const betIcons = document.querySelectorAll('.bet-icon');
    betIcons.forEach((icon) => {
      icon.src = 'assets/bet-tick.svg'; // Замените на новый адрес иконки
    });

    // Подпрыгиваем и исчезаем
    anime({
      targets: betBox,
      translateY: '-40%', // Подпрыгиваем
      opacity: [1, 0], // Исчезаем
      duration: 400,
      easing: 'easeInOutSine',
    });
  }, 240);
}

