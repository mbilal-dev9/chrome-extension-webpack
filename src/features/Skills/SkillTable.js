import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SvgEditSvg from '../../../src/assets/svgs/components/edit-svg';
import SvgDeleteIcon from '../../../src/assets/svgs/components/delete-icon';
import { Grid, Typography } from '@mui/material';

export default function SkillTable({ skillList, handleEdit, handleDelete }) {
  return (
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
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            padding: '0 22px 0 16px',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '24px',
          })}
        >
          <TableRow
            className="header-row"
            sx={{
              display: 'flex',
              '.MuiTableCell-head': {
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '24px',
              },
            }}
          >
            <TableCell className="header-column w-30 cell-padding border-color">
              Skills
            </TableCell>
            <TableCell className="header-column w-45 cell-padding border-color">
              Expertise
            </TableCell>
            <TableCell
              className="header-column w-25 border-color"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px 55px 17px',
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          className="table-body"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 16px',
            overflow: 'auto',
            height: 'calc(100vh - 320px)',
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
          {skillList?.map((row, index) => (
            <TableRow
              className="body-row"
              key={index}
              sx={{
                display: 'flex',
                '.MuiTableCell-body': {
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                },
              }}
            >
              <TableCell
                className="body-column w-30 cell-padding border-color"
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell className="body-column w-45 cell-padding border-color expertise-column">
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '342px',
                    overflow: 'hidden',
                  }}
                >
                  {row.expertise}
                </Typography>
              </TableCell>
              <TableCell
                className="body-column w-25 border-color"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4.5px',
                  cursor: 'pointer',
                  padding: '15px 55px 17px',
                }}
              >
                <SvgEditSvg onClick={() => handleEdit(row)} />
                <SvgDeleteIcon onClick={() => handleDelete(row?.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}
