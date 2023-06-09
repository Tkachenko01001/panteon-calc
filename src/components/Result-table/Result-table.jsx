import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Box } from '@mui/material';
import Row from '../Row/Row';

const ResultTable = ({ totalNumberOfElements, onDelete }) => {

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Ціль</TableCell>
                <TableCell align="center">Вуглеводи&nbsp;(г)</TableCell>
                <TableCell align="center">Білки&nbsp;(г)</TableCell>
                <TableCell align="center">Жири&nbsp;(г)</TableCell>
                <TableCell align="center">Видалення</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalNumberOfElements.map((element) => (
                <Row key={element.total.key} element={element} onDelete={onDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ResultTable;