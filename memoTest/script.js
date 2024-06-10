const cards = document.querySelectorAll(".cardJuego");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;
let correctGuess = 0
cards.forEach((card) => card.addEventListener("click", flip));
barajar()
const main = document.getElementById('main-content');

// Crear el contenedor del modal
const modal = document.createElement('div');
modal.classList.add('modalJuego');

// Crear el contenido del modal
modal.innerHTML = `
    <div class="modalJuego-header">
      <h1>Título del Modal</h1>
      <h2>Subtítulo del Modal</h2>
    </div>
    <div class="modalJuego-footer">
      <button class="close-btn">Volver al inicio</button>
      <button class="confirm-btn">Reiniciar</button>
    </div>
  `;


// Añadir funcionalidad a los botones
const closeButton = modal.querySelector('.close-btn');
const confirmButton = modal.querySelector('.confirm-btn');

closeButton.addEventListener('click', () => {
  window.location.href = '../index.html'
  main.removeChild(modal);
});

confirmButton.addEventListener('click', () => {
  restart()
  main.removeChild(modal);
});
function flip() {
  if (lock) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  check();
}

function barajar() {
  cards.forEach((card) => {
    var position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
};


function check() {
  var isMatch = firstCard.childNodes[1].getAttribute('src') === secondCard.childNodes[1].getAttribute('src');
  isMatch ? succes() : fail();
}

function succes() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  correctGuess++
  console.log(correctGuess, "si")
  reset();
  if (correctGuess === 8) {
    restartModal()
  }
}

function fail() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
}

function reset() {
  [isFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartModal() {
main.appendChild(modal);

}
function restart() {
  console.log("entro")
  cards.forEach((card) => { card.addEventListener("click", flip); card.classList.remove('flip') })
  barajar()
  correctGuess = 0
}
