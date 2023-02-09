// const dayjs = require("./dayjs");
class Helpers {
  constructor() {
    this.init();
  }

  init() {
    this.printDate();
    this.printHours();
  }

  printHours() {
    const hoursEl = document.querySelector('.calendar-hours');

    hoursEl.innerHTML = '';

    for (let i = 0; i < 24; i++) {
      const eSpan = document.createElement('span');
      eSpan.innerHTML = `${i + 1}`;

      if (i + 1 === +DATE.currentHour) {
        eSpan.className = 'current-hour';
      }

      hoursEl.appendChild(eSpan);
    }
  }

  printDate() {
    const currentEl = document.getElementById('current-day');
    // const calendarDateEl = document.getElementById("calendar-date");

    currentEl.innerText = `${dayjs(DATE.from).format('ddd D/MMM/YYYY')}`;
    // calendarDateEl.innerText = ` - ${dayjs(DATE.from).format(
    //   "ddd D/MMM/YYYY"
    // )}`;
  }

  printVehicles() {
    const vehicles = VEHICLES;
    const vehiclesEl = document.querySelector('.calendar-vehicles-list');

    vehiclesEl.style.gridTemplateColumns =
      '35px repeat(' + vehicles.length + ', 1fr)';
    vehiclesEl.innerHTML = '';

    const eSpan = document.createElement('span');
    eSpan.innerText = `Hr`;

    vehiclesEl.appendChild(eSpan);

    vehicles.forEach((vehicle) => {
      const eSpan = document.createElement('span');
      eSpan.innerText = `${vehicle.name}`;

      vehiclesEl.appendChild(eSpan);
    });

    this.printAgreementsOnCheckOut();
  }

  static getFrom() {
    return dayjs().format('YYYY-MM-DD');
  }

  static getHour() {
    return dayjs().format('HH');
  }

  printAgreementsOnCheckOut() {
    const vehicles = VEHICLES;
    const calVehiclesEl = document.querySelector('.calendar-vehicles');
    calVehiclesEl.innerHTML = '';

    calVehiclesEl.style.gridTemplateColumns =
      'repeat(' + vehicles.length + ', 1fr)';

    vehicles.forEach((vehicle) => {
      const agreeVehicles = AGREEMENTS.filter(
        (agreement) => agreement.vehicleId === vehicle.vehicleId
      );
      const calVehicleEL = document.createElement('div');
      calVehicleEL.className = 'calendar-vehicle';

      for (let i = 0; i < 24; i++) {
        const spanEl = document.createElement('a');
        const divEl = document.createElement('div');
        let lastHour = false;

        agreeVehicles.forEach((agreeVehicle) => {
          let startHour = 0;
          let endHour = 0;

          if (agreeVehicle) {
            const agreeVehicleDateStart = dayjs(agreeVehicle.start).format(
              'YYYY-MM-DD'
            );
            const agreeVehicleDateEnd = dayjs(agreeVehicle.end).format(
              'YYYY-MM-DD'
            );

            if (agreeVehicleDateEnd === DATE.from) {
              startHour = 1;
              endHour = dayjs(agreeVehicle.end).format('HH');
            }

            if (agreeVehicleDateStart === DATE.from) {
              startHour = dayjs(agreeVehicle.start).format('HH');

              if (agreeVehicleDateStart !== agreeVehicleDateEnd) {
                endHour = 24;
              }

              if (agreeVehicleDateEnd === DATE.from) {
                endHour = dayjs(agreeVehicle.end).format('HH');
              }
            }

            if (i + 1 >= +startHour && i + 1 <= +endHour - 1) {
              spanEl.className = 'occupied';
              spanEl.style.background = agreeVehicle.color;
            }

            if (i + 1 == +endHour && DATE.from !== agreeVehicleDateEnd) {
              spanEl.className = 'occupied';
              spanEl.style.background = agreeVehicle.color;
            }

            if (i + 1 == +endHour && DATE.from === agreeVehicleDateEnd) {
              const endMinute =
                (dayjs(agreeVehicle.end).format('mm') * 100) / 60;

              divEl.className = 'last-hour';

              const spanLastHourEl = document.createElement('span');
              spanLastHourEl.className = 'occupied';
              spanLastHourEl.style.background = agreeVehicle.color;
              spanLastHourEl.style.height = `${endMinute}%`;

              divEl.appendChild(spanLastHourEl);

              lastHour = true;
            }
          }
        });

        lastHour
          ? calVehicleEL.appendChild(divEl)
          : calVehicleEL.appendChild(spanEl);
      }

      calVehiclesEl.appendChild(calVehicleEL);
    });
  }

  getStatus(status) {
    switch (+status) {
      case 3:
        return 'Ya se fue';

      case 4:
        return 'Presente';
    }
  }
}

class FetchData extends Helpers {
  constructor() {
    super();
    this.getVehiclesOnCheckOut();
  }

  async getVehiclesOnCheckOut() {
    try {
      // const res = await fetch(
      //   `${availableVehiclesUrl}?from=${DATE.from}`
      // );
      // const data = await res.json();

      DATA = {
        filters: {
          typeVehicles: [
            { vehicleTypeId: '1', name: 'Ferrari' },
            { vehicleTypeId: '2', name: 'Golf' },
            { vehicleTypeId: '3', name: 'GOLFIT' },
            { vehicleTypeId: '4', name: 'Moto Moto' },
            { vehicleTypeId: '5', name: 'RAM' },
            { vehicleTypeId: '10', name: 'CHEVROLET' },
            { vehicleTypeId: '12', name: 'Camaro' },
            { vehicleTypeId: '13', name: 'Qwerty' }
          ],
          vehicles: [
            { vehicleId: '1', vehicleTypeId: '1', name: 'F-F90-1' },
            { vehicleId: '3', vehicleTypeId: '1', name: 'F-F90-2' },
            { vehicleId: '4', vehicleTypeId: '1', name: 'F-F90-3' },
            { vehicleId: '5', vehicleTypeId: '1', name: 'F-F90-4' },
            { vehicleId: '6', vehicleTypeId: '1', name: 'F-F90-5' },
            { vehicleId: '7', vehicleTypeId: '1', name: 'F-F90-6' },
            { vehicleId: '8', vehicleTypeId: '1', name: 'F-F90-7' },
            { vehicleId: '9', vehicleTypeId: '1', name: 'F-F90-8' },
            { vehicleId: '10', vehicleTypeId: '1', name: 'F-F90-9' },
            { vehicleId: '11', vehicleTypeId: '1', name: 'F-F90-10' },
            { vehicleId: '2', vehicleTypeId: '2', name: 'G-G1-1' },
            { vehicleId: '12', vehicleTypeId: '2', name: 'G-G1-2' },
            { vehicleId: '13', vehicleTypeId: '2', name: 'G-G1-3' },
            { vehicleId: '14', vehicleTypeId: '2', name: 'G-G1-4' },
            { vehicleId: '15', vehicleTypeId: '2', name: 'G-G1-5' },
            { vehicleId: '16', vehicleTypeId: '2', name: 'G-G1-6' },
            { vehicleId: '17', vehicleTypeId: '2', name: 'G-G1-7' },
            { vehicleId: '18', vehicleTypeId: '2', name: 'G-G1-8' },
            { vehicleId: '19', vehicleTypeId: '2', name: 'G-G1-9' },
            { vehicleId: '20', vehicleTypeId: '2', name: 'G-G1-10' },
            { vehicleId: '21', vehicleTypeId: '3', name: 'GOLFIT_1' },
            { vehicleId: '22', vehicleTypeId: '4', name: 'MM-YH-1' },
            { vehicleId: '23', vehicleTypeId: '4', name: 'MM-YH-2' },
            { vehicleId: '24', vehicleTypeId: '4', name: 'MM-YH-3' },
            { vehicleId: '25', vehicleTypeId: '4', name: 'MM-YH-4' },
            { vehicleId: '26', vehicleTypeId: '4', name: 'MM-YH-5' },
            { vehicleId: '27', vehicleTypeId: '4', name: 'MM-YH-6' },
            { vehicleId: '28', vehicleTypeId: '4', name: 'MM-YH-7' },
            { vehicleId: '29', vehicleTypeId: '4', name: 'MM-YH-8' },
            { vehicleId: '30', vehicleTypeId: '4', name: 'MM-YH-9' },
            { vehicleId: '31', vehicleTypeId: '4', name: 'MM-YH-10' }
          ]
        },
        vehicles: [
          {
            vehicleId: '2',
            vehicleTypeId: '2',
            start: '2021-09-24 15:00:00',
            end: '2021-09-24 16:00:00',
            color: '#4a2257'
          },
          {
            vehicleId: '2',
            vehicleTypeId: '2',
            start: '2021-09-24 13:10:00',
            end: '2021-09-24 14:10:00',
            color: '#f143ad'
          },
          {
            vehicleId: '3',
            vehicleTypeId: '1',
            start: '2021-09-24 14:33:00',
            end: '2021-09-24 15:33:00',
            color: '#182739'
          },
          {
            vehicleId: '5',
            vehicleTypeId: '1',
            start: '2021-09-24 13:14:00',
            end: '2021-09-24 14:14:00',
            color: '#6087e4'
          },
          {
            vehicleId: '6',
            vehicleTypeId: '1',
            start: '2021-09-24 15:18:00',
            end: '2021-09-24 16:18:00',
            color: '#d5e21c'
          },
          {
            vehicleId: '12',
            vehicleTypeId: '2',
            start: '2021-09-24 08:10:00',
            end: '2021-09-24 09:10:00',
            color: '#86caaf'
          },
          {
            vehicleId: '7',
            vehicleTypeId: '1',
            start: '2021-10-09 15:13:00',
            end: '2021-10-10 16:13:00',
            color: '#7e7424'
          }
        ]
      };

      const { vehicles } = DATA;
      AGREEMENTS = vehicles;

      this.initSetVehicleTypes();

      return DATA;
    } catch (error) {
      console.error(error.message);
    }
  }

  initSetVehicleTypes() {
    const eSelect = document.querySelector('#vehicle-types');
    eSelect.innerHTML = '';

    const {
      filters: { typeVehicles }
    } = DATA;

    typeVehicles.forEach((typeVehicle) => {
      const eOption = document.createElement('option');
      eOption.value = typeVehicle.vehicleTypeId;
      eOption.innerText = typeVehicle.name;

      eSelect.appendChild(eOption);
    });

    this.getVehicles();
  }

  getVehicles() {
    const currentSelect = document.querySelector('#vehicle-types').value;
    const {
      filters: { vehicles }
    } = DATA;

    VEHICLES = vehicles.filter((v) => v.vehicleTypeId === currentSelect);

    this.printVehicles();
  }
}

class InitEvents extends FetchData {
  constructor() {
    super();
    this.previousDayEvent();
    this.nextDayEvent();
    this.currentDayEvent();
    this.typeVehicleSelectEvent();
  }

  previousDayEvent() {
    // Dia anterior
    const previousEl = document.querySelector('#previous-day');

    previousEl.addEventListener('click', () => {
      DATE.from = dayjs(DATE.from).subtract(1, 'day').format('YYYY-MM-DD');

      this.printDate();
      this.getVehiclesOnCheckOut();
    });
  }

  nextDayEvent() {
    const nextEl = document.querySelector('#next-day');

    nextEl.addEventListener('click', () => {
      DATE.from = dayjs(DATE.from).add(1, 'day').format('YYYY-MM-DD');

      this.printDate();
      this.getVehiclesOnCheckOut();
    });
  }

  currentDayEvent() {
    const currentEl = document.querySelector('#current-day');

    currentEl.addEventListener('click', () => {
      if (DATE.from !== DATE.current) {
        DATE.from = DATE.current;

        this.printDate();
        this.getVehiclesOnCheckOut();
      }
    });
  }

  typeVehicleSelectEvent() {
    const eSelect = document.querySelector('#vehicle-types');

    eSelect.addEventListener('change', () => {
      this.getVehicles();
    });
  }
}

let DATA = { filters: [{ typeVehicles: [], vehicles: [] }] };

let VEHICLES = [];
let AGREEMENTS = [];

const COUNTS = {
  previous: 1,
  next: 1
};

const DATE = {
  current: Helpers.getFrom(),
  from: Helpers.getFrom(),
  currentHour: Helpers.getHour()
};

document.addEventListener('DOMContentLoaded', async () => {
  (function () {
    new InitEvents();
  })();
});
