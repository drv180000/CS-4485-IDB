import Head from 'next/head';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Stack, Typography, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = (props) => {
    const router = useRouter();
    const { classes } = props;
    const [entry, setEntry] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        console.log( 'entry:', entry); 
        const response = await fetch("http://127.0.0.1:5000/questions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entry)
        })
        if(response.ok) {
            console.log('response worked')
            router.push('/');
        }
    }
    return (
    <>
        <Head>
            <title>
                Post Question | IDB
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            value={entry}
                            id="standard-multiline-static"
                            label="Enter Question"
                            fullWidth
                            multiline
                            rows={4}
                            onInput={e => setEntry(e.target.value)}
                        />
                        <br></br>
                        <button type='submit'>
                            Submit
                        </button>
                    </form>

                </Stack>
            </Container>
        </Box>
    </>
)};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
