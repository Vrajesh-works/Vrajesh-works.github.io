(function(){
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
