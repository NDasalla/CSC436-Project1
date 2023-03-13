import axios from "axios";
import { useState, useEffect } from "react";

const Conversions = () => {
  const [rateData, setRateData] = useState([]);
  const [usdRate, setUsdRate] = useState(0);
  const [gbpRate, setGbpRate] = useState(0);
  const [eurRate, setEurRate] = useState(0);
  const [dataDate, setDataDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateList, setRateList] = useState([]);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState("");
  const [currencyChoice, setCurrencyChoice] = useState("");
  const [search, setSearch] = useState("");
  const [convertedValue, setConvertedValue] = useState(0);

  const currencyChoiceHandler = (e) => {
    //set user's currency choice
    setCurrencyChoice(e.target.value);
  };

  const searchHandler = (e) => {
    //set user's input
    if (isNaN(search)) { //check if not a number
      setSearch(0);
    } else {
      setSearch(parseInt(e.target.value));
    }
  };

  const sortRates = () => {
    if (direction === "Ascending") {
      rateList.sort((a, b) => a - b); //ascending order

      setDirection("Descending");
    } else {
      rateList.sort((a, b) => b - a); //descending order

      setDirection("Ascending");
    }

    setRateList(rateList); //set rates
  };

  const convert = () => {
    //calculate conversion based on currency choice from user
    if (currencyChoice == "USD") {
      setConvertedValue((1 / usdRate.rate_float).toFixed(6) * search);
    } else if (currencyChoice == "GBP") {
      setConvertedValue((1 / gbpRate.rate_float).toFixed(6) * search);
    } else if (currencyChoice == "EUR"){
      setConvertedValue((1 / eurRate.rate_float).toFixed(6) * search);
    }
    else {
      setConvertedValue(0);

    }
  };

  const fetchRates = async () => {
    //fetch data from API
    setLoading(true);
    setError(null);
    const ratesURL = "https://api.coindesk.com/v1/bpi/currentprice.json";

    await axios.get(ratesURL).then(({ data }) => {
        //set states based on fetched data
        setRateData(data);
        setUsdRate(data.bpi.USD);
        setGbpRate(data.bpi.GBP);
        setEurRate(data.bpi.EUR);
        setDataDate(data.time.updatedISO);
        setRateList([
          data.bpi.USD.rate_float,
          data.bpi.GBP.rate_float,
          data.bpi.EUR.rate_float,
        ]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    //sort and fetch rates
    fetchRates();
    sortRates();
  }, []);

  const curDate = new Date(dataDate);

  return (
    <div>
      {!!error && <pre>{JSON.stringify(error, 0, 1)}</pre>}
      {!!loading && <p>Loading</p>}

      {rateData !== null ? ( //display calculator
        <div>
          <h2 class="title">Currency Conversion Calculator<br/><h4>(BTC)</h4></h2>
          <p className="NaN-prompt"></p>
          <select
            className="form-select form-select-sm mb-3"
            value={currencyChoice}
            onChange={currencyChoiceHandler}>
            <option defaultValue={"Select Currency"}>Select Currency</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
          <label htmlFor="search" className="p">Currency Value{" "}</label>
          <input //input for currency value entered by user
            type="text"
            name="convert"
            onChange={searchHandler}
            value={search}
          />
          <button onClick={convert} className="button">Submit</button>
          <h5 class="">Selected Currency's Conversion = <b><u>{convertedValue}</u></b> BTC</h5>
          <br/>
          <p>Data Date (Local): {curDate.toString()}</p>
          <p>Data Date (UTC): {curDate.toUTCString()}</p>
        </div>
      ) : null}
      {rateData !== null ? ( //display conversion rates
        <div>
          <button onClick={fetchRates} className="button">Update Rates</button>
          <button onClick={sortRates} className="button">Sort</button>
          <p>{direction}</p>
          {rateList.map((rate) => (
              <div key={rate.id}>
                <div>
                  {rate == usdRate.rate_float ? (
                    <p>
                      1 BTC is ${usdRate.rate} USD, 1 USD to BTC is {(1 / usdRate.rate_float).toFixed(6)}
                    </p>
                  ) : rate == gbpRate.rate_float ? (
                    <p>
                      1 BTC is €{gbpRate.rate} GBP, 1 GBP to BTC is {(1 / gbpRate.rate_float).toFixed(6)}
                    </p>
                  ) : (
                    <p>
                      1 BTC is £{eurRate.rate} EUR, 1 EUR to BTC is {(1 / eurRate.rate_float).toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default Conversions;
