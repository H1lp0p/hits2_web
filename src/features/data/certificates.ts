import { FileDto } from "./file";

export interface CertificateDto {
  id: string;
  status: CertificateStatus;
  statusEnumDto: EnumDto;
  type: CertificateType;
  staffType: CertificateStaffType;
  typeEnumDto: EnumDto;
  staffTypeEnumDto: EnumDto;
  userType: CertificateUserType;
  userTypeEnumDto: EnumDto;
  certificateFile: FileDto;
  signatureFile: FileDto;
  dateOfForming: string | null;
  receiveType: CertificateReceiveType;
  receiveTypeEnumDto: EnumDto;
}

export interface CertificateCreateDto {
  type: CertificateType;
  staffType: CertificateStaffType;
  userType: CertificateUserType;
  educationEntryId: string | null;
  employeePostId: string | null;
  receiveType: CertificateReceiveType;
}

export interface EnumDto {
  value: number;
  name: string | null;
  displayName: string | null;
}

export enum CertificateStatus {
  Created = "Created",
  InProcess = "InProcess",
  Finished = "Finished",
}

export enum CertificateType {
  ForPlaceWhereNeeded = "ForPlaceWhereNeeded",
  PensionForKazakhstan = "PensionForKazakhstan",
}

export enum CertificateStaffType {
  ForPlaceOfWork = "ForPlaceOfWork",
  ForExperience = "ForExperience",
  ForVisa = "ForVisa",
  ForWorkBookCopy = "ForWorkBookCopy",
}

export enum CertificateUserType {
  Student = "Student",
  Employee = "Employee",
}

export enum CertificateReceiveType {
  Electronic = "Electronic",
  Paper = "Paper",
}

export enum FileExtension {
  NotDefined = "NotDefined",
  Doc = "Doc",
  Docx = "Docx",
  Bmp = "Bmp",
  Gif = "Gif",
  Jpeg = "Jpeg",
  Jpg = "Jpg",
  Png = "Png",
  Pdf = "Pdf",
  Rar = "Rar",
  Xls = "Xls",
  Xlsx = "Xlsx",
  Zip = "Zip",
  Txt = "Txt",
  Heic = "Heic",
  Heif = "Heif",
  Sig = "Sig",
}