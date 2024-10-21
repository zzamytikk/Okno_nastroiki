/*  ✪ https://zam.usite.pro/publ/1-1-0-5
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2024
*/
var zONas = {//Всплывающее окно `Настройки/Разное`
  //F:$(),//Ожидается подгрузка содержания (zONas.$({F: () => {}});) Убераем запуск, когда нажали на другое окно
  //F:1,//1 = Запрет на открытие окна. (Идёт ожидание ответа от function, загрузка другова окна)
  /* <div class="zONas-TL all-c4">
       <button>button</button><!-- Ваша кнопка (Открыть/Закрыть Всплывающее окно (Настройки/Разное)) -->
       <div><div>Текст..</div></div>
     </div>
  */
  
  /*  //Запускает поиск всех class="zONas-.." (Кроме тех у которых установлен id="svoi"):
      zONas.$();//★ Всплывающее окно `Настройки/Разное` Запускаем!
       
        || • Вариант 2:
      zONas.$({//★ Запускаем индивидуально для подгруза через $.ajax
        id: 'svoi', //Путь до <div id="svoi" class="zONas-
        
        F: (d, b, N) => { //Своя функция (Сработает при открытии окна)
          //Путь $() до: 
          //d = <div id="svoi" class="zONas-
          //b = <button
          //N = Содержания окна
          
          $.ajax({
            url: '/testAjax.html',    //Куда отправить запрос.
            dataType: 'html',         //Тип данных в ответе (xml, json, script, html).
            success: function(htm){   //Функция которая будет выполнена после успешного запроса.
        	   //Тут можно обработать до вывода:
        	   //htm=htm.replace(/удали меня/,'');
        	   zONas.L(d, b, N, htm);   //Выводим наш текст HTML
            }
          });
        }
      });
      
        || • Вариант 3:
      zONas.$({
        id: 'svoi2',
        F: (d, b, N) => { //Своя функция (Сработает при открытии окна)
          //Пути $() до: 
          //d = <div id="svoi" class="zONas-
          //b = <button
          //N = Содержания окна
          zONas.L(d, b, N, 'Содержание');
        }
      });
  */
  $: (q={}) => {//Вешаем click
    let O = zONas, on;
    /*
    if(!O.r) {//Не установили слежку
      O.oko(m => { //Отслеживаем изменения размера браузер окна
        let b,
          w = m.contentRect.width,
          h = m.contentRect.height;
        console.debug('изменения размера браузер окна');
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
  */
    on = id => {//Вешаем click
      //console.debug('each', id);
      id.each((i, e) => {
        if ($._data($(e)[0], 'events')?.click[0].namespace != 'zONas') { //Проверка ключа `Ключь не совпал! повесим обработчик`
          $(e).on('click.zONas', e => {
            if($(e.currentTarget)[0].nodeName=='A'){e.preventDefault();}//отменить выполнение действия для <a
            if (O.F) {
              //console.debug('Идёт ожидание ответа от function, загрузка другова окна');
              return;
            }
            
            O.C($(e.currentTarget), q?.F);
          });
        } else {
          console.debug('Была попытка повторного запуска скрипта zONas.$();', e);
        }
       });
    };
    
    if(q.id && (q.id = $('#' + q.id))[0]) {//По id="svoi"
      on(q.id.find('>button:eq(0),>:eq(0) button'));
    } else {//Поиск всех
      on($('[class*="zONas-"]').not('[id]').find('>button:eq(0),>:eq(0) button'))
    }
  },
  /* zONas.C(//Обработка
       $(),//id окна
       F   //function zONas.$({F: () => {}});
     );
  */
  C: (b, F) => {//Обработка click 'b = button'
    let O = zONas,
      d = b.closest('[class*="zONas-"]'),//Вокруг кнопки
      N = d.find('>div').eq(-1);//Содержание +ещё .find('>div')

    if(/zONasOm?/.test(d.attr('class'))){//Окно открыто `Закрываем`
      O.X(d);//Закроем окно
    } else {//Открываем
      let D = $(document),//Полный размер документа С прокруткой (Применять до display:'unset')
        w = D.outerWidth(),
        h = D.outerHeight();
        
      //console.debug(N.find('>div').html().replace(/[\r\n\t ]/g, '').length+' <= Количество символов содержания');
      if(!F && (N.find('>div').html() || '').replace(/[\r\n\t ]/g, '').length==0) {
        N.find('>div').html('<font color="red">Содержание отсутствует!</font>')
      }
      
      if (typeof F == 'function') {//Начали обработку function
        O.F = 1;
        //console.debug('Начали обработку function');
        d.addClass('zONasL');//Добавим загрузку
        O.T = setTimeout(() => { //setTimeout Для отмены задержки ожидания обработки функции 15сек
          console.debug('Отмена setTimeout');
          N.find('>div').html('<font color=red>Возникла ошибка!<br>Обработки function!</font>');
          O.C(b);
          d.removeClass('zONasL'); //Уберём загрузку
          O.F = 0;
        }, 15000);
        F(d, b, N.find('>div'));
        return;
      }
      
      setTimeout(() => {//Поможет закрыть другое открытое окно!
        //console.debug('Установим document', d.has(e.target));
        $(document).on('click.zONas', e => {//Клик вне элемента $()
          //console.debug('click из document');
          //если клик был не по нашему блоку && и не по его дочерним элементам
          if (!d.is(e.target) && !d.has(e.target)[0]) { //Клик вне элемента
            O.X(d);//Закроем окно
          }
        });
      }, 1);//Убераем срабатывание click при открытии
      
      N.css({display:'unset'});//Для определения: .offset()

      B = O.w(d, N, w, h);//сменим направление

      d.addClass(
        'zONasO'+ (B || d.width() < 40//Смещение окна || Когда маленькая кнопка
          ?'m'//Стрелка по центру кнопки 
          :'')
      );
      
      if(O.F){//function Загрузили и показали в окне.
        console.debug('Обработали function');
        clearTimeout(O.T);
        O.F = 0;
        d.removeClass('zONasL');//Уберём загрузку
      }
    }
  },
  X: d => {//O.X(d);//Закроем окно
      //console.debug('Закроем окно', d);
      $(document).off('.zONas');//† Удалим click вне элемента
      d.removeClass('zONasO zONasOm zONasL');//† Закрываем
      d.find('>div').removeAttr('style');//удаляем
  },
  //T:0,//setTimeout Для отмены задержки ожидания обработки функции 15сек
  /* d = $() //<div id="svoi" class="zONas-
     b = $() //<button
     N = $() //Путь до содержания окна */
  L: (d, b, N, t) => {//Подгрузка содержимого
    //console.debug('Подгрузка содержимого', zONas.F);
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
  //db: //Установили слежку
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
      console.debug(zONas.db);
    }
  }
};
