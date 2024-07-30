

export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    DNI: string;
    date_birth: string;
    key: string;
    age: string;
    have_auth: boolean | null;
    institution?: Institution;
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
