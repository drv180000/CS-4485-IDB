import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { getTime, subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, TextField, Table, TableBody, TableRow, TableContainer, TableCell, Input } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();
let time = now.toString();

function createData(name, time, text){
  return {name, time, text};
}

 const questionData = [
 createData()
 ];

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    prof: 'Sridhar Alagar',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    classNum: 'CS 4485.0W1',
    name: 'Computer Science Project',
    phone: '304-428-3097'
  }

];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [value, setValue] = useState('');
  const handleTextChange = e => {
    console.log(`Typed => ${e.target.value}`);
    setValue(e.target.value);
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Classes | IDB
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Classes
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
               
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            
            <TableContainer>
              <Table >
                <TableRow>
                  
                </TableRow>
                <TableBody>
                  <Box sx={{bgcolor:'#ebebeb', height:'fluid'}}>
                    {questionData.map((row) => (
                    <TableRow key={row.datePosted}>
                      <Container>
                        <Typography variant='h6'>{row.name}</Typography>
                      </Container>
                      <Container>
                        <Typography variant='caption'>{row.time}</Typography>
                      </Container>
                      <Container>
                        <Typography variant='body1'>{row.text}</Typography>
                      </Container>
                    </TableRow>
                    ))}
                  </Box>
                  <TableRow>
                    <Container>
                      
                    </Container>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
