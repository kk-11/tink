const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.TINK_CLIENT_SECRET;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const base = "https://api.tink.se/api/v1";

app.post("/callback", function (req, res) {
  getAccessToken(req.body.code)
    .then((response) => getData(response.access_token))
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.toString() });
    });
});

async function handleResponse(response) {
  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

async function getData(accessToken) {
  const transactionData = await Promise.resolve(
    getTransactionData(accessToken)
  );
  return {
    transactionData,
  };
}

async function getAccessToken(code) {
  const body = {
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
  };
  const response = await fetch(base + "/oauth/token", {
    method: "POST",
    body: Object.keys(body)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key])
      )
      .join("&"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return handleResponse(response);
}

const start = new Date("2020").getTime();
const end = new Date("2021").getTime();

async function getTransactionData(token) {
  const response = await fetch(base + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      order: "DESC",
      startDate: start,
      endDate: end,
      limit: 1000, //could do a call to retrieve amount first and then set limit..
    }),
  });

  return handleResponse(response);
}
app.listen(8080);
