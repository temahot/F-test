export type Person = {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  url: string;
};

export type PersonPaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};
