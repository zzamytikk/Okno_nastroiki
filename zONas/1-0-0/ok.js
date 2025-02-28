/*  ✪ https://zam.usite.pro/publ/1-1-0-5
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2024
*/
var zONas = { //Всплывающее окно `Настройки/Разное`
  N: {
    o: 4 //Отступ от стенок
  },
  iB: '>button:eq(0),>:eq(0) button,#zonasb,.zonasb', //Путь до кнопки: .find('>button:eq(0),>:eq(0) button'))
  //zONas.$();//★ Запускаем Всплывающее окно `Настройки/Разное`
  //F:1,//1 = Запрет на открытие окна. (Идёт ожидание ответа от function, загрузка другова окна)
  //Fx: () => {},//Пользовательская function, при закрытии
  $: (q = {}) => { //Вешаем click
    let O = zONas,
      on = id => { //Вешаем click
        //console.debug('each', id);
        id.each((i, e) => {
          if(O.proNS(//Проверка namespace
              e, //event
              'zONas'//Какой ключь(namespace) ищим
              //undefined = click
            )//return true = Ненашли ключ, false = нашли!
          ){
            $(e).on('click.zONas', e => {
              if ($(e.currentTarget)[0].nodeName == 'A') { e.preventDefault(); } //отменить выполнение действия для <a
              if (O.F) { //console.debug('Идёт ожидание ответа от function, загрузка другова окна');
                return
              }
              if(typeof q?.Fx == 'function'){//Пользовательская function
                O.Fx = q.Fx;
              }
             
              O.C($(e.currentTarget), q);
            });
          } else {
            console.debug('Была попытка повторного запуска скрипта zONas.$(click.zONas);', e);
          }
        });
      };

    on( //Вешаем click (Путь до <button):
      q.id //По id="svoi"
        ? $('#' + q.id.replace('#', '')).find(O.iB)
        : $('[class*="zONas-"]').not('[id]').find(O.iB) //Поиск всех
    )
  },
  /* zONas.C(//Обработка
       $(),//id окна
       q   //function zONas.$({F: () => {}},||Fx: () => {});
     );
  */
  C: (b, q) => { //Обработка click 'b = button'
    let c, O = zONas,
      d = b.closest('[class*="zONas-"]');//Вокруг кнопки

    if (/zONasO/.test(c = d.attr('class'))) { //Окно открыто `Закрываем`
      O.X(d); //Закроем окно
    } else { //Открываем
      clearTimeout(O.T2); //Слежка за размером браузер окна
      
      let X, N, x=!d.is('.zONasNet');//Не закрывать при нажатии вне окна
      
      if ((X = $('[class*="zONasO"]:not(.zONasNet)'))[0]) { //Нашли открытое окно!
        O.X(X);//Закроем окно
      }

      N = d.find('>div').eq(-1);//Содержание +ещё .find('>div');
      //console.debug(N.find('>div').html().replace(/[\r\n\t ]/g, '').length+' <= Количество символов содержания');
      if ((N.find('>div').html() || '').replace(/[\r\n\t ]/g, '').length == 0) {
        N.find('>div').html('<font color="red">Содержание отсутствует!</font>')
      }

      if (typeof q?.F == 'function') { //Начали обработку function
        O.F = 1;
        //console.debug('Начали обработку function');
        d.addClass('zONasL'); //Добавим загрузку
        O.T = setTimeout(() => { //setTimeout Для отмены задержки ожидания обработки функции 15сек
          //console.debug('Отмена setTimeout');
          N.find('>div').html('<font color=red>Возникла ошибка!<br>Обработки function!</font>');
          O.C(b);
          d.removeClass('zONasL'); //Уберём загрузку
          O.F = 0; //Убераем запрет на открытие окна.
        }, 15000);
        q.F(d, b, N.find('>div'));
        return;
      }

      if(x) {//Не закрывать при нажатии вне окна
        O.D(d, O); //click вне окна
      }
      O.O(d, O); //Отслеживаем изменения размера браузер окна
      O.w(d, N, c); //Сменим направление

      if (O.F) { //Обработали function. (Загрузили и показали в окне)
        //console.debug('Обработали function');
        clearTimeout(O.T); //15 сек до автоОтмены
        O.F = 0; //Убераем запрет на открытие окна.
        d.removeClass('zONasL'); //Уберём загрузку
      }
    }
  },
  //d = $('[class*="zONas-"]')
  //o = 1 - Временное закрытие и открытие окна, после изменения размеров браузер окна. Для отмены запуска Fx() - пользовательская function
  X: (d, o) => { //O.X(d);//Закроем окно
    let O = zONas;
    //console.debug('O.X(d); Закроем окно', d, O.db);
    clearTimeout(O.T2); //Слежка за размером браузер окна
    if (O.db) {
      O.db.disconnect(); //Удалим слежку за окном браузера
      O.db = 0;
    }
    
    if(!o && O.Fx){//Пользовательская function
      O.Fx(d, o);
      if(!o) {delete O.Fx}//Временно записывается в пространстве для всех окон
      //console.debug('O.Fx', O.Fx);
    }

    $(document).off('.zONas'); //† Удалим click вне элемента
    d.removeClass('zONasO zONasOm zONasL zONasOmi zONasOmik'); //† Закрываем
    d.find('>div').removeAttr('style'); //удаляем
  },
  //T:0,//setTimeout Для отмены задержки ожидания обработки функции 15сек
  /* d = $() //<div id="svoi" class="zONas-
     b = $() //<button
     N = $() //Путь до содержания окна
     t = html || t = false//Остановка! */
  L: (d, b, N, t) => { //Подгрузка содержимого
    let O = zONas;

    //console.debug('Подгрузка содержимого завершена', zONas.F);
    if (O.F) {
      if (t === false) { //Пришол запрос остановить!
        clearTimeout(O.T); //15 сек до автоОтмены
        O.F = 0; //Убераем запрет на открытие окна.
      } else {
        N.html(t); //Подгрузили текст
        O.C(b); //Откроем окно
      }
      d.removeClass('zONasL'); //Уберём загрузку
    }
  },
  /* d = Вокруг кнопки`zONas-[A-Z]`,
     n = Содержание окна
     c = class заданный пользователем
  */
  w: (d, n, c) => { //Когда не помещяется на экране`горизонтально`, сменим направление
    let V, i, O = zONas.N.o,//Отступ от стенок
      D = $(document),//Полный размер документа С прокруткой
      w = D.outerWidth(),
      h = D.outerHeight(),
      
      B = $(window),//Размеры браузер окна
      Bw = B.outerWidth(),
      Bh = B.outerHeight(),
      
      W = n.outerWidth() + O,//Размер всплыв окна + отступ
      H = n.outerHeight() + O,
      
      //Кнопка:
      K = d.offset(),//Координаты left|top относительно окна + прокрутка
      KL = K.left,
      KT = K.top,// - B.scrollTop(),
      //Размер:
      KW = d.outerWidth(),
      KH = d.outerHeight(),
      
      //S[6] - T=Top/B=Bottom, S[7] - L=Left/R=Right
      S = new RegExp('zONas-[A-Z]+').exec(c)[0],
      //От кнопки до окна:
      sL = +n.css('--nas-LR').replace(new RegExp('[a-z]+'),'');
      sT = 9,//в css расстояние анимации
      
      //Окно: //Координаты left|top относительно окна + прокрутка
      L = S[7] == 'R'
        ? KL + sL//До кнопки + От кнопки до окна
        : (KL + KW + (sL < 0 ? Math.abs(sL) : sL - (sL * 2))) - (W - O);//(До кнопки + Размер кнопки + От кнопки до окна) - (Размер окна - Отступ от стенок)
      T = S[6] == 'T'
        ? KT - (H - O) - sT - +n.css('border-top-width').replace(new RegExp('[a-z]+'),'')//До кнопки - (Размер окна - Отступ от стенок) - От кнопки до окна - border-top
        : KT + KH + sT + +n.css('border-bottom-width').replace(new RegExp('[a-z]+'),''),//До кнопки + Размер кнопки + От кнопки до окна + border-bottom
      //До окна + окно = горизонт:
      LW = L + W,
      TH = T + H,
      
      //  с лева || с права <= (Вышло за пределы)
      Tx = T < O || TH > h,//Вертикаль
      Lx = L < O || LW > w;//Окно не помещяется горизонт
    
    //d.addClass('zONasO');n.css({ display:'block', opacity:1, visibility: 'unset' });//Убераем выход за пределы
    /*
    console.info('START---------('+S+')------До:');
    console.debug('w: ' + w.toFixed(2) + ', h: ' + h.toFixed(2)+' <= Размер документа с прокруткой');
    console.debug('Bw: ' + Bw.toFixed(2) + ', Bh: ' + Bh.toFixed(2)+' <= Размеры браузер окна');
    console.debug('W: '+W.toFixed(2)+', H: '+H.toFixed(2)+' <= Размер окна');
    console.debug('left KL: ' + KL.toFixed(2)+', top KT: ' + KT.toFixed(2)+' <= Координаты до кнопки');
    console.debug('KW: '+KW.toFixed(2)+', KH: '+KH.toFixed(2)+' <= Размер Кнопки');
    console.debug('sL: '+sL.toFixed(2)+', sT: '+sT.toFixed(2)+' <= От кнопки до окна');
    console.debug('left L: ' + L.toFixed(2)+', top T: ' + T.toFixed(2)+' <= Координаты до окна');
    console.debug('LW: '+LW.toFixed(2)+', TH: '+TH.toFixed(2)+' <= До окна + окно');
    console.debug(
      'Tx: top['+T.toFixed(2)+'] < ['+O+']O || TH['+TH.toFixed(2)+'] > ['+h.toFixed(2)+']h (' + (Tx ? 'Не ' : '') + 'помещается top) <= До окна + окно\n' +
      'Lx: left['+L.toFixed(2)+'] < ['+O+']O || LW['+LW.toFixed(2)+'] > ['+w.toFixed(2)+']w (' + (Lx ? 'Не ' : '') + 'помещается left)'
    );
    console.info('------------------------------');
    //return;*/
    if (Lx || Tx) { //Не помещается
      //console.log('-');
      let C = 'zONas-', j;
      
      //console.debug('if(o.top['+T+'] < ['+O+']O || TH['+TH+'] > ['+h+']h) => '+Tx);
      if (Tx) {//Не помещается вертикал. Меняем сторону
        C += S[6] == 'B' ? 'T' : 'B';
        //console.debug(S[6]+' на '+(S[6] == 'B'? 'T':'B')+' <= Меняем сторону. '+C);
      } else {
        C += S[6]
      }

      //console.debug('if(o.left['+L+'] < ['+O+']O || (до окна + окно)LW['+LW+'] > ['+w+']w) => '+Lx);
      if (Lx) {//Не помещается горизонт
        //До кноп с лева < 9=Примерно + Отступ
        let mL = KL < (9 + O),//До кнопки от стенки с лева
          mR = (w - (KL + KW)) < (9 + O);//С права
        /*
        console.debug('Размер кнопки: KW`'+KW.toFixed(2)+'` < 35 => '+(KW < 35)+' <= Кнопка меньше\n',
          'L: KL['+KL.toFixed(2)+'] < ['+(9 + O)+'](9 + ['+O+']O) => '+mL+', <= До кнопки от стенки\n'+
          'R: (w['+w.toFixed(2)+'] - ['+(KL + KW).toFixed(2)+'](KL['+KL.toFixed(2)+'] + ['+KW.toFixed(2)+']KW)['+(w - (KL + KW)).toFixed(2)+'] < ['+(9 + O)+'](9 + ['+O+']O) => '+mR);
        */
        //Размер кнопки && (До кнопки от стенки с лева || До кнопки от стенки с права)
        if (KW < 35 && (mL || mR)){//Уменьшаем стрелку (Кнопка у края)
          i = KW < 15//С краю
            ? 2
            : 1//По центру
        }
        
        j = n => {
          n = L < O//Не помещается с лева:
            ? KL//До кнопки - Отступ от стенки
            //Не помещается с права:
            : (w - (KL + KW));
          //console.debug('KL fun', n.toFixed(2));
          return n < O? O - n : +('-' + (n - O))
        };
        //[0=Left/1=right,На сколько, Сменим сторону(L/R)]
        j = L < O//Не помещается с лева:
          ? S[7] == 'R'
            ? [, j()]
            //L:
            : mL//Кнопка блиска к стенке:
              ? [, j(), 'R']//Сменим направление (Для правильного направления стрелки)
              //left - Отступ от края + -8 left/right в css:
              : [1, L - O + -8]//L оставим сторону и сместим окно
          //Не помещается с права:
          : S[7] == 'L'
            ? [1, j()]
            //R:
            : mR//Кнопка блиска к стенке:
              ? [1, j(), 'L']//Сменим направление (Для правильного направления стрелки)
              //Браузер окно - (До окна + окно) + -8 left/right в css
              : [, w - LW + -8];//R оставим сторону и сместим окно
          
        if(j[2]){C+=j[2]}//Сменим сторону
        
        //console.debug('Сместим окно '+ (j[0]?'right':'left')+':', j[1].toFixed(2),', j:',j);
        n.css({[j[0]?'right':'left']: +j[1].toFixed(2)});
        
        V = 1; //Кнопку по центру
      }
      if(!C[7]) {//Несменили сторону, оставим как было
        C+=S[7]
      }
      
      if(Tx || j[2]){//Сменили сторону B/T || L/R
        d.removeClass(S) //Удалим сторону окна B/T
         .addClass(C)
      }
      //console.debug('Сторона поивления = Было:',S, '. Стало:',C);
    }
    
    d.addClass( //Откроем окно
      'zONasO' + (V || KW < 40//Смещение окна || Когда маленькая кнопка
        ? 'm'+(i ? i==1?'i':'ik'//Маленькая стрелка 1=По центру, 2=С краю
            :'')//Стрелка по центру кнопки 
        : '')
    );
  },
  D: (d, O) => { //zONas.D(d,O);//click вне окна //d=$(Окно), O=zONas.
    //console.debug('Установим document', d.has(e.target));
    $(document).on('click.zONas', e => { //Клик вне элемента $()
      //console.debug('click из document');
      //если клик был не по нашему блоку && и не по его дочерним элементам
      if (!d.is(e.target) && !d.has(e.target)[0]) { //Клик вне элемента
        O.X(d); //Закроем окно
      }
    });
  },
  //T2:0,//clearTimeout
  //R: 0, //width Последний размер Браузер окна
  O: (d, O) => { //zONas.O(d,O);//Отслеживаем изменения размера браузер окна  //d=$(Окно), O=zONas.
    clearTimeout(O.T2);
    O.T2 = setTimeout(() => { //Убераем проблему input[text] (При первом нажатии появитса клавиатура и сработает Закрыть-Открыть)
      O.oko(m => {
        let W = m.contentRect.width;
        //H = m.contentRect.height;  ! height проблема в поивлении клавиатуры input[text]

        /*console.debug('O(); Изменения размера браузер окна\n'+
          'if(W[' + Math.round(W) + '] != [' + Math.round(O.R) + ']O.R =>', (Math.round(W) != Math.round(O.R))+'\n'+
          'if(O.R`' + O.R + '` && d`' + !!d[0] + '`) => ' + !!(O.R && d[0])
        );*/
        //Браузер oкно != Последняя запись проверки
        if (W != O.R) { //Изменили размер Браузер окна width
          if (O.R && d[0]) { //Закроем
            //console.log('O.oko() Спрячим/Откроем');
            O.X(d, 1); //Закроем окно 1=оповестим Пользовательскую Fx=function, что закрыли из Слежка за размерами браузер окна

            clearTimeout(O.T2);
            O.T2 = setTimeout(() => {
              O.C(d.find(O.iB)); //Откроем
              O.R = W; //Обновим
            }, 500);
          }

          O.R = W; //Обновим
        }
      });
    }, 999);
  },
  /* zONas.oko(m=>{//Отслеживаем изменения размера браузер окна
      console.debug(
        'Отслеживаем изменения размера браузер окна!',
        ' width:', m.contentRect.width,      //width
        '. height:', m.contentRect.height,   //height
        m
      );
  }); */
  //db: //Установили слежку/Удалили
  oko: f => { //zONas.db.disconnect();
    let M = window.ResizeObserver; //Отслеживаем изменения размера окна
    //console.debug('oko(); Вешаем око');
    if (typeof M !== 'undefined') {
      zONas.db = new M(m => { //1~> Сработало! Наблюдение за обьектом
        f(m[0]);
        //m[0]//even
        //console.debug(m[0]);
      });
      zONas.db.observe($('html')[0], {}); //Передаем элемент и настройки в наблюдатель
    }
  },
  /* proNS(//Проверка namespace
      e,//event
      'cod',//Какой ключь(namespace) ищим
      'input'//$.on('input.cod'); undefined = click
    );//return true = Ненашли ключ, false = нашли!
  */
  proNS: (e, P, c = 'click') => { //Ищим .cod, установленный: `$.on('click.cod', () => {})`
    let d = $._data($(e)[0], 'events')?.[c];

    //console.debug('Нашли запись: if(' + (d && d[0].namespace) + ').', d);

    if (d && d[0].namespace) { //Нашли запись
      return !d.filter(v => { //Проверим все
        //console.debug('if(' + v['namespace'] + '==' + P + ') =>', v['namespace'] == P);

        if (v['namespace'] == P) { //Нашли запись
          return true //Выбераем совпадение
        }
      })[0]; //[0] Проверка первого совпадения
    }

    return true; //Пусто
  }
};