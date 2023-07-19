import React, { type PropsWithChildren, ReactElement } from 'react';

import {
  Skeleton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { type TableProps } from '~/components/common/table/types';

interface TableBodyProps extends PropsWithChildren, TableProps {}

type TableRowProps = TableBodyProps['data'][number];

export const TableBody = ({
  data,
  isLoading,
  headers,
  children,
}: TableBodyProps): ReactElement => {
  const FAKE_TABLE_ROWS = 10;

  const beautifyRow = (row: TableRowProps) => {
    const key = row.id;
    return (
      <TableRow key={key} hover>
        {Object.values(row).map((rowValue, i) => (
          <TableCell key={rowValue + i} align={'center'}>
            {rowValue}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  if (isLoading) {
    return (
      <MuiTableBody>
        {Array.from({ length: FAKE_TABLE_ROWS }, (_, index) => (
          <TableRow key={index}>
            {headers.map((_, i) => (
              <TableCell key={i} align={'center'}>
                <Typography variant="body1">
                  <Skeleton />
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <Typography variant="body2">ㅤ</Typography>
          </TableCell>
        </TableRow>
      </MuiTableBody>
    );
  }

  return (
    <MuiTableBody>
      {data.length === 0 ? (
        <TableRow>
          <TableCell>No data provided.</TableCell>
        </TableRow>
      ) : (
        data.map(beautifyRow)
      )}
      {children}
    </MuiTableBody>
  );
};
