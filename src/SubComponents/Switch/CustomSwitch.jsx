import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import React from 'react'

export default function CustomSwitch({ onChange, value }) {
    return (
        <div style={{ margin: '1rem' }}>
            <FormGroup>
                <FormControlLabel labelPlacement="start" control={<Switch checked={value} onChange={onChange} />} label="Is Required" />
            </FormGroup>
        </div>
    )
}
