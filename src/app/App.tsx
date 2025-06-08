import { ChangeEvent, useState } from 'react'
import '../common/styles/color-schema.css'
import '../common/styles/typography.css'
import { Provider } from 'react-redux'
import { perisstor, store } from '../features/domain/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { btnVariant, Button } from '../common/components/button/button'
import { Input } from '../common/components/input-floating-label/input-floating-label'

function App() {

  const [st, setSt] = useState("")

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={perisstor}>
            <>
              {<div style={{display: "flex", flexDirection: "column"}}>
                  <span className={'h1'}>h1</span>
                  <span className={'h2'}>h2</span>
                  <span className={'h3'}>h3</span>
                  <span className={'p1'}>p1</span>
                  <span className={'p2'}>p2</span>
                  
                  <Button onClick={() => console.log("test")} variant={"outlined"}>test</Button>
                  <Button onClick={() => console.log("test")} variant={"filled"}>test</Button>
                  <span className={'button'}>button</span>
                  <Input id="id" value={st} label='Label' onChange={(e : ChangeEvent<HTMLInputElement>) => setSt(e.target.value)}></Input>
              </div>
              }
            </>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
