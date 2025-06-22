import { PagedListMetaData } from "./page-list-metadata";

import { FileDto } from "./file";

export interface UsefulServiceDto {
  id: string;
  category: UsefulServiceCategory;
  title: string | null;
  description: string | null;
  link: string | null;
  termsOfDisctribution: string | null;
  logo: FileDto;
}

export interface UsefulServiceEditCreateDto {
  category: UsefulServiceCategory;
  title: string | null;
  description: string | null;
  link: string | null;
  termsOfDisctribution: string | null;
  logoId: string | null;
}

export interface UsefulServiceDtoPagedListWithMetadata {
  results: UsefulServiceDto[] | null;
  metaData: PagedListMetaData;
}

export enum UsefulServiceCategory {
  ForAll = "ForAll",
  Students = "Students",
  Employees = "Employees",
}