import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducersBundle } from './slices'

const persistConf = {
    key: 'root',
    storage,
    whitelist: ['profile']
}

export const persistedReducer = persistReducer(persistConf, reducersBundle)