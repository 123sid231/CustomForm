import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

export default function CustomRadio({ value, handleChange, options, required }) {
    console.log(options)
    return (
        <div style={{ margin: '1rem' }}>
            <FormControl sx={{ '& .css-wgai2y-MuiFormLabel-asterisk': { color: 'red' } }} required={required}>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    {options?.map((m) => (
                        <FormControlLabel value={m} control={<Radio />} label={m} />
                    ))
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
}
