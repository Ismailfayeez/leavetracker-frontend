import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middleware/api";
import rootReducer from "./reducer";

export default function (){
    return configureStore(
        {
            reducer:rootReducer,
            middleware: [
                ...getDefaultMiddleware(),
                api,
              ],

        }
    )
}