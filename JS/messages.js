export function createPopap(container) {
  const popapBg = document.createElement('div'),
        popapWindow = document.createElement('div'),
        popapText = document.createElement('p'),
        popapClose = document.createElement('button')

  popapBg.classList.add('popap-bg')
  popapWindow.classList.add('popap')
  popapText.classList.add('popap__text'),
  popapClose.classList.add('popap__close')
  popapClose.classList.add('btn-close')

  // активация popap
  popapBg.active = (text) => {
    popapBg.classList.add('popap-bg--active')
    popapWindow.classList.add('popap--active')
    if(popapText.textContent) {
      popapText.textContent = ''
    }
    popapText.textContent = text
    popapWindow.style.overflow = 'auto'
  }
  // деактивация popap
  popapBg.deactive = () => {
    popapBg.classList.remove('popap-bg--active')
    popapWindow.classList.remove('popap--active')
    popapWindow.style.overflow = 'hidden'
  }

  // закрытие popap
  popapClose.addEventListener('click', () => {
    popapBg.deactive()
  })
  document.addEventListener('click', (e) => {
    if(e.target === popapBg) {
      popapBg.deactive()
    }
  })
  window.onkeydown = function(e) {
    if (e.key == 'Escape') {
      popapBg.deactive()
    }
  }

  popapWindow.append(popapText)
  popapWindow.append(popapClose)
  popapBg.append(popapWindow)

  container.append(popapBg)

  return {
    popapBg
  }
}

export function createMessage(container) {
  const toastContainer = document.createElement('div')
  const toast = document.createElement('div')
  const toastHeader = document.createElement('div')
  const toastBtn = document.createElement('button')
  const toastBody = document.createElement('div')
  const toastText = document.createElement('p')
  toastContainer.classList.add('toast-container', 'position-fixed', 'bottom-0', 'end-0', 'p-3')
  toast.classList.add('toast')
  toastHeader.classList.add('toast-header')
  toastBtn.classList.add('btn-close')
  toastBody.classList.add('toast-body')
  toastText.classList.add('toast-text')
  toast.setAttribute('id', 'liveToast')
  toast.role = 'alert'
  toast.ariaLive = 'assertive'
  toast.ariaAtomic = true
  toastBtn.setAttribute('data-bs-dismiss', 'toast')
  toastBtn.type = 'button'
  toastBtn.ariaLabel = 'закрыть'
  toastBtn.style.marginLeft = 'auto'

  toastContainer.active = (text) => {
    toastText.textContent = text
    toast.style.display = 'block'
  }

  toastContainer.deactive = () => {
    toast.style.display = 'none'
  }

  toastBtn.addEventListener('click', () => {
    toastContainer.deactive()
  })

  toastHeader.append(toastBtn)
  toast.append(toastHeader)
  toastBody.append(toastText)
  toast.append(toastBody)
  toastContainer.append(toast)

  container.append(toastContainer)

  return toastContainer
}
