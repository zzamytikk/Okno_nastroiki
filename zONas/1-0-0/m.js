var zONas={N:{o:4},iB:'>button:eq(0),>:eq(0) button,#zonasb,.zonasb',$:(q={})=>{let O=zONas,on=id=>{id.each((i,e)=>{if(O.proNS(e,'zONas')){$(e).on('click.zONas',e=>{if($(e.currentTarget)[0].nodeName=='A'){e.preventDefault()}if(O.F){return}O.C($(e.currentTarget),q?.F)})}})};on(q.id&&(q.id=$('#'+q.id.replace('#','')))[0]?q.id.find(O.iB):$('[class*="zONas-"]').not('[id]').find(O.iB))},C:(b,F)=>{let O=zONas,d=b.closest('[class*="zONas-"]'),N=d.find('>div').eq(-1);if(/zONasO/.test(d.attr('class'))){O.X(d)}else{clearTimeout(O.T2);let X,D=$(document),w=Math.round(D.outerWidth()),h=Math.round(D.outerHeight()),K=[Math.round(d.offset().left),Math.round(d.outerWidth())];if((X=$('[class*="zONas-"]'))[0]){O.X(X)}if((N.find('>div').html()||'').replace(/[\r\n\t ]/g,'').length==0){N.find('>div').html('<font color="red">Содержание отсутствует!</font>')}if(typeof F=='function'){O.F=1;d.addClass('zONasL');O.T=setTimeout(()=>{N.find('>div').html('<font color=red>Возникла ошибка!<br>Обработки function!</font>');O.C(b);d.removeClass('zONasL');O.F=0},15000);F(d,b,N.find('>div'));return}O.D(d,O);O.O(d,O);N.css({display:'unset'});O.w(d,N,w,h,K);if(O.F){clearTimeout(O.T);O.F=0;d.removeClass('zONasL')}}},X:d=>{let O=zONas;clearTimeout(O.T2);if(O.db){O.db.disconnect();O.db=0}$(document).off('.zONas');d.removeClass('zONasO zONasOm zONasL zONasOi');d.find('>div').removeAttr('style')},L:(d,b,N,t)=>{let O=zONas;if(O.F){if(t===false){clearTimeout(O.T);O.F=0}else{N.html(t);O.C(b)}d.removeClass('zONasL')}},w:(d,n,w,h,K)=>{let B,i,O=zONas.N.o,o=n.offset(),L=Math.round(o.left),T=Math.round(o.top),W=Math.round(n.outerWidth()+O),H=Math.round(n.outerHeight()+O),LW=Math.round(L+W),TH=Math.round(T+H),Lx=L<O||LW>w,Tx=T<O||TH>h;if(Lx||Tx){let S,C='zONas-';d.removeClass((i,c)=>{S=/zONas-[A-Z]+/.exec(c)[0];return S});if(Tx){C+=S[6]=='B'?'T':'B'}else{C+=S[6]}if(Lx){C+=S[7];n.css({[S[7]=='R'?'left':'right']:S[7]=='R'?w-LW+-8:L-O+-8});L=K[0]<(9+O);R=(w-(K[0]+K[1]))<(9+O);if(K[1]<35&&(L||R)){i=1}B=1}else{C+=S[7]}d.addClass(C)}d.addClass('zONasO'+(B||d.width()<40?i?'i':'m':''))},D:(d,O)=>{$(document).on('click.zONas',e=>{if(!d.is(e.target)&&!d.has(e.target)[0]){O.X(d)}})},O:(d,O)=>{clearTimeout(O.T2);O.T2=setTimeout(()=>{O.oko(m=>{let W=m.contentRect.width;if(W!=O.R){if(O.R&&d[0]){O.X(d);clearTimeout(O.T2);O.T2=setTimeout(()=>{O.C(d.find(O.iB));O.R=W},500)}O.R=W}})},999)},oko:f=>{let M=window.ResizeObserver;if(typeof M!=='undefined'){zONas.db=new M(m=>{f(m[0])});zONas.db.observe($('html')[0],{})}},proNS:(e,P,c='click')=>{let d=$._data($(e)[0],'events')?.[c];if(d&&d[0].namespace){return!d.filter(v=>['namespace']==P)[0]}return true}}