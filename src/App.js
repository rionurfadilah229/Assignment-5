import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://api.currencyfreaks.com/latest", {
          params: {
            apikey: "3d8b6e81b8ca42c2b7413a75cfcf82b8", 
            symbols: "CAD,IDR,JPY,CHF,EUR,GBP",
          },
        });

        const data = response.data.rates;
        const currencyData = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"].map((currency) => {
          const exchangeRate = parseFloat(data[currency]);
          return {
            currency,
            exchangeRate,
            weBuy: exchangeRate * 1.05, 
            weSell: exchangeRate * 0.95,  
          };
        });

        setRates(currencyData);
      } catch (error) {
        console.error("Error fetching exchange rates", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="app">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy.toFixed(4)}</td>
              <td>{rate.exchangeRate.toFixed(4)}</td>
              <td>{rate.weSell.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      <p>Rates are based from 1 USD.</p>
      <p>This application uses API from <a href="https://currencyfreaks.com/" target="_blank" rel="noopener noreferrer">https://currencyfreaks.com</a>.</p>
    </div>
  );
};

export default App;
