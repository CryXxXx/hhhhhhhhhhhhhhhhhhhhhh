
/*
if (window.Telegram.WebApp.initDataUnsafe) {


  const userName = window.Telegram.WebApp.initDataUnsafe.user.first_name;
  document.getElementById('nickname').textContent = userName; 
  
  

  const userAvatar = window.Telegram.WebApp.initDataUnsafe.user.photo_url;
  document.getElementById('telegram_icon').src = userAvatar; 
  
  

  const tgId = window.Telegram.WebApp.initDataUnsafe.user.id;
  
  
*/



  fetch('http://127.0.0.1:8080/receive_tg_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 1 })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Сетевая ошибка при обращении к серверу');
    }
    return response.json();
  })
  .then(userData => {
    // Отображаем данные пользователя на сайте
    document.getElementById('tot-dep').textContent = userData.deposit;
    document.getElementById('profit').textContent = userData.windeposit;
    document.getElementById('tot-trade').textContent = userData.trades;
    document.getElementById('week-dep').textContent = userData.deposit;
    document.getElementById('week-trade').textContent = userData.trades;

    useData();
  })
  .catch((error) => {
    console.error('Ошибка:', error);
    document.getElementById('user-data').textContent = 'Ошибка при загрузке данных пользователя: ' + error.message;
  });
/*
  } else {
  document.getElementById('tg-id').textContent = 'Ошибка: initDataUnsafe не доступен.';
  document.getElementById('user-data').textContent = '';
  }

*/

























const ValCircle = document.querySelector('.convert');
const ValCircleElement = document.querySelector('.val-circle');
const translateXValue = ValCircle.offsetWidth - ValCircleElement.offsetWidth - 6;
let isMovingRight = true;


let originalTotDep;
let originalWeekDep;
let originalProfitAmount;

let TotDep;
let WeekDep;
let ProfitAmount;

function useData() {
  originalTotDep = parseFloat(document.getElementById('tot-dep').textContent);
  originalWeekDep = parseFloat(document.getElementById('week-dep').textContent);
  originalProfitAmount = parseFloat(document.getElementById('profit').textContent);

  TotDep = document.getElementById('tot-dep');
  WeekDep = document.getElementById('week-dep');
  ProfitAmount = document.getElementById('profit');

  ProfitAmount.textContent = formatNumber(parseFloat(ProfitAmount.textContent));
  TotDep.textContent = formatNumber(parseFloat(TotDep.textContent));
  WeekDep.textContent = formatNumber(parseFloat(WeekDep.textContent));

  

  ProfitAmount.classList.add('profit-amount-rub'); 

  bigNumElements = document.querySelectorAll('.big-num');
  bigNumElements.forEach((element) => {
    const num = parseFloat(element.textContent);
    const formattedNum = formatNumber(num);
    element.textContent = formattedNum;
  });
}







let exchangeRate = 86









function formatNumber(num) {
  if (num % 1 === 0) {
    return num.toLocaleString('en-US', { useGrouping: true });
  } else {
    return num.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}


ValCircle.addEventListener('click', () => {
  if (isMovingRight) {
    anime({
      targets: '.val-circle',
      translateX: `${translateXValue}px`,
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.currentTime;

        let ProfitAmountResult = formatNumber(originalProfitAmount / exchangeRate);
        let TotDepResult = formatNumber(originalTotDep / exchangeRate);
        let WeekDepResult = formatNumber(originalWeekDep / exchangeRate);

        if (progress < 250)
          {
          ProfitAmount.style.opacity = 1 - (progress / 250);
          TotDep.style.opacity = 1 - (progress / 250);
          WeekDep.style.opacity = 1 - (progress / 250);
        } 
        else {
          ProfitAmount.style.opacity = (progress - 250) / 250;
          TotDep.style.opacity = (progress - 250) / 250;
          WeekDep.style.opacity = (progress - 250) / 250;
          ProfitAmount.textContent = ProfitAmountResult;
          TotDep.textContent = TotDepResult;
          WeekDep.textContent = WeekDepResult;
          }

        if (progress >= 250) 
          {
          document.getElementById('rub').style.display = 'none';
          document.getElementById('dol').style.display = 'block';
          ProfitAmount.classList.remove('profit-amount-rub');
          ProfitAmount.classList.add('profit-amount-usd');
          } 

      },
      complete: () => {
        document.getElementById('dol').style.display = 'block';
        document.getElementById('rub').style.display = 'none';
        isMovingRight = false;
      }
    });
  } else {
    anime({
      targets: '.val-circle',
      translateX: '0',
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.currentTime;

        let TotDepNumber = formatNumber(originalTotDep);
        let WeekDepNumber = formatNumber(originalWeekDep);
        let ProfitAmountNumber = formatNumber(originalProfitAmount);

        if (!isMovingRight && progress < 250)
          {
          ProfitAmount.style.opacity = 1 - (progress / 250);
          TotDep.style.opacity = 1 - (progress / 250);
          WeekDep.style.opacity = 1 - (progress / 250);
          } 
        else
          {
          ProfitAmount.style.opacity = (progress - 250) / 250;
          TotDep.style.opacity = (progress - 250) / 250;
          WeekDep.style.opacity = (progress - 250) / 250;
          TotDep.textContent = TotDepNumber;
          WeekDep.textContent = WeekDepNumber;
          ProfitAmount.textContent = ProfitAmountNumber;
          }

        if (!isMovingRight && progress >= 250) {
          document.getElementById('dol').style.display = 'none';
          document.getElementById('rub').style.display = 'block';
          ProfitAmount.classList.remove('profit-amount-usd');
          ProfitAmount.classList.add('profit-amount-rub');
        } 
      },
      complete: () => {
        document.getElementById('rub').style.display = 'block';
        document.getElementById('dol').style.display = 'none';
        isMovingRight = true;
      }
    });

  }
});


































const MovCircle = document.querySelector('.upgrade-rectangle');
const RefRectangle = document.querySelector('.upgrade-rectangle');
const RefCircle = document.querySelector('.black-circle');
const translateXRef = RefRectangle.offsetWidth - RefCircle.offsetWidth - 6;
let hasMoved = false; 




MovCircle.addEventListener('click', () => {

  if(!hasMoved) {
    hasMoved = true;

let clipProgress = 0; // Переменная для отслеживания прогресса обрезки
let clipDelay = 140; // Задержка обрезки в мс

// Получаем текстовые элементы
const upgradeText = document.getElementById('upgrade');
const newText = document.getElementById('pers-code'); // Новый текстовый элемент
const shareCircles = document.querySelectorAll('.share-circle')

anime({
  targets: '.black-circle',
  translateX: `-${translateXRef}px`,
  duration: 500,
  easing: 'easeInOutExpo',
  update: (anim) => {
    const progress = anim.progress;

    if (progress > 50) {
      document.getElementById('people').style.display = 'none';
      document.getElementById('share').style.display = 'block';
    }

    // Анимация исчезновения текста "UPGRADE" справа налево
    if (progress >= (clipDelay / 500) * 100) {
      clipProgress = progress - (clipDelay / 500) * 100;
      upgradeText.style.clipPath = `inset(0 ${clipProgress * 3.9}% 0 0)`;
    }

    // Анимация появления нового текста справа налево
    if (progress >= (clipDelay / 500) * 100) {
      newText.style.clipPath = `inset(0 0 0 ${100 - (clipProgress * 3.9)}%)`;
      newText.classList.add('on');
    }
  },
  complete: () => {
    // Убедиться, что правый икон останется виден
    document.getElementById('share').style.display = 'block';
    document.getElementById('people').style.display = 'none';
    upgradeText.classList.add('off');
    
    
  },
});

anime({
      targets: '#next',
      opacity: [0, 1],
      translateX: '-150%',
      translateY: '-100%',
      duration: 300,
      easing: 'easeInOutExpo',
      delay: 200
    });


    anime({
      targets: '#copy',
      opacity: [0, 1],
      translateX: '-150%',
      translateY: '100%',
      duration: 300,
      easing: 'easeInOutExpo',
      delay: 200
    });


}

else {
  hasMoved = false;

  let clipProgress = 0; // Переменная для отслеживания прогресса обрезки
  let clipDelay = 140; // Задержка обрезки в мс
  const upgradeText = document.getElementById('upgrade');
  const newText = document.getElementById('pers-code'); // Новый текстовый элемент

  anime({
      targets: '#next',
      opacity: [1, 0],
      translateX: 0,
      translateY: 0,
      duration: 300,
      easing: 'easeInOutExpo',
    });


    anime({
      targets: '#copy',
      opacity: [1, 0],
      translateX: 0,
      translateY: 0,
      duration: 300,
      easing: 'easeInOutExpo',
    });


  anime({
  targets: '.black-circle',
  translateX: 0,
  duration: 500,
  easing: 'easeInOutExpo',
  update: (anim) => {
    const progress = anim.progress;

    if (progress > 50) {
      document.getElementById('people').style.display = 'block';
      document.getElementById('share').style.display = 'none';
    }

    // Анимация исчезновения текста "UPGRADE" справа налево
    if (progress >= (clipDelay / 500) * 100) {
      clipProgress = progress - (clipDelay / 500) * 100;
      upgradeText.style.clipPath = `inset(0 ${(100 - clipProgress * 3.9)}% 0 0)`;
      upgradeText.classList.remove('off')
    }

    // Анимация появления нового текста справа налево
    if (progress >= (clipDelay / 500) * 100) {
      newText.style.clipPath = `inset(0 0 0 ${clipProgress * 3.9}%)`;

    }
  },
  complete: () => {
    // Убедиться, что правый икон останется виден
    document.getElementById('share').style.display = 'none';
    document.getElementById('people').style.display = 'block';
    newText.classList.remove('on');
  }
});
}


});




























const ProfPage = document.getElementById('prof-but');
ProfPage.addEventListener('click', () => {
  window.location.href = 'index.html';
});



const WalPage = document.getElementById('wal-but');
WalPage.addEventListener('click', () => {
  window.location.href = 'wallet.html';
});



const loadingPage = document.createElement('div');
loadingPage.classList.add('loading-page');
document.body.appendChild(loadingPage);

const LobbyPage = document.getElementById('main-but');
LobbyPage.addEventListener('click', () => {

  loadingPage.classList.add('on');
  anime({
    targets: loadingPage,
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 160,
    complete: () => {
      window.location.href = 'lobby.html';
      
    }
  });

});



















const moreButton = document.querySelector('.more');
const progContainer = document.querySelector('.prog-container');
const blurOverlay = document.createElement('div');
blurOverlay.classList.add('blur-overlay');
document.body.appendChild(blurOverlay);

moreButton.addEventListener('click', () => {
  blurOverlay.classList.add('show');
  anime({
    targets: blurOverlay,
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 250,
  });
  anime({
  targets: progContainer,
  top: ['100vh', '20vh'],
  easing: 'easeInOutSine',
  duration: 250,
});

});

blurOverlay.addEventListener('click', () => {

  anime({
    targets: progContainer,
    top: ['20vh', '100vh'],
    easing: 'easeInOutSine',
    duration: 250,
  });
  anime({
    targets: blurOverlay,
    opacity: [1, 0],
    easing: 'easeInOutSine',
    duration: 250,
    complete: function() {
        blurOverlay.classList.remove('show');
      }
  });
});












const priorityLevelElements = document.querySelectorAll('#priority-level');
const bonusPercentElement = document.querySelector('.bonus-percent');
const inviteAmountElement = document.querySelector('.invite-amount');
const progressBarElement = document.querySelector('.progress-bar');
const liquidSvgElement = document.querySelector('.liquid-svg');

// задаем переменную для invite-amount
let inviteAmount = 0; // примерное значение


// функция для обновления контента элементов
function updateContent() {
  if (inviteAmount >= 0 && inviteAmount <= 4) {
    priorityLevelElements.forEach((element) => {
      element.textContent = 'Xs';
    });
    bonusPercentElement.textContent = '3';
    inviteAmountElement.dataset.slash = '/5';
  } else if (inviteAmount >= 5 && inviteAmount <= 14) {
    priorityLevelElements.forEach((element) => {
      element.textContent = 'S';
    });
    bonusPercentElement.textContent = '5';
    inviteAmountElement.dataset.slash = '/15';
  } else if (inviteAmount >= 15 && inviteAmount <= 29) {
    priorityLevelElements.forEach((element) => {
      element.textContent = 'M';
    });
    bonusPercentElement.textContent = '7';
    inviteAmountElement.dataset.slash = '/30';
  } else if (inviteAmount >= 30 && inviteAmount <= 49) {
    priorityLevelElements.forEach((element) => {
      element.textContent = 'L';
    });
    bonusPercentElement.textContent = '10';
    inviteAmountElement.dataset.slash = '/50';
  } else if (inviteAmount >= 50) {
    priorityLevelElements.forEach((element) => {
      element.textContent = 'L';
    });
    bonusPercentElement.textContent = '10';
    inviteAmountElement.dataset.slash = '';
  }
  inviteAmountElement.textContent = inviteAmount;

  if (inviteAmount === 0) {
    progressBarElement.src = 'assets/empty-bar.svg';
    liquidSvgElement.style.display = 'none';
  } else if (inviteAmount >= 1 && inviteAmount <= 49) {
    progressBarElement.src = 'assets/use-bar.svg';
    liquidSvgElement.style.display = 'block';
    const slashValue = inviteAmountElement.dataset.slash.replace('/', '');
    const progressValue = (1 - (inviteAmount / slashValue)) * 90;
    if (inviteAmount === 7) {
      liquidSvgElement.style.transform = `translateX(-53.5%)`;
    }
    else if (inviteAmount === 8 || inviteAmount === 9) {
      liquidSvgElement.style.transform = `translateX(-30%)`;
    }
    else if (inviteAmount === 17 || inviteAmount === 18) {
      liquidSvgElement.style.transform = `translateX(-38.9%)`;
    }
    else if (inviteAmount === 30) {
      liquidSvgElement.style.transform = `translateX(-34.3%)`;
    }
    else {
      liquidSvgElement.style.transform = `translateX(-${progressValue}%)`;
    }
  } else if (inviteAmount >= 50) {
    progressBarElement.src = 'assets/full-bar.svg';
    liquidSvgElement.style.display = 'none';
  }
}

updateContent();



