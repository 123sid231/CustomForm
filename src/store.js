import { configureStore } from '@reduxjs/toolkit'
import formReducer from './StoreSlices/FormSlice'

export default configureStore({
    reducer: {
        form: formReducer,
    },
})