

export interface User {
    ID: string;
    First_name: string;
    Last_name: string;
    DNI: string;
    Age: string;
    Institution_ID: string;
    Have_Permission: boolean;
    sabado: boolean;
    domingo: boolean;
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
