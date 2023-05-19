import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import ClientAuthNoPersist from "./ClientAuth";

const persistConfig = { key: 'user', storage, version: 1 };

const ClientAuth = persistReducer(persistConfig,ClientAuthNoPersist)

export const Store = configureStore({
    reducer: {
        Client: ClientAuth,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(Store)