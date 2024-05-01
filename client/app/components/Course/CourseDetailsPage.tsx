"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import React, { useState } from "react";
import Loader from "../Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Footer from "../Footer";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  // console.log(data);
  // console.log(id)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        // <></>
        <div>
          <Heading
            title={data.course.name + " - ELearning"}
            description="LMS is a platform for students to learn and get help from teachers"
            keywords={data.course.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <CourseDetails data={data?.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
