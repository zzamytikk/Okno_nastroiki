/*  ✪ https://zam.usite.pro/publ/1-1-0-5
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2024
*/
var zONas = {//Всплывающее окно `Настройки/Разное`
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
  iB: '>button:eq(0),>:eq(0) button',//Путь до кнопки: .find('>button:eq(0),>:eq(0) button'))
  //F:1,//1 = Запрет на открытие окна. (Идёт ожидание ответа от function, загрузка другова окна)
  $: (q={}) => {//Вешаем click
    let O = zONas,
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
    //Путь до <button:
    if(q.id && (q.id = $('#' + q.id))[0]) {//По id="svoi"
      on(q.id.find(O.iB));
    } else {//Поиск всех
      on($('[class*="zONas-"]').not('[id]').find(O.iB))
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
      let D = $('html'),//Полный размер документа С прокруткой (Применять до display:'unset')
        w = Math.round(D.outerWidth()),
        h = Math.round(D.outerHeight()),
        K = [Math.round(d.offset().left), Math.round(d.outerWidth())];//До кнопки, Размер кнопки
      
      //console.debug(N.find('>div').html().replace(/[\r\n\t ]/g, '').length+' <= Количество символов содержания');
      if(!F && (N.find('>div').html() || '').replace(/[\r\n\t ]/g, '').length==0) {
        N.find('>div').html('<font color="red">Содержание отсутствует!</font>')
      }
      
      if (typeof F == 'function') {//Начали обработку function
        O.F = 1;
        //console.debug('Начали обработку function');
        d.addClass('zONasL');//Добавим загрузку
        O.T = setTimeout(() => { //setTimeout Для отмены задержки ожидания обработки функции 15сек
          //console.debug('Отмена setTimeout');
          N.find('>div').html('<font color=red>Возникла ошибка!<br>Обработки function!</font>');
          O.C(b);
          d.removeClass('zONasL'); //Уберём загрузку
          O.F = 0;
        }, 15000);
        F(d, b, N.find('>div'));
        return;
      }
      
      O.D(d,O,K);//click вне окна, слежка за браузер окном
      
      N.css({display:'unset'});//Для определения: .offset()

      O.w(d, N, w, h, K);//Сменим направление
      
      if(O.F){//function Загрузили и показали в окне.
        //console.debug('Обработали function');
        clearTimeout(O.T);
        O.F = 0;
        d.removeClass('zONasL');//Уберём загрузку
      }
    }
  },
  X: d => {//O.X(d);//Закроем окно
      //console.debug('Закроем окно', d);
      if(zONas.db){
        zONas.db.disconnect();//Удалим слежку за окном браузера
      }
      $(document).off('.zONas');//† Удалим click вне элемента
      d.removeClass('zONasO zONasOm zONasL zONasOi');//† Закрываем
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
  /* d = Вокруг кнопки`zONas-[A-Z]`,
     n = Содержание окна,
     w = Полный размер документа С прокруткой
     h = Полный размер документа С прокруткой
     K = [5,7] До кнопки, Размер кнопки
     Удалить!!!!!¡! x = 1 //Проверка (Запрос после изменения размеров браузер окна)
  */
  w: (d, n, w, h, K, x) => {//Когда не помещяется на экране`горизонтально`, сменим направление
    let B, i, X, O = 2,//Отступ от стенок
      o = n.offset(),//Координаты left|top относительно окна + прокрутка
      L = Math.round(o.left),
      T = Math.round(o.top),
         
      W = Math.round(n.outerWidth() + O),//Размер всплыв окна + отступ
      H = Math.round(n.outerHeight() + O),
      
      LW = Math.round(L + W),//До окна + окно = горизонт
      TH = Math.round(T + H),
      //       с лева || с права <= (Вышло за пределы)
      Lx = L < O || LW > w,//Окно не помещяется горизонт
      Tx = T < O || TH > h;//вертикаль
    
    console.debug('Проверка расположения окна w()', x==1?'Запрос после изменения размера браузер окна':'');
    console.info('START----------------До:');
    console.debug('w: ' + w + ', h: ' + h+' <= Размер документа с прокруткой');
    console.debug('W: '+W+', H: '+H+' <= Размер окна');
    console.debug('o.left: ' + L+', o.top: ' + T+' <= Координаты до окна');
    console.debug('LW: '+LW+', TH: '+TH+' <= До окна + окно');
    console.debug(
      'Tx: top['+T+'] < ['+O+']O || TH['+TH+'] > ['+h+']h (' + (Tx ? 'Не ' : '') + 'помещается top) <= До окна + окно\n' +
      'Lx: left['+L+'] < ['+O+']O || LW['+LW+'] > ['+w+']w (' + (Lx ? 'Не ' : '') + 'помещается left)'
    );
    console.info('------------------------------');
    
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
      
      //console.debug('if(o.top['+T+'] < ['+O+']O || TH['+TH+'] > ['+h+']h) => '+Tx);
      if (Tx) {//Не помещается вертикал. Меняем сторону
        C += S[6] == 'B'? 'T':'B';
        //console.debug(S[6]+' на '+(S[6] == 'B'? 'T':'B')+' <= Меняем сторону. '+C);
      } else {
        C+=S[6]
      }
      
      //console.debug('if(o.left['+L+'] < ['+O+']O || (до окна + окно)Lh['+Lh+'] > ['+w+']w) => '+Lx);
      if(Lx) {//Не помещается горизонт
        C += S[7];//Оставим сторону и сместим окно
        /*console.debug((S[7]=='R'?'left':'right')+': '+
          (S[7] == 'R'
            ?'w['+w+'] - ['+LW+']LW + [-8](css) = '+(w - LW + -8)
            :'o.left['+L+'] - ['+O+']O + [-8](css) = '+(L - O + -8)
        )+'px <= Сместим окно. '+C);*/

        n.css({[S[7]=='R'?'left':'right']:
          S[7]=='R'
            ? w - LW + -8//Браузер окно - (До окна + окно) + -8 left/right в css
            : L - O + -8 //left - Отступ от края + -8 left/right в css
        });
        //9=Примерно
        L = K[0] < (9 + O);//До кнопки от стенки с лева
        R = (w - (K[0] + K[1])) < (9 + O);//С права
        console.debug('L: K['+K[0]+'] < ['+(9 + O)+'](5 + ['+O+']O) => '+L+', \n'+
          'R: (w['+w+'] - ['+(K[0] + K[1])+'](K['+K[0]+'] + ['+K[1]+']K[1])['+(w - (K[0] + K[1]))+'] < ['+(9 + O)+'](9 + ['+O+']O) => '+R+' <= До кнопки');
          
        if(L || R){//Уменьшаем стрелку
          i=1
        }
          
        B = 1;//Кнопку по центру
      } else {
        C += S[7]
      }

      d.addClass(C);
    } else {
      //console.debug('w Обновление не требуется');
      if (x) { //Запрос после изменения размеров браузер окна
        X = 1; //Обнавления не требуются
      }
    }

    if(!X) {
      d.addClass(
        'zONasO'+ (B || d.width() < 40//Смещение окна || Когда маленькая кнопка
          ? i?'i'//Маленькая стрелка
            :'m'//Стрелка по центру кнопки 
          : '')
      );
      
    let n2 = n.offset(),
      L2 = Math.round(n2.left),
      T2 = Math.round(n2.top),
      
      W2 = Math.round(n.outerWidth()), //Размер всплыв окна + отступ
      H2 = Math.round(n.outerHeight()),
  
      LW2 = Math.round(L2 + W2), //До окна + окно = горизонт
      TH2 = Math.round(T2 + H2);
  
    console.info('START---------------- После открытия:');
    console.debug('o.left: ' + L2 + ', o.top: ' + T2 + ' <= Координаты до окна');
    console.debug('W: ' + W2 + ', H: ' + H2 + ' <= Размер окна');
    console.debug('LW: ' + LW2 + ', TH: ' + TH2 + ' <= До окна + окно');
    console.debug('С права до окна: ' + (w - LW2));
    console.info('------------------------------');
    
    }
  },
  R:[0, 0],//[width, height] Последний размер Браузер окна
  D: (d, O, K) => {//zONas.D(d,O);//click вне окна, слежка за браузер окном
    //d=$(Окно), O=zONas., K=До кнопки
    setTimeout(() => {//Поможет закрыть другое открытое окно!
      //console.debug('Установим document', d.has(e.target));
      $(document).on('click.zONas', e => {//Клик вне элемента $()
        //console.debug('click из document');
        //если клик был не по нашему блоку && и не по его дочерним элементам
        if (!d.is(e.target) && !d.has(e.target)[0]) {//Клик вне элемента
          O.X(d); //Закроем окно
        }
      });
    }, 1); //Убераем срабатывание click при открытии
  return;
    O.oko(m => { //Отслеживаем изменения размера браузер окна
      let d,
        W = m.contentRect.width,
        H = m.contentRect.height;
      //console.debug('изменения размера браузер окна');
      console.debug('if (W[' + W + '] != [' + O.R[0] + ']O.R[0] || H[' + H + '] != [' + O.R[1] + ']O.R[1]) =>', W != O.R[0] || H != O.R[1]);
      //Браузер oкно != Последняя запись проверки
      if (W != O.R[0] || H != O.R[1]) { //Изменили размер Браузер окна width
        d = $('.zONasO, .zONasOm'); //Ищим открытое окно
  
        if (d[0]) { //Закроем
          let D = $(document), //Полный размер документа С прокруткой (Применять до display:'unset')
            w = D.outerWidth(),
            h = D.outerHeight();
  
          console.log('O.oko() Спрячим/Откроем');
          //b = d.find(O.iB); //Путь до <button
          //O.C(b, 1);
          //O.C(b, 2);
          setTimeout(() => {
            O.w(d, d.find('>div').eq(-1), w, h, B); //Сменим направление
          }, 1000);
        }
  
        O.R = [W, H]; //Обновим
      }
    });
  },
  /* zONas.oko(m=>{//Отслеживаем изменения размера браузер окна
      console.debug(
        'Отслеживаем изменения размера браузер окна!',
        ' width:', m.contentRect.width,      //width
        '. height:', m.contentRect.height,   //height
        m
      );
  }); */
  //db: //Установили слежку
  oko: f => {//zONas.db.disconnect();
    let M = window.ResizeObserver; //Отслеживаем изменения размера окна

    if (typeof M !== 'undefined') {
      zONas.db = new M(m => { //1~> Сработало! Наблюдение за обьектом
        f(m[0]);
        //m[0]//even
        //console.debug(m[0]);
      });
      zONas.db.observe($('html')[0], {}); //Передаем элемент и настройки в наблюдатель
    }
  }
};
