import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader1 from '../Loader/Loader1';
import PDButton from '../Buttons/PDButton';

const PersonalDetails = () => {

  const [PersonalDetails, setPersonalDetails] = useState();
  const [Value, setValue] = useState({ address: "" });


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/User-Info", { headers }
      );
      setPersonalDetails(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/update-address",
      Value, { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!PersonalDetails && <div className='w-full h-[100vh] flex items-center justify-center'><Loader1 /></div>}
      {PersonalDetails && (
        <div className='h-[100%] p-0 md:p-4'>
          <h1 className='p-0 ml-4 text-3xl font-serif flex justify-center md:p-4 text-zinc-100'>
            User Account Information
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{PersonalDetails.username}</p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{PersonalDetails.email}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor=''>Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows={5}
              placeholder='Address'
              name='address'
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex items-end justify-end'>
            <PDButton onClick={submitAddress} />
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalDetails;