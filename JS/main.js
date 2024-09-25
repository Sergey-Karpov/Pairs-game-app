import { Card, AmazingCard } from "./card.js";
import { createPopap, createMessage } from "./messages.js";
import { sounds, messagesText, supportMessages } from "./data.js";

let tryCounts = 0;

let popap = createPopap(document.body);
let message = createMessage(document.body);

const startBtn = document.getElementById("start-btn");

function newGame(container, cardsCount) {
  // создаем поле
  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new AmazingCard(container, cardNumber, flip));
  }

  // создаем механику игры
  function flip(card) {
    tryCounts = tryCounts + 1;
    if (tryCounts % 8 === 0) {
      sounds.message.play();
      message.active(supportMessages[Math.round(Math.random() * 17)]);
      setTimeout(message.deactive, 3000);
    }
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        tryCounts = 0;
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (
      document.querySelectorAll(".card.success").length ==
      cardsNumberArray.length
    ) {
      // сброс игры
      tryCounts = 0;
      sounds.win.play();
      popap.popapBg.active(`🎉🎈Поздравляем, отличная игра, вы выиграли!🎉🎈`);
      container.innerHTML = "";
      let cardsNumberArray = [];
      let cardsArray = [];
      let firstCard = null;
      let secondCard = null;

      // newGame(container, cardsCount);
    }
  }
}

// запуск игры
startBtn.addEventListener("click", () => {
  const container = document.getElementById("game");
  container.textContent = "";
  const cardsNumber = document.getElementById("cards-number").value;
  if (cardsNumber) {
    newGame(container, cardsNumber);
    message.active(messagesText[cardsNumber]);
    setTimeout(message.deactive, 3000);
  } else {
    return;
  }
});
