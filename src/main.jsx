import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './Store/appStore.js'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  // </StrictMode>
)
