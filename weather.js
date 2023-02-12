const wrapper = document.querySelector(".wrapper"),
weatherPart = wrapper.querySelector(".weather-part"),
DayPart = wrapper.querySelector(".days-weather-part"),
wIcon = weatherPart.querySelector("img"),
dIcon = DayPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
btn = weatherPart.querySelector(".bottom-detail button")

const API_key = "73d4185334f724d5837325dcda6b3ee8";
const cnt = 7;
let api;
// const city = "Delhi";

if(navigator.geolocation){ // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
}else{
    alert("Your browser not support geolocation api");
}
if(onError)
{
   requestApi('Delhi');

}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${cnt}&units=metric&appid=${API_key}`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords; // getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=${cnt}&units=metric&appid=${API_key}`;
    fetchData();
}
function onError(error){
    // if any error occur while getting user location then we'll show it in infoText
    console.log("error");
}


function fetchData(){
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => weatherDetails(result));
}
function isDay() {
    const hours = (new Date()).getHours();
    return (hours >= 6 && hours < 18);
  }
console.log(isDay());
function weatherDetails(info){
    if(info.cod == "404"){ // if user entered city name isn't valid
        alert(`${inputField.value} isn't a valid city name`)
    }else{
        //getting required properties value from the whole weather information
        console.log(info);
        console.log(info.list[1].weather[0]);
        const city = info.city.name;
        const country = info.city.country;
        const {description, id} = info.list[0].weather[0];
        const {temp, feels_like, humidity} = info.list[0].main;

        //7days
        function f(j)
        {
            const {description : dj, id : ij} = info.list[j].weather[0];
            const {temp : tj} = info.list[j].main;
            const {dt_txt : dt} = info.list[j];
            return{dj,ij,tj,dt}
    
        }
        
        console.log(f(2).dt);
        // using custom weather icon according to the id which api gives to us
        if(id== 800){
            isDay() ? wIcon.src = "icons/clear.svg": wIcon.src = "icons/half-moon.png";
        }else if(id >= 200 && id <= 232){
            isDay()?wIcon.src = "icons/storm.svg" : wIcon.src = "icons/storm.png";
        }else if(id >= 600 && id <= 622){
            isDay()?wIcon.src = "icons/snow.svg" : wIcon.src = "icons/snowy.png";
        }else if(id >= 701 && id <= 781){
            (isDay()?wIcon.src = "icons/haze.svg" : wIcon.src = "icons/windy.png");
        }else if(id >= 801 && id <= 804){
            (isDay()?wIcon.src = "icons/cloud.svg" :wIcon.src = "icons/cloud.png");
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            isDay()?wIcon.src = "icons/rain.svg" : wIcon.src = "icons/rainy.png"; 
        }
        
       
        function week(s=0){
            
            const da = new Date();
            let day = `${da.getDate()+s}/${da.getMonth()}/${da.getFullYear()}`;
            return day;
        }
        
        
        //passing a particular weather info to a particular element
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        //day 2
        DayPart.querySelector(".temp1 .numb").innerText = Math.floor(f(1).tj);
        DayPart.querySelector(".weather1").innerText = f(1).dj;
        DayPart.querySelector(".w1").innerText = `${week(1)}`;
        //day 3
            DayPart.querySelector(".temp2 .numb").innerText = Math.floor(f(2).tj);
            DayPart.querySelector(".weather2").innerText = f(2).dj;
            DayPart.querySelector(".w2").innerText = `${week(2)}`;
        //day 4
        DayPart.querySelector(".temp3 .numb").innerText = Math.floor(f(3).tj);
        DayPart.querySelector(".weather3").innerText = f(3).dj;
        DayPart.querySelector(".w3").innerText = `${week(3)}`;
        //day 5
        DayPart.querySelector(".temp4 .numb").innerText = Math.floor(f(4).tj);
        DayPart.querySelector(".weather4").innerText = f(4).dj;
        DayPart.querySelector(".w4").innerText = `${week(4)}`;
        //day 6
        DayPart.querySelector(".temp5 .numb").innerText = Math.floor(f(5).tj);
        DayPart.querySelector(".weather5").innerText = f(5).dj;
        DayPart.querySelector(".w5").innerText = `${week(5)}`;
        //day 7
        DayPart.querySelector(".temp6 .numb").innerText = Math.floor(f(6).tj);
        DayPart.querySelector(".weather6").innerText = f(6).dj;
        DayPart.querySelector(".w6").innerText = `${week(6)}`;
        //day 8
        DayPart.querySelector(".temp7 .numb").innerText = Math.floor(f(7).tj);
        DayPart.querySelector(".weather7").innerText = f(7).dj;
        DayPart.querySelector(".w7").innerText = `${week(7)}`;
    }
}

btn.addEventListener("click", ()=>{
    wrapper.classList.add("active");
});