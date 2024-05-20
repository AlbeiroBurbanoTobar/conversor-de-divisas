// Importaciones necesarias
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

/**
 * Componente principal de la aplicación de conversión de divisas.
 *
 * @return {JSX.Element} El componente App.
 */
const App = () => {

  // Estados para la cantidad, moneda de origen, moneda de destino,
  // lista de monedas y cantidad convertida.
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Hook useEffect para obtener las monedas disponibles al cargar el componente.
  useEffect(() => {
    axios.get(
      'https://v6.exchangerate-api.com/v6/f09cac3df67d200460a9ff7f/latest/USD'
    )
      .then(response => {
        setCurrencies([
          response.data.base_code,
          ...Object.keys(response.data.conversion_rates)
        ]);
      })
      .catch(error => {
        console.error("Error al obtener las monedas", error);
      });
  }, []);

  /**
   * Función para convertir la moneda.
   */
  const convertCurrency = () => {
    if (!fromCurrency || !toCurrency || !amount) return;
    axios.get(
      `https://v6.exchangerate-api.com/v6/f09cac3df67d200460a9ff7f/pair/`
      + `${fromCurrency}/${toCurrency}/${amount}`
    )
      .then(response => {
        setConvertedAmount(response.data.conversion_result);
      })
      .catch(error => {
        console.error("Error al convertir la moneda", error);
      });
  };

  return (
    <div className="app">
      <div className="converter-container">
        <img 
          src="https://raw.githubusercontent.com/AlbeiroBurbano/ImagenesIconos/main/CURRENCY%20Converter.png" 
          alt="Currency Converter Logo" 
          className="logo" 
        />
        <p className="description">
          Convierte fácilmente entre diferentes monedas utilizando las tasas de 
          cambio más actualizadas.
        </p>
        <div className="input-group">
          <label htmlFor="from">De</label>
          <select 
            id="from" 
            value={fromCurrency} 
            onChange={e => setFromCurrency(e.target.value)}
          >
            <option value="" disabled>Selecciona moneda</option>
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="to">A</label>
          <select 
            id="to" 
            value={toCurrency} 
            onChange={e => setToCurrency(e.target.value)}
          >
            <option value="" disabled>Selecciona moneda</option>
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="amount">Cantidad</label>
          <input
            id="amount"
            type="number"
            placeholder="Ingresa la cantidad"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button onClick={convertCurrency}>Convertir</button>
        {convertedAmount !== null && (
          <div className="result">
            <span>Resultado:</span>
            <h2>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h2>
          </div>
        )}
      </div>
      <footer className="app-footer">
        <p>Creado por Albeiro Burbano - Encuéntrame en:</p>
        <a 
          href="https://www.freelancer.com/u/Albeiro73?sb=t" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Freelancer
        </a>  | 
        <a 
          href="http://www.linkedin.com/in/albeiro-jose-burbano-tobar-759ba4297" 
          target="_blank" 
          rel="noopener noreferrer"
        >
            LinkedIn
        </a>  | 
        <a 
          href="https://github.com/AlbeiroBurbanoTobar/ppi_pl_BurbanoA" 
          target="_blank" 
          rel="noopener noreferrer"
        >
            GitHub
        </a>  | 
        <a 
          href="https://stackoverflow.com/users/24090991/albeiro-burbano" 
          target="_blank" 
          rel="noopener noreferrer"
        >
            Stack Overflow
        </a>
      </footer>
    </div>
  );
};

export default App;
