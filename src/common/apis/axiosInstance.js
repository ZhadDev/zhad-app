import axios from 'axios'
import { APPI_ECOMERCE_ZHAD } from './config'

const { PROTOCOL, PORT_BASE, URL_BASE, SERVICE_MAIN } = APPI_ECOMERCE_ZHAD

const BASE_URL = `${PROTOCOL}${URL_BASE}:${PORT_BASE}${SERVICE_MAIN}`

const header = {}
header['Content-type'] = 'application/json'

export default axios.create({
	baseURL: BASE_URL,
	timeout: 4000,
	headers: header,
})
