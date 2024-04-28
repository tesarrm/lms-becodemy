
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: "get-courses-analytics"
                , method: "GET"
                , credentials: "include" as const
            })
        }),
        getUserAnalytics: builder.query({
            query: () => ({
                url: "get-users-analytics"
                , method: "GET"
                , credentials: "include" as const
            })
        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "get-orders-analytics"
                , method: "GET"
                , credentials: "include" as const
            })
        }),
    })
})

export const {
    useGetCoursesAnalyticsQuery,
    useGetUserAnalyticsQuery,
    useGetOrdersAnalyticsQuery
} = courseApi