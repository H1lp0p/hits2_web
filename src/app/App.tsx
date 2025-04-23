import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { perisstor, store } from '../features/domain/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={perisstor}>
            <>
              {
              //TODO: implement
              }
            </>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
