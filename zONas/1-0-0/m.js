var zONas={$:(q={})=>{let O=zONas,on;if(!O.r){O.oko(m=>{let b,w=m.contentRect.width,h=m.contentRect.height;if(w!=O.R||h!=O.R){b=$('.zONasO, .zONasOm');if(b[0]){b=b.find('>button:eq(0),>:eq(0) button');O.C(b,1);O.C(b,2)}O.R=[w,h]}});O.r=1}on=id=>{id.each((i,e)=>{if($._data($(e)[0],'events')?.click[0].namespace!='zONas'){$(e).on('click.zONas',e=>{if($(e.currentTarget)[0].nodeName=='A'){e.preventDefault()}O.C($(e.currentTarget),q?.F)})}})};if(q.id&&(q.id=$('body #'+q.id))[0]){on(q.id)}else{on($('[class*="zONas-"]').not('[id]').find('>button:eq(0),>:eq(0) button'))}},C:(b,F)=>{let d=b.closest('[class*="zONas-"]'),N=d.find('>div').eq(-1);if(F==1||/zONasOm?/.test(d.attr('class'))){d.removeClass('zONasO zONasOm');N.removeAttr('style')}else{let D=$(document),w=D.outerWidth(),h=D.outerHeight();if(!F&&(N.find('>div').html()||'').replace(/[\r\n\t ]/g,'').length==0){N.find('>div').html('<font color="red">Содержание отсутствует!</font>')}setTimeout(()=>{$(document).on('click.zONas',e=>{if(!N.is(e.target)&&!N.has(e.target)[0]){$(document).off('.zONas');d.removeClass('zONasO zONasOm');N.removeAttr('style')}})},1);if(typeof F=='function'){zONas.F=d;d.addClass('zONasL');F(d,b,N);return}else if(zONas.F){zONas.F.removeClass('zONasL');zONas.F=0}N.css({display:'unset'});B=zONas.w(d,N,w,h);d.addClass('zONasO'+(B||d.width()<40?'m':''))}},L:(d,b,N,t)=>{if(zONas.F){N.html(t);zONas.C(b);d.removeClass('zONasL')}},w:(d,n,w,h)=>{let B,O=10,o=n.offset(),W=Math.round(n.outerWidth()+O),H=Math.round(n.outerHeight()+O),LW=Math.round(o.left+W),TH=Math.round(o.top+H),Lx=o.left<O||LW>w,Tx=o.top<O||TH>h;if(Lx||Tx){let S,C='zONas-';d.removeClass((i,c)=>{S=/zONas-[A-Z]+/.exec(c)[0];return S});if(Tx){C+=S[6]=='B'?'T':'B'}else{C+=S[6]}if(Lx){if((S[7]=='L'&&(o.left<O&&LW>w))||(S[7]=='R'&&o.left>W)){C+=S[7]=='R'?'L':'R'}else{C+=S[7];n.css({[S[7]=='R'?'left':'right']:S[7]=='R'?w-LW-O:o.left-O});B=1}}else{C+=S[7]}d.addClass(C)}return B},oko:f=>{let M=window.ResizeObserver;if(typeof M!=='undefined'){zONas.db=new M(m=>{f(m[0])}).observe($('html')[0],{})}}}