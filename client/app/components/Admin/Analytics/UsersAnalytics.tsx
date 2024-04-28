"use client";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import Loader from "../../Loader";
import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/styles";

type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
//   { name: "January 2023", count: 440 },
// ];

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading, isError } = useGetUserAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              User Analytitcs
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
