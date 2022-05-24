function toggleVisibility (elementId) {
  const element = document.getElementById(elementId)
  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block'
  } else {
    element.style.display = 'none'
  }
}

function toggleClass (elementId, className) {
  const element = document.getElementById(elementId)
  element.classList.toggle(className)
}

/**
 * @param {HTMLImageElement|string} img image element or HTML ID of the element
 */
function toggleImageSize (img) {
  if (typeof img === 'string') {
    img = document.getElementById(img)
  }
  if (img.src.includes('small')) {
    img.src = img.src.replace('small/', '')
    img.classList.remove('small')
  } else {
    img.src = img.src.replace('img/', 'img/small/')
    img.classList.add('small')
  }
}
