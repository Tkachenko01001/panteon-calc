import React, { useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import shortid from 'shortid';

const Row = ({ element, onDelete }) => {

    const [open, setOpen] = useState(false);
    
    const handleDelete = () => {
    onDelete(element.total.key);
    };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {element.total.target}
        </TableCell>
        <TableCell align="center">{element.total.carbohydrates}</TableCell>
        <TableCell align="center">{element.total.protein}</TableCell>
        <TableCell align="center">{element.total.fats}</TableCell>
        <TableCell align="center">
        <IconButton
          onClick={handleDelete}
          aria-label="delete"
          color="error"
          sx={{
            '&:hover': {
              color: 'red',
            },
            '&:active': {
              transform: 'scale(0.8)',
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Кількість елементів на ону порцію:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Вуглеводи (г)</TableCell>
                    <TableCell align="center">Білки (г)</TableCell>
                    <TableCell align="center">Жири (г)</TableCell>
                    <TableCell align="center">Назва продукту / Кількість в граммах</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {element.oneDose.map((item) => (
                    <TableRow key={shortid.generate()}>
                      <TableCell component="th" scope="row" align="center">
                        {item.oneDoseCarbohydrates}
                      </TableCell>
                      <TableCell align="center">{item.oneDoseProtein}</TableCell>
                      <TableCell align="center">{item.oneDoseFats}</TableCell>
                      <TableCell align="center">
                        {item.name}: {item.oneDoseProduct}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;