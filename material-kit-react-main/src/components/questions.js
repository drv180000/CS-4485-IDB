import React from "react";
import { Header } from "@mui/material/styles";
import { Button, Link, List, ListItem, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Questions = ({ questions }) => {
    return (
        <>
            {questions.map(question => {
                return (
                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography fontWeight={800}>{question.entry}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Input replies from database here
                                </Typography>
                                <br></br>
                                <Button href="/post" value={question} variant="contained">
                                        Reply
                                        </Button>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )
            })}
        </>
    );
};