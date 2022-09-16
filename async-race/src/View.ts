import { getCars, getWinners, startEngine, stopEngine, drive, getCar, deleteCar, deleteWinner, saveWinner, createCar, updateCar, generateRandomCars } from './API';
import { ICar } from './Intefaces';
import { animation, race, CARS_PAGE_LIMIT, WINNERS_PAGE_LIMIT, getRandomName } from './Utils';
import store from './Store';

let selectedCar: ICar;

const renderCarImage = (color: string): string => `
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="150px" height="80px" viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="${color}" stroke="none">
      <path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6 -10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91 -250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340 -49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3 -150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418 0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64 -126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622 756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302 140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263 l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22 259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239 -63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1 -116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45 525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50 680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0 -226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332 -208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341 10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66 -422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36 -485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83 54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12 -67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134 274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11 -27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>
      <path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262 -467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493 -551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23 86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50 -354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220 1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360 0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/>
      <path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120 -114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>
      <path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28 22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/> <path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0 165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/> <path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0 165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>
      <path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29 58 -13 0 -29 -8 -34 -18z"/>
      <path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57 9 153 -71 153 -27 0 -44 -8 -66 -29z"/>
      <path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16 -54 -2z"/>
      <path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67 -62 36z"/>
      <path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123 113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>
      <path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71 195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>
      <path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25 -70 0z"/>
      <path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7 0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>
      <path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223 232 -230 231 -3 0 -11 -3 -17 -6z"/>
      <path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24 -411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118 380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86 -407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96 33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176 238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207 81 364 77 109 -3 143 -7 210 -30z"/>
      <path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80 119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>
      <path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20 -163 84 -207 91 l-43 7 0 -162z"/>
      <path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0 165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>
      <path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45 -88 241 -108 241 -4 0 -57 -51 -119 -112z"/>
      <path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64 -10 68 -14 2 -31 -3 -38 -10z"/>
      <path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0 -44 -6 -64 -31z"/>
      <path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z"/>
      <path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13 -24 13 -3 0 -14 -6 -24 -13z"/>
      <path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120 109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>
      <path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177 79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>
      <path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43 -67 12z"/>
      <path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108 10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>
      <path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186 61 239 98 16 10 -216 242 -234 235z"/>
    </g>
  </svg>
`;

const renderCar = (car: ICar): string => `
  <div class="car-container" id="car-container-${car.id}">
    <div class="car-params">
      <div class="car-params__top">
        <button class="btn btn-edit" data-id="${car.id}">Edit</button>
        <h3>${car.name}</h3>
        <button class="btn btn-delete" data-id="${car.id}">Delete</button>
      </div>
      <div class="car-params__bottom">
        <button class="btn btn-reset-car" id="btn-reset-car-${car.id}" data-id="${car.id}" disabled>Reset</button>
        <button class="btn btn-start-car" id="btn-start-car-${car.id}" data-id="${car.id}">Start</button>
      </div>
    </div>
    <div class="racing-track">
      <div class="car car-${car.id}" id="car-${car.id}" data-id="${car.id}">
        ${renderCarImage(car.color)}
      </div>
      <img clas="finish-line"></img>
    </div>
  </div>
`;

const renderGarage = (): string => `
  <div class="dashboard">
    <div class="dasboard__info">
      <h2>Garage (${store.state.carsCount})</h2>
      <h2>Page #${store.state.carsPage}</h2>
    </div>
    <div class="dashboard__controls">
      <div class="dashboard__create" id="create">
        <input class="input create-name" id="input create-name" name="name" type="text">
        <input class="input create-color" id="input create-name" name="color" type="color" value="#ffffff">
        <button class="button create-button" type="submit">CREATE</button>
      </div>
      <div class="dashboard__update" id="update">
        <input class="input update-name" id="input update-name" name="name" type="text" disabled>
        <input class="input update-color" id="input update-name" name="color" type="color" value="#ffffff" disabled>
        <button class="button update-button" type="submit" disabled>UPDATE</button>
      </div>
      <div class="dashboard__race">
        <button class="button race-button" id="race">RACE</button>
        <button class="button reset-button" id="reset">RESET</button>
        <button class="button generator-button" id="generator">GENERATE</button>
      </div>
    </div>
  </div>
  <div class="cars-container">${store.state.cars.map((car) => renderCar(car))}</div>
`;

const renderWinners = (): string => `
  <div class="winners-container">
    <h2>Winners (${store.state.winnersCount})</h2>
    <h2>Page#${store.state.winnersPage}</h2>
    <table class="winners-table">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table-button table-wins ${store.state.sort === 'wins' ? store.state.order : ''}" id="sort-by-wins">Wins</th>
        <th class="table-button table-time ${store.state.sort === 'time' ? store.state.order : ''}" id="sort-by-time">Time</th>
      </thead>
      <tbody>
        ${store.state.winners.map((winner, i) => `
          <tr>
            <td>${i + 1}</td>
            <td class="td-image">${renderCarImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
        `)}
      </tbody>
    </table>
  </div>
`;

export const render = (): void => {
  document.body.innerHTML = `
  <wrapper class="wrapper">
    <header class="header">
      <div class="container header__container">
        <nav class="nav">
          <button class="btn btn-garage btn-disable" disabled>TO GARAGE</button>
          <button class="btn btn-winners btn-active">TO WINNERS</button>
        </nav>
        <h1>Async Race</h1>
      </div>
    </header>
    <main class="main">
      <div class="container main__container">
        <div class="garage">${renderGarage()}</div>
        <div class="winners hidden">${renderWinners()}</div>
        <div class="page-buttons">
          <button class="btn btn-prev" ${store.state.carsPage === 1 || store.state.winnersPage === 1 ? 'disabled' : ''}>PREV</button>
          <button class="btn btn-next" ${store.state.carsCount <= CARS_PAGE_LIMIT ? 'disabled' : ''}>NEXT</button>
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="container footer__container">
        <div class="footer__data">
          <span>©</span>
          <span>2022</span>
          <a class="github-link" href="https://github.com/Aldar0K">github</a>
        </div>
        <div class="footer__rss">
          <a class="rss-link" href="https://rs.school/js/">
              <img src="https://rs.school/images/rs_school_js.svg" alt="rs_school_js.svg" width="120px">
          </a>
        </div>
      </div>
    </footer>
  </wrapper>
  `;
};

export const updateStateGarage = async (): Promise<void> => {
  store.update({ cars: await getCars() });

  if (store.state.carsPage * CARS_PAGE_LIMIT < store.state.carsCount) {
    (document.querySelector('.btn-next') as HTMLButtonElement).disabled = false;
    store.update({ btnNext: true });
  } else {
    (document.querySelector('.btn-next') as HTMLButtonElement).disabled = true;
    store.update({ btnNext: false });
  }

  if (store.state.carsPage > 1) {
    (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = false;
    store.update({ btnPrev: true });
  } else {
    (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = true;
    store.update({ btnPrev: false });
  }
};

export const updateStateWinners = async (): Promise<void> => {
  store.update({
    winners: await getWinners(store.state.winnersPage, CARS_PAGE_LIMIT, store.state.sort, store.state.order),
  });

  if (store.state.winnersPage * WINNERS_PAGE_LIMIT < store.state.winnersCount) {
    (document.querySelector('.btn-next') as HTMLButtonElement).disabled = false;
    store.update({ btnNext: true });
  } else {
    (document.querySelector('.btn-next') as HTMLButtonElement).disabled = true;
    store.update({ btnNext: false });
  }

  if (store.state.winnersPage > 1) {
    (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = false;
    store.update({ btnPrev: true });
  } else {
    (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = true;
    store.update({ btnPrev: false });
  }
};

export const startDriving = async (id: number): Promise<{ success: boolean, id: number, time: number }> => {
  (document.querySelector('.btn-next') as HTMLButtonElement).disabled = true;
  (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = true;

  (document.querySelector(`#btn-start-car-${id}`) as HTMLButtonElement).disabled = true;

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  (document.querySelector(`#btn-reset-car-${id}`) as HTMLButtonElement).disabled = false;

  const car = document.querySelector(`#car-${id}`) as HTMLDivElement;
  const htmlDistance = (car.parentElement as HTMLDivElement).clientWidth - car.clientWidth;

  store.state.animations[id] = animation(car, htmlDistance, time);

  const { success } = await drive(id);
  if (!success) window.cancelAnimationFrame(store.state.animations[id].id);

  return { success, id, time };
};

export const stopDriving = async (id: number): Promise<void> => {
  (document.querySelector(`#btn-reset-car-${id}`) as HTMLButtonElement).disabled = true;

  await stopEngine(id);

  (document.querySelector(`#btn-start-car-${id}`) as HTMLButtonElement).disabled = false;

  const car = document.querySelector(`#car-${id}`) as HTMLDivElement;
  car.style.transform = 'translateX(0)';
  if (store.state.animations[id]) cancelAnimationFrame(store.state.animations[id].id);
};

const setSortOrder = async (sortBy: 'id' | 'wins' | 'time') => {
  store.state.order = store.state.order === 'ASC' ? 'DESC' : 'ASC';
  store.state.sort = sortBy;

  await updateStateWinners();
  (document.querySelector('.winners') as HTMLDivElement).innerHTML = renderWinners();
};

const checkCarsParams = async (target: EventTarget): Promise<void> => {
  if ((target as HTMLButtonElement).classList.contains('btn-start-car')) {
    const id = Number((target as HTMLButtonElement).dataset.id);
    await startDriving(id);
    (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = !store.state.btnPrev;
    (document.querySelector('.btn-next') as HTMLButtonElement).disabled = !store.state.btnNext;
  }
  if ((target as HTMLButtonElement).classList.contains('btn-reset-car')) {
    const id = Number((target as HTMLButtonElement).dataset.id);
    stopDriving(id);
  }
  if ((target as HTMLButtonElement).classList.contains('btn-edit')) {
    const id = Number((target as HTMLButtonElement).dataset.id);
    selectedCar = await getCar(id);
    (document.querySelector('.update-name') as HTMLInputElement).value = selectedCar.name;
    (document.querySelector('.update-color') as HTMLInputElement).value = selectedCar.color;
    (document.querySelector('.update-name') as HTMLInputElement).disabled = false;
    (document.querySelector('.update-color') as HTMLInputElement).disabled = false;
    (document.querySelector('.update-button') as HTMLInputElement).disabled = false;
  }
  if ((target as HTMLButtonElement).classList.contains('btn-delete')) {
    const id = Number((target as HTMLButtonElement).dataset.id);
    await deleteCar(id);
    await deleteWinner(id);
    await updateStateGarage();
    (document.querySelector('.garage') as HTMLDivElement).innerHTML = renderGarage();
  }
  if ((target as HTMLButtonElement).classList.contains('generator-button')) {
    (target as HTMLButtonElement).disabled = true;
    await generateRandomCars();
    await updateStateGarage();
    (document.querySelector('.garage') as HTMLDivElement).innerHTML = renderGarage();
    (target as HTMLButtonElement).disabled = false;
  }
};

const checkPrevNextButtons = async (target: EventTarget): Promise<void> => {
  if ((target as HTMLButtonElement).classList.contains('btn-prev')) {
    if (store.state.view === 'Garage') {
      store.state.carsPage -= 1;
      await updateStateGarage();
      (document.querySelector('.garage') as HTMLDivElement).innerHTML = renderGarage();
    } else {
      store.state.winnersPage -= 1;
      await updateStateWinners();
      (document.querySelector('.winners') as HTMLDivElement).innerHTML = renderWinners();
    }
  }
  if ((target as HTMLButtonElement).classList.contains('btn-next')) {
    if (store.state.view === 'Garage') {
      store.state.carsPage += 1;
      await updateStateGarage();
      (document.querySelector('.garage') as HTMLDivElement).innerHTML = renderGarage();
    } else {
      store.state.winnersPage += 1;
      await updateStateWinners();
      (document.querySelector('.winners') as HTMLDivElement).innerHTML = renderWinners();
    }
  }
};

const checkPageButtons = async (target: EventTarget): Promise<void> => {
  if ((target as HTMLButtonElement).classList.contains('btn-garage')) {
    store.state.view = 'Garage';
    (document.querySelector('.btn-garage') as HTMLButtonElement).disabled = true;
    (document.querySelector('.btn-winners') as HTMLButtonElement).disabled = false;
    (document.querySelector('.garage') as HTMLDivElement).classList.toggle('hidden');
    (document.querySelector('.winners') as HTMLDivElement).classList.toggle('hidden');
    if (store.state.carsPage > 1) (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = false;
    if (store.state.carsPage * CARS_PAGE_LIMIT < store.state.carsCount) (document.querySelector('.btn-next') as HTMLButtonElement).disabled = false;
    store.update({ btnNext: store.state.carsPage * CARS_PAGE_LIMIT < store.state.carsCount });
  }
  if ((target as HTMLButtonElement).classList.contains('btn-winners')) {
    store.state.view = 'Winners';
    (document.querySelector('.btn-winners') as HTMLButtonElement).disabled = true;
    (document.querySelector('.btn-garage') as HTMLButtonElement).disabled = false;
    (document.querySelector('.winners') as HTMLDivElement).classList.toggle('hidden');
    (document.querySelector('.garage') as HTMLDivElement).classList.toggle('hidden');
    await updateStateWinners();
    (document.querySelector('.winners') as HTMLDivElement).innerHTML = renderWinners();
  }
};

const checkGarageButtons = async (target: EventTarget): Promise<void> => {
  if ((target as HTMLButtonElement).classList.contains('race-button')) {
    (target as HTMLButtonElement).disabled = true;
    const { carWinner, time } = await race(startDriving);
    await saveWinner(carWinner.id, time);
    alert(`${carWinner.name} finished first!\nTime: ${time}`);
    (document.querySelector('.reset-button') as HTMLButtonElement).disabled = false;
    (document.querySelector('.btn-prev') as HTMLButtonElement).disabled = !store.state.btnPrev;
    (document.querySelector('.btn-next') as HTMLButtonElement).disabled = !store.state.btnNext;
  }
  if ((target as HTMLButtonElement).classList.contains('reset-button')) {
    (target as HTMLButtonElement).disabled = true;
    store.state.cars.forEach(({ id }) => stopDriving(id));
    (document.querySelector('.race-button') as HTMLButtonElement).disabled = false;
  }
  if ((target as HTMLButtonElement).classList.contains('create-button')) {
    let name = (document.querySelector('.create-name') as HTMLInputElement).value;
    if (!name) name = getRandomName();
    const color = (document.querySelector('.create-color') as HTMLInputElement).value;
    await createCar({ name, color });
    await updateStateGarage();
    (document.querySelector('.garage') as HTMLDivElement).innerHTML = renderGarage();
    (document.querySelector('.create-name') as HTMLInputElement).value = '';
  }
  if ((target as HTMLButtonElement).classList.contains('update-button')) {
    const newName = (document.querySelector('.update-name') as HTMLInputElement).value;
    const newColor = (document.querySelector('.update-color') as HTMLInputElement).value;
    await updateCar(selectedCar.id, { name: newName, color: newColor });
    await updateStateGarage();
    (document.querySelector('.garage') as HTMLDivElement).innerHTML = renderGarage();
  }
};

const checkWinnersButtons = async (target: EventTarget): Promise<void> => {
  if ((target as HTMLButtonElement).classList.contains('table-wins')) {
    setSortOrder('wins');
  }
  if ((target as HTMLButtonElement).classList.contains('table-time')) {
    setSortOrder('time');
  }
};

export const listen = (): void => {
  document.body.addEventListener('click', async (e) => {
    const target = e.target as EventTarget;
    checkCarsParams(target);
    checkPrevNextButtons(target);
    checkPageButtons(target);
    checkGarageButtons(target);
    checkWinnersButtons(target);
  });
};

export const start = async () => {
  render();
  await updateStateGarage();
  render();
  listen();
};
