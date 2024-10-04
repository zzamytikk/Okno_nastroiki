/*  ✪ https://zam.usite.pro/publ/1-1-0-5
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2024
*/
var zONas = {//Всплывающее окно `Настройки/Разное`
  //F:$(),//Ожидается подгрузка содержания (zONas.$({F: () => {}});) Убераем запуск, когда нажали на другое окно
 
  /* <div class="zONas-TL all-c4">
       <button>button</button><!-- Ваша кнопка (Открыть/Закрыть Всплывающее окно (Настройки/Разное)) -->
       <div><div>Текст..</div></div>
     </div>
  */
  
  /*  //Запускает поиск всех class="zONas-.." (Кроме тех у которых установлен id="svoi"):
      zONas.$();//★ Всплывающее окно `Настройки/Разное` Запускаем!
       
        || • Вариант 2: 
      zONas.$({//★ Запускаем индивидуально для подгруза
        id: 'svoi', //Путь до <div id="svoi" class="zONas-
        on: 'input',
        
        F: (d, b, N) => { //Своя функция (Сработает при открытии окна)
          //d = $() //<div id="svoi" class="zONas-
          //b = $() //<button
          //N = $() //Путь до содержания окна
          
          $.ajax({
            url: '/testAjax.html',    //Куда отправить запрос.
            dataType: 'html',         // Тип данных в ответе (xml, json, script, html).
            success: function(htm){   // функция которая будет выполнена после успешного запроса.
        	   zONas.L(d, b, N, htm);
            }
          });
        }
      });
      
  */
  $: (q={}) => {//Вешаем click
    let O = zONas, on;
    
    if(!O.r) {
      O.oko(m => { //Отслеживаем изменения размера браузер окна
        let b,
          w = m.contentRect.width,
          h = m.contentRect.height;
  
        //Браузер oкно != Последняя запись проверки
        if (w != O.R || h != O.R) { //Изменили размер Браузер окна width
          b = $('.zONasO, .zONasOm');
  
          if (b[0]) { //Закроем
            //console.log('O.oko() Спрячим/Откроем');
            b = b.find('>button:eq(0),>:eq(0) button');
            O.C(b, 1);
            O.C(b, 2);
            //b.find('>button:eq(0),:eq(0) button')
              //.click() //Закроем
              //.click() //Откроем (Для точного отображения)
          }
  
          O.R = [w, h]; //Обновим
        }
      });
      
      O.r = 1;//Отмена на повторную установку
    }
  
    on = id => {//Вешаем click
      //console.debug('each', id);
        
      id.each((i, e) => {
        if ($._data($(e)[0], 'events')?.click[0].namespace != 'zONas') { //Проверка ключа `Ключь не совпал! повесим обработчик`
          $(e).on('click.zONas', e => {
            e.preventDefault();//Отменить выполнение действия для <a
            //console.debug('click');
            O.C($(e.currentTarget), q?.F);
          });
        } else {
          console.debug('Была попытка повторного запуска скрипта zONas.$();', e);
        }
       });
    };
    
    if(q.id && (q.id = $('body #' + q.id))[0]) {//По id="svoi"
      on(q.id);
    } else {//Поиск всех
      on($('[class*="zONas-"]').not('[id]').find('>button:eq(0),>:eq(0) button'))
    }
  },
  /* zONas.C(//Обработка
       $(),//id окна
       F   //Для запуска function при открытии окна. zONas.$(q);
           //• После именения размеров экрана .f.oko.$()
           //F=1 //Закроем окно
           //F=2 //Откроем
     );
  */
  C: (b, F) => {//Обработка click 'b = button'
    let d = b.closest('[class*="zONas-"]'),//Вокруг кнопки
      N = d.find('>div').eq(-1);//Содержание

    if(F == 1 || /zONasOm?/.test(d.attr('class'))){//Окно открыто `Закрываем`
      d.removeClass('zONasO zONasOm');
      N.removeAttr('style');
    } else {//Открываем
      let D = $(document),//Полный размер документа С прокруткой (Применять до display:'unset')
        w = D.outerWidth(),
        h = D.outerHeight();
        
      //console.debug(N.find('>div').html().replace(/[\r\n\t ]/g, '').length+' <= Количество символов содержания');
      if(!F && (N.find('>div').html() || '').replace(/[\r\n\t ]/g, '').length==0) {
        N.find('>div').html('<font color="red">Содержание отсутствует!</font>')
      }
      
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
      
      if (typeof F == 'function') {
        zONas.F=d;//Ожидается подгрузка содержания (zONas.$({F: () => {}});)
        d.addClass('zONasL');//Добавим загрузку
        F(d, b, N); return;
      } else if(zONas.F) {//Ждём подгрузки .html
        zONas.F.removeClass('zONasL');//Уберём загрузку
        zONas.F = 0;
      }
      
      N.css({display:'unset'});//Для определения: .offset()

      B = zONas.w(d, N, w, h);//сменим направление

      d.addClass(
        'zONasO'+ (B || d.width() < 40//Смещение окна || Когда маленькая кнопка
          ?'m'//Стрелка по центру кнопки 
          :'')
      );
    }
  },
  /* d = $() //<div id="svoi" class="zONas-
     b = $() //<button
     N = $() //Путь до содержания окна */
  L: (d, b, N, t) => {//Подгрузка содержимого
    //console.debug(zONas.F);
    if(zONas.F) {
      N.html(t);//Подгрузили текст
      zONas.C(b);//Откроем окно
      d.removeClass('zONasL');//Уберём загрузку
    }
  },
  //d = Вокруг кнопки`zONas-[A-Z]`, n = Содержание окна, D = Полный размер документа С прокруткой
  w: (d, n, w, h) => {//Когда не помещяется на экране`горизонтально`, сменим направление
    let B, O = 10,//Отступ от стенок
      o = n.offset(),//Координаты left|top относительно окна + прокрутка
      
      W = Math.round(n.outerWidth() + O),//Размер всплыв окна + отступ
      H = Math.round(n.outerHeight() + O),
     
      LW = Math.round(o.left + W),//До окна + окно = горизонт
      TH = Math.round(o.top + H),
      //       с лева || с права <= (Вышло за пределы)
      Lx = o.left < O || LW > w,//Окно не помещяется горизонт
      Tx = o.top < O || TH > h;//вертикаль
    
    /*console.debug('w: ' + w + ', h: ' + h+' <= Размер документа с прокруткой');
    console.debug('W: '+W+', H: '+H+' <= Размер окна');
    console.debug('o.left: ' + Math.round(o.left)+', o.top: ' + Math.round(o.top)+' <= Координаты до окна');
    console.debug('LW: '+LW+', TH: '+TH+' <= До окна + окно');
    console.debug(
      'Tx: top['+Math.round(o.top)+'] < ['+O+']O || TH['+TH+'] > ['+h+']h (' + (Tx ? 'Не ' : '') + 'помещается top) <= До окна + окно\n' +
      'Lx: left['+Math.round(o.left)+'] < ['+O+']O || LW['+LW+'] > ['+w+']w (' + (Lx ? 'Не ' : '') + 'помещается left)'
    );*/
    
    if (Lx || Tx) {//Не помещается
      //console.log('-');
      let S, C = 'zONas-';
      
      d.removeClass((i, c) => {//Сработает 1 раз 
        S = /zONas-[A-Z]+/.exec(c)[0];//Нашли zONas-..
        //S[6];//T = Верх   || B = Низ
        //S[7];//L = В лево || R = В право
        //console.debug('Удалили class: '+S);
        return S//Удаляем
      });
      
      //console.debug('if(o.top['+Math.round(o.top)+'] < ['+O+']O || TH['+TH+'] > ['+h+']h) => '+Tx);
      if (Tx) {//Не помещается вертикал. Меняем сторону
        C += S[6] == 'B'? 'T':'B';
        //console.debug((S[6] == 'B'? 'T':'B')+' <= Меняем сторону. '+C);
      } else {
        C+=S[6]
      }
      
      //console.debug('if(o.left['+Math.round(o.left)+'] < ['+O+']O || (до окна + окно)Lh['+Lh+'] > ['+w+']w) => '+Lx);
      if(Lx) {//Не помещается горизонт
        //console.debug('if((S[7]'+S[7]+'==`L` && (o.left['+Math.round(o.left)+'] < ['+O+']O && LW['+LW+'] > ['+w+']w)) || (S[7]'+S[7]+'==`R` && o.left['+Math.round(o.left)+'] > ['+W+']W)) => '+ ((S[7]=='L' && (o.left < O && LW > w)) || (S[7]=='R' && o.left > W)));
        //          с права есть место || с лева есть место <= (Вышло за пределы)
        if((S[7]=='L' && (o.left < O && LW > w)) || (S[7]=='R' && o.left > W)){//Меняем сторону
          C += S[7] == 'R'? 'L':'R';
          //console.debug((S[7] == 'R'? 'L':'R')+' <= Меняем сторону. '+C);
        } else {//Не можем сменить сторону `Не хватает места`
          C += S[7];//Оставим сторону и сместим окно
          //console.debug((S[7]=='R'?'left':'right')+': '+(S[7] == 'R' ?'w['+w+'] - ['+LW+']LW - ['+O+']O = '+(w - LW - O):'o.left['+o.left+']')+'px <= Сместим окно. '+C);
          
          n.css({[S[7]=='R'?'left':'right']:
            S[7]=='R'
              ? w - LW - O//Браузер окно - (До окна + окно) - Отступ от окна
              : o.left - O
          });
          
          B = 1;//Кнопку по центру
        }
      } else {
        C += S[7]
      }
  
      d.addClass(C)
    }

    return B
  },
  /* zONas.oko(m=>{//Отслеживаем изменения размера браузер окна
      console.debug(
        'Отслеживаем изменения размера браузер окна!',
        ' width:', m.contentRect.width,      //width
        '. height:', m.contentRect.height,   //height
        m
      );
  }); */
  //r: 1,//Установили слежку
  //R:[0, 0]//[width, height] Последний размер Браузер окна
  oko: f => {
    let M = window.ResizeObserver; //Отслеживаем изменения размера окна

    if (typeof M !== 'undefined') {
      zONas.db = new M(m => { //1~> Сработало! Наблюдение за обьектом
        f(m[0]);
        //m[0]//even
        //console.debug(m[0]);
      })
      .observe($('html')[0], {}); //Передаем элемент и настройки в наблюдатель
    }
  }
};
