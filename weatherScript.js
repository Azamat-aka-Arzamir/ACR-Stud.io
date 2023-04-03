let main = document.getElementById("main")
let mainWindow = document.getElementById("mainWindow");
var wCont = document.getElementById("weatherContainer");

let city = sessionStorage.getItem("city");
if(city == null)city="Tampere";
document.getElementById("location").innerText=city;
const lat = 61.4991;
const lon =  23.7871;
var key ="4bf80f288644c75c54988623f0026416";
function ObjToElement(data){
    var date = new Date(data.dt*1000);
    if(date.getDate()==new Date().getDate()){
        date = date.getHours()+":00";
    }
    else if(date.getDate()==new Date().getDate()+1){
        date ="Tomorrow\n"+date.getHours()+":00";
    }
    else if(date.getHours()==12){
        date =date.getDay()+"."+date.getMonth()+" "+"noon";
    }
    else if(date.getHours()==21){
        date =date.getDay()+"."+date.getMonth()+" "+"night";
    }
    else{
        return;
    }
    let el = new WeatherDrawer(date,Math.round(data.main.temp-273.15)+'\xB0',"feels like "+Math.round(data.main.feels_like-273.15)+'\xB0',data.weather[0].icon,data.wind.speed+" m/s");
    return el.GetElement();
}
async function fetchData(){
    let data;
    try{
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+key)
    data = await response.json();
    console.log(data);
    let now = new WeatherDrawer("Now\n ",Math.round(data.main.temp-273.15)+'\xB0',"feels like "+Math.round(data.main.feels_like-273.15)+'\xB0',data.weather[0].icon,data.wind.speed+" m/s");
    wCont.appendChild(now.GetElement());

    const response2 = await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&APPID="+key)
    data = await response2.json();
    console.log(data);
    data.list.forEach(element => {
        let weatherW = ObjToElement(element);
        if(weatherW!=null)wCont.appendChild(weatherW);
    });
    }
    catch(error){
        console.log(error)
        wCont.innerHTML="<h2>"+data.message+"</h2>";
    }
}
var locationWindowLayout;

locationWindowLayout = document.createElement("div");
locationWindowLayout.setAttribute("id","locationChange");
locationWindowLayout.innerHTML=
    '<div class="window" style="margin:20vw">'+
    '<h2>Choose city from the list</h2>'+
    '<input type="text" class = "button" id="city" style="margin:10px;">'+
    '<button class = "button" id ="citySubmit">Submit</button>'+
    '</div>';
var cityField;
function setLocationChangeCallbacks(){
    if(cityField!=null) return;
    cityField= document.getElementById("city");
    var citySubmit= document.getElementById("citySubmit");
    citySubmit.addEventListener("click",()=>checkCity());
}


async function checkCity(){
    const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q="+cityField.value +" ,limit=1&APPID="+key);
    const data = await response.json();
    if(data.length>0){
        //console.log(data);
        sessionStorage.setItem("city",data[0].name);
        window.location.reload();
    }
    else{
        cityField.style="background-color:red;"
    }



}
class WeatherDrawer{
    constructor(_time,_temperature,_feelTemperature,_atmosphereState,_windSpeed){
        this.temperature = _temperature;
        this.feelTemperature = _feelTemperature;
        this.windSpeed = _windSpeed;
        this.atmosphereState = _atmosphereState;
        this.time = _time;
    }

    GetElement(){
        
        let out = document.createElement('div');
        out.setAttribute("class","weatherWindow");
        let timeText =  document.createElement("h3");
        timeText.textContent=this.time;

        let atmosText =  document.createElement("img");
        atmosText.setAttribute("src","https://openweathermap.org/img/wn/"+this.atmosphereState+"@2x.png");

        let tempText =  document.createElement("h3");
        tempText.textContent=this.temperature;

        let feelTempText =  document.createElement("h4");
        feelTempText.textContent=this.feelTemperature;

        let windText =  document.createElement("h3");
        windText.textContent=this.windSpeed;

        out.appendChild(timeText);
        out.appendChild(atmosText);
        out.appendChild(tempText);
        out.appendChild(feelTempText);
        out.appendChild(windText);
        
        this.element = out;
        return this.element;
    }
}
fetchData();

var a = new WeatherDrawer("now","-6","-4","50d","4m/s");
var b = new WeatherDrawer("now","-6","-4","10d","4m/s");

document.getElementById("changeLocationButton").addEventListener("click",()=>{main.insertBefore(locationWindowLayout,main.firstChild);mainWindow.setAttribute("class",mainWindow.getAttribute("class")+" blured");setLocationChangeCallbacks();})

