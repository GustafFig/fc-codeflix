import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, selectCategoryById, updateCategory } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export function CategoryEdit() {
  const id = useParams().id ?? "";
  const [isdisabled, setIsdisable] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));
  const [categoryState, setCategoryState] = useState<Category>(category);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCategory(categoryState));
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
            <Typography variant='h4'>CategoryEdit</Typography>
          </Box>
        </Box>


        <CategoryForm
          category={categoryState}
          handleChange={handleChange}
          handleToogle={handleToogle}
          isdisabled={isdisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  )
}
