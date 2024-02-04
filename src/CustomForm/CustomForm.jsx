import React, { useEffect, useState } from 'react'
import cssClasses from './CustomForm.module.css'
import TextInput from '../SubComponents/TextInput/TextInput'
import { Card } from '@mui/material'
import Button from '../SubComponents/Button/CustomButton'
import { v4 as uuidv4 } from 'uuid';
import CustomSwitch from '../SubComponents/Switch/CustomSwitch'
import DropDown from '../SubComponents/DropDown/DropDown'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { storeForm } from '../StoreSlices/FormSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function CustomForm() {
    const dispatch = useDispatch()
    let Form = useSelector((state) => state.form.value)
    let [formFields, setFormFields] = useState([])

    const list = ['Text', 'Dropdown', 'Multiple Choice', 'File Upload']

    let formField = {
        label: '',
        type: '',
        fileType: '',
        options: [],
        isRequired: false,
        error: false,
        size: 5
    }

    function addFormField() {
        setFormFields((preFields) => [...preFields, { ...formField, id: uuidv4() }])
    }

    function setFormFieldValues(type, index, value, optionIndex) {
        console.log(value)
        if (type === 'options') {
            setFormFields((preFormFields) => {
                preFormFields[index][type][optionIndex] = value;
                return [...preFormFields]
            })
        } else {
            setFormFields((preFormFields) => {
                preFormFields[index][type] = value;
                if (type === 'type' && (value === 'Dropdown' || value === 'Multiple Choice')) {
                    preFormFields[index].options.push('')
                } else {
                    preFormFields[index].options = []
                }
                return [...preFormFields]
            })
        }
    }

    function deleteFormField(index) {
        setFormFields((preFormFields) => { preFormFields.splice(index, 1); return [...preFormFields] })
    }

    function addOptions(index, type) {
        setFormFields((preFormFields) => { preFormFields[index].options.push(''); return [...preFormFields] })
    }

    function deleteOption(index, optionIndex) {
        setFormFields((preFormFields) => { preFormFields[index].options.splice(optionIndex, 1); return [...preFormFields] })
    }

    function validateForm() {
        let flag = true
        for (let i = 0; i < formFields.length; i++) {
            let form = formFields[i]
            if (form.label === '' || form.type === '' || (form.type === 'File Upload' && (form.size === '' || form.fileType === '')) || (form.options.length > 0 && form.options.filter((e) => { return e === '' }).length > 0)) {
                setFormFields((preFormFields) => { preFormFields[i].error = true; return [...preFormFields] })
                flag = false
            } else {
                setFormFields((preFormFields) => { preFormFields[i].error = false; return [...preFormFields] })
            }
        }
        return flag
    }

    function saveForm() {
        let flag = validateForm()
        if (flag) {
            dispatch(storeForm(formFields))
        }
    }

    useEffect(() => {
        if (Form.length > 0) {
            let data = JSON.stringify(Form)
            setFormFields(JSON.parse(data))
        } else {
            addFormField()
        }
    }, [])

    useEffect(() => {
        console.log(formFields)
    }, [formFields])

    return (
        <div className={cssClasses.container}>
            <div className={cssClasses.formWrapper}>
                <div className={cssClasses.formFieldsWrapper}>
                    {formFields.map((m, index) => (
                        <Card style={{ marginBottom: '1rem', borderColor: m.error ? 'red' : 'rgba(0, 0, 0, 0.12)' }} key={m.id} className={cssClasses.card} variant="outlined">
                            {m.error &&
                                <p style={{ color: 'red' }}>Please enter the required fields</p>
                            }
                            <DropDown label={'Field Type'} list={list} value={m.type} handleChange={(e) => setFormFieldValues('type', index, e.target.value)} />
                            <TextInput value={m.label} label={(m.type === 'Dropdown' || m.type === 'Multiple Choice') ? "Question" : "Field Label"} setInputValue={(e) => setFormFieldValues('label', index, e.target.value)} />
                            {m.type === 'File Upload' &&
                                <>
                                    <TextInput type='number' value={m.size} label={'Max Size In Mb'} setInputValue={(e) => setFormFieldValues('size', index, e.target.value)} />
                                    <DropDown label={'File Type'} list={['image', 'pdf', 'doc']} value={m.fileType} handleChange={(e) => setFormFieldValues('fileType', index, e.target.value)} />
                                </>
                            }
                            {(m.type === 'Dropdown' || m.type === 'Multiple Choice') &&
                                <div >
                                    {m.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className={cssClasses.optionWrapper}>
                                            <TextInput value={option} label={`Option ${optionIndex + 1}`} setInputValue={(e) => setFormFieldValues('options', index, e.target.value, optionIndex)} />
                                            {optionIndex > 0 &&
                                                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => deleteOption(index, optionIndex)} />
                                            }
                                        </div>
                                    ))
                                    }
                                    <div onClick={() => addOptions(index, m.type)} className={cssClasses.optionWrapper}>
                                        <AddCircleOutlineIcon color='primary' />
                                        <p>Add Option</p>
                                    </div>
                                </div>
                            }
                            <div className={cssClasses.btnWrapper}>
                                <CustomSwitch value={m.isRequired} onChange={(e) => setFormFieldValues('isRequired', index, e.target.checked)} />
                                {index > 0 &&
                                    <DeleteIcon color='error' style={{ cursor: 'pointer' }} onClick={() => deleteFormField(index)} />
                                }
                            </div>
                        </Card>
                    ))}
                </div>
                <div className={cssClasses.btnWrapper}>
                    <Button name={'Add Form Fields'} onClick={addFormField} />
                    <Button name={'Save Form'} onClick={saveForm} />
                </div>
            </div>
        </div>
    )
}
