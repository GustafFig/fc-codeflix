import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

const category: Category = {
  id: "8a77241b-5b14-4c61-a0d5-54ac9d993a2c",
  name: "BlueViolet",
  description: "LOEREM IPSUM",
  is_active: true,
  deleted_at: null,
  created_at: "2023-06-20T21:51:23+0000",
  updated_at: "2023-06-20T21:51:23+0000",
};

export const initialState = [
  category,
  { ...category, id: "108475ef-7584-4aa6-8af3-059fb81bef73", name: "Peach" },
  { ...category, id: "208475ef-7584-4aa6-8af3-059fb81bef73", name: "Apple" },
  { ...category, id: "308475ef-7584-4aa6-8af3-059fb81bef73", name: "Banana" },
];

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
