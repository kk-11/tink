import React from "react";
import { useCallback } from "../hooks/useCallback";

export const Callback = ({ location }) => {
  const { loading, error, data } = useCallback(location);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }

  const map = new Map();
  data.response.transactionData.results.forEach(({ transaction }) => {
    const { currencyDenominatedAmount, description, amount } = transaction;
    const currency = currencyDenominatedAmount.currencyCode;
    const value = { amount: amount, currency: currency };
    if (map.has(description)) {
      const { amount: oldAmount } = map.get(description);
      const newValue = { amount: oldAmount + amount, currency: currency };
      map.set(description, newValue);
    } else {
      map.set(description, value);
    }
  });

  const favouriteMerchant = [...map.entries()].reduce((acc, curr) => {
    return curr[1].amount < acc[1].amount ? curr : acc;
  });

  const { amount, currency } = favouriteMerchant[1];

  return (
    <main className="container">
      <p>Your favourite merchant:</p>
      <img className="img" src="./appleLogo.png" />
      <p>{favouriteMerchant[0]}</p>
      <p>{`During 2020 you spent ${Math.abs(amount)} ${currency} at ${
        favouriteMerchant[0]
      }`}</p>
      <a className="btn" href="/">
        Take me back
      </a>
    </main>
  );
};

export default Callback;
