/*  ✪ https://zam.usite.pro/publ/1-1-0-5
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2024
*/
var zONas = {//Всплывающее окно `Настройки/Разное`
  //zONas.$();//★ Всплывающее окно `Настройки/Разное` Запускаем!
  $: () => { //Вешаем click
    let O = zONas;
    
    $('[class*="zONas-"]').find('>button:eq(0),:eq(0) button').each((i, e) => {
      if ($._data($(e)[0], 'events')?.click[0].namespace != 'zONas') { //Проверка ключа `Ключь не совпал! повесим обработчик`
        $(e).on('click.zONas', e => {O.C($(e.currentTarget))});
      } else {
        console.debug('Была попытка повторного запуска скрипта zONas.$();');
      }
    });
    O.oko(m => { //Отслеживаем изменения размера браузер окна
      let b,
        w = m.contentRect.width,
        h = m.contentRect.height;
    
      //Браузер oкно != Последняя запись проверки
      if (w != O.R || h != O.R) { //Изменили размер Браузер окна width
        b = $('.zONasO, .zONasOm');
          
        if(b[0]) {//Закроем
          //console.error('Закроем'); 
          b.find('>button:eq(0),:eq(0) button')
          .click()//Закроем
          .click()//Откроем (Для точного отображения)
        }

        O.R = [w, h]; //Обновим
      }
    });
  },
  /* zONas.C(//Обработка. Запуск: zONas.oko()//Отслеживаем изменения размера браузер окна
       $(),//id окна
       1   //Запускаем для проверки
     );
  */
  C: (b, x) => {//Обработка click 'b = button'
    let B, d = b.closest('[class*="zONas-"]'),//Вокруг кнопки
      N=d.find('>div').eq(-1);//Содержание
    
    if(!x && /zONasOm?/.test(d.attr('class'))){//Окно открыто `Закрываем`
      d.removeClass('zONasO zONasOm');
      N.removeAttr('style');
    } else {//Открываем/Проверка x=1
      if(!x) {
        setTimeout(() => {
          $(document).on('click.zONas', e => {//• Клик вне элемента  $()
             //если клик был не по нашему блоку && и не по его дочерним элементам
              if (!N.is(e.target) && !N.has(e.target)[0]) {//Клик вне элемента
                $(document).off('.zONas');//† Удалим click
                //d.removeClass('zONasO zONasOm');//† Закрываем
                //N.removeAttr('style');
              }
          });
        }, 1);//Убераем срабатывание click при открытии
      
        N.css({display:'unset'});//Для определения: .offset()
      }
      B = zONas.w(d, N);//сменим направление

      d.addClass(
        'zONasO'+ (B || d.width() < 40//Смещение окна || Когда маленькая кнопка
          ?'m'//Стрелка по центру кнопки 
          :'')
      );
    }
  },
  //d = Вокруг кнопки`zONas-[A-Z]`, n = Содержание окна
  w: (d, n) => {//Когда не помещяется на экране`горизонтально`, сменим направление
    let B, O = 5,//Отступ от стенок
      w = $(window).innerWidth(),//Размер браузер окна
      h = $(window).innerHeight(),
      o = n.offset(),//Координаты left|top относительно окна + прокрутка
      W = n.outerWidth() + O,//Размер всплыв окна + отступ
      H = n.outerHeight() + O,
     
      Lw = Math.round(o.left + W),//до окна + окно = горизонт
      Th = Math.round(o.top + H),
      //       с лева || с права <= (Вышло за пределы)
      Lx = o.left < 0 || Lw > w,//Окно не помещяется горизонт
      Tx = o.top < 0 || Th > h;//вертикаль
    
    console.debug('w: ' + w + ', h: ' + h+' <= Размер браузер окна');
    console.debug('W: ' + W + ', H: ' + H+' <= Размер окна');
    console.debug('left: ' + Math.round(o.left) + ', top: ' + Math.round(o.top) + ' <= Координаты до окна');
    console.debug(
      'Lx: o.left['+Math.round(o.left)+'] < 0 || Lw['+Lw+'] > ['+w+']w (' + (Lx ? 'Не ' : '') + 'помещается left) <= До окна + окно\n' +
      'Tx: o.top['+Math.round(o.top)+'] < 0 || Th['+Th+'] > ['+h+']h (' + (Tx ? 'Не ' : '') + 'помещается top)'
    );
    
    if (Lx || Tx) {//Не помещается
      let C = 'zONas-';
    
      d.removeClass(function(i, c) {//Сработает 1 раз 
        S = /zONas-[A-Z]+/.exec(c)[0];//Нашли zONas-..
        //S[6];//T = Верх   || B = Низ
        //S[7];//L = В лево || R = В право
        console.debug('Удалили class: '+S);
        return S//Удаляем
      });
      
      if (Tx) {//Не помещается вертикал. Меняем сторону
        C += S[6] == 'B'? 'T':'B';
        console.debug(S[6]+' <= Меняем сторону. '+C);
      } else {
        C+=S[6]
      }
      
      if(Lx) {//Не помещается горизонт
        //          с права есть место || с лева есть место <= (Вышло за пределы)
        if((S[6]=='L' && (o.left + W)) || S[6]=='R' && o.left > W){//Меняем сторону
          //console.debug(C);
          C += S[7] == 'R'? 'L':'R';
          //console.debug(S[7]+' <= Меняем сторону. '+C);
        } else {//Не можем сменить сторону `Не хватает места`
          C += S[7];//Оставим сторону и сместим окно
          
          n.css({[S[7]=='R'?'left':'right']:
            (w - O - Lw)//Браузер окно - отступ - (До окна + окно)
          });
          
          B = 1;//Кнопку по центру
          //console.debug((S[7]=='R'?'left':'right')+': '+(w - O - Lw)+ ' <= Сместим окно');
        }
      } else {
        C += S[7]
      }
  
      d.addClass(C)
    }
    //console.debug(d.attr('class'));
    return B
  },
  /* zMenu.f.oko(m=>{//Отслеживаем изменения размера браузер окна
      console.debug(
        'Отслеживаем изменения размера браузер окна!',
        ' width:', m.contentRect.width,      //width
        '. height:', m.contentRect.height,   //height
        m
      );
  }); */
  //R:[0, 0]//[width, height] Последний размер Браузер окна
  oko: f => {
    let M = window.ResizeObserver; //Отслеживаем изменения размера окна

    if (typeof M !== 'undefined') {
      new M(m => { //1~> Сработало! Наблюдение за обьектом
          f(m[0]);
          //m[0]//even
          //console.debug(m[0]);
        })
        .observe($('html')[0], {}); //Передаем элемент и настройки в наблюдатель
    }
  }
};
