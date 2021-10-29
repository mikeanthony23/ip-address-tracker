import L from 'leaflet'
import markerIcon from '@images/icon-location.svg'
import { MAP_CONFIG } from '../config'

class MapView {
  #mapContainerEl = document.querySelector('.map-container')

  constructor() {
    this.#smoothScrollToTop()
    this.#intersectionObs()
  }

  loadMap({ lat, lng }) {
    const {
      iconSizeHeightWidth,
      iconAnchorPoint,
      popupAnchorPoint,
      attributionLink,
      tilesImg,
      mapId,
      zoomLvl,
      maxZoomLvl,
    } = MAP_CONFIG
    const myIcon = L.icon({
      iconUrl: `${markerIcon}`,
      iconSize: iconSizeHeightWidth,
      iconAnchor: iconAnchorPoint,
      popupAnchor: popupAnchorPoint,
    })
    this.map = L.map(mapId).setView([lat, lng], zoomLvl)
    L.marker([lat, lng], { icon: myIcon }).addTo(this.map)
    L.tileLayer(tilesImg, {
      attribution: attributionLink,
      maxZoom: maxZoomLvl,
    }).addTo(this.map)
  }

  renderErrorMap() {
    this.#mapContainerEl.innerHTML = `
      <div class='map-error'><p>Cannot load the map</p></div>
      <a id="map__scroll-to-top" class="hidden" href="#top"></a>`
  }

  displayMap(coords) {
    this.#mapContainerEl.innerHTML = `
    <div id='map'></div>
    <a id="map__scroll-to-top" class="hidden" href="#top"></a>`
    this.loadMap(coords)
  }

  #showMoveToTopArrow(isHidden = true) {
    const arrow = document.querySelector('#map__scroll-to-top')
    if (!arrow) return undefined
    if (isHidden) return arrow.classList.remove('hidden')
    return arrow.classList.add('hidden')
  }

  #intersectionObs() {
    const target = document.querySelector('.form')
    const options = {
      root: null,
      threshold: 0,
      rootMargin: '0px',
    }
    const callback = entries => {
      const { isIntersecting } = entries[0]
      if (isIntersecting) {
        this.#showMoveToTopArrow(false)
      }
      if (!isIntersecting) {
        this.#showMoveToTopArrow()
      }
    }
    const init = new IntersectionObserver(callback, options)
    init.observe(target)
  }

  #smoothScrollToTop() {
    const mapContainer = document.querySelector('.map-container')
    mapContainer.addEventListener('click', e => {
      e.preventDefault()
      const link = e.target.closest('#map__scroll-to-top')
      if (!link) return
      const target = document.querySelector('.header')
      target.scrollIntoView({ behavior: 'smooth' })
    })
  }
}

export default new MapView()
