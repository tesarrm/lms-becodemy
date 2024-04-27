import EditCourse from "@/app/components/Admin/Course/EditCourse";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/sidebar/DashboardHero";
import Heading from "@/app/utils/Heading";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="LMS - Admin"
        description="LMS is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-min-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          {/* <AllUsers isTeam={false} /> */}
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
