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
                d.removeClass('zONasO zONasOm');//† Закрываем
                N.removeAttr('style');
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
    let B, O = 12,//Отступ от стенок
      b = $(window),
      w = b.innerWidth(),//Размер браузер окна
      h = b.innerHeight(),
      sL = Math.round(b.scrollLeft()),//Отступ прокрутки
      sT = Math.round(b.scrollTop()),
      o = n.offset(),//Координаты left|top относительно окна + прокрутка
      //Ls = Math.round(sL + o.left),//Прокрутка + До окна
      //Ts = Math.round(sT + o.top),
      W = Math.round(n.outerWidth() + O),//Размер всплыв окна + отступ
      H = Math.round(n.outerHeight() + O),
     
      Lw = Math.round(o.left + W),//до окна + окно = горизонт
      Th = Math.round(o.top + H),
      //  с лева || с права <= (Вышло за пределы)
      Lx = o.left < O || Lw > w,//Окно не помещяется горизонт
      Tx = o.top < O || Th > h;//вертикаль
    
    console.debug('w: ' + w + ', h: ' + h+' <= Браузер окно');
    console.debug('W: '+W+', H: '+H+' <= Размер окна');
    console.debug('sL: ' + sL + ', sT: ' + sT+' <= scroll Прокрутка');
    console.debug('o.left: ' + Math.round(o.left)+', o.top: ' + Math.round(o.top)+' <= Координаты до окна');
    //console.debug('Ls: ' + Ls + ', Ts: ' + Ts +' <= Прокрутка + До окна');
    console.debug(
      'Lx: left['+Math.round(o.left)+'] < ['+O+']O || Lw['+Lw+'] > ['+w+']w (' + (Lx ? 'Не ' : '') + 'помещается left) <= До окна + окно\n' +
      'Tx: top['+Math.round(o.top)+'] < ['+O+']O || Th['+Th+'] > ['+h+']h (' + (Tx ? 'Не ' : '') + 'помещается top)'
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
      
      console.debug('if(o.top['+Math.round(o.top)+'] < ['+O+']O || (до окна + окно)Th['+Th+'] > ['+h+']h) => '+Tx);
      if (Tx) {//Не помещается вертикал. Меняем сторону
        C += S[6] == 'B'? 'T':'B';
        console.debug((S[6] == 'B'? 'T':'B')+' <= Меняем сторону. '+C);
      } else {
        C+=S[6]
      }
      
      //console.debug('if(o.left['+Math.round(o.left)+'] < ['+O+']O || (до окна + окно)Lh['+Lh+'] > ['+w+']w) => '+Lx);
      if(Lx) {//Не помещается горизонт
        console.debug('if((S[7]'+S[7]+'==`L` && (o.left['+Math.round(o.left)+'] < ['+O+']O && Lw['+Lw+'] > ['+w+']w)) || (S[7]'+S[7]+'==`R` && o.left['+Math.round(o.left)+'] > ['+W+']W)) => '+ ((S[7]=='L' && (o.left < O && Lw > w)) || (S[7]=='R' && o.left > W)));
        //          с права есть место || с лева есть место <= (Вышло за пределы)
        if((S[7]=='L' && (o.left < O && Lw > w)) || (S[7]=='R' && o.left > W)){//Меняем сторону
          C += S[7] == 'R'? 'L':'R';
          console.debug((S[7] == 'R'? 'L':'R')+' <= Меняем сторону. '+C);
        } else {//Не можем сменить сторону `Не хватает места`
          C += S[7];//Оставим сторону и сместим окно
          console.debug((S[7]=='R'?'left':'right')+': '+(S[7] == 'R' ?w - Lw:o.left)+'px <= Сместим окно. '+C);
          n.css({[S[7]=='R'?'left':'right']:
            S[7]=='R'
              ? w - Lw//Браузер окно - (До окна + окно)
              : o.left - O
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
