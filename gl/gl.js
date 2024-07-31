var gl = {
  $:() => {//Запуск
    /* gl.m.$({ //Меню
      htm: [ //Список <button>
        { //0
          n: 'Фон Светлый/Тёмный (body)', //Название
          t: '', //Теги <...
        }
      ]
    }); */
    gl.M.$();//Кнопки перед меню
  },
  M: {//Кнопки меню
    $: function () {
      let O = this;
      $('#M>div').append('<div>'+ O.X.t() +'</div><div>'+//Удалить меню
        O.font.fam.t() +//font-family
        O.font.siz.t() +//font-size
        O.bodyS.t() +//Добавим полосу прокрутки
        O.tema.t()+//Смена фона body
      '<div>');
      //Вешаем click
      O.font.fam.t$();//font-family
      O.font.siz.t$();//font-size
      O.tema.t$();//Смена фона body click + при загрузке установить body class
    },
    font: { //font-size/family html
      siz:{
        $: e => {//$() || {string}
          let C = typeof e == 'string'? e : $(e).val();

          gl.f.db.pish('font-siz', C);

          $('html').css('font-size', C + 'pt')
        },
        t: () => { //кнопки <select
          let s = gl.f.db.chit('font-siz') || 12,
            t = '<select id="font-siz">';
      
          [8, 10, 12, 14, 16, 18, 20, 22, 24].forEach(v => {
            t += '<option value="' + v + '"' +
              (v == s ? ' selected' : '') + '>' + v;
          });
      
          return t + '</select>'
        },
        t$: () => {//click + localStorage
          let O = gl.M.font.siz,
            l = gl.f.db.chit('font-siz');
        
          if (l) {//Установим font-size в html
            O.$(l);
          }
        
          $('#font-siz').on('change', function() {//click
            O.$(this)
          });
        }
      },
      fam:{
        $: e => {//$() || {string}
          let C = typeof e == 'string'? e : $(e).val();

          gl.f.db.pish('font-fam', C);

          $('body').css('font-family',C)
        },
        t: () => { //кнопки <select
          let s = gl.f.db.chit('font-fam'),
            t = '<select id="font-fam">'+
            '<option>font-family';
      
          [
            'Istok Web',
            'Comfortaa',
          ].forEach(v => {
            t += '<option value="' + v + '"' +
              (v == s ? ' selected' : '') + '>' + v;
          });
      
          return t + '</select>'
        },
        t$: () => { //click + localStorage
          let O = gl.M.font.fam,
            l = gl.f.db.chit('font-fam');
        
          if (l) {//Установим font-family в body
            O.$(l);
          }
        
          $('#font-fam').on('change', function() {//click
            O.$(this)
          });
        }
      }
    },
    bodyS: { //Добавим полосу прокрутки
      $: () => {
        $('body').toggleClass('bodyS');
      },
      t: () => {
        return '<button onclick="gl.M.bodyS.$()">scrol</button>'
      }
    },
    tema: { //Смена фона body
      //e = this <select
      $: e => {//Вырезаем из списка class tema[0-9- и заменим на новый
        let C = $(e).val(), s=C.split('/');
        
        gl.f.db.pish('tema', C);
        $('body').removeClass('temaT');

        let t=($('body').attr('class') || '')//Берём весь class и вырезаем tema
          .replace(/(^| )tema[0-9-]+( |$)/, '$1')
          .replace(/ $/,'');
        
        $('body').attr('class',
          (t?t+' ':'') +//вернём classы
          'tema'+s[0]+//и добавим новый
          (s[1]?' temaT':'')
        );
      },
      t: () => {//кнопки <select
        let s=gl.f.db.chit('tema') || 8,
          a=[//class,color,name,1=тёмный фон
            ['4-2','012','Тёмно синий',1],
            [8,'fff','Белый'],
            [9,'000','Чёрный',1]
          ], t = '<select id="tema">';

        a.forEach(v => {
          t += '<option value="' + v[0] +
            (v[3]?'/'+v[3]:'')+ '" ' +
            (v[0] == s ? ' selected' : '') + '>'+v[2]
        });

        return t + '</select>'
      },
      t$: () => {//СТАРТ Вешаем click + проверии localStorage
        let l=gl.f.db.chit('tema'), s;
        
        if(l){//запись фона
          s=l.split('/');
          $('body').addClass('tema'+s[0]+(s[1]?' temaT':''))
        }
        
        $('#tema').on('change', function() {
          gl.M.tema.$(this); //Смена фона
        });
      }
    },
    X:{//Убрать меню
      $:() => {
        $('#M').remove()
      },
      t:()=>{
        return '<button onclick="gl.M.X.$()" x>X</button>'
      }
    }
  },
  f:{//funk gl.db.chit
    db:{
      /* 
        .f.db.chit('ключь');//Читаем
        .f.db.pish('ключь', '');//Пишим
      */
      k:'gl_',//Начало уникального ключа
      chit: function(k) {//Читаем
        return localStorage.getItem(this.k + k);
      },
      pish: function(k, v) {//Пишим
        localStorage.setItem(this.k + k, v);
      }
    }
  }
};
