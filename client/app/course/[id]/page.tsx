import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;
  return <CourseDetailsPage id={id} />;
};

export default page;
