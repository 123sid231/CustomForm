import { Button } from '@mui/material'
import React from 'react'

export default function CustomButton({ name, onClick }) {
    return (
        <Button variant="contained" onClick={onClick} style={{ position: 'relative' }} >{name}</Button>
    )
}
