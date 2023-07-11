import React from 'react';

import { PageTitle } from '~/components/page-title';
import { PeopleTable } from '~/components/people/people-table';

export default function People() {
  return (
    <>
      <PageTitle title={'People'} />
      <PeopleTable />
    </>
  );
}
