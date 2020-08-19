const fetch = require("node-fetch");

const TRIP_ID = 3702119; // Something you get in the URL once the trip has been created

const inputs = [
  { start: "2020-01-01", lon: "4.889971598589058", lat: "52.34124819379329" },
  { start: "2020-01-02", lon: "4.897378722065755", lat: "52.36491587035611" },
  { start: "2020-01-03", lon: "4.938448561339368", lat: "52.36890971592301" },
  { start: "2020-01-04", lon: "4.897102374033797", lat: "52.37290629779379" },
  { start: "2020-01-05", lon: "4.891437433567376", lat: "52.39971354805894" },
  { start: "2020-01-06", lon: "4.884490696419879", lat: "52.37375697819353" },
  { start: "2020-01-07", lon: "4.843011637552774", lat: "52.36891996080079" },
  { start: "2020-01-08", lon: "4.884068665762397", lat: "52.36536829357199" },
  { start: "2020-01-09", lon: "4.889859828863463", lat: "52.34166452924458" },
];

const makeRequest = (nb) => {
  fetch("https://www.polarsteps.com/api/locations", {
    headers: {
      accept: "*/*",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "polarsteps-api-version": "11",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie:
        "_ga=GA1.2.1610489187.1597690375; _fbp=fb.1.1597690384000.2042532823; _gid=GA1.2.789637026.1597839855; remember_token=2907717|16ef56d93696cf6ea483f98d8b4e570d35fe3a32; mp_204e5b13fb0844e6f13e8f9b3543c2ab_mixpanel=%7B%22distinct_id%22%3A%20%22173fdc476b67de-0f97b72dfd7aaa-6837027e-1aeaa0-173fdc476b76e1%22%2C%22%24device_id%22%3A%20%22173fdc476b67de-0f97b72dfd7aaa-6837027e-1aeaa0-173fdc476b76e1%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; session=eyJfZnJlc2giOmZhbHNlLCJfaWQiOnsiIGIiOiJZelpqWWpjNVltSTVPRFZpT0RrME1UbGpaalZsWlRBMU5qY3pNRGRpWmpFPSJ9LCJ1c2VyX2lkIjoiMjkwNzcxNyJ9.Eh7D9w.SiQSY5SG0hDdcEPnW05TykOFQ9M",
    },
    referrerPolicy: "no-referrer-when-downgrade",
    body:
      '{"name":"Amsterdam","lat":' +
      inputs[nb].lat +
      ',"lon":' +
      inputs[nb].lon +
      ',"detail":"Netherlands","full_detail":"Noord-Holland, Netherlands","country_code":"NL"}',
    method: "POST",
    mode: "cors",
  })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then((data) => {
      fetch("https://www.polarsteps.com/api/steps", {
        headers: {
          accept: "*/*",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "polarsteps-api-version": "11",
          pragma: "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie:
            "_ga=GA1.2.1610489187.1597690375; _fbp=fb.1.1597690384000.2042532823; _gid=GA1.2.789637026.1597839855; remember_token=2907717|16ef56d93696cf6ea483f98d8b4e570d35fe3a32; mp_204e5b13fb0844e6f13e8f9b3543c2ab_mixpanel=%7B%22distinct_id%22%3A%20%22173fdc476b67de-0f97b72dfd7aaa-6837027e-1aeaa0-173fdc476b76e1%22%2C%22%24device_id%22%3A%20%22173fdc476b67de-0f97b72dfd7aaa-6837027e-1aeaa0-173fdc476b76e1%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; session=eyJfZnJlc2giOmZhbHNlLCJfaWQiOnsiIGIiOiJZelpqWWpjNVltSTVPRFZpT0RrME1UbGpaalZsWlRBMU5qY3pNRGRpWmpFPSJ9LCJ1c2VyX2lkIjoiMjkwNzcxNyJ9.Eh6tVQ.lzkERHLjKdW0JpfCx7-uDL1oegw",
        },
        referrerPolicy: "no-referrer-when-downgrade",
        body:
          '{"trip_id":' +
          TRIP_ID +
          ',"location_id":' +
          data.id +
          ',"name":"' +
          (nb + 1) +
          '","description":"' +
          inputs[nb].lat +
          ", " +
          inputs[nb].lon +
          '","start_time":"' +
          inputs[nb].start +
          'T10:00:00+00:00","creation_time":"' +
          inputs[nb].start +
          'T14:09:01+00:00","timezone_id":"Europe/Amsterdam"}',
        method: "POST",
        mode: "cors",
      })
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json();
        })
        .then((data) => {
          console.log("DONE ", nb + 1);
          if (nb + 1 === inputs.length) {
            console.log("Finish!");
          } else {
            makeRequest(nb + 1);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
};

makeRequest(0);
