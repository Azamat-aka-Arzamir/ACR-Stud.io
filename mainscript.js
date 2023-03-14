var logo = document.getElementById("logo");
logo.addEventListener("mouseover",Cum);
var play = false;
async function Cum(e){
    if(play==true)return;
    play=true;
logo.setAttribute("src","./acr.gif");
const a = await new Promise((r,e)=>window.setTimeout(()=>{logo.setAttribute("src","ACRlogo.png");play=false;}, 3166));

}