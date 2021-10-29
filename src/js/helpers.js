export const validUrl = function (searchValue) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // fragment locator
  return !!pattern.test(searchValue)
}

export const timeout = function (timeOutSec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long! Please try again.'))
    }, timeOutSec * 1000)
  })
}

export const disableSubmitBtn = function (isDisabled = true) {
  const submitBtn = document.querySelector('.form__submit-btn')
  if (isDisabled === false) {
    submitBtn.removeAttribute('disabled', '')
    submitBtn.classList.remove('form__reduce-opacity')
  } else {
    submitBtn.setAttribute('disabled', '')
    submitBtn.classList.add('form__reduce-opacity')
  }
}
