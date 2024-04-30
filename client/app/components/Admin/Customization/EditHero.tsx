"use client";
import { styles } from "@/app/styles/styles";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <div className="relative flex items-center justify-end">
          <img
            src={image}
            alt=""
            className="object-contain 1100px:max-w-[190%] w-[190%] 1500px:max-w-[185%] h-[auto] z-[10]"
          />
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
            <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
          </label>
        </div>
      </div>
      <div className="1000px:w-[60%] pl-[150px] pr-[50px] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <textarea
          className="px-3 focus:outline-none dark:text-white text-black w-full font-[600] text-[30px] 1000px:text-[60px] 1500px:text-[70px] bg-transparent resize-none"
          rows={4}
          placeholder="Improve Your Online learning Experience Better Instanly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          className="px-3 focus:outline-none dark:text-white text-black w-full font-[600] text-[8px] 1000px:text-[15px] 1500px:text-[20px] bg-transparent resize-none"
          placeholder="Improve Your ONline learning Experience Better Instanly"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <br />
        <br />
        <div
          className={`${
            styles.button
          } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
            ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image !== image
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            }
            !rounded absolute bottom-12 right-12`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image !== image
              ? handleEdit
              : () => null
          }
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditHero;
