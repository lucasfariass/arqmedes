import { ISelecInput } from "./select-input.model";

export interface IUser {
    id?: number;
    name: string;
    cpf: string;
    profession: string;
    birthDate: string;
    civilStatus: string;
    city: ISelecInput;
    uf: ISelecInput;
}