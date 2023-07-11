import { useEffect } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Grid, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import { Button } from '~/components/common/button';
import { TextInput } from '~/components/common/text-input';
import { PageTitle } from '~/components/page-title';
import usePersonValidation from '~/components/people/person/page-content/validation/usePersonValidation';
import { notify } from '~/helpers/common/notify';
import getNumberDecade from '~/helpers/getNumberDecade';
import usePerson from '~/hooks/people/person';
import { useProgress } from '~/providers/progress-provider';
import { ROUTES } from '~/routes';
import { type Person } from '~/types/person';

const ActionGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginRight: 15,
});

export default function PersonPageContent({ personId }: { personId: number }) {
  const router = useRouter();
  const { mutate, cache } = useSWRConfig();
  const { setProgressIsShownHandler } = useProgress();
  const { person, personIsLoading } = usePerson({ id: personId });
  const { form, resetPersonForm } = usePersonValidation();
  const newPerson = form.watch();
  const firstPersonLoading = personIsLoading && person === undefined;

  const onSaveHandler = form.handleSubmit(async () => {
    setProgressIsShownHandler(true);
    if (person === undefined) return;

    const cachePage = getNumberDecade(personId) + 1;
    const revalidatePath = `${ROUTES.PEOPLE}?page=${cachePage}`;
    const peopleCache = cache.get(revalidatePath);
    if (peopleCache) {
      const foundPersonIndex = peopleCache.data.results.findIndex(
        (item: Person) => item.url === person.url
      );
      peopleCache.data.results[foundPersonIndex] = newPerson;
      notify('success', 'Saved');
    }

    await mutate(`${ROUTES.PEOPLE}/${personId}`, newPerson, {
      optimisticData: true,
      revalidate: false,
    });

    setProgressIsShownHandler(false);
    router.back();
  });

  useEffect(() => {
    if (person) {
      resetPersonForm(person);
      return;
    }
    void mutate(`${ROUTES.PEOPLE}/${personId}`);
  }, [mutate, person, personId, resetPersonForm]);

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        color={'info'}
        onClick={() => {
          void router.push(`/${ROUTES.PEOPLE}`);
        }}
      >
        Back
      </Button>

      <PageTitle title={'Change person'} />

      <Grid container>
        <Grid item sm={4}>
          <TextInput
            fullWidth
            form={form}
            name={'name'}
            isLoading={firstPersonLoading}
          />
          <Box display={'flex'} justifyContent={'space-between'}>
            <TextInput
              fullWidth
              form={form}
              name={'height'}
              type={'number'}
              isLoading={firstPersonLoading}
              isNumber
            />
            <TextInput
              fullWidth
              form={form}
              name={'mass'}
              type={'number'}
              isLoading={firstPersonLoading}
              isNumber
            />
          </Box>

          <TextInput
            fullWidth
            form={form}
            name={'gender'}
            isLoading={firstPersonLoading}
          />
        </Grid>

        <Grid item sm={8}>
          <TextInput
            fullWidth
            form={form}
            name={'eye_color'}
            isLoading={firstPersonLoading}
          />
          <TextInput
            fullWidth
            form={form}
            name={'skin_color'}
            isLoading={firstPersonLoading}
          />

          <TextInput
            fullWidth
            form={form}
            name={'hair_color'}
            isLoading={firstPersonLoading}
          />
        </Grid>
        <Grid container>
          <Grid sm item>
            <TextInput
              fullWidth
              form={form}
              name={'homeworld'}
              isLoading={firstPersonLoading}
            />
            <ActionGroup>
              <Button
                sx={{ mr: 1 }}
                variant={'outlined'}
                color="secondary"
                onClick={() => {
                  if (person) resetPersonForm(person);
                }}
              >
                reset
              </Button>
              <Button
                disabled={!router.isReady}
                color="primary"
                onClick={async () => {
                  await onSaveHandler();
                }}
                variant={'outlined'}
              >
                save
              </Button>
            </ActionGroup>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
