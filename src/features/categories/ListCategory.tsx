import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

export function CategoryList() {
  const { data: { data = [] } = {}, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    }
  };

  const rows: GridRowsProp = data.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
  }));


  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
      renderCell: renderNameCell
    },
    {
      field: 'isActive',
      headerName: 'ATIVO',
      type: 'boolean',
      flex: 1,
      renderCell: renderIsActiveCell,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'action',
      flex: 1,
      type: "string",
      renderCell: renderActionCell,
    }
  ];

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar(`Category deleted`, { variant: "warning"});
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar(`Category not deleted`, { variant: "error"});
    }

  }, [deleteCategoryStatus]);

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderActionCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(params.value)}
        arial-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? 'primary' : 'secondary'}>
        {row.value ? 'Ativo' : 'Inativo'}
      </Typography>
    );
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <Box sx={{ display: "flex", height: 600 }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          slotProps={slotProps}
          pageSizeOptions={[25, 2, 100, 400, 22]}
          columns={columns}
          rows={rows}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </Box>
    </Box>
  )
}
