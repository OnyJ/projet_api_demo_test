const URL =
  "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes";

let element = document.getElementById("stations");

const getData = () => {
  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Response error:", error.message);
    });
};

const showVelibStation = (name, mechanicals, ebikes) => {
  element.innerHTML += `
        <div>
            <h2>Station : ${name}</h2>
            <p>${mechanicals} classical Velibs</p>
            <p>${ebikes} electric Velibs</p>
        </div>
    `;
};

const perform = () => {
  getData().then((data) => {
    data.records.forEach((record) => {
      const station = record.fields;
      console.log(station);
      showVelibStation(
        station.name,
        station.mechanical,
        station.ebike
      );
    });
  });
};

setInterval(perform(), 60 * 1000);
