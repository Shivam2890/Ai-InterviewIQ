import React, { useContext, useState } from 'react'
import { UserProvider } from './ContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { api } from '../apis/interceptors.js';

const UpdateProfileForm = () => {
    const { userDetails } = useContext(UserProvider)
    const [user, setUser] = useState(userDetails)

    function updateForm(value, keyName) {
        const newDetails = { ...user }
        newDetails[keyName] = value
        setUser(newDetails)
    }

    async function updateProfile(e) {
        e.preventDefault()
        //compare previous userDetails to new data (user)
        const updateRecords = {}

        for (let key in userDetails) {
            if (userDetails[key] !== user[key]) updateRecords[key] = user[key]
        }

        try {
            // const update = await axios.patch(`http://localhost:4000/user/updateProfile`, updateRecords, {
            //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            // })
            const update = await api.patch('/user/updatedProfile', updateRecords)
            console.log(update)
        } catch (err) {
            console.log(err.message)

            toast.error(err.message)
        }
    }
    console.log(user)
    return (
        <main className="bg-[#050507] min-h-screen">
            <form className="space-y-5 w-full" onSubmit={updateProfile}>

                {/* Full Name */}
                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Full Name
                    </label>

                    <input
                        type="text"
                        required
                        name="name"
                        value={user.name}
                        onChange={(e) => updateForm(e.target.value, e.target.name)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                </div>

                {/* Email */}

                {/* Age + Phone */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Dob
                        </label>

                        <input
                            type="date"
                            name="dob"
                            value={user.dob}
                            onChange={(e) => updateForm(e.target.value, e.target.name)}

                            placeholder="22"
                            className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={(e) => updateForm(e.target.value, e.target.name)}
                            placeholder="9876543210"
                            className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-bold tracking-wide text-white transition hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]"
                    value="Submit"
                >
                    Update Details
                </button>

            </form>
        </main>
    );
}

export default UpdateProfileForm