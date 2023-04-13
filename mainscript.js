var logo = document.getElementById("logo");
logo.addEventListener("mouseover",Cum);
var play = false;
async function Cum(e){
    if(play==true)return;
    play=true;
logo.setAttribute("src","./acr.gif");
const a = await new Promise((r,e)=>window.setTimeout(()=>{logo.setAttribute("src","ACRlogo.png");play=false;}, 3166));

}

const express = require('express');

const app = express();
const PORT = 5000;

app.get('/ape/', (req, res) => {
  res.send('<img src="https://userpic.fishki.net/2018/04/17/1553451/cd38093673598bb3097cd25415f1898d.gif"><h1>ReQuEsT DeNiEd U FaGgOt!!!1!</h1>');
});

app.listen(PORT, () => {
  console.log(`BACKEND SERVER LISTENING ON PORT ${PORT}`);
});