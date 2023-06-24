import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Category, createCategory } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useAppDispatch } from '../../app/hooks';

export function CategoryCreate() {
  const [isdisabled, setIsdisable] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(categoryState));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState((catSt) => ({ ...catSt, [name]: value }));
  };
  const handleToogle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState((catSt) => ({ ...catSt, [name]: checked }));
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Category Create</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isdisabled={isdisabled}
          handleChange={handleChange}
          isLoading={false}
          handleToogle={handleToogle}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  )
}
