import * as model from './model'
import ipView from './view/ipInformationView'
import mapView from './view/mapView'

import { disableSubmitBtn } from './helpers'

const controlDisplayIpDetails = async function (isLoaded = true) {
  try {
    const searchValue = ipView.getQuery()
    if (searchValue.length <= 0 && isLoaded === false) {
      disableSubmitBtn(false)
      throw new Error('Search field should not be empty.')
    }
    ipView.renderSpinner()
    await model.getIP(searchValue)
    ipView.renderMarkUp(model.state.results)
    mapView.displayMap(model.state.results)
    disableSubmitBtn(false)
  } catch (err) {
    console.error(`Something went wrong ${err.message}`)
    disableSubmitBtn(false)
    ipView.renderError(err.message)
    mapView.renderErrorMap()
  }
}

const init = function () {
  ipView.addHandlerLoad(controlDisplayIpDetails)
  ipView.addHandlerSearch(controlDisplayIpDetails)
}
init()
