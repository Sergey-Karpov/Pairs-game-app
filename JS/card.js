import { sounds } from './data.js'

export class Card {
  _open = false
  _success = false

  constructor(container, number, action) {
    this.card = document.createElement('div')
    this.card.classList.add('card')
    this.number = number
    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        sounds.flip.play()
        this.open = true
        action(this)
      }
    })
      container.append(this.card)
  }

  set open(value) {
    this._open = value
    if(value) {
      this.card.classList.add('open')
    } else {
      this.card.classList.remove('open')
    }
  }
  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    if(value) {
      this.card.classList.add('success')
      sounds.success.play()
    } else this.card.classList.remove('success')
  }
  get success() {
    return this._success
  }
}

export class AmazingCard extends Card {
  set open(value) {
    this._open = value
    if(value) {
      this.card.classList.add('open')
      this.card.style.backgroundImage = `url('../img/cards/${this.number}.png')`
    } else {
      this.card.classList.remove('open')
      this.card.style.backgroundImage = `url('../img/card-back.jpg')`
    }
  }
  get open() {
    return this._open
  }
}
