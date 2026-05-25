import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        age: 0,
        phone: "",
        password: "",
        confirmPassword: ""
    })
    function updateFormData(e) {
        const { name, value } = e.target

        const updateFormValues = { ...formValues }
        updateFormValues[name] = value

        if (name == "phone" && value.length > 10) {
            console.log('wronf number format')
            return
        }

        setFormValues(updateFormValues)
    }
    async function signUp(e) {
        e.preventDefault()
        if (formValues.password !== formValues.confirmPassword) {
            toast('🦄 Password does not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });
            return
        }
        const data = await axios.post('http://localhost:4000/auth/signup')
        console.log(data, 'data form signup')
    }
    console.log(formValues, 'form vlaue')
    return (
        <div className='h-screen flex justify-center items-center'>
            <form className='flex gap-3 flex-col' onSubmit={signUp}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input className='border' type="text" value={formValues.name} name="name" id="name" onChange={updateFormData} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className='border' type="text" value={formValues.email} name="email" id="email" onChange={updateFormData} />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input className='border' type="number" value={formValues.age} name="age" id="age" onChange={updateFormData} />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input className='border' type="text" value={formValues.phone} name="phone" id="phone" onChange={updateFormData} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className='border' type="password" value={formValues.password} name="password" id="password" onChange={updateFormData} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className='border' type="password" value={formValues.confirmPassword} name="confirmPassword" id="confirmPassword" onChange={updateFormData} />
                </div>

                <div>
                    <input type="submit" value='Submit' />
                </div>
            </form>
        </div>
    )
}

export default Signup