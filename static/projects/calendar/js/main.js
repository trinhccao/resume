"use strict";const days=document.querySelectorAll(".calendar .day"),prev=document.querySelector(".calendar .btn-prev"),next=document.querySelector(".calendar .btn-next"),headerMY=document.querySelector(".calendar .cheader"),strMonths=["Một","Hai","Ba","Tư","Năm","S\xe1u","Bảy","T\xe1m","Ch\xedn","Mười","Mười một","Mười hai"];function fillCalendarData(e){let t=e.getFullYear(),a=e.getMonth(),n=new Date(t,a).getDay(),r=new Date(t,a+1,0).getDate(),i=0,c=0===n?6:n-1;days.forEach((e,n)=>{e.innerHTML="",e.classList.remove("today"),n<c||n>=c+r||(e.innerHTML=++i,t===active.y&&a===active.m&&i===active.d&&e.classList.add("today"))}),headerMY.innerHTML=`Th\xe1ng ${strMonths[a]}, ${t}`}var date=new Date,y=date.getFullYear(),m=date.getMonth(),d=date.getDate(),active={y:y,m:m,d:d};function clearSticky(e){let t=e.parentElement,a=e.nextSibling;t.removeChild(e),setTimeout(()=>{t.insertBefore(e,a)},0)}prev.addEventListener("click",()=>{--m<0&&(y--,m=11),fillCalendarData(date=new Date(y,m))}),next.addEventListener("click",()=>{++m>11&&(y++,m=0),fillCalendarData(date=new Date(y,m))}),fillCalendarData(date),prev.addEventListener("touchend",function(){this.onclick=function(){clearSticky(this)}}),next.addEventListener("touchend",function(){this.onclick=function(){clearSticky(this)}});