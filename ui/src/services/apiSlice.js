import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
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
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Blog']
        }),
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Blog']
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
            }),
            invalidatesTags: ['Blog']
        }),
        getOneBlog: builder.query({
            query: (id) => ({
                url: `/blogs/${id}`
            }),
            providesTags: ['Blog']
        }),
        getMyBlogs: builder.query({
            query: () => ({
                url: '/blogs/mine'
            }),
            providesTags: ['Blog']
        }),
        // getAllBlogs not used
        getAllBlogs: builder.query({
            query: () => ({
                url: '/blogs/all'
            }),
            providesTags: ['Blog']
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Blog']
        }),
        updateBlog: builder.mutation({
            query: ({id, title, content}) => ({
                url: `/blogs/${id}`,
                method: 'PATCH',
                body: {title, content}
            }),
            invalidatesTags: ['Blog']
        })
    })
});

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation , useCreateBlogMutation, useGetAllBlogsQuery, useGetOneBlogQuery, useGetMyBlogsQuery, useDeleteBlogMutation, useUpdateBlogMutation } = apiSlice;