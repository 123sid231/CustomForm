import { TextField } from '@mui/material'
import React from 'react'

export default function TextInput({ label, setInputValue, value, required, type = 'text' }) {
    return (
        <div style={{ margin: '1rem' }}>
            <TextField type={type} required={required} id="standard-basic" label={label} value={value} variant="standard"
                style={{ width: "100%" }}
                sx={{
                    '& .css-wgai2y-MuiFormLabel-asterisk': {
                        color: 'red'
                    }
                }}
                onChange={setInputValue} />
        </div>
    )
}
