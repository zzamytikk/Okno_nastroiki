/*  ✪ https://zam.usite.pro/publ/1-1-0-5
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2024
*/
var zONas = {//Всплывающее окно (Настройки/Разное)
  //zONas.$();//★ Всплывающее окно (Настройки/Разное) (Запускаем)
  $: () => { //Вешаем click
    $('[class*="zONas-"]').find('>button:eq(0),:eq(0) button').each((i, e) => {
      if ($._data($(e)[0], 'events')?.click[0].namespace != 'zONas') { //Проверка ключа (Ключь не совпал! повесим обработчик)
        $(e).on('click.zONas', e => {zONas.C($(e.currentTarget))});
      } else {
        console.debug('Была попытка повторного запуска скрипта zONas.$();');
      }
    });
  },
  C: b => {//Обработка click (b = button)
    let R, d = b.closest('[class*="zONas-"]'),
      N=d.find('>div').eq(-1);
    
    if(d.hasClass('zONasO')){//Окно открыто (Закрываем)
      d.removeClass('zONasO')
    } else {//Открываем
      setTimeout(() => {
        $(document).on('click.zONas', e => {//• Клик вне элемента  $()
           //если клик был не по нашему блоку && и не по его дочерним элементам
            if (!N.is(e.target) && !N.has(e.target)[0]) {//Клик вне элемента
              $(document).off('.zONas');//† Удалим click
              d.removeClass('zONasO');//† Закрываем
            }
        });
      }, 1);//Убераем срабатывание click при открытии
    
      R = /zONas-[A-Z]/g.exec(d.attr('class'))[0].split('-')[1];//Расположение (T = Верх/B = Низ)
      
      zONas.w(d, N, R);//сменим направление
      d.addClass('zONasO');
    }
  },
  //d = parent('div'), n = next('div'), R = B(Верх) || T(Низ)
  w: (d, n, R) => {//Когда не помещяется на экране(горизонтально), сменим направление
    let O = 5,//Отступ от стенок
      o = n.offset(),//Координаты left|top относительно окна + прокрутка
      w = $(window).innerWidth(),//Размер браузер окна
      W = n.outerWidth(),//Размер всплыв окна
      //Не поместилось:
      x = o.left < O//меньше 0
        ? 1//С лева
        : (o.left + W + O) > w//(до рамки + рамка) > браузер окна
          ? 2//С права
          : 0;//всё норм
      
    //console.debug('Размер браузер окна:',w);
    //console.debug('Размер всплыв окна:',W);
    //console.debug('Координаты left относительно окна:', o.left);
    //console.debug('Left + всплыв окно:', o.left + W);
    
    if (x) {
      d.removeClass(function(i, c) { //Сработает 1 раз 
        return /zONas-[A-Z]+/g.exec(c);
      })
        .addClass('zONas-' + R + (x==1?'R':'L'))//Сменим сторону
    }
  }
};

/*
  ★    Название функции
  *     Описание
  •     Описание2
  ◈ ✂ ✓ ✪
  
  localStorage.setItem(key, value)
  localStorage.getItem(key)
*/

//#region       //✦ Уровень 1 ----

//#endregion    //✦ Уровень 1 ----

//#region           //✦✦ Уровень 2 ----

//#endregion        //✦✦ --------------