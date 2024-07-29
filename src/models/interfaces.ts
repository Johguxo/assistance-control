

export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    DNI: string;
    age: string;
    institution: Institution;
    have_Permission: boolean;
    saturday: boolean;
    sunday: boolean;
}

export interface Institution {
    _id: string;
    name: string;
    type: number;
    deanery?: Deanery;
}

export interface Vicaria {
    _id: string;
    name: string;
    address: string;
    deaneries: Deanery[];
}
export interface Deanery {
    _id: string;
    name: string;
    address: string;
    vicar: Vicaria;
}
