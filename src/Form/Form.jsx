import React, { useEffect, useState } from 'react'
import cssClasses from './Form.module.css'
import { Card } from '@mui/material'
import TextInput from '../SubComponents/TextInput/TextInput'
import DropDown from '../SubComponents/DropDown/DropDown'
import Radio from '../SubComponents/Radio/CustomRadio'
import CustomButton from '../SubComponents/Button/CustomButton'
import { useSelector } from 'react-redux'

export default function Form() {
    let Form = useSelector((state) => state.form.value)
    const [formValues, setFormValues] = useState()
    // const Form = [
    //     {
    //         "label": "Gender",
    //         "type": "Dropdown",
    //         "options": [
    //             "Male",
    //             "Female"
    //         ],
    //         "isRequired": true,
    //         "error": false,
    //         "id": "dd39ccb8-efde-4357-9eef-e4ecbefd4761"
    //     },
    //     {
    //         "label": "Name",
    //         "type": "Text",
    //         "options": [],
    //         "isRequired": true,
    //         "error": false,
    //         "id": "9aaeb5b4-acb6-443f-82bd-440b397b026f"
    //     },
    //     {
    //         "label": "Upload Photo",
    //         "type": "File Upload",
    //         "fileType": "document",
    //         "size": 1,
    //         "options": [],
    //         "isRequired": true,
    //         "error": false,
    //         "id": "9aaeb123-acb6-443f-82bd-440b397b026f"
    //     },
    //     {
    //         "label": "Education",
    //         "type": "Multiple Choice",
    //         "options": [
    //             "SSC",
    //             "HSC"
    //         ],
    //         "isRequired": true,
    //         "error": false,
    //         "id": "c9270c46-f78e-43b7-8174-3c27cec52a9b"
    //     }
    // ]

    const fileTypes = {
        'image': 'image/*',
        'pdf': 'application/pdf',
        'document': '.doc,.docx'
    }

    useEffect(() => {
        console.log(Form)
        let obj = {}
        for (const ele of Form) {
            obj[ele.label] = ''
        }
        setFormValues(obj)
    }, [])

    useEffect(() => {
        console.log(formValues)
    }, [formValues])

    function updateForm(key, value) {
        console.log(value)
        setFormValues((preFormValues) => {
            preFormValues[key] = value
            return { ...preFormValues }
        })
    }

    function validateForm() {
        for (const ele of Form) {
            if (ele.isRequired && formValues[ele.label] === '') {
                alert("Please fill all required fields")
                return false
            }
            if (ele.size && formValues[ele.label].size / 1024000 > ele.size) {
                alert(`File size should be less than ${ele.size} Mb`)
                return false
            }
        }
        return true
    }

    function saveForm() {
        let flag = validateForm()
        if (flag) {
            alert('Form filled successfully')
        }
    }

    return (
        <div className={cssClasses.container}>
            {formValues && Object.keys(formValues).length > 0 ?
                < Card className={cssClasses.formWrapper}>
                    {Form.map((m) => (
                        <div key={m.id}>
                            {m.type === 'Text' &&
                                <TextInput value={formValues[m.label]} label={m.label} required={m.isRequired} setInputValue={(e) => { updateForm(m.label, e.target.value) }} />
                            }
                            {m.type === 'Dropdown' &&
                                <DropDown required={m.isRequired} list={m.options} label={m.label} value={formValues[m.label]} handleChange={(e) => updateForm(m.label, e.target.value)} />
                            }
                            {m.type === 'Multiple Choice' &&
                                <Radio required={m.isRequired} value={formValues[m.label]} handleChange={(e) => updateForm(m.label, e.target.value)} options={m.options} />
                            }
                            {m.type === 'File Upload' &&
                                <div style={{ margin: '1rem' }}>
                                    <p>{m.label}</p>
                                    <input accept={fileTypes[m.fileType]} type="file" onChange={(e) => updateForm(m.label, e.target.files[0])} />
                                </div>
                            }
                        </div>
                    ))
                    }
                    <div className={cssClasses.btnWrapper}>
                        <CustomButton name='Save' onClick={saveForm} />
                    </div>
                </Card>
                :
                <p>Please build a form to preview</p>
            }
        </div >
    )
}
