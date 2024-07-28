

export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    dni: string;
    age: string;
    Institution_ID: string;
    have_Permission: boolean;
    saturday: boolean;
    sunday: boolean;
}

export interface Institution {
    ID: string;
    Name: string;
    Description: string;
    Type: string;
    Decanato_ID: string | null;
    Address: string;
}

export interface Decanato {
    _id: string;
    name: string;
    address: string;
}

export interface Vicaria {
    _id: string;
    name: string;
    address: string;
}
