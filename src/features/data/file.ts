export enum FileExtension{
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
    Sig = "Sig"
}

export interface FileDto{
    id: string,
    name: string | null,
    extension: FileExtension,
    size: number
}