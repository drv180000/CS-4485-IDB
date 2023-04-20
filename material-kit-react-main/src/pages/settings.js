import Head from 'next/head';
import { Box, Container, Stack, TextField, Typography, Button } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => (
  <>
    <Head>
      <title>
        Discussion Posts | IDB
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Discussion Posts
          </Typography>

          <TextField id="outlined-multiline-flexible" label="Comment" multiline maxRows={4} />
          
          <Box>
            <Button variant='contained' size='small' onClick={() => {console.log('clicked'); }}>Submit</Button>
          </Box>

          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
