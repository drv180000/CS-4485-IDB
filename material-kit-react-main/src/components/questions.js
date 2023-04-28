// import React from "react";
// import { Header } from "@mui/material/styles";
// import { Button, Link, List, ListItem, TextField } from '@mui/material';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const Questions = ({ questions }) => {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            {questions.map(question => {
                return (
                    <div>
                        <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >

                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={question.entry} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary={question.answer} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                    </div>
                )
            })}
        </>
    );
};

// export const Questions = ({ questions }) => {

    // const [open, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

//     return (
//                     <List
//                         sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//                         component="nav"
//                         aria-labelledby="nested-list-subheader"
//                         subheader={
//                             <ListSubheader component="div" id="nested-list-subheader">
//                                 Questions
//                             </ListSubheader>
//                         }
//                     >

//                         <ListItemButton onClick={handleClick}>
//                             <ListItemIcon>
//                                 <InboxIcon />
//                             </ListItemIcon>
//                             <ListItemText primary={questions.entry} />
//                             {open ? <ExpandLess /> : <ExpandMore />}
//                         </ListItemButton>
//                         <Collapse in={open} timeout="auto" unmountOnExit>
//                             <List component="div" disablePadding>
//                                 <ListItemButton sx={{ pl: 4 }}>
//                                     <ListItemIcon>
//                                         <StarBorder />
//                                     </ListItemIcon>
//                                     <ListItemText primary="Starred" />
//                                 </ListItemButton>
//                             </List>
//                         </Collapse>
//                     </List>
//                 )
//             }}
//         </>
//     );
// };