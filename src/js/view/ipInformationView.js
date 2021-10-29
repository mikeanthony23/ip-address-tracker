import { disableSubmitBtn } from '../helpers'

class IPInformationView {
  #formEl = document.querySelector('.form')
  #dataListWrapperEl = document.querySelector('.main__ip-desc-wrapper')
  #searchInputFieldEl = document.querySelector('.form__search-input')
  #connectionLostError = `Connection Interrupted! Please Check your internet.`

  #markup(data) {
    return `
    <dl class="ip-description-result-list">
    
      <div class="ip-description-result-list__item ip-description-result-list__ip-address">
        <dt class="ip-description-result-list__term">IP ADDRESS</dt>
        <dd class="ip-description-result-list__details ">${data.ip}</dd>
      </div>
      
      <div class="ip-description-result-list__item ip-description-result-list__physical-address">
        <dt class="ip-description-result-list__term">LOCATION</dt>
        <dd class="ip-description-result-list__details ">${data.country}, ${data.city}
        </dd>
      </div>
      
      <div class="ip-description-result-list__item ip-description-result-list__timezone">
        <dt class="ip-description-result-list__term">TIMEZONE</dt>
        <dd class="ip-description-result-list__details ">UTC ${data.timezone}</dd>
      </div>
      
      <div class="ip-description-result-list__item ip-description-result-list__isp-name">
        <dt class="ip-description-result-list__term">ISP</dt>
        <dd class="ip-description-result-list__details ">${data.isp}</dd>
      </div>

    </dl>`
  }

  getQuery() {
    return this.#searchInputFieldEl.value
  }

  renderSpinner() {
    const mapContainerEl = document.querySelector('.map-container')
    const spinner = `
    <div class="spinner-container">
      <div class="loader"></div>
    </div>`
    this.#dataListWrapperEl.innerHTML = ''
    mapContainerEl.innerHTML = ''
    this.#dataListWrapperEl.innerHTML = spinner
  }

  renderMarkUp(data) {
    const markup = this.#markup(data)
    this.#dataListWrapperEl.innerHTML = ''
    this.#dataListWrapperEl.innerHTML = markup
  }

  renderError(message) {
    if (message === 'Failed to fetch') message = this.#connectionLostError
    const markup = `
    <div class="ip-description-result-list__item--error">
      <p class="ip-description-result-list__error-msg">
        ${message}
      </p>
    </div>`
    this.#dataListWrapperEl.innerHTML = ''
    this.#dataListWrapperEl.innerHTML = markup
  }

  addHandlerSearch(handler) {
    this.#formEl.addEventListener('submit', e => {
      e.preventDefault()
      disableSubmitBtn()
      handler(false)
    })
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', () => {
      disableSubmitBtn()
      handler()
    })
  }
}

export default new IPInformationView()
