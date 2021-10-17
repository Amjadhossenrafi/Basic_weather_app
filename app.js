const key = 'aa6f1ccc13fe47e4bf0658dd44094ce0'
const form = document.querySelector('.input')
const input = document.querySelector('.city-name-input')
const loc = document.querySelector('.timezone')
const icon = document.querySelector('.icon')
const temp = document.querySelector('.temp')
const condition = document.querySelector('.temp-condition')
const wind = document.querySelector('.wind')

//api link => api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const getWeatherData = async (cityName, k) => {
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${k}`,
  )
  const response = await req.json()
  return response
}

const changedescription = (data) => {
  loc.textContent = data.name
  if (data.main) {
    temp.innerHTML = ` <h2 class="temp">${Math.round(
      data.main.temp - 273,
    )}&deg;C</h2>`
  } else {
    temp.innerHTML = `<h2 class="temp">${data.message}</h2>`
  }
  condition.textContent = data.weather[0].description
  wind.innerHTML = `Wind :  ${data.wind.speed} Kilometer per hour at ${data.wind.deg}&deg angle`
}

const changeSvg = (data) => {
  switch (data.weather[0].main) {
    case 'Clear':
      icon.setAttribute('src', 'Svgs/day.svg')
      break
    case 'Clouds':
      icon.setAttribute('src', 'Svgs/cloudy.svg')
      break
    case 'Rain':
      icon.setAttribute('src', 'Svgs/rainy-7.svg')
      break
    case 'Haze':
      icon.setAttribute('src', 'Svgs/snowy-6.svg')
      break

    case 'Drizzle':
      icon.setAttribute('src', 'Svgs/rainy-4.svg')
      break
    case 'Thunderstorm':
      icon.setAttribute('src', 'Svgs/thunder.svg')
      break
    default:
      icon.setAttribute('src', 'Svgs/weather.svg')
  }
}

const showError = () => {
  icon.setAttribute('src', 'Svgs/error.svg')
}
const store = (data) => {
  localStorage.setItem('info', JSON.stringify(data))
}
window.addEventListener('load', (e) => {
  changedescription(JSON.parse(localStorage.info))
  changeSvg(JSON.parse(localStorage.info))
})
form.addEventListener('submit', (e) => {
  e.preventDefault()
  getWeatherData(input.value, key)
    .then((data) => {
      changedescription(data)
      changeSvg(data)
      store(data)
    })
    .catch((err) => {
      showError()
    })
  form.reset()
})
