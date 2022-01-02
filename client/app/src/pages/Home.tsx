import React from "react";
import useGet from "../service/stockService";

function Home() {
    const { data, loading, error } = useGet('https://localhost:5001/api/Stocks/');

    if (loading) return <h1> LOADING... </h1>;

    if (error) return <h1> {error} </h1>;

    return (
        <body>
            Stonks!
            {data && Object.values(data).map(stocks => (
                <div key={stocks.id}>
                    {stocks.name}: {stocks.price}
                </div>))}
        </body>
    );
};

export default Home;