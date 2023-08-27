import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  infoEl: document.querySelector('.cat-info'),
};
const { selectEl, loaderEl, errorEl, infoEl } = refs;

loaderEl.classList.replace('loader', 'is-hidden');
errorEl.classList.replace('error', 'is-hidden');

addSelect();

function addSelect(data) {
  loaderEl.classList.replace('is-hidden', 'loader');
  selectEl.classList.add('is-hidden');
  fetchBreeds(data)
    .then(data => {
      let markSelect = data.map(({ name, id }) => {
        return `<option value = '${id}'>${name}</option>`;
      });
      selectEl.insertAdjacentHTML('beforeend', markSelect);

      new SlimSelect({
        select: selectEl,
      });
      loaderEl.classList.replace('loader', 'is-hidden');
      selectEl.classList.remove('is-hidden');
    })
    .catch(onError);
}

selectEl.addEventListener('change', onSelectEl);
function onSelectEl(evt) {
  loaderEl.classList.replace('is-hidden', 'loader');
  selectEl.classList.add('is-hidden');
  infoEl.classList.replace('cat-info', 'is-hidden');
  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loaderEl.classList.replace('loader', 'is-hidden');
      selectEl.classList.remove('is-hidden');

      const { url, breeds } = data[0];
      infoEl.innerHTML = `<img src='${url}' alt='${breeds[0].name}' width='500px'/><ul class=block><h2>${breeds[0].name}</h2><li class=title>${breeds[0].description}</li><li class=title><span>Temperament:</span> ${breeds[0].temperament}</li></ul>`;
      infoEl.classList.replace('is-hidden', 'cat-info');
    })
    .catch(onError);
}

function onError() {
  selectEl.classList.add('is-hidden');
  loaderEl.classList.replace('loader', 'is-hidden');
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
