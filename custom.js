const resut = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos con obligatorios...');
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    //console.log(nameCity.value);
    //console.log(nameCountry.value);
})

function callAPI(city, country){
    const apiID ='9292650ff3c2040943b08a64333d596c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;

    fetch(url).
        then(data => {
            return data.json();
        })
        .then(datajson => {
            if (datajson.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(datajson);
            }
           console.log(datajson);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    
const degrees = KelvinToCentigrade(temp)
const min = KelvinToCentigrade(temp_min)
const max = KelvinToCentigrade(temp_max)

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <P>Min: ${min}°C</P>
    `;

resut.appendChild(content)

   /* console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon);*/
}

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 180);
}

function KelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    resut.innerHTML = '';
}