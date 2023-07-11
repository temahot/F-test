declare type Nullable<T> = T | null;

declare type ExtractEnums<T> = T extends ReadonlyArray<infer E> ? E : never;
