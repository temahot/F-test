import React from 'react';

import { TableCell, TableHead as MuiTableHead, TableRow } from '@mui/material';

import { type TableProps } from '~/components/common/table/types';
import { COLORS } from '~/styles/colors';

interface TableHeadProps extends Pick<TableProps, 'headers'> {}

export const TableHead = ({ headers }: TableHeadProps): JSX.Element => {
  return (
    <MuiTableHead sx={{ background: COLORS.GREY }}>
      <TableRow hover>
        {headers.map((header) => (
          <TableCell key={header} align={'center'}>
            {header}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};
