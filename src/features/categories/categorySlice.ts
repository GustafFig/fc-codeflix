import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Result, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: () => `${endpointUrl}`,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: (category: Category) => ({
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
})

export const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      // TODO: E se não achar o index??
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      // TODO: E se não achar o index??
      const index = state.findIndex(
        (category) => category.id === action.payload
      );
      state.splice(index, 1);
    },
  },
});

// Selectors

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return (
    category ?? {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: null,
      created_at: "",
      updated_at: "",
    }
  );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export const { useGetCategoriesQuery, useDeleteCategoryMutation } = categoriesApiSlice;
