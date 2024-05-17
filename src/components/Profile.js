import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiUser, BiEditAlt } from 'react-icons/bi';

const Profile = () => {
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [initialValues, setInitialValues] = useState({ fullName: '', email: '', address: '', phoneNumber: '' });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (localStorage.getItem("auth-token")) {
                    const config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `${process.env.REACT_APP_HOST_URL}/auth/getUser`,
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                        }
                    };
                    const response = await axios.request(config);
                    const { name, email, address, phoneNumber } = response.data;
                    setFullName(name);
                    setEmail(email)
                    setAddress(address);
                    setPhoneNumber(phoneNumber);
                    setInitialValues({ fullName: name, email, address, phoneNumber });
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    const handleSaveInfo = async () => {
        try {
            const config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST_URL}/auth/updateProfile`,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                data: { name: fullName, email: email, phoneNumber: phoneNumber, address: address }
            };
            const response = await axios.request(config);
            setFullName(response.data.name);
            setEmail(response.data.email)
            setAddress(response.data.address);
            setPhoneNumber(response.data.phoneNumber);
            setInitialValues({ fullName: response.data.name, email:response.data.email, address:response.data.address, phoneNumber:response.data.phoneNumber });
        }

        catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        setFullName(initialValues.fullName);
        setAddress(initialValues.address);
        setPhoneNumber(initialValues.phoneNumber);
        setIsEdit(false)
    }

    return (
        <div className='overflow-x-auto p-9 bg-[#f4f1ea] animate-fade-in '>
            <p className='uppercase font-bold text-2xl md:text-4xl my-14 w-full md:w-1/2 mx-auto flex items-center gap-1'>PROFILE<BiUser className='inline font-bold' /></p>
            <div className='relative flex flex-col md:flex-row gap-10 p-6 py-8 md:py-16 w-full md:w-1/2 mx-auto shadow-md rounded-md bg-white'>

                <button className={`absolute right-8 top-8 px-5 py-2 bg-zinc-200 flex items-center text-[0.7rem] font-semibold text-zinc-800 rounded-md ${isEdit && 'hidden'}`} onClick={() => { setIsEdit(true) }}>
                    <div>EDIT </div><BiEditAlt />
                </button>

                <form className=' flex flex-col gap-5 w-full p-2 rounded-md' onSubmit={handleSaveInfo}>


                    <div className='font-medium text-sm md:text-md text-zinc-700'>USERNAME</div>
                    <input type="text" name="name" id="name" placeholder='FULL NAME' className={` ${isEdit ? 'bg-white' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'} w-full p-2 md:p-3 text-sm md:text-md text-gray-700 border border-gray-300 rounded`} onChange={(e) => { setFullName(e.target.value) }} value={fullName} required disabled={!isEdit} />

                    <div className='font-medium text-sm md:text-md text-zinc-700'>EMAIL</div>
                    <input type="email" name="email" id="email" placeholder='EMAIL' className={` ${isEdit ? 'bg-white' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'} w-full p-2 md:p-3 text-sm md:text-md text-gray-700 border border-gray-300 rounded`} onChange={(e) => { setEmail(e.target.value) }} value={email} required disabled={!isEdit} />

                    <div className='font-medium text-sm md:text-md text-zinc-700'>MOBILE NUMBER</div>
                    <input type="tel" name="number" id="number" placeholder='PHONE NUMBER' className={` ${isEdit ? 'bg-white' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'} w-full p-2 md:p-3 text-sm md:text-md text-gray-700 border border-gray-300 rounded`} pattern="[7-9]{1}[0-9]{9}" minLength="10" maxLength="10" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required disabled={!isEdit} />

                    <div className='font-medium text-sm md:text-md text-zinc-700'>ADDRESS</div>
                    <input type="text" name="address" id="address" placeholder='DELIVERY ADDRESS' className={` ${isEdit ? 'bg-white' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'} w-full p-2 md:p-3 text-sm md:text-md text-gray-700 border border-gray-300 rounded`} onChange={(e) => { setAddress(e.target.value) }} value={address} required disabled={!isEdit} />

                    <div className={`mt-6 ${isEdit ? 'block' : 'hidden'} text-right`}>
                        <button type='button' className="uppercase font-semibold w-fit my-2 py-3 px-10 text-sm text-zinc-700 rounded-sm" onClick={handleCancel}>CANCEL</button>
                        <button type="submit" className="uppercase font-semibold w-fit my-2 py-3 px-10 text-sm bg-green-600 text-white hover:bg-red-600 rounded-sm">SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
