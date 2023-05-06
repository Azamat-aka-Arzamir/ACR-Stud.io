
const MAXREADINGSCOUNT =200
var DataSet=[];
const canv = document.getElementsByTagName("canvas")[0];
sessionStorage.setItem("tabs","last readings");
sessionStorage.setItem("graph","24h");
var rect = canv.parentNode.getBoundingClientRect();
canv.width = rect.width;
canv.height = rect.height;
let countField = document.getElementById("count");
let showCount = countField.getAttribute("placeholder");
countField.addEventListener("keypress",e=>{
    if(e.key=="Enter"){
        if(parseInt(countField.value)&&parseInt(countField.value)<MAXREADINGSCOUNT){
            showCount = parseInt(countField.value)
            RedrawContent(showCount);
        }
        countField.value=showCount;
    }
})
FetchReadingsNames().then(AddTabs).then(InitializeInspectables);

chart = CreateGraph('my-chart');

canv.addEventListener("click",async ()=>{
    const activeElement = chart.getActiveElements()[0];
    if(!activeElement)return;
    let a = FetchWeather(data[activeElement.element.$context.index].date_time);
    a.then(e=>{
        let currentWeather = document.getElementById("current")
        
        if(currentWeather.children.length>1)currentWeather.children[1].remove();
        currentWeather.appendChild(GetElement(e,"weatherWindow"))
    })
})

function AddTabs(arr){
    const tabHolder = document.getElementById("tabs");
    let out = document.createElement("h3");
    out.classList.add("tab", "inspectable");
    out.textContent="last readings";
    tabHolder.appendChild(out);
    for(let tab of arr){
        let out = document.createElement("h3");
        out.classList.add("tab");
        out.textContent=tab.name.replace('_',' ');
        out.classList.add("inspectable");
        tabHolder.appendChild(out);
    }

}


//Assign inspectables(lil bit o'anims)
function InitializeInspectables(){
    let inspectables = document.getElementsByClassName("inspectable");

    //restoring data
    for(let e of inspectables){
        let parent = e.parentElement;
        if(sessionStorage.getItem(parent.id) != e.textContent){
            e.classList.add("unchoosen");
        }
        else{
            RedrawContent()
        }
    }

    for(let i=0;i<inspectables.length;i++){
    inspectables[i].addEventListener("mouseover",()=>{
        inspectables[i].classList.add("inspected");
        inspectables[i].classList.remove("uninspected");
    });
    inspectables[i].addEventListener("mouseout",()=>{
        inspectables[i].classList.remove("inspected");
        inspectables[i].classList.add("uninspected");
    }); 
    inspectables[i].addEventListener("click",async ()=>{

        let ar = [...inspectables].filter(e=>e.parentElement==inspectables[i].parentElement)
        ar.forEach(e=>e.classList.add("unchoosen"));
        inspectables[i].classList.remove("unchoosen");
        let parent = inspectables[i].parentElement;
        if(sessionStorage.getItem(parent.id) !== inspectables[i].textContent){
            inspectables[i].classList.add("clicked");
            inspectables[i].addEventListener("mouseout",()=>{
                inspectables[i].classList.remove("clicked");
            }); 
            sessionStorage.setItem(parent.id,inspectables[i].textContent);
            enableLoading();
            RedrawContent()
        }

    }); 
    }   
}
var data = [];
async function RedrawContent(num){
    text = sessionStorage.getItem("tabs");
    print(text);
    if(text=="last readings"){
        let prom = await FetchLastReadings(showCount);
        print(prom);
        await DrawReadings(prom)
        /*await RedrawCanvas(prom);
        data = prom;
        statW =document.getElementById("statistics");
        if(statW.children.length>1)statW.children[1].remove();
        statW.appendChild(GetElement(GetStatistics(prom),"weatherWindow"));*/
    }
    else{
        let prom=[];
        print("num "+num)
        if(num==null){
            prom = (await FetchReadings(toHours(sessionStorage.getItem("graph")),text)).reverse();
            showCount = prom.length;
            countField.value = showCount;
        }
        else{
            let a = (await FetchReadings(showCount*5,text)).reverse();
            for(let e =0;e<showCount;e++){
                prom.push(a[e]);
            }
        }
        console.log(chart);

        await DrawReadings(prom)
        await RedrawCanvas(prom);
        data = prom;
        statW =document.getElementById("statistics");
        if(statW.children.length>1)statW.children[1].remove();
        statW.appendChild(GetElement(GetStatistics(prom),"weatherWindow"));
    }
    disableLoading();
}
function toHours(t){
    switch(t){
        case "24h": return 24;
        case "48h": return 48;
        case "72h":return 72;
        case "1w": return 24*7;
        case "1m": return 24*30;
    }
}

async function RedrawCanvas(data){
    chart.destroy();
    chart = CreateGraph('my-chart');
    chart.data.datasets[0].label = sessionStorage.getItem("tabs");
    for(let e of data){
        addData(chart,DateToNormalView(Object.values(e)[0]),Object.values(e)[1]);
    }
    
}
function enableLoading(){
document.getElementById("loadingWrapper").style.display = "";
document.getElementById("blur").style.filter="blur(5px)";
}
function disableLoading(){
   document.getElementById("loadingWrapper").style.display = "none";
    document.getElementById("blur").style.filter="none";
}