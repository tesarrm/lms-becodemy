import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/sidebar/DashboardHeader'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading title="LMS - Admin"
                description='LMS is a platform for students to learn and get help from teachers'
                keywords='Programming, MERN, Redux, Machine Learning'
            />
            <div className="flex">
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <CreateCourse />
                </div>
            </div>
        </div>
    )
}

export default page