// const dayjs = require("./dayjs");
let DATA = { filters: [{ typeVehicles: [], vehicles: [] }] };

let VEHICLES = [];

const COUNTS = {
  previous: 1,
  next: 1,
};

const DATE = {
  current: getFrom(),
  from: getFrom(),
};

function getFrom() {
  return dayjs().format("YYYY-MM-DD");
}

async function getVehiclesOnCheckOut() {
  try {
    const res = await fetch(`${availableVehiclesUrl}?from=${DATE.from}`);
    const data = await res.json();

    DATA = data;

    initSetVehicleTypes();

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function runEventChangeDates() {
  (function () {
    // Dia anterior
    const previousEl = document.querySelector("#previous-day");

    previousEl.addEventListener("click", () => {
      DATE.from = dayjs(DATE.from)
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      printDate();
    });

    // Dia siguiente
    const nextEl = document.querySelector("#next-day");

    nextEl.addEventListener("click", () => {
      DATE.from = dayjs(DATE.from).add(1, "day").format("YYYY-MM-DD");
      printDate();
    });

    // Fecha actual
    const currentEl = document.querySelector("#current-day");

    currentEl.addEventListener("click", () => {
      DATE.from = DATE.current;
      printDate();
    });

    // Tipo de vehiculo
    const eSelect = document.querySelector("#vehicle-types");

    eSelect.addEventListener("change", () => {
      getVehicles();
    });
  })();
}

function printDate() {
  const currentEl = document.getElementById("current-day");

  currentEl.innerText = `${dayjs(DATE.from).format("ddd D/MMM/YYYY")}`;
}

function initSetVehicleTypes() {
  const eSelect = document.querySelector("#vehicle-types");
  eSelect.innerHTML = "";

  const {
    filters: { typeVehicles },
  } = DATA;

  typeVehicles.forEach((typeVehicle) => {
    const eOption = document.createElement("option");
    eOption.value = typeVehicle.vehicleTypeId;
    eOption.innerText = typeVehicle.name;

    eSelect.appendChild(eOption);
  });

  getVehicles();
}

function getVehicles() {
  const currentSelect = document.querySelector("#vehicle-types").value;
  const {
    filters: { vehicles },
  } = DATA;

  VEHICLES = vehicles.filter((v) => v.vehicleTypeId === currentSelect);
}

document.addEventListener("DOMContentLoaded", async () => {
  runEventChangeDates();
  printDate();

  await getVehiclesOnCheckOut();
});
