(function(){
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // feather icon on section labels
  document.querySelectorAll(".sec-head").forEach(function(h){
    h.insertAdjacentHTML("afterbegin",'<svg aria-hidden="true"><use href="#feather"/></svg>');
  });

  // drifting peacock feathers
  var fx=document.getElementById("fx");
  if(fx&&!reduce){
    for(var n=0;n<8;n++){
      var s=document.createElementNS("http://www.w3.org/2000/svg","svg");
      var u=document.createElementNS("http://www.w3.org/2000/svg","use");
      u.setAttribute("href","#feather");s.appendChild(u);
      var w=18+Math.random()*22;
      s.style.cssText="left:"+(Math.random()*96)+"%;width:"+w+"px;height:"+(w*2)+"px;"+
        "animation-duration:"+(22+Math.random()*20)+"s;animation-delay:-"+(Math.random()*30)+"s;"+
        "--dx:"+((Math.random()-.5)*160)+"px;--r0:"+(-30+Math.random()*60)+"deg;--r1:"+(-30+Math.random()*60)+"deg";
      fx.appendChild(s);
    }
  }

  // typed role line
  var roles=["Software Engineer","AI application builder","Fintech and quant tinkerer","Real-time systems developer"];
  var el=document.getElementById("typed"),ri=0,ci=0,del=false;
  if(!reduce){
    (function tick(){
      var w=roles[ri];
      el.textContent=w.slice(0,ci);
      if(!del&&ci<w.length){ci++;setTimeout(tick,70)}
      else if(!del){del=true;setTimeout(tick,1600)}
      else if(ci>0){ci--;setTimeout(tick,35)}
      else{del=false;ri=(ri+1)%roles.length;setTimeout(tick,300)}
    })();
  }

  // scroll reveal
  var items=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window&&!reduce){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}});
    },{threshold:.12});
    items.forEach(function(i){io.observe(i)});
  }else{items.forEach(function(i){i.classList.add("in")})}

  // card spotlight
  document.querySelectorAll(".card").forEach(function(c){
    c.addEventListener("mousemove",function(e){
      var r=c.getBoundingClientRect();
      c.style.setProperty("--mx",(e.clientX-r.left)+"px");
      c.style.setProperty("--my",(e.clientY-r.top)+"px");
    });
  });

  // scroll progress and active nav link
  var bar=document.getElementById("progress");
  var links=[].slice.call(document.querySelectorAll(".nav-links a[href^='#']:not(.btn)"));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute("href"))});
  function onScroll(){
    var h=document.documentElement;
    bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
    var cur=-1,y=window.scrollY+120;
    secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});
    links.forEach(function(a,i){a.classList.toggle("active",i===cur)});
  }
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();

  // mobile menu
  var btn=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");
  function setMenu(o){nav.classList.toggle("open",o);btn.setAttribute("aria-expanded",o);btn.textContent=o?"CLOSE":"MENU"}
  btn.addEventListener("click",function(){setMenu(!nav.classList.contains("open"))});
  nav.addEventListener("click",function(e){if(e.target.tagName==="A")setMenu(false)});
})();
