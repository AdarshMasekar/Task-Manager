import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            <App />
        </Theme>
    </Provider>
  </StrictMode>,
)
