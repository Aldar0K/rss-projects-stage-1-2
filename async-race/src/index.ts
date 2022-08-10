import '../global.css';
import { getCars, getWinners } from './API';
import store from './Store';
import { render, listen, updateStateGarage } from './View';

render();

(async () => {
  store.update({
    cars: await getCars(),
    winners: await getWinners(),
  });
  render();
})();

(async () => {
  await updateStateGarage();
})();

listen();
