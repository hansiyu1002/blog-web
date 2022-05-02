import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if(token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            })
        }),
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users/signup',
                method: 'POST',
                body: user
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'DELETE'
            })
        }),
        createBlog: builder.mutation({
            query: (blog) => ({
                url: '/blogs/post',
                method: 'POST',
                body: blog
            })
        }),
        // getAllBlogs not used
        getAllBlogs: builder.query({
            query: () => ({
                url: '/blogs/all'
            })
        }),
        getOneBlog: builder.query({
            query: (id) => ({
                url: `/blogs/${id}`
            })
        }),
        getMyBlogs: builder.query({
            query: () => ({
                url: '/blogs/mine'
            })
        }),
    })
});

export default api;

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation , useCreateBlogMutation, useGetAllBlogsQuery, useGetOneBlogQuery, useGetMyBlogsQuery } = api;