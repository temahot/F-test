import axios, { type AxiosResponse, type RawAxiosRequestHeaders } from 'axios';

import { type UsePaginationReturn } from '~/hooks/usePagination';
import { ROUTES } from '~/routes';
import { type Person, type PersonPaginatedResponse } from '~/types/person';

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

const HEADERS = {
  [METHOD.POST]: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  [METHOD.GET]: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  [METHOD.DELETE]: {},
  [METHOD.PUT]: {},
  [METHOD.PATCH]: {
    'X-Requested-With': 'XMLHttpRequest',
  },
};
interface PerformRequestProps<DataType> {
  method: METHOD;
  path: string;
  data?: DataType;
  isFile?: boolean;
}

export default function useNetwork() {
  function buildUrl(path: ROUTES | string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (baseUrl === undefined) {
      throw new Error('BASE_URL is empty!');
    }
    return `${baseUrl}/${path}`;
  }

  async function performRequest<DataType, ResponseType>({
    method,
    path,
    data,
  }: PerformRequestProps<DataType>): Promise<AxiosResponse<ResponseType>> {
    const headers: RawAxiosRequestHeaders = {
      ...HEADERS[method],
    };

    try {
      return await axios({
        url: buildUrl(path),
        method,
        data,
        headers,
      });
    } catch (error: unknown) {
      const isAxiosError = axios.isAxiosError(error);
      if (isAxiosError) {
        // eslint-disable-next-line no-console
        console.error(error.response?.data.data ?? error.message);
      }
      throw error;
    }
  }
  const api = {
    people: {
      fetchPeopleById: async ({
        id,
      }: {
        id: number | string;
      }): Promise<AxiosResponse<Person>> =>
        await performRequest({
          method: METHOD.GET,
          path: `${ROUTES.PEOPLE}/${id}`,
        }),
      fetchAllPeople: async (
        paginatedPath: UsePaginationReturn['path']
      ): Promise<AxiosResponse<PersonPaginatedResponse>> =>
        await performRequest({
          method: METHOD.GET,
          path: paginatedPath,
        }),
    },
  };
  return {
    api,
  };
}
