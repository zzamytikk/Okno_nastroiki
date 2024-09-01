let tityyy = {//■ Всплывающая подсказка 1/2 `title|tooltip`
    O: {
      id: 'info'//id Подсказки <div id="info" class="info-R" style="display: none">
    },
    /*  z.z.tit.$({//✫ Всплывающая подсказка (Навели/Убрали мышка)
            id: '#vp2',//id куда вешаем <dl id="#vp2">123</dl> || <dl id="#vp2"><button>123</button></dl> || <div id="#vp2">123</div>

            t: 'Окно <b>для всех</b>',//Текст
            t: "<i style='opacity: .7;'>Раздела</i>",//! Заменить: " на (' || ` <i style=`opacity: .7;`>Раздела</i>)
            t: e => {//return текст
                ///e = event <dl>
                    return '<pre id="cod" style="margin:0;"><code class="v-BG0">' +
                            $(e).html().replace(/</g, '&lt;') +
                        '</code></pre>';
            },

            t3: 1,//Показываем подсказку только когда текст сокращён! (... 3 точки) (dl css: overflow: hidden; display: -webkit-box; )

            w: 250, //{number}  //width-max: Максимальный размер Окна
            w: undefined,//† 200px

            lt: 1   //{number}  //Убераем HTML теги <i>
            lt: undefined //† HTML допустимо

            f: q => {//funkcion для своей обработки (+ Берём текст)
                q.t=q.e.text();//Текст (q.e ид button)

                if(!$('.M.M-X')[0])
                    return 1//Не показываем подсказку
            },

                ///¦ Сторона поивления:
            c: 'R',//class (T=Верх, B=Низ, R=Право, L=Лево),
                ///(TR = Верх справа на лево, TL = Верх слева на право, BR = Низ справа на лево, BL = Низ слева на право)
            c: undefined,//† R
                ///¦ Расцветка шаблона:
            C: undefined,//8 = Белая (для Тёмного фона)
            0~> Красная
            1~> Зелёный
            2~> Оранжевый
            3~> Жолтый
            4~> Синия
                4-1
            5~> Серый
            6~> Розовый
            7~> Океан
            8~> Белая   //+ Для тёмного
            9 = Чёрный  //+ Для белого

                ///¦ Открыть/Закрыть:
                ///Когда вешаем обработчик: (Первое поивление надписи)
            o: 1,//1~> Добавим в class .infX = Открыть
            o: 2 //0~> Добавим в class .infO = Закрыть
        });

        ↔ || Или -------------------------------------
        Для <dl data-inf="{'t': 'Текст', 'c': 'TL'}">...</dl>. Нужен Запуск для работы подсказки: //0~> z.z.tit.$();

        data-inf="{
            't': 'Нажми <b style="color:red;">Кнопку</b>',//Текс
                *Заменяем:
                    <   на  &lt;  (Для Тэгов <b> => &lt;b>)
                    "   на  `     (style="color:red;" => style=`color:red;`)

            'c': 'R',//class (T=Верх, B=Низ, R=Право, L=Лево),
                ///(TR = Верх справа на лево, TL = Верх слева на право, BR = Низ справа на лево, BL = Низ слева на право)
                ///|| false = R
            'o': 1//Включаем проверку class .inf(X|O) Для поивления надписи Открыть/Закрыть
        }"

        -------------------------------------------------------
        + <body class="B-stop"> .B-stop Уберает показ всех подсказок!
        + Может выходить за пределы <div overflow: hidden;>
        -------------------------------------------------------
        ! Примечание: Когда <button data-inf="" disabled> Всплывающая подсказка не работает! (закрывается)
            + Решение: <dl data-inf=""><button disabled></dl>
                * Обернуть в другой элемент!
        -------------------------------------------------------
        + z.z.tit.$();//* Всплывающая подсказка: Обработка и Запуск data-inf="{}"
        -------------------------------------------------------
        + Показываем подсказку только когда текст сокращён! (... 3 точки)
            * Активируется когда (dl css: overflow: hidden; display: -webkit-box; ):
                ¦ Показываем подсказку:
                <dl style="overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;">
                    <button,a><b style="display: block;">Сокращённый текст...</b></button,a>
                </dl>

                ¦ Не показываем подсказку:
                <dl style="overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;">
                    <button,a><b style="display: block;">Полный текст</b></button,a>
                </dl>
    */
    $: q => {//+ Вешаем обработку по ид || data-inf Поиск и запуск обработки
        z.z.A.err.$('z.z.tit.$', { s: 1, q: q }); //4~>---------- START

        //по ид || data-t Поиск (Запуск обработки)
        $(q?.id || '[data-inf]').each((i, e) => {
            if ($._data($(e)[0], 'events')?.mouseup[0].namespace != 'vp') {//Проверка ключа (Ключь не совпал! повесим обработчик)
                let Q = q || z.f.json.data({ e: e, t: 'inf' });//Обработаем data-but="{}" в array({…}) и //† Удалим data-!
                //console.error(Q);
                if (Q.o > 0) { //Добавим в <dl .inf(X|O)> (Первое поивление надписи) //+ Надпись Открыть/Закрыть
                    $(e).addClass('inf' + (Q.o == 1 ? 'X' : 'O'));
                }

                $(e).on('mouseenter.vp mouseleave.vp mouseup.vp', z.z.tit.S.$(Q));//Убрал mousemove Когда мышка исчезнит с кнопки! помогает убрать подсказку

                z.z.A.err.$('z.z.tit.$', { n: '№ ' + i, q: Q }); //4~>----------
            }
        });

        z.z.A.err.$('z.z.tit.$'); //4~>========== STOP
    },
    S: {//1~> Сработало / Проверяем на наличие сокращённого текста!
        $: Q => {//Q = Настройки
            let F = function (e, M) {//F вызываем много раз!
                Q.e = $(M || this);//<dl>

                z.z.A.err.$('z.z.tit.S.$', {
                    s: 1,
                    c: e.type == 'mouseenter' || M ? 11 : '00',
                    n: '%c' + (e.type == 'mouseenter' || M ? 'Открываем' : 'Закрываем') + '!%c' +
                        (e.type == 'mouseenter'
                            ? '(Навели мышку на обьект)'
                            : (e.type == 'mouseleave' || e.type == 'mouseup')
                                ? e.type == 'mouseup'
                                    ? '(Отпустили 1-ю мышку)'
                                    : '(Увели мышку с обьекта)'
                                : (M ? 'Сработало' : 'Не сработало(!M нету)') + ' Наблюдение за обьектом!'
                        ) + ' • ' + e.type,
                    q: e
                }); //4~>---------- START
                z.z.A.err.$('z.z.tit.S.$', {
                    c: $('body').has(e.target)[0] && !$('body').hasClass('B-stop') && !Q.e.find('[disabled]')[0] ? 11 : '00',
                    n: '%cПодсказку ' + ($('body').has(e.target)[0] && !$('body').hasClass('B-stop') && !Q.e.find('[disabled]')[0] ? '' : 'не ') + 'показываем!' + '%c'
                }); //4~>----------
                z.z.A.err.$('z.z.tit.S.$', { c: 0, n: $('body').has(e.target)[0] ? '' : '%c<' + Q.e[0].nodeName + '>(Где висела подсказка) Была удалена!%c' }); //4~>----------
                z.z.A.err.$('z.z.tit.S.$', { c: 0, n: $('body').hasClass('B-stop') ? '%cУстановлено <body .B-stop>!%c' : '' }); //4~>----------
                z.z.A.err.$('z.z.tit.S.$', { c: 0, n: Q.e.find('[disabled]')[0] ? '%cВнутри <' + Q.e[0].nodeName + '> Установлено :disabled => %c' : '', q: Q.e.find('[disabled]')[0] ? Q.e.find('[disabled]') : '' }); //4~>----------
                z.z.A.err.$('z.z.tit.S.$', { c: Q.t3 ? 0 : 1, n: (Q.t3 ? '%cВключено%c: Q.t3 = ' + Q.t3 + ' Показываем подсказку только когда текст сокращён! (...)' : '') }); //4~>----------

                if (!z.z.tit.S.t3(Q)) {//Показываем подсказку только когда текст сокращён! (... 3 точки)
                    //!$('body').has(e.target)[0] <dl> был удалён! //Проверить данный элемент на существование в HTML (true/false)
                    if (!$('body').has(e.target)[0] || e.type == 'mouseleave') {// || e.type == 'mouseup' Закрываем! Наблюдение и удаляем окно. (Вначале проверка Закрываем!)
                        // z.z.A.err.$('z.z.tit.S.$', {
                        //     c: 0, err: e.type == 'mouseup'
                        //         ? 'Закрываем окно и оставим слежку (не удоляя слежку) => mouseup'
                        //         : 'Закрываем окно и удалим слежку (Всплывающая подсказка) => mouseleave' + (!$('body').has(e.target)[0] ? ' %c<dl> был удалён! ($(body).has(e.target)[0]%c)' : '')
                        // }); //4~>----------
                        // z.z.tit.X.X(//† Закрываем окно
                        //     e.type == 'mouseup'
                        //         ? 0//† Закрываем окно и оставим слежку (не удоляя слежку)
                        //         : 1//† Закрываем окно и удалим слежку (Всплывающая подсказка)
                        // );
                        z.z.A.err.$('z.z.tit.S.$', {
                            c: 0, err: 'Закрываем окно и удалим слежку (Всплывающая подсказка) => mouseleave' +
                                (!$('body').has(e.target)[0] ? ' %c<dl> был удалён! ($(body).has(e.target)[0]%c)' : '')
                        }); //4~>----------
                        z.z.tit.X.X(1);//† Закрываем окно и удалим слежку (Всплывающая подсказка)
                    } else if (e.type == 'mouseenter' || M) {//Открываем Q.f || наблюдение
                        //Не от наблюдения && небыло записи
                        if (!M && !z.f.oko.q.inf) {//1~> Создаём наблюдение за обьектом для Открыть/закрыть и disabled
                            /*//¦ Следим за:
                                <dl class="inf(O|X)">   //• Открыть/Закрыть (Смена надписи)
                                <button disabled>       //• Отключение/Затемнение <button/a>
                            */
                            z.f.oko.$({//<dl> следим за всеми потомками <button/input/b/p..>.
                                id: this,
                                x: 'inf',
                                s: { attributes: true, attributeOldValue: true, subtree: true },//Следим за <dl> и всеми кто внутри <button/a/input/b/p...>
                                f: function () {
                                    F(e, Q.e);
                                }
                            });
                            /*//¦ Следим за:
                                <body class="B-stop">   //• Отключение/Затемнение <button/a>, отключаем: Всплывающая подсказка
                                    //+ z.z.B.$() click
                            */
                            z.f.oko.$({//<dl> следим за <body>
                                id: 'body',
                                x: 'infBody',
                                s: { attributes: true, attributeOldValue: true },
                                f: function () {
                                    F(e, Q.e);
                                }
                            });
                        }
                        //Кнопки отключены || disabled(поиск в обьекте и внутри)
                        if ($('body').hasClass('B-stop') || Q.e.find('[disabled]')[0]) {
                            z.z.A.err.$('z.z.tit.S.$', {
                                c: 11, err: 'Закрываем окно! ' + (
                                    $('body').hasClass('B-stop')
                                        ? 'Кнопки отключены <body .B-stop>: ' + $('body').hasClass('B-stop')
                                        : (//Внутри <dl> ищим disabled:
                                            'Внутри <' + Q.e[0].nodeName + '> нашли disabled => <' + Q.e.find('[disabled]')[0].nodeName + ' disabled>! '
                                        ) + '%cНе удаляя Наблюдение за обьектом%c'
                                ),
                                q: Q.e.find('[disabled]') || ''
                            }); //4~>----------

                            z.z.tit.X.X();//† Закрываем окно и оставим слежку(не удоляя слежку)
                        } else if (!z.f.arr.put.$({ q: Q, p: Q.f })) {//не Своя функция || Функ не return 1(Не показываем подсказку)
                            z.z.A.err.$('z.z.tit.S.$', { c: 11, n: '%cОткрываем%c' }); //4~>----------
                            z.z.tit.X.$(Q);//+ Открываем
                        }
                    }
                }

                z.z.A.err.$('z.z.tit.S.$'); //4~>========== STOP
            };

            return F;
        },
        t3: q => {//Показываем подсказку только когда текст сокращён! (... 3 точки). return true => не показываем
            /* //+ Установить для <dl><a><b>Текст</b></a></dl> css:
                dl {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                b {
                    display: block;
                }
            */

            if (q.t3) {//Проверяем на наличие сокращённого текста!
                z.z.A.err.$('z.z.tit.S.t3', { s: 1, q: q }); //4~>---------- START
                z.z.A.err.$('z.z.tit.S.t3', {
                    c: q.e.children().height() <= q.e.height() ? 0 : 1,
                    n: '<' + q.e.children()[0].nodeName + ' height>[' + q.e.children().height() + '] <= [' + q.e.height() + ']<' + q.e[0].nodeName + ' height>) => %c' +
                        (q.e.children().height() <= q.e.height() ? 'false Ставим запрет на показ (Подсказки)! Текст полный!' : 'true Показываем! Текст обрезан..') + '%c'
                }); //4~>----------

                if (q.e.children().height() <= q.e.height()) {//Ставим запрет на показ (Подсказки)! Текст полный!
                    z.z.A.err.$('z.z.tit.S.t3'); //4~>========== STOP
                    return 1;//Ставим запрет на показ (Подсказки)!
                }

                z.z.A.err.$('z.z.tit.S.t3'); //4~>========== STOP
            }
        }
    },
    X: {//Открываем / //† Закрываем
        /*  z.z.tit.X.$({
                e: $(this),//<dl>

                ///data-t:
                t: 'lala',
                c:'R',//class (T=Сверху, B=Снизу, R=Справа, L=Слева),
                        (TR = Сверху в право, TL = Сверху в лево, BR = Снизу в право, BL = Снизу в лево)
                        || false = R

                ///• Для Всплывающая подсказка2 #inf2
                ti: 'HTML',//Заголовок + Добавим #info2
                ! Заголовок обезательно
            });
        */
        $: q => {//Открываем
            z.z.A.err.$('z.z.tit.X.$', { s: 1, c: q.c ? 1 : 0, n: q.c ? '%cq.c: ' + q.c + '%c<= Сторона поивления' : 'Сторона поивления не задана! ставим по умолчанию %cR%c', q: q }); //4~>---------- START
            z.z.A.err.$('z.z.tit.X.$', {
                n: q.e.attr('class') +
                    '\n\t Нашли класс => ' + (/ ?inf(X|O) ?/.test(q.e.attr('class'))) +
                    '\n\t Включили Открыть/Закрыть => ' + q.o
            }); //4~>----------

            let a, t = '', f,
                id = z.z.tit.O.id + (q.ti ? 2 : ''),
                p = z.z.tit.P(q.e);//Определяем position: fixed/absolute;

            if (/inf(X|O)/.test(q.e.attr('class'))) {//Поиск один из класов. Включили Открыть/Закрыть
                let c = q.e.hasClass('infX');//0 = Закрыть, 1 = Открыть;
                //<em> <= Проблема с первым поивлением (Не сразу видно надпись)
                t += '<font color="' + (
                    / ?inf(X|O) ?/.test(q.e.attr('class'))//Нашли class <dl .inf(X|O)
                        ? '#' + (c ? 'bfb' : 'f99') + '">' + (c ? 'Открыть' : 'Закрыть')
                        : 'red">Для поивления надписи Открыть/Закрыть необходимо добавить class .infX или .infO!'
                ) + '</font> ';
            }
            if (q.t) {//Текст / Убераем HTML
                if (typeof q.t == 'function') {
                    f = q.t(q.e);//Обработаем function
                }

                t += q.lt//Убераем HTML
                    ? (f || q.t).replace('<', '&lt;').replace('>', '&gt;')
                    : (f || q.t);
            }

            //#region       //▿▿▿ Создадим HTML и добавим в body ---
            if (q.ti) {//• Всплывающая подсказка2
                $('body > #' + id).remove();//† Удалим старый
            }

            if (!q.ti && $('body > #' + id)[0]) {//Есть подсказка! просто обновим её
                //Помогает когда input[range] при изменении полоски подсказка не исчезает
                $('body > #' + id).html(t);
            } else {
                /* position: fixed; для title с <div position: fixed;>, position: absolute; для фиксированой позиции */
                a = {//Добавление атрибутов(id, class..)
                    id: id,
                    class: 'info-' + (q.c || 'R') + ' all-c' + (q.C || 8),//Сторона поивления / Расцветка шаблона
                    style: 'display:none;' + (p || '') +//p = Определяем position: fixed/absolute; для подсказки ('' => absolute в css)
                        (q.w ? 'max-width:' + q.w + 'px;' : '')
                };

                if (q.ti) {//• Всплывающая подсказка2
                    a['data-ram-zag'] = q.ti;//Заголовок //! Запускает Всплывающая подсказка2
                    //a['class'] += ' all-c'+(q.C || 8);//Подсветка подсказки при наведении
                    t = '<div>' + t + '</div>';
                }

                z.z.A.err.$('z.z.tit.X.$', { c: 21, n: '%cСоздали атрибуты:%c' + z.z.B.B.a.$(a), a }); //4~>----------

                $('body').append('<div' + z.z.B.B.a.$(a) + '>' + t + '</div>');
            }
            //#endregion    //▵▵▵ -----------------------------------

            if (q.ti) {//• Всплывающая подсказка2 (Запуск перед r={})
                z.z.Start.data();//^ Запуск обработка (data-(...)={} inf/but.. и по class, id)
            }

            let b = $(window), o = q.e.offset(),//Координаты left|top относительно окна + прокрутка
                r = {
                    c: q.c || 'R',//Class В отсутствии q.c || Не помещается(Ищим другой)
                    O: 12,//Отступ до подсказки от места поивления
                    o: 6, //Разрешимый минимальный отступ от подсказки до стенки браузера
                    bW: b.innerWidth(),//Размер браузер окна
                    bH: b.innerHeight(),
                    sL: p ? 0 : b.scrollLeft(),//Отступ прокрутки       //p=1 убераем(Отступ прокрутки) для position: fixed
                    sT: p ? 0 : b.scrollTop(),
                    mL: Math.round(o.left) - (p ? b.scrollLeft() : 0),//Координаты left относительно окна + прокрутка        //p=1 убераем(Отступ прокрутки) для position: fixed
                    mT: Math.round(o.top) - (p ? b.scrollTop() : 0),//top
                    kW: q.e.outerWidth(),//Размер кнопки
                    kH: q.e.outerHeight(),
                    pW: (b = $('body > #' + id)).outerWidth(),//Размер Подсказки
                    pH: b.outerHeight()

                    //► return:
                    //L:1   left
                    //T:1   right

                    //Для Вычесляем координат:
                    //C:['BR']
                };

            z.z.tit.C.$(r);//Ищим видемые //► return: L:1   left | T:1   right

            z.z.A.err.$('z.z.tit.X.$', {
                n: 'Пришол class => info-' + (q.c || 'R') + ', После обработки: r.c: ' + r.c +
                    '\n\t Размер браузер окна width: ' + r.bW + ', height: ' + r.bH +
                    //'\n\t Координаты мышки => left: ' + q.e.pageX + ', top: ' + q.e.pageY +
                    '\n\t offset => left: ' + r.mL + ', top: ' + r.mT +
                    '\n\t Отступ прокрутки => left: ' + r.sL + ', top: ' + r.sT +
                    '\n\t Размер button => width: ' + r.kW + ', height: ' + r.kH +
                    '\n\t Размер подсказки => width: ' + r.pW + ', height: ' + r.pH +
                    '\n\t OK => left: ' + r.L + ', top: ' + r.T +
                    '\n\t data-t => ' + q.t + '. r => ', q: r
            }); //4~>----------

            z.f.class.X({
                id: b,//b = $('body > info'); создано в r={}
                x: (i, c) => c.match(/info-[A-Z0-9]+/g), //Удалим class
                d: 'info-' + r.c //Добавим class
            }).css({ left: r.L, top: r.T, display: '', animation: 'Oinf .3s forwards' }).addClass('all-c' + (q.C || 8));

            z.z.A.err.$('z.z.tit.X.$'); //4~>========== STOP
        },
        /*//†   z.z.tit.X.$(1);//Закрываем окно и удалим слежку
                z.z.tit.X.$(1);//Закрываем окно и оставим слежку
        */
        X: x => {//† Закрываем
            //return;
            let b = $('body > #' + z.z.tit.O.id);
            z.z.A.err.$('z.z.tit.X.X', { s: 1, n: 'x = ' + x, q: b }); //4~>---------- START

            z.z.A.err.$('z.z.tit.X.X', { c: x ? 0 : 21, n: 'Закрываем окно и %c' + (x ? 'удалим' : 'оставим') + '%cслежку!' }); //4~>----------

            if (x) {
                z.f.oko.X('inf infBody');//удалим слежку
                z.z.A.err.$('z.z.tit.X.X', { c: 21, n: 'Удалили слежку %c`inf infBody`!%c База:', q: z.f.oko.q }); //4~>----------
            }

            if (b[0]) {//Убераем ошибку! когда нету что закрывать
                b.remove();//Закрываем окно
            }

            z.z.A.err.$('z.z.tit.X.X'); //4~>========== STOP
        }
    },
    /* z.z.tit.P(//Определяем position: fixed/absolute; для подсказки
            q.e//event <dl>
        );
        ►    return 'position:fixed;'   //position: fixed/sticky;
        ►    return undefined           //position: absolute; в css
    */
    P: b => {//Поиск position: fixed/sticky; от элемента <dl> до html! //Кнопка расположена в <div position:fixed/sticky;><div><dl>...</dl></div></div>, Тогда установим для <подсказки> position:fixed; 'при прокрутке останится на месте'
        z.z.A.err.$('z.z.tit.P', { s: 1, q: b }); //4~>---------- START
        let x;//1 = position: fixed/sticky

        z.z.A.err.$('z.z.tit.P', { s: 2, N: 'for:' }); //6~>---------- START
        b.parents().each((i, e) => {//Поиск scroll от элемента <dl> до HTML
            z.z.A.err.$('z.z.tit.P', {
                c: /fixed|sticky/.test($(e).css('position')) ? 1 : 0,
                n: i + '. %c' + (/fixed|sticky/.test($(e).css('position'))) +
                    (/fixed|sticky/.test($(e).css('position')) ? ' Нашли!' : ' Не нашли!') +
                    '%c position: ' + $(e).css('position'),
                q: e
            }); //6~>----------

            if (/fixed|sticky/.test($(e).css('position'))) {//Нашли //+ position: fixed
                x = 'position:fixed;';
                return false;//Остановим Each
            }
        });
        z.z.A.err.$('z.z.tit.P'); //6~>========== STOP

        z.z.A.err.$('z.z.tit.P', 0, 'x = 1 => position: ' + (x ? 'fixed/sticky' : 'absolute') + ';'); //4~>========== STOP

        return x;
    },
    C: {//Вычесляем кординаты 'C проверкой видемостина экране' info-..
        $: r => {//Ищим видемые
            z.z.A.err.$('z.z.tit.C.$', { s: 1, q: r }); //4~>---------- START

            z.z.A.err.$('z.z.tit.C.$', {
                c: z.z.tit.C.a[r.c] ? 1 : 0,
                n: '%c' + (z.z.tit.C.a[r.c] ? 'true%cНашли' : 'false%cНе нашли') + ' функцию: z.z.tit.C.a[`' + r.c + '`]();'
            }); //4~>----------

            if (z.z.tit.C.a[r.c]) {//Нашли функцию .R() Запустим и получим: Вычисление стороны
                // if(/^(L|T|R|B)$/.test(r.c)) {//Корекция под размер стрелки //O: /^(L|T|R|B)$/.test(q.c)?6:12,
                //     r.O = 6;
                // }
                z.z.tit.C.a[r.c](r);
                z.z.A.err.$('z.z.tit.C.$', {
                    c: 21,
                    n: 'Запускаем z.z.tit.C.a[`' + r.c + '`](); и получаем коардинаты: %cleft r.L: ' + r.L + ', top r.T:' + r.T + '%c'
                }); //4~>----------
            }

            if (z.z.tit.C.V.$(r)) {//Проверим видимось подсказки! Не помещается на экране!!! запустим авто подбор стороны поивления подсказки:
                z.z.A.err.$('z.z.tit.C.$', {
                    c: '00', n: '%c' + r.c + ' Не ' + (z.z.tit.C.a[r.c] ? 'помещается на экране' : 'нашли функцию: ' + r.c) +
                        '.%c r.L: ' + r.L + ', r.T: ' + r.T + '!!!'
                }); //4~>----------

                //#region       //✂ Сортируем (Для первоочередной стороны)----
                z.z.A.err.$('z.z.tit.C.$', { s: 2, c: 21, N: '%cСортируем (Для первоочередной стороны):' }); //6~>---------- START

                let v, a = Object.assign({}, z.z.tit.C.a);//Клонируем (Для сохранения оригинала)

                a = Object.keys(z.z.tit.C.a);//Переделаем многомерный array { R:1, L:1 } в ['R', 'L']
                z.z.A.err.$('z.z.tit.C.$', { n: "Переделаем многомерный array { R:1, L:1 } в ['R', 'L']:", q: a });//4~>----------

                a.splice(a.indexOf(r.c), 1);//Удалим непоместившиюся сторону
                z.z.A.err.$('z.z.tit.C.$', { c: 1, n: 'Удалим непоместившиюся сторону %c' + r.c + '%c', q: a });//4~>----------

                a = a.sort((a, b) => b[0] == r.c[0]);//b[0] == Буква по которой сортируем верх

                z.z.A.err.$('z.z.tit.C.$', { n: 'Отсортировали', q: a });//4~>----------
                z.z.A.err.$('z.z.tit.C.$'); //6~>========== STOP
                //#endregion    //✂ ------------------------------------------

                z.z.A.err.$('z.z.tit.C.$', { s: 2, c: 21, N: 'for %cЗапускаем авто подбор Вычисление стороны:' }); //6~>---------- START

                for (v of a) {
                    r.c = v;//T, TR, z.z.B...
                    // if(/^(L|T|R|B)$/.test(r.c)) {//Корекция под размер стрелки //O: /^(L|T|R|B)$/.test(q.c)?6:12,
                    //     r.O = 6;
                    // }
                    z.z.tit.C.a[r.c](r);//return r:{L:1, T:1}

                    if (r.c != 'x' && !z.z.tit.C.V.$(r)) {//Проверка видемости
                        z.z.A.err.$('z.z.tit.C.$', { c: 11, n: '%cСторона: ' + r.c + ' помещается на экране. r.L: ' + r.L + ', r.T: ' + r.T + '%c' });//4~>----------
                        break;
                    } else {//Не помещается!!!
                        z.z.A.err.$('z.z.tit.C.$', { c: '00', n: '%cСторона: ' + r.c + ' не помещается на экране!!! r.L: ' + r.L + ', r.T: ' + r.T + '%c' }); //4~>----------
                    }
                }//return {L:1, T:1}

                z.z.A.err.$('z.z.tit.C.$', { n: 'r:', q: r });//4~>----------
                z.z.A.err.$('z.z.tit.C.$'); //6~>========== STOP
            }

            z.z.A.err.$('z.z.tit.C.$'); //4~>========== STOP
        },
        V: {//Вычесления
            $: r => {//Проверка видемости С Право/Лево/Низ/Верх..
                z.z.A.err.$('z.z.tit.C.V.$', { s: 1, c: 21, n: 'Сторона %c' + r.c }); //4~>----------
                z.z.A.err.$('z.z.tit.C.V.$', {
                    c: (((r.L - r.sL) + r.pW) + r.o > r.bW) ? '00' : 11,
                    n: '(((left[' + r.L + '] - [' + r.sL + ']Прокрутка left)=[' + (r.L - r.sL) + '] + [' + r.pW + ']Подсказка width + [' + r.o + ']Отступ от подсказки)=[' + ((r.L - r.sL) + r.pW + r.o) + '] > [' + r.bW + ']Браузер окно width).' +
                        '\n\tПодсказка с права: %c' + ((((r.L - r.sL) + r.pW) + r.o > r.bW) ? 'true' : 'false не') + ' выходит за пределы!%c= if(До подсказки + подсказка[' + ((r.L - r.sL) + r.pW + r.o) + '] > [' + r.bW + ']Браузер окно width)'
                }); //4~>----------
                z.z.A.err.$('z.z.tit.C.V.$', {
                    c: ((r.L - r.sL) - r.o < 0) ? '00' : 11,
                    n: '((left[' + r.L + '] - [' + r.sL + ']Прокрутка left)=До подсказки[' + (r.L - r.sL - r.o) + '] < [0]Браузер окно left).' +
                        '\n\tПодсказка с лева: %c' + (((r.L - r.sL) - r.o < 0) ? 'true' : 'false не') + ' выходит за пределы!%c= if(До подсказки[' + (r.L - r.sL - r.o) + '] < [0]Браузер окно left)'
                }); //4~>----------
                z.z.A.err.$('z.z.tit.C.V.$', {
                    c: (((r.T - r.sT) + r.pH) + r.o > r.bH) ? '00' : 11,
                    n: '(((top[' + r.T + '] - [' + r.sT + ']Прокрутка top)=[' + (r.T - r.sT) + '] + [' + r.pH + ']Подсказка height + [' + r.o + ']Отступ от подсказки)=[' + ((r.T - r.sT) + r.pH + r.o) + '] > [' + r.bH + ']Браузер окно height).' +
                        '\n\tПодсказка с низу: %c' + ((((r.T - r.sT) + r.pH) + r.o > r.bH) ? 'true' : 'false не') + ' выходит за пределы!%c= if(До подсказки + подсказка[' + ((r.T - r.sT) + r.pH + r.o) + '] > [' + r.bH + ']Браузер окно height)'
                }); //4~>----------
                z.z.A.err.$('z.z.tit.C.V.$', {
                    c: ((r.T - r.sT) - r.o < 0) ? '00' : 11,
                    n: '((top[' + r.T + '] - [' + r.sT + ']Прокрутка top)=До подсказки[' + (r.T - r.sT - r.o) + '] < 0).' +
                        '\n\tПодсказка с верху: %c' + (((r.T - r.sT) - r.o < 0) ? 'true' : 'false не') + ' выходит за пределы!%c= if(До подсказки[' + (r.T - r.sT - r.o) + '] < [0]Браузер окно left)'
                }); //4~>----------

                if (//Проверка видемости (Подсказка не видна хоть с 1 стороны)
                    //(left - Прокрутка left) + Подсказка > Браузер окно
                    ((r.L - r.sL) + r.pW) + r.o > r.bW ||//Право
                    (r.L - r.sL) - r.o < 0 ||//Лево
                    ((r.T - r.sT) + r.pH) + r.o > r.bH ||//Низ
                    (r.T - r.sT) - r.o < 0//Верх
                ) {
                    z.z.A.err.$('z.z.tit.C.V.$', 0, 1 + ' = Ошибка'); //4~>========== STOP
                    return 1;//Ошибка
                }
                z.z.A.err.$('z.z.tit.C.V.$', 0, 0 + ' = Хорошо'); //4~>========== STOP
            },
            c: {//По центру
                v: r => {//Вертикально (R, L)
                    return r.kH < r.pH//button 22 < Подсказки 24
                        ? r.mT - ((r.pH - r.kH) / 2)//Отнять от top для центра
                        : r.mT + ((r.kH - r.pH) / 2);//Узнаем свободное место в button
                },
                g: r => {//Горизонтально (B, T)
                    return r.L = r.kW > r.pW//Размер button[100] > [50]Размер подсказки
                        ? r.mL + ((r.kW - r.pW) / 2)//button >
                        : r.mL - ((r.pW - r.kW) / 2);//button <
                }
            }
        },
        a: {//Вычисление стороны
            R: r => {//В право
                r.T = z.z.tit.C.V.c.v(r);//По центру вертикально
                r.L = r.mL + r.kW + r.O;//Left + размер button + 12 отступ
            },
            L: r => {//В лево
                r.T = z.z.tit.C.V.c.v(r);//По центру вертикально
                r.L = r.mL - r.pW - r.O;
            },

            B: r => {//Низ
                r.L = z.z.tit.C.V.c.g(r);//По центру горизонт
                r.T = r.mT + r.kH + r.O;
            },
            T: r => {//Верх
                r.L = z.z.tit.C.V.c.g(r);//По центру горизонт
                r.T = r.mT - r.pH - r.O;
            },

            BL: r => {//Низ слева на право
                r.T = r.mT + r.kH + r.O;
                r.L = r.mL;
            },
            BL2: r => {//Низ слева на право (Когда кнопка с лева в притык к стенке)
                r.T = r.mT + r.kH + r.O;
                r.L = r.mL + 10;
            },
            BR: r => {//Низ справа на лево
                r.T = r.mT + r.kH + r.O;
                r.L = r.mL + r.kW - r.pW;
            },
            BR2: r => {//Низ справа на лево (Когда кнопка с права в притык к стенке)
                r.T = r.mT + r.kH + r.O;
                r.L = (r.mL - 10) + r.kW - r.pW;
            },
            TL: r => {//Верх слева на право
                r.T = r.mT - r.pH - r.O;
                r.L = r.mL;
            },
            TL2: r => {//Верх слева на право (Когда кнопка с лева в притык к стенке)
                r.T = r.mT - r.pH - r.O;
                r.L = r.mL + 10;
            },
            TR: r => {//Верх справа на лево
                r.T = r.mT - r.pH - r.O;
                r.L = r.mL + r.kW - r.pW;
            },
            TR2: r => {//Верх справа на лево (Когда кнопка с права в притык к стенке)
                r.T = r.mT - r.pH - r.O;
                r.L = (r.mL - 10) + r.kW - r.pW;
            },

            x: r => {//Не нашли! ставим по экрану //0|
                r.L = r.sL;

                r.T = r.sT;
                if (r.pH > r.bH) {//Вертикально не помещяется(Подсказка > Браузер окно)
                    r.W = r.bW;//max-width:
                }

                z.z.A.err.$('z.z.tit.C.V.$', {
                    c: 11, n: r.c + ' Не нашли! Ставим по экрану' +
                        '\n\t Подсказка width[' + r.pW + '] > [' + r.bW + ']Браузер окна width' +
                        '\n\t Подсказка height[' + r.pH + '] > [' + r.bH + ']Браузер окна height' +
                        '\n\t %cOK => left: ' + r.L + ', top: ' + r.T + '%c'
                }); //4~>----------
            }
        }
    },

    //^ Всплывающая подсказка2:
    /*  z.z.tit.$2({
            id: '#vp2',//id куда вешаем <dl id="#vp2">123</dl> || <dl id="#vp2"><button>123</button></dl> || <div id="#vp2">123</div>

            ti: 'HTML',//Заголовок //! Запускает Всплывающая подсказка2
            ti: undefined | 0 | '',//† Окно с текстом Ошибки

            t: '<div style="margin: 10px">...</div>',//текст
            t: e => {//return текст
                ///e = event <dl>
                    return '<pre id="cod" style="margin:0;"><code class="v-BG0">' +
                            $(e).html().replace(/</g, '&lt;') +
                        '</code></pre>';
            },
            d: 1,           //Убераем запрет на показывание подсказки (когда внутри disabled)
            d: undefined,   //† когда внутри disabled не показываем подсказку

                ///¦ Сторона поивления:
            c: 'R',//class (T=Верх, B=Низ, R=Право, L=Лево),
                ///(TR = Верх справа на лево, TL = Верх слева на право, BR = Низ справа на лево, BL = Низ слева на право)
            c: undefined,//† R

                ///¦ Расцветка шаблона:
            C: undefined,//8 = Белая (для Тёмного фона)
            ///0 = Красная
            ///1 = Зелёный
            ///2 = Оранжевый
            ///3 = Жолтый
            ///4 = Синия
            ///5 = Серый
            ///6 = Розовый
            ///7 = Океан
            ///8 = Белая    //+
            ///9 = Чёрный
        });

        -------------------------------------------------------
        + <body class="B-stop"> .B-stop Уберает показ всех подсказок!
        + Может выходить за пределы <div overflow: hidden;>
        -------------------------------------------------------
        ! Примечание: Когда <button data-inf="" disabled> Всплывающая подсказка не работает! (закрывается)
            + Решение: <dl data-inf=""><button disabled></dl>
                * Обернуть в другой элемент!
        -------------------------------------------------------
        ↔ || Или -------------------------------------
        Для <dl data-inf2="{'t': 'Текст','ti': 'Заголовок', 'c': 'TL'}">...</dl>. Нужен Запуск для работы подсказки: //0~> z.z.tit.$2();
    */
    $2: q => {//+ Вешаем обработку по ид. Навели/Убрали мышкой
        z.z.A.err.$('z.z.tit.$2', { s: 1, q: q }); //4~>---------- START

        $(q?.id || '[data-inf2]').each((i, e) => {
            if ($._data($(e)[0], 'events')?.mouseout[0].namespace != 'vp2') {//Проверка ключа (Ключь не совпал! повесим обработчик)
                let Q = q || z.f.json.data({ e: e, t: 'inf2' });//Обработаем data-but="{}" в array({…}) и //† Удалим data-!

                $(e).on('mouseenter.vp2 mouseleave.vp2', E => {//click.vp2
                    if (Q.d || (!$(E.currentTarget).find(':disabled')[0] && !$('body.B-stop')[0])) {
                        if (!Q.ti) {//† Заголовок Отсутствует! Добавим ошибку
                            Q.ti = ' ';
                            Q.t = '<div style="text-align: center;"><p style="color:red">Отсутствует <em>заголовок</em>!</p>Без заголовка используем Всплывающая подсказка1 z.z.tit.$();</div>';
                        }
                        z.z.tit.S2.$(E, Q);
                    }
                });
            }
        });

        z.z.A.err.$('z.z.tit.$2'); //4~>========== STOP
    },
    S2: {//1~> Сработало
        $: function (e, q) {
            z.z.A.err.$('z.z.tit.S2.$', { s: 1, q: q }); //4~>---------- START

            //                    && Окно открыто
            //if (e.type == 'click' && $('#' + z.z.tit.O.id + '2')[0]) {//† Закроем
            if (e.type == 'mouseleave') {//Убрали мышку с <button> //† Закроем
                z.z.tit.X2(1000);
            } else
                if (e.type == 'mouseenter') {//+ Открываем      || e.type == 'click'
                    clearTimeout(z.z.tit.T);

                    q.e = $(e.currentTarget);//<dl>

                    if (q.ti === undefined) {//Уберём заголовок и сообщим о запуске #info2 Всплывающая подсказка2
                        q.ti = '';
                    }

                    z.z.tit.X.$(q);

                    q.b = $('#' + z.z.tit.O.id + '2')//окно  (После запуска окна z.z.tit.X.$)
                        .css({ opacity: 1, animation: 'OinfX .3s forwards' })//Меняем для затемнения и возврата через css()
                        .children('div').css({ width: $('#' + z.z.tit.O.id + '2 > div').width(), overflow: 'auto' });//Убераем полосу прокрутки с низу

                    q.b.hover(//okno
                        () => {//Навели //+ Вернём подсказку
                            clearTimeout(z.z.tit.T);
                            q.b.css('opacity', 1);
                        },
                        () => {//Убрали
                            z.z.tit.X2(//† Авто закрытие
                                600            //Сек до закрытия
                            );
                        }
                    );

                    // setTimeout(() => {
                    //     $(document).on('click.zztit2', e => {//• Клик вне элемента  $() для закрытия
                    //         //console.error(e);
                    //         //если клик был не по нашему блоку && и не по его дочерним элементам
                    //         if (
                    //             !q.e.is(e.target) && q.e.has(e.target).length == 0 &&   //dl
                    //             !q.b.is(e.target) && q.b.has(e.target).length == 0      //Окно
                    //         ) {//Клик вне элемента
                    //             //console.error('† Закрываем');
                    //             // z.z.tit.X2();//† Закрываем
                    //         }
                    //     });
                    // }, 1);//Убераем срабатывание click при открытии

                    // z.z.tit.X2(//† Авто закрытие (Когда не навели на Всплывающая подсказка2)
                    //     1000            //Сек до закрытия
                    // );
                }

            z.z.A.err.$('z.z.tit.S2.$'); //4~>========== STOP
        }
    },
    /*  z.z.tit.X2(//† Закрываем
            1000            //Сек до закрытия
            || undefined    //0 сек
        );
    */
    //T:0,//clearTimeout(this.T);
    X2: function (s) {
        clearTimeout(this.T);
        //return;
        let b = $('body > #' + z.z.tit.O.id + 2).css('opacity', 0);

        this.T = setTimeout(() => {//† Авто закрытие
            z.z.A.err.$('z.z.tit.X2', { s: 1, n: 'setTimeout: ' + s }); //4~>---------- START

            $(document).off('click.zztit2');
            b.remove();//$('body > #' + z.z.tit.O.id + 2)

            z.z.A.err.$('z.z.tit.X2'); //4~>========== STOP
        }, s || 0);
    }
};