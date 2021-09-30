let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
let key = '13c16fb318cfeeae7a3fb2a577a31d14';
// the input fields from the form

let inputField = document.getElementById('input');
let btn = document.getElementById('submit');
let mainBody = document.getElementById('main-body')
let main = document.getElementById('main')

let Getweather = async() => { //async=>wait for data to come from server 
        let location = inputField.value;
        let response = {};
        let url = `${baseUrl}q=${location}&units=metric&appid=${key}`;

        let result = await fetch(url); //await->wait kro k daya result variable k under a jaye
        //  fetch->api se data get krta hai
        if (result.ok) //if no error //.ok-> result aa gia hai-server return ka status send krta hai
        {
            response = await result.json(); //json->data in objects ki form mai aata hai
            console.log(response);
        }
        return response;
    }
    //btn.onclick = Getweather;
let executeSearch = function() {
        mainBody.innerHTML = '';
        Getweather().then(result => {
            let Data = renderHtml(result);
            mainBody.innerHTML += Data;
            if (result.main.temp < 10) {
                main.style.background = "url(./images/winter.jpg)"
                main.style.display = 'flex';
                main.style.backgroundSize = 'cover';
                main.style.position = 'relative';
            } else if (result.main.temp > 30) {
                main.style.background = "url(./images/2.jpg)"
                main.style.display = 'flex';
                main.style.backgroundSize = 'cover';
                main.style.position = 'relative';
            } else if (result.main.temp > 10 || result.main.temp < 30) {
                main.style.background = "url(./images/3.jpg)"
                main.style.display = 'flex';
                main.style.backgroundSize = 'cover';
                main.style.position = 'relative';
            }
        })

    }
    //This function will create the new html for the data
let renderHtml = function(response) {
    return `
        <div class="header">
        <h2>${response.name}</h2>
        <h2>${response.main.temp}</h2>
        <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">
        <h2>${response.weather[0].main}</h2>
      </div>
      <div class="info"> 
        <p>Feels-like  :  ${response.main.feels_like}</p> 
        <p>Humidity    :  ${response.main.humidity}</p>
        <p>Pressure    :  ${response.main.pressure}</p>
        <p>Wind-speed  :  ${response.wind.speed}</p>
        <p>Max-Temp    :  ${response.main.temp_max}</p>
        <p>Min-Temp    :  ${response.main.temp_min}</p>
      </div>
       `
}
btn.onclick = executeSearch;