import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS } from "react-dom/client";
import { FileDto } from "./file";
import { CountryDto } from "./country";
import { ContactDto } from "./contact";

export enum UserType{
    Student = "Student",
    Employee = "Employee"
}

export enum Gender{
    NotDefined = "NotDefined",
    Male = "Male",
    Female = "Female"
}

export interface UserProfile{
    id: string,
    email: string | null,
    lastName: string | null,
    firstName: string | null,
    patronymic: string | null,
    birthDate: Date,
    gender: Gender,
    avatar: FileDto,
    citizenship: CountryDto,
    address: string | null,
    contacts: ContactDto[] | null,
    userTypes: UserType[] | null
}