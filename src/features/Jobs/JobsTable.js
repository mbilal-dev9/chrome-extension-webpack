import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from '@mui/material';
import NewJobs from '../../../src/assets/svgs/components/new-jobs';
import { SCORE_TITLE } from '../../utils/constants';

const JobsTable = ({ items, handleRequest }) => {

  const [openTooltip, setOpenTooltip] = useState(null);

  const handleTooltipClose = () => {
    setOpenTooltip(null);
  };
  
  const manageColor = (value) => {
    if (value >= 2 && value < 3) {
      return '#91E19D !important';
    } else if (value >= 3 && value < 4) {
      return '#5FD671 !important';
    } else if (value >= 4 && value <= 5) {
      return '#2DCB44 !important';
    } else {
      return '#F7D8D8 !important';
    }
  };
  return (
    <Grid sx={{padding:'0 60px'}}>
      <Typography
        variant="h1"
        sx={{ fontSize: '30px', fontWeight: '700', lineHeight: '23px' }}
      >
        Jobs
      </Typography>
      <Grid
        sx={{
          border: '1px solid #C6C6C6',
          borderRadius: '12px',
          marginTop: '27px',
        }}
      >
        <Table
          className="table"
          aria-label="simple table"
          sx={(theme) => ({
            margin: 0,
            borderRadius: '12px',
            '.border-color': {
              borderColor: theme.palette.tableColor.light,
            },
          })}
        >
          <TableHead
            className="table-header"
            sx={(theme) => ({ display: 'flex', flexDirection: 'column' })}
          >
            <TableRow
              className="header-row"
              sx={(theme) => ({
                display: 'flex',
                '.MuiTableCell-head': {
                  border: 0,
                  overflow: 'hidden',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '24px',
                  padding: '16px 8px',
                  borderBottom:'1px solid',
                  borderColor: theme.palette.tableColor.light,

                },
                '.padding': {
                  padding: '16px 13px !important',
                },
                '.bgColorSecondary': {
                  backgroundColor: theme.palette.JobsTableColor.secondary,
                },
              })}
            >
              <TableCell
                className="header-column border-color w-58"
                sx={{ 
                  borderRadius: '12px 0 0',
                  padding:'16px 22px 16px 25px !important',
                }}
              >
                <Typography 
                  sx={{
                    display:'flex', 
                    paddingLeft:'22px !important', 
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}>
                  Title
                </Typography>
              </TableCell>
              <TableCell className="header-column border-color w-7 text-center" sx={{cursor: 'pointer'}}>
                <Tooltip title={SCORE_TITLE} arrow>
                  Customer Score
                </Tooltip>         
              </TableCell>
              <TableCell className="header-column border-color w-7 text-center" sx={{cursor: 'pointer'}}>
                <Tooltip title={SCORE_TITLE} arrow>
                  Location Score
                </Tooltip>
              </TableCell>
              <TableCell className="header-column border-color w-7 text-center bgColorSecondary">
                Hire Rate
              </TableCell>
              <TableCell className="header-column border-color w-7 text-center bgColorSecondary">
                Feedback Score
              </TableCell>
              <TableCell className="header-column border-color w-7 text-center bgColorSecondary">
                Amount Spent
              </TableCell>
              <TableCell className="header-column border-color w-7 text-center bgColorSecondary padding">
                Payment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            onScroll={handleTooltipClose}
            className="table-body"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              height: 'calc(100vh - 320px)',
              borderRadius: '12px',
              '::-webkit-scrollbar': {
                width: '6px',
              },
              '::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '12px',
              },

              '::-webkit-scrollbar-thumb': {
                borderRadius: '12px',
                background: '#C6C6C6',
              },
            }}
          >
            {items?.map((job, index) => (
              <TableRow
                className="body-row"
                sx={(theme) => ({
                  display: 'flex',
                  '.MuiTableCell-body': {
                    padding: '16px 8px',
                    overflow: 'hidden',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    backgroundColor: 'none',
                  },
                  '.padding': {
                    padding: '16px 13px !important',
                  },
                  '.bgColorSecondary': {
                    backgroundColor: theme.palette.JobsTableColor.secondary,
                  },
                  '.bgColorExtraLight': {
                    backgroundColor: theme.palette.JobsTableColor.extraLight,
                  },
                  '.bgColorLight': {
                    backgroundColor: theme.palette.JobsTableColor.light,
                  },
                  '.bgColormain': {
                    backgroundColor: theme.palette.JobsTableColor.main,
                  },
                  '.bgColordark': {
                    backgroundColor: theme.palette.JobsTableColor.dark,
                  },
                  '.bgColordanger': {
                    backgroundColor: theme.palette.JobsTableColor.danger,
                  },
                })}
              >
                <TableCell
                  className="body-column border-color w-58"
                  sx={{ 
                    display: 'flex',
                    padding:'16px 22px 16px 25px !important',
                  }}
                >
                  <Grid sx={{ marginRight: '15px', minWidth: '7px' }}>
                    {!job?.isRead && <NewJobs />}
                  </Grid>
                  {job?.title.length > 25 ? (
                    <Tooltip title={job?.title} arrow  open={openTooltip === index}
                    onClose={handleTooltipClose}
                    onOpen={() => setOpenTooltip(index)}>
                      <Typography
                        onClick={() => handleRequest(job?.ciphertext)}
                        sx={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                      >
                        {job?.title}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      onClick={() => handleRequest(job?.ciphertext)}
                      sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      {job?.title}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  className={`body-column border-color w-7 text-center `}
                  sx={{
                    backgroundColor: `${manageColor(job?.customer_score)}`,
                  }}
                >
                  {job?.customer_score}
                </TableCell>
                <TableCell
                  className="body-column border-color w-7 text-center"
                  sx={{
                    backgroundColor: `${manageColor(job?.location_score)}`,
                  }}
                >
                  {job?.location_score}
                </TableCell>
                <TableCell className="body-column border-color w-7 text-center bgColorSecondary">
                  -
                </TableCell>
                <TableCell className="body-column border-color w-7 text-center bgColorSecondary">
                  -
                </TableCell>
                <TableCell className="body-column border-color w-7 text-center bgColorSecondary">
                  -
                </TableCell>
                <TableCell className="body-column border-color w-7 text-center bgColorSecondary padding">
                  -
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default JobsTable;
