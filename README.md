# 🌦️ Weather-Aware Order Processing System

## 📌 Overview
This project checks weather conditions for delivery locations using the OpenWeatherMap API and flags potential delivery delays.

---

## 🚀 Features
- Fetches weather data for multiple cities
- Uses parallel API calls (Promise.all)
- Handles API errors gracefully
- Updates order status based on weather conditions
- Generates personalized delay messages

---

## 🛠️ Tech Stack
- Node.js
- Axios
- Dotenv
- OpenWeatherMap API

---

## 📂 Project Structure


---

## ⚙️ Setup Instructions

1. Install dependencies:
2. Add API key in `.env`:
3. Run the script:
node script.js

---

## 📊 Logic

- If weather is **Rain, Snow, Extreme** → Order marked as **Delayed**
- Otherwise → Remains **Pending**

---

## ⚠️ Error Handling

- Invalid cities are logged
- Script continues execution without crashing

---

## 🤖 AI Feature

Generates dynamic apology messages like:
> "Hi Alice, your order to New York is delayed due to heavy rain. We appreciate your patience!"

---

## ✅ Output

Updated file:

updated_orders.json


---

## 🎯 Result

Efficient, scalable weather-aware delivery system using asynchronous API handling.
