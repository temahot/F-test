import React, { ReactElement } from 'react';

import {
  Paper,
  Table as MuiTable,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';

import { TableBody } from '~/components/common/table/body';
import { TableHead } from '~/components/common/table/head';
import { type TableProps } from '~/components/common/table/types';

export const Table = ({
  data,
  headers,
  pagination,
  itemsAmount,
  isLoading,
}: TableProps): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead headers={headers} />
        <TableBody data={data} isLoading={isLoading} headers={headers}>
          {pagination && itemsAmount && data.length !== 0 ? (
            <TableRow>
              <TablePagination
                count={-1}
                page={pagination.page}
                onPageChange={(_, p) => {
                  pagination.setPage(p);
                }}
                nextIconButtonProps={{
                  disabled:
                    itemsAmount <=
                    pagination.page * pagination.rowsPerPage +
                      pagination.rowsPerPage,
                }}
                backIconButtonProps={{
                  disabled: pagination.page === 1,
                }}
                rowsPerPage={pagination.rowsPerPage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          ) : null}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
