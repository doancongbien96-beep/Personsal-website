const photoButtons = [...document.querySelectorAll('.photo-open')];
const viewer = document.querySelector('.photo-dialog');
const viewerImage = viewer.querySelector('.viewer-image');
let activePhoto = 0;
function showPhoto(index) {
  activePhoto = (index + photoButtons.length) % photoButtons.length;
  const source = photoButtons[activePhoto].querySelector('img');
  viewerImage.src = source.src;
  viewerImage.alt = source.alt;
  viewer.querySelector('.viewer-caption').textContent = photoButtons[activePhoto].closest('figure').querySelector('h3').textContent;
  viewer.querySelector('.viewer-count').textContent = `${activePhoto + 1} / ${photoButtons.length}`;
}
photoButtons.forEach((button, index) => button.addEventListener('click', () => {showPhoto(index); viewer.showModal();}));
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelector('.viewer-previous').addEventListener('click', () => showPhoto(activePhoto - 1));
viewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(activePhoto + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') {event.preventDefault(); showPhoto(activePhoto + 1);}
  if (event.key === 'ArrowLeft') {event.preventDefault(); showPhoto(activePhoto - 1);}
});
viewer.addEventListener('click', event => {if (event.target === viewer) {const r=viewer.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) viewer.close();}});