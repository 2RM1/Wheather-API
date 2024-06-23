const API_KEY = `8c7c549b41b2f8c487b84110fbc8d2e2`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
const button=document.getElementById('get-loc');
    // const API = `https://api.openweathermap.org/data/2.5/weather?
    // q=${city}&appid=${API_KEY}&units=metric`
    // const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
        </div>
    `
}

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value)
        event.preventDefault();
    }
)
const getWeatherCurrent = async(lat,lon) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return showWeather(data)
}

async function gotlocation(position){
const result= await getWeatherCurrent(position.coords.latitude,position.coords.longitude);
console.log(result);
}
function failed(){
    console.log("There are some issues");
}
button.addEventListener('click',async ()=>{
  navigator.geolocation.getCurrentPosition(gotlocation,failed)
});