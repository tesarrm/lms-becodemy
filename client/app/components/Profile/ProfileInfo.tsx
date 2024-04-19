import Image from "next/image"
import { styles } from "@/app/styles/styles"
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from "react-icons/ai"
import avatarIcon from "../../../public/assets/avatar.jpg"
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"

type Props = {
    avatar: string | null;
    user: any
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name)
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
    const [loadUser, setLoaduser] = useState(false)
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })

    const imageHandler = async (e: any) => {
        const fileReader = new FileReader()

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result
                updateAvatar(
                    avatar
                )
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (isSuccess) {
            setLoaduser(true)
        }
        if (error) {
            console.log(error)
        }
    }, [isSuccess, error])

    const handleSubmit = async (e: any) => {
        console.log("submit")
    }

    return (
        <>
            <div
                className="w-full flex justify-center"
            >
                <div className="relative">
                    <Image
                        width={120}
                        height={120}
                        src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
                        alt=""
                        className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
                    />
                    <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png, image/jpg, image/jgep, image/webp"
                    />
                    <label htmlFor="avatar">
                        <div
                            className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer"
                        >
                            <AiOutlineCamera size={20} className="z-1" />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div
                className="w-full pl-6 800px:pl-10"
            >
                <form onSubmit={handleSubmit}>
                    <div className="w-[100%]">
                        <label htmlFor="" className="block pb-2">Full Name</label>
                        <input type="text"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-[100%] pt-2">
                        <label htmlFor="" className="block pb-2">Full Address</label>
                        <input
                            type="text"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            readOnly
                            value={user?.email}
                            required
                        />
                    </div>
                    <input type="submit"
                        className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                        required
                        value="Update"
                    />
                </form>
                <br />
            </div>
        </>
    )
}

export default ProfileInfo