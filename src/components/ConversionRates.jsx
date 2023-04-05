import axios from "axios";
import { useEffect, useState } from "react";

const ConversionRates = () => {
	const [rateData, setRateData] = useState([]);
	const [usdRate, setUsdRate] = useState(0);
	const [gbpRate, setGbpRate] = useState(0);
	const [eurRate, setEurRate] = useState(0);
	const [dataDate, setDataDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [rateList, setRateList] = useState([]);
	const [error, setError] = useState(null);
	const [direction, setDirection] = useState("");

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

	const fetchRates = async () => {
		//fetch data from API
		setLoading(true);
		setError(null);
		const ratesURL = "https://api.coindesk.com/v1/bpi/currentprice.json";

		await axios
			.get(ratesURL)
			.then(({ data }) => {
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

			{rateData !== null ? ( //title, time, and rates
				<div>
					<h2 className="title">
						Currency Rates <br />
						<h4>(BTC)</h4>
					</h2>
					<p>Data Date (Local): {curDate.toString()}</p>
					<p>Data Date (UTC): {curDate.toUTCString()}</p>
					{rateData !== null ? (
						<div>
							<button onClick={fetchRates} className="button">
								Update Rates
							</button>
							<button onClick={sortRates} className="button">
								Sort
							</button>
							<p>{direction}</p>
							{rateList.map((rate) => (
								<div key={rate.id}>
									<div>
										{rate == usdRate.rate_float ? (
											<p>
												1 BTC is ${usdRate.rate} USD, 1 USD to BTC is{" "}
												{(1 / usdRate.rate_float).toFixed(6)}
											</p>
										) : rate == gbpRate.rate_float ? (
											<p>
												1 BTC is €{gbpRate.rate} GBP, 1 GBP to BTC is{" "}
												{(1 / gbpRate.rate_float).toFixed(6)}
											</p>
										) : (
											<p>
												1 BTC is £{eurRate.rate} EUR, 1 EUR to BTC is{" "}
												{(1 / eurRate.rate_float).toFixed(6)}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default ConversionRates;
