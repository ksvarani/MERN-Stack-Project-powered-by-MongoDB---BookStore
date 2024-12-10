import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader1 from '../components/Loader/Loader1';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:2004/api/v1/User-Info',{headers});
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-stone-950 text-white px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4'>
      {!Profile && <div className='w-full h-[100vh] flex items-center justify-center'><Loader1 /></div>}
      {Profile && (
        <>
          <div className='w-full md:w-1/6 h-auto lg:h-screen'>
            <Sidebar data={Profile}/>
            <MobileNav />
          </div>
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;