import React, { useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);

  let Url = process.env.REACT_APP_BASE_URL
  let key = process.env.REACT_APP_API_KEY

  const getWeather = async () => {
    setLoading(true);
    // setError(null);

    try {
      const res = await axios.get(
        `${Url}/data/2.5/weather?q=${city}&units=metric&appid=${key}`
      );
      setWeather(res.data);
      console.log(res.data);
      setLoading(false);
      setCity("");
    } catch (error) {
      //   setError("City not found. Please enter a valid city name.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-purple-500">
        <div className="bg-purple-700 text-white p-16 shadow-2xl rounded-lg">
          <h2 className="text-center text-3xl font-bold underline text-white">
            Weather Search
          </h2>
          <div>
            <div className="mt-5 flex max-w-md gap-x-4">
              <input
                id="text"
                name="text"
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                autoComplete="off"
                className="min-w-0 bg-slate-50 text-gray-700 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your City Name"
              />
              <button
                type="submit"
                onClick={() => getWeather()}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Search
              </button>
            </div>

            {loading && <div>Loading...</div>}

            {!weather.weather && (
              <div className="text-center my-5">
                <p className="text-white mt-2 border-b-gray-400 p-3 bg-purple-400 rounded-2xl">No city name provided</p>
              </div>
            )}

            {weather && weather.weather && (
              <div className="text-center mt-5">
                <h1>
                  {weather?.name} City ({weather.sys.country})
                </h1>
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <h1>{weather?.weather[0].description}</h1>
                </div>
                <h1 className="text-3xl my-5">{weather?.main.temp} <span>&deg;Cel</span> </h1>
                <h3>
                    Humidity {weather.main.humidity} %
                </h3>
                <h3>
                  Feels Like {weather.main.feels_like} <span>&deg;C</span>
                </h3>
                <div className="mt-2 border-b-gray-400 p-3 bg-purple-400 rounded-2xl">
                  <h3>
                    Wind is {weather?.wind.speed} Knots in {weather?.wind.deg}
                    &deg;
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
