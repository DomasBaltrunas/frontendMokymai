import { loadData } from './siteData.js';
import { initSlider } from './slider.js';
import { initModals } from './modals.js';

const init = async function () {
  await loadData();
  initSlider();
  initModals();
};
init();
