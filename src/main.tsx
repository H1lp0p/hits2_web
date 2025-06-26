import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from './features/domain/redux/store.ts'

const {store, perisstor} = createStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={perisstor}>
            <App />
        </PersistGate>
    </Provider>
  </StrictMode>,
)
