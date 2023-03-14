class exp{
    constructor(){
        this.n1=Math.floor(Math.random() * 11);
        this.n2=Math.floor(Math.random() * 11);
        this.rightAnswer=this.n1*this.n2;
    }
}
var expressions=[]; 
var exps = Array.from(document.getElementsByClassName("expression"));
SetValues();
function SetValues(){
    expressions=[];
    exps.forEach(e => {
        expressions.push(new exp());
        e.innerText=expressions[expressions.length-1].n1 + " x "+expressions[expressions.length-1].n2;
    });
    Array.from(document.getElementsByClassName("textfield")).forEach(e=>{if(defaultStyle!=null)e.setAttribute("style",defaultStyle);e.value="";});
    document.getElementById("result").textContent="";
}
document.getElementById("check").addEventListener("click",Check);
document.getElementById("reset").addEventListener("click",SetValues);
document.getElementById("show").addEventListener("click",Show);
var defaultStyle;
function Show(){
    let i=0;
    Array.from(document.getElementsByClassName("textfield")).forEach(e=>{e.value=expressions[i].rightAnswer;i++;});

}
function Check(){
    let i=0;
    let r =0;
    Array.from(document.getElementsByClassName("textfield")).forEach(e=>{
        if(i==0)defaultStyle=e.getAttribute("style");
    if(expressions[i].rightAnswer==e.value){
        e.setAttribute("style",e.getAttribute("style")+"background-color:var(--right);");
        r++;
    }
    else{
        e.setAttribute("style",e.getAttribute("style")+"background-color:var(--wrong);");
    }
    i++;
    });
    if(r==3){
        document.getElementById("result").textContent="All correct!";
    }
    else{
        document.getElementById("result").textContent=r+"/3, Keep trying";
    }
}

