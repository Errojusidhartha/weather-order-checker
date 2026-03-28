import axios from "axios";
import fs from "fs";

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;

  const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

  async function fetchWeather(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      return response.data.weather[0].main;
    } catch {
      return null;
    }
  }

  const results = await Promise.all(
    orders.map(async (order) => {
      const weather = await fetchWeather(order.city);

      if (["Rain", "Snow", "Extreme"].includes(weather)) {
        return {
          ...order,
          status: "Delayed",
          message: `Hi ${order.customer}, your order to ${order.city} is delayed due to ${weather}.`
        };
      }

      return order;
    })
  );

  res.status(200).json(results);
}