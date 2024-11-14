import React, { useContext } from 'react'

import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import {  HiChartPie, HiHome, HiInbox, HiOutlineCloudUpload, HiTable, HiViewBoards } from 'react-icons/hi';

import { AuthContext } from '../../../context/AuthProvider';


export const SideBar = () => {

    const {user} = useContext(AuthContext);
    // console.log(user);

  return (
    <div>
        <Sidebar aria-label="Sidebar with content separator example" className='w-full'>
            <Sidebar.Logo href="#" img={user?.photoURL} imgAlt="user img">
                {
                    user ? (<p>{user?.displayName}</p>) : <p>User Name</p>
                }
            </Sidebar.Logo>
            <Sidebar.Items className='flex md:flex-col justify-around'>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiHome}>
                        Home
                    </Sidebar.Item>
                    {/* <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item> */}
                    <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
                        Upload Book
                    </Sidebar.Item>
                    <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
                        Manage books
                    </Sidebar.Item>
                    <Sidebar.Item href="/log-out" icon={HiTable}>
                        Log out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Upgrade to Pro
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        Documentation
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    </div>
  )
}
