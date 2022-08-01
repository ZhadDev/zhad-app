import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './component/redux/store'

const reduxProvider = (
	<Provider store={store}>
		<App />
	</Provider>
)

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(reduxProvider)
