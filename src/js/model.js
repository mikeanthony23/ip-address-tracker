import { validUrl, timeout } from './helpers'
import { GEO_API_KEY, GEO_API_URL, TIME_OUT_LIMIT } from './config'

export const state = {
  results: {},
}

const createSearchResultObj = function (data) {
  return {
    ip: data.ip,
    city: data.location.city,
    country: data.location.country,
    timezone: data.location.timezone,
    lat: data.location.lat,
    lng: data.location.lng,
    isp: data.isp,
  }
}

export const getIP = async function (searchValue = ``) {
  try {
    const res = await Promise.race([
      fetch(
        `${GEO_API_URL}${GEO_API_KEY}${
          validUrl(searchValue) ? `&domain=${searchValue}` : `&ipAddress=${searchValue}`
        }`,
      ),
      timeout(TIME_OUT_LIMIT),
    ])
    if (!res.ok) throw new Error(`Invalid IP Address or domain name !! Please try again`)
    const data = await res.json()
    state.results = createSearchResultObj(data)
  } catch (err) {
    console.error(`Something went wrong ${err.message}`)
    throw err
  }
}
