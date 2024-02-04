import { createSlice } from '@reduxjs/toolkit'

export const FormSlice = createSlice({
    name: 'Form',
    initialState: {
        value: [],
    },
    reducers: {
        storeForm: (state, action) => {
            let newData = JSON.stringify(action.payload)
            state.value = JSON.parse(newData)
        },
    },
})

export const { storeForm } = FormSlice.actions

export default FormSlice.reducer