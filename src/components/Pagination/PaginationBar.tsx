import { Stack, Pagination, PaginationItem } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react'

const PaginationBar: React.FC<{ setPage: Function, pageLength: number }> = ({ setPage, pageLength }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageLength}
        onChange={handleChange}  
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  )
}

export default PaginationBar