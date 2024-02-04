import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function DropDown({ required, value, list, handleChange, label }) {
    return (
        <div style={{ margin: '1rem' }}>
            <FormControl sx={{ '& .css-wgai2y-MuiFormLabel-asterisk': { color: 'red' } }} required={required} variant='standard' style={{ width: '100%', textAlign: 'left' }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    label="Field Type"
                    onChange={handleChange}
                >
                    {list.map((m) => (
                        <MenuItem value={m} key={m}>{m}</MenuItem>
                    ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}
