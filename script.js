const weather = {
  // Our API key
  apiKey: "fe151bea28c40af6cbc67db6ee8f7909",
  // With fetchWeather we can get the weather data from the API
  fetchWeather: function (city) {
    // Here we use fetch to get the data from the API
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        // We use this.apiKey to get the API key.
        this.apiKey
    )
      // With then we use response.json() to get the data
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          // With throw new error we can throw an error and stop the code
          throw new Error("No weather found.");
        }
        // Here response.json is used to get the data in json format
        return response.json();
      })
      // .this.displayWeather is used to display the data
      .then((data) => this.displayWeather(data));
  },
  // displayWeather function is used to display the data with all the details
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  // with search function we can search the weather of any city
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
//  With querySelector we can select the first element with the class "search button" and then we can add an event listener to it.
document.querySelector(".search button").addEventListener("click", function () {
  // With search we can call the function fetchWeather from the weather object.
  weather.search();
});

// Here we can add an event listener just like we did with the search button but this time we will add keyup event.
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  // Here with fetchWeather we put the default city as "Denver".
weather.fetchWeather("Denver");
