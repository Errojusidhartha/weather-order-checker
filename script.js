console.log("Script started...");
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
console.log("API KEY:", process.env.API_KEY);

const API_KEY = process.env.API_KEY;

const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

async function fetchWeather(city) {
  try {
    console.log(`Fetching weather for ${city}...`);

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );

    console.log(`Weather for ${city}:`, res.data.weather[0].main);

    return res.data.weather[0].main;

  } catch (error) {
    console.log(`Error fetching weather for ${city}`);
    return null;
  }
}

function generateMessage(name, city, weather) {
  return `Hi ${name}, your order to ${city} is delayed due to ${weather}. We appreciate your patience!`;
}

async function processOrders() {
  const promises = orders.map(async (order) => {
    const weather = await fetchWeather(order.city);

    if (!weather) return order;

    if (["Rain", "Snow", "Extreme", "Clouds", "Smoke"].includes(weather))  {
      order.status = "Delayed";
      order.message = generateMessage(order.customer, order.city, weather);
    }

    return order;
  });

  const updatedOrders = await Promise.all(promises);

  fs.writeFileSync(
    "updated_orders.json",
    JSON.stringify(updatedOrders, null, 2)
  );

  console.log("Done!");
}

processOrders();