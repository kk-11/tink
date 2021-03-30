import React, { useState } from "react";
import { markets, locales } from "../consts";

export const Main = () => {
  const [market, setMarket] = useState("SE");
  const [locale, setLocale] = useState("en_US");
  const [testData, setTestData] = useState(false);
  const test = testData ? "&test=true" : "";
  const link =
    "https://link.tink.com/1.0/authorize/?" +
    "client_id=" +
    "f16693bc09e74615824f88c45c567573" +
    "&redirect_uri=http://localhost:3000/callback" +
    "&scope=transactions:read" +
    "&market=" +
    market +
    "&locale=" +
    locale +
    test;

  const handleMarket = ({ target }) => {
    setMarket(target.value);
  };
  const handleLocale = ({ target }) => {
    setLocale(target.value);
  };
  const handleClick = () => {
    setTestData(!testData);
  };
  return (
    <main className="container">
      <div className="switchWrap" onClick={handleClick}>
        <label className={`switch ${testData ? "flipped" : ""}`}>
          <div />
        </label>
        <p>Use test data</p>
      </div>
      <select
        defaultValue={market}
        name="Choose a market"
        onChange={handleMarket}
        className="dropdown"
      >
        {markets.map((market) => (
          <option key={market} value={market}>
            {market}
          </option>
        ))}
      </select>
      <select
        className="dropdown"
        defaultValue={locale}
        name="Choose a locale"
        onChange={handleLocale}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
      <a className="btn" href={link}>
        Connect Bank
      </a>
    </main>
  );
};

export default Main;
