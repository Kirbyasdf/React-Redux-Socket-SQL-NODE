import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";
import { RootState } from "../redux/store";

const { REACT_APP_BASE_URL } = process.env;

const baseQuery = fetchBaseQuery({
	baseUrl: REACT_APP_BASE_URL,
	prepareHeaders: (headers) => {
		const token = RootState().auth?.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const api = createApi({
	reducerPath: "authQuery",
	baseQuery,
	entityTypes: ["Auth"],
	endpoints: (builder) => ({
		authenticate: builder.query({
			query: () => `/auth`,
			provides: ["Auth"],
		}),
		login: builder.mutation({
			query: (form) => ({
				url: "auth/login",
				method: "POST",
				body: form,
			}),
			invalidates: ["Auth"],
		}),
		register: builder.mutation({
			query: (form) => ({
				url: "auth/register",
				method: "POST",
				body: form,
			}),
			invalidates: ["Auth"],
		}),
	}),
});

export const { useAuthenticateQuery, useLoginMutation, useRegisterMutation } = api;

export const {
	endpoints: { login },
} = api;
