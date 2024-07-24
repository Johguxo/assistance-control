
export interface DataRowType1 {
    name: string;
    lastName?: string;
    dni?: string;
    school?: string;
    university?: string;
    decanato?: string;
    vicaria?: string;
    church?: string;
    sabado?: boolean;
    domingo?: boolean;
}

interface DataVicaria {
    name: string,
    id: number,
}

interface DataDecanato {
    name: string,
    id: number
}
interface DataParroquia {
    name: string,
    id: number
}


export const parroquias: DataRowType1[] = [
    { name: 'Juan', lastName: 'Perez', dni: '12345678', decanato: 'Decanato 1', vicaria: 'Vicaria 2', church: 'San Juan', sabado: true, domingo: false },
    { name: 'Maria', lastName: 'Gomez', dni: '87654321', decanato: 'Decanato 2', vicaria: 'Vicaria 1', church: 'San Mateo', sabado: false, domingo: true },
    { name: 'Pedro', lastName: 'Rodriguez', dni: '11223344', decanato: 'Decanato 3', vicaria: 'Vicaria 3', church: 'San Lucas', sabado: true, domingo: true },
    { name: 'Luisa', lastName: 'Fernandez', dni: '22334455', decanato: 'Decanato 2', vicaria: 'Vicaria 2', church: 'San Pedro', sabado: false, domingo: true },
    { name: 'Ana', lastName: 'Lopez', dni: '99887766', decanato: 'Decanato 1', vicaria: 'Vicaria 3', church: 'San Marcos', sabado: true, domingo: false },
    { name: 'Carlos', lastName: 'Ramirez', dni: '33221100', decanato: 'Decanato 3', vicaria: 'Vicaria 1', church: 'San Pedro', sabado: true, domingo: false },
    { name: 'Laura', lastName: 'Garcia', dni: '44556677', decanato: 'Decanato 2', vicaria: 'Vicaria 3', church: 'San Lucas', sabado: false, domingo: true },
    { name: 'Jorge', lastName: 'Hernandez', dni: '11223344', decanato: 'Decanato 1', vicaria: 'Vicaria 2', church: 'San Mateo', sabado: true, domingo: true },
    { name: 'Carolina', lastName: 'Diaz', dni: '77889900', decanato: 'Decanato 3', vicaria: 'Vicaria 1', church: 'San Juan', sabado: false, domingo: true },
    { name: 'Diego', lastName: 'Martinez', dni: '11223344', decanato: 'Decanato 2', vicaria: 'Vicaria 2', church: 'San Marcos', sabado: true, domingo: false }
];

export const colegios: DataRowType1[] = [
    { name: 'Carlos', lastName: 'Lopez', dni: '99887766', school: 'Colegio Nacional', sabado: true, domingo: false },
    { name: 'Luis', lastName: 'Ramirez', dni: '11223344', school: 'Colegio San Agustin', sabado: true, domingo: true },
    { name: 'Lucia', lastName: 'Martinez', dni: '22334455', school: 'Instituto Peruano Japones', sabado: false, domingo: false },
    { name: 'Juanita', lastName: 'Gutierrez', dni: '44556677', school: 'Instituto San Jose', sabado: false, domingo: true },
    { name: 'Roberto', lastName: 'Fernandez', dni: '11223344', school: 'Escuela Nacional Superior de Arte Dramatico', sabado: true, domingo: false },
    { name: 'Gabriela', lastName: 'Hernandez', dni: '77889900', school: 'Universidad Nacional Mayor de San Marcos', sabado: false, domingo: true },
    { name: 'Mario', lastName: 'Perez', dni: '11223344', school: 'Pontificia Universidad Catolica del Peru', sabado: true, domingo: true },
    { name: 'Sandra', lastName: 'Lopez', dni: '99887766', school: 'Universidad de Lima', sabado: false, domingo: false },
    { name: 'Rosa', lastName: 'Martinez', dni: '44556677', school: 'Universidad del Pacifico', sabado: true, domingo: false },
    { name: 'Pedrito', lastName: 'Gutierrez', dni: '22334455', school: 'Universidad del Callao', sabado: false, domingo: true }
];


export const univerdidad: DataRowType1[] = [
    { name: 'Laura', lastName: 'Gomez', dni: '44556677', university: 'Universidad San Marcos', sabado: false, domingo: true },
    { name: 'Diego', lastName: 'Martinez', dni: '99887766', university: 'Universidad del Pacífico', sabado: true, domingo: false },
    { name: 'Carolina', lastName: 'Diaz', dni: '11223344', university: 'Universidad de Lima', sabado: false, domingo: true },
    { name: 'Martín', lastName: 'Garcia', dni: '22334455', university: 'Pontificia Universidad Católica del Perú', sabado: true, domingo: true },
    { name: 'Ana', lastName: 'Lopez', dni: '77889900', university: 'Universidad Nacional Mayor de San Marcos', sabado: false, domingo: false },
    { name: 'Pedro', lastName: 'Hernandez', dni: '11223344', university: 'Universidad Peruana Cayetano Heredia', sabado: true, domingo: false },
    { name: 'Lucia', lastName: 'Perez', dni: '44556677', university: 'Universidad de San Martín de Porres', sabado: false, domingo: true },
    { name: 'Jorge', lastName: 'Gutierrez', dni: '99887766', university: 'Universidad Antonio Ruiz de Montoya', sabado: true, domingo: true },
    { name: 'Sofia', lastName: 'Martinez', dni: '22334455', university: 'Universidad Ricardo Palma', sabado: true, domingo: false },
    { name: 'Daniel', lastName: 'Gomez', dni: '77889900', university: 'Universidad Tecnológica del Perú', sabado: false, domingo: true }
];

export const vicarias: DataVicaria[] = [
    { name: 'Vicaria 1', id: 1 },
    { name: 'Vicaria 2', id: 2 },
    { name: 'Vicaria 3', id: 3 },
    { name: 'Vicaria 4', id: 4 },
    { name: 'Vicaria 5', id: 5 },
]

export const decanatos: DataDecanato[] = [
    { name: 'Decanato 1', id: 1 },
    { name: 'Decanato 2', id: 2 },
    { name: 'Decanato 3', id: 3 },
    { name: 'Decanato 4', id: 4 },
    { name: 'Decanato 5', id: 5 },
]

export const listParroquias: DataParroquia[] = [
    { name: 'Parroquia Jesus Nazareno', id: 1 },
    { name: 'Parroquia San Pablo', id: 2 },
]