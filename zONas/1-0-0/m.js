var zONas={N:{o:4},iB:'>button:eq(0),>:eq(0) button,#zonasb,.zonasb',Fx:[],$:(q={})=>{let O=zONas,on=id=>{id.each((i,e)=>{if(O.proNS(e,'zONas')){if(typeof q?.Fx=='function'){O.Fx.push(q.Fx);delete q.Fx;$(e).closest('[class*="zONas-"]').attr('data-zonas',(O.Fx.length-1))}$(e).on('click.zONas',e=>{if($(e.currentTarget)[0].nodeName=='A'){e.preventDefault()}if(O.F){return}O.C($(e.currentTarget),q)})}})};on(q.id?$('#'+q.id.replace('#','')).find(O.iB):$('[class*="zONas-"]').not('[id]').find(O.iB))},C:(b,q)=>{let c,O=zONas,d=b.closest('[class*="zONas-"]');if(/zONasO/.test(c=d.attr('class'))){O.X(d)}else{clearTimeout(O.T2);let X,N,x=!d.is('.zONasNet');if((X=$('[class*="zONasO"]:not(.zONasNet)'))[0]){O.X(X)}N=d.find('>div').eq(-1);if((N.find('>div').html()||'').replace(/[\r\n\t ]/g,'').length==0){N.find('>div').html('<font color="red">Содержание отсутствует!</font>')}if(typeof q?.F=='function'){O.F=1;d.addClass('zONasL');O.T=setTimeout(()=>{N.find('>div').html('<font color=red>Возникла ошибка!<br>Обработки function!</font>');O.C(b);d.removeClass('zONasL');O.F=0},15000);q.F(d,b,N.find('>div'));return}if(x){O.D(d,O)}O.O(d,O);O.w(d,N,c);if(O.F){clearTimeout(O.T);O.F=0;d.removeClass('zONasL')}}},X:(d,o)=>{let O=zONas,id=d.attr('data-zonas');clearTimeout(O.T2);if(O.db){O.db.disconnect();O.db=0}if(!o&&O.Fx[id]){O.Fx[id](d)}$(document).off('.zONas');d.removeClass('zONasO zONasOm zONasL zONasOmi zONasOmik');d.find('>div').removeAttr('style')},L:(d,b,N,t)=>{let O=zONas;if(O.F){if(t===false){clearTimeout(O.T);O.F=0}else{N.html(t);O.C(b)}d.removeClass('zONasL')}},w:(d,n,c)=>{let V,i,O=zONas.N.o,D=$(document),w=D.outerWidth(),h=D.outerHeight(),B=$(window),Bw=B.outerWidth(),Bh=B.outerHeight(),W=n.outerWidth()+O,H=n.outerHeight()+O,K=d.offset(),KL=K.left,KT=K.top,KW=d.outerWidth(),KH=d.outerHeight(),S=new RegExp('zONas-[A-Z]+').exec(c)[0],sL=+n.css('--nas-LR').replace(new RegExp('[a-z]+'),'');sT=9,L=S[7]=='R'?KL+sL:(KL+KW+(sL<0?Math.abs(sL):sL-(sL * 2)))-(W-O);T=S[6]=='T'?KT-(H-O)-sT-+n.css('border-top-width').replace(new RegExp('[a-z]+'),''):KT+KH+sT+ +n.css('border-bottom-width').replace(new RegExp('[a-z]+'),''),LW=L+W,TH=T+H,Tx=T<O||TH>h,Lx=L<O||LW>w;if(Lx||Tx){let C='zONas-',j;if(Tx){C+=S[6]=='B'?'T':'B'}else{C+=S[6]}if(Lx){let mL=KL<(9+O),mR=(w-(KL+KW))<(9+O);if(KW<35&&(mL||mR)){i=KW<15?2:1}j=n=>{n=L<O?KL:(w-(KL+KW));return n<O?O-n:+('-'+(n-O))};j=L<O?S[7]=='R'?[,j()]:mL?[,j(),'R']:[1,L-O+-8]:S[7]=='L'?[1,j()]:mR?[1,j(),'L']:[,w-LW+-8];if(j[2]){C+=j[2]}n.css({[j[0]?'right':'left']:+j[1].toFixed(2)});V=1}if(!C[7]){C+=S[7]}if(Tx||j[2]){d.removeClass(S).addClass(C)}}d.addClass('zONasO'+(V||KW<40?'m'+(i?i==1?'i':'ik':''):''))},D:(d,O)=>{$(document).on('click.zONas',e=>{if(!d.is(e.target)&&!d.has(e.target)[0]){O.X(d)}})},O:(d,O)=>{clearTimeout(O.T2);O.T2=setTimeout(()=>{O.oko(m=>{let W=m.contentRect.width;if(W!=O.R){if(O.R&&d[0]){O.X(d,1);clearTimeout(O.T2);O.T2=setTimeout(()=>{O.C(d.find(O.iB));O.R=W},500)}O.R=W}})},999)},oko:f=>{let M=window.ResizeObserver;if(typeof M!=='undefined'){zONas.db=new M(m=>{f(m[0])});zONas.db.observe($('html')[0],{})}},proNS:(e,P,c='click')=>{let d=$._data($(e)[0],'events')?.[c];if(d&&d[0].namespace){return!d.filter(v=>{if(v['namespace']==P){return true}})[0]}return true}}