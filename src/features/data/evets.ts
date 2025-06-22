import { FileDto } from "./file";
import { PagedListMetaData } from "./page-list-metadata";

export interface EventShortDto {
  id: string;
  title: string | null;
  description: string | null;
  picture: FileDto;
  isTimeFromNeeded: boolean;
  dateTimeFrom: string | null;
  isTimeToNeeded: boolean;
  dateTimeTo: string | null;
  type: EventType;
  format: EventFormat;
  auditory: EventAuditory;
  status: EventStatus;
}

export interface EventDto extends EventShortDto {
  link: string | null;
  addressName: string | null;
  latitude: number | null;
  longitude: number | null;
  isRegistrationRequired: boolean;
  registrationLastDate: string | null;
  isDigestNeeded: boolean;
  notificationText: string | null;
  digestText: string | null;
  author: UserShortDto;
  participants: EventParticipantDto[] | null;
}

export interface EventParticipantDto {
  id: string;
  user: UserShortDto;
  email: string | null;
  name: string | null;
  phone: string | null;
  additionalInfo: string | null;
  participantType: EventParticipantType;
}

export interface UserShortDto {
  id: string;
  lastName: string | null;
  firstName: string | null;
  patronymic: string | null;
  birthDate: string;
  gender: Gender;
  email: string | null;
  avatar: FileDto;
}

export enum Gender {
  NotDefined = "NotDefined",
  Male = "Male",
  Female = "Female",
}

export enum EventType {
  Open = "Open",
  Close = "Close",
}

export enum EventFormat {
  Online = "Online",
  Offline = "Offline",
}

export enum EventAuditory {
  All = "All",
  Students = "Students",
  Employees = "Employees",
}

export enum EventStatus {
  Draft = "Draft",
  Actual = "Actual",
  Finished = "Finished",
  Archive = "Archive",
}

export enum EventParticipantType {
  Inner = "Inner",
  External = "External",
}

export interface EventShortDtoPagedListWithMetadata {
  results: EventShortDto[] | null;
  metaData: PagedListMetaData;
}

export interface EventCreateDto {
  title: string | null;
  description: string | null;
  digestText: string | null;
  pictureId: string | null;
  isTimeFromNeeded: boolean;
  dateTimeFrom: string;
  isTimeToNeeded: boolean;
  dateTimeTo: string | null;
  link: string | null;
  addressName: string | null;
  latitude: number | null;
  longitude: number | null;
  isRegistrationRequired: boolean;
  registrationLastDate: string | null;
  isDigestNeeded: boolean;
  notificationText: string | null;
  type: EventType;
  format: EventFormat;
  auditory: EventAuditory;
}

export interface EventEditDto extends EventCreateDto {
  id: string;
}

export interface EventEditStatusDto {
  id: string;
  newStatus: EventStatus;
}

export interface EventInnerRegisterDto {
  eventId: string;
}

export interface EventExternalRegisterDto {
  eventId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  additionalInfo: string | null;
}
