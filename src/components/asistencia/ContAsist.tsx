"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
// import { parroquias, colegios, univerdidad, DataRowType1, listParroquias } from '../../db';
import { fetchUsers } from "@/controller/fetchUsers";
import { fetchDeaneries } from "@/controller/fetchDeaneries";
// import { fetchInstitutions } from '@/pages/api/institutions';
import { fetchVicars } from "@/controller/fetchVicars";
import { User, Institution, Deanery, Vicaria } from "@/models/interfaces";
import { updateUserField } from "@/controller/updateUserField";
import { fetchInstitutions } from "@/controller/fetchInstitutions";
import Loader from "./Loader";
// import { all } from "axios";
// import { Esperanza } from "./icons/Esperanza";
// import { Alegria } from "./icons/Alegria";
// import { Mision } from "./icons/Mision";
// import { Unidad } from "./icons/Unidad";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CategoryAll } from "../categorySelector/CategorySelector";
// import { Slide } from "./icons/Slide";
import { pink, blue, green, red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const MySwal = withReactContent(Swal)

export const ContAsist: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // dato fake
    const [showDni, setShowDni] = useState(true); // Estado para mostrar columna dni
    const [showParroquia, setShowParroquia] = useState(true); // Estado para mostrar columna parroquia / dato fake
    const [currentData, setCurrentData] = useState<User[]>(users); // Estado para cambiar data // dato fake
    const [selectedOption, setSelectedOption] = useState<number>(0); // Estado para elegir pestaña
    const [loading, setLoading] = useState<boolean>(true); // estado del loader
    const [showFilterInstitution, setShowFilterInstitution] = useState<boolean>(false);
    // conexion de data-back
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [deaneries, setDeaneries] = useState<Deanery[]>([]); // datos de la db
    const [vicars, setVicars] = useState<Vicaria[]>([]); // datos de la db
    const [selectedVicaria, setSelectedVicaria] = useState<string | null>(); // estado select
    const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

    const [selectedDeanery, setSelectedDeanery] = useState<string | null>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    // const [isActive, setIsActive] = useState<boolean>(false);
    // const [saturday, setSaturday] = useState(users.saturday);
    // const [sunday, setSunday] = useState(users.sunday);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, institutionData, decanatoData, vicarsData] =
                    await Promise.all([
                        fetchUsers({ type: 0 }),
                        fetchInstitutions(),
                        fetchDeaneries(),
                        fetchVicars(),
                    ]);
                setUsers(userData);
                setCurrentData(userData);
                setInstitutions(institutionData);
                setDeaneries(decanatoData);
                setVicars(vicarsData);
            } catch (error) {
                console.log("error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    //   console.log("Decanatoooos -->", deaneries)
    // console.log("insititus -->", institutions)
    // const findUsers = async (type_institution: number | undefined = undefined) => {
    //     if (type_institution != undefined) {
    //         try {
    //             const userData = await fetchUsers({ type: type_institution });
    //             setUsers(userData);
    //         } catch (error) {
    //             console.log("error")
    //         }
    //     } else fetchUsers({})
    // }
    // findUsers()

    // 0 general
    // 1 parroquias 
    // 2 unis
    // 3 colegios
    // 4 congregaciones
    // 5 sin institucion

    const handleOptionChange = (option: number) => {
        setSearchTerm('')
        setSelectedOption(option);
        if (option == 0) setCurrentData(users);
        else {
            if (option == 5) {
                const filterUsersWithoutInstitutions = users.filter(
                    (user) => !user.institution?.type
                );
                setCurrentData(filterUsersWithoutInstitutions);
            } else {
                const filterUsersChurchs = users.filter(
                    (user) => user.institution?.type === option
                );
                setCurrentData(filterUsersChurchs);
            }
        }
    };

    const handleCheckboxChange = async (
        userId: string,
        field: "saturday" | "sunday" | "have_auth",
        checked: boolean | null,
        firstName: string
    ) => {
        /*const confirm = window.confirm(`¿Seguro que deseas modificar la información de ${firstName}?`);

        if (confirm) {
            try {
                await updateUserField(userId, field, !checked);
                setUsers(
                    users.map((user) =>
                        user._id === userId ? { ...user, [field]: !checked } : user
                    )
                );
            } catch (error) {
                console.error("Error updating user field:", error);
            }
            window.alert('Actualice la pagina apara ver los cambios');
        }*/
        let title = `<p>Desea actualizar la asistencia de ${firstName}</p>`
        if (field == "have_auth") {
            title = `<p>Desea actualizar el registro de autorizacion de ${firstName}</p>`
        }
        MySwal.fire({
            title,
            showConfirmButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async (updateUser) => {
                try {
                    await updateUserField(userId, field, !checked);
                    setUsers(
                        users.map((user) =>
                            user._id === userId ? { ...user, [field]: !checked } : user
                        )
                    );
                    return true
                } catch (error) {
                    MySwal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(
                    users.map((user) =>
                        user._id === userId ? { ...user, [field]: !checked } : user
                    )
                );
                return MySwal.fire(<p>Dato actualizado</p>)
            }
        })

    };


    const handleVicariaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const vicarIdSelected = event.target.value;
        setSelectedVicaria(vicarIdSelected);
        setSelectedDeanery(null);
    };

    const handleDeaneryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const deaneryIdSelected = event.target.value;
        setSelectedDeanery(deaneryIdSelected);
    };

    const handleInstitutionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const institutionIdSelected = event.target.value;
        setSelectedInstitution(institutionIdSelected);
        setCurrentData(
            users.filter((user) => {
                if (institutionIdSelected && institutionIdSelected !== 'option-default') {
                    return user.institution?._id == institutionIdSelected
                } else {
                    return user.institution?.type == 1
                }
            })
        );
    };

    const findSimilarity = (first_name: string, last_name: string, dni: number, key: string) => {
        let query_validation;
        if (first_name) query_validation = first_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(key.toLowerCase())
        if (dni) query_validation = query_validation || (dni).toString().toLowerCase().includes(key.toLowerCase())
        if (last_name) query_validation = query_validation || last_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(key.toLowerCase())
        return query_validation
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value)
        let filterUsers = users;
        if (selectedOption == 0) filterUsers = users;
        else {
            if (selectedOption != 0 && selectedOption == 5) {
                filterUsers = filterUsers.filter(
                    (user) => !user.institution?.type
                );
            } else {
                filterUsers = filterUsers.filter(
                    (user) => user.institution?.type === selectedOption
                );
            }
        }

        if (value) {
            filterUsers = filterUsers.filter((user) => {
                return findSimilarity(user.first_name, user.last_name, user.DNI, value)
            })
        }
        setCurrentData(filterUsers)
    };

    const edad = (user: User): string => {
        if (user.date_birth) {
            const birthdateString = user.date_birth;
            const birthdate = new Date(birthdateString);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            const m = today.getMonth() - birthdate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
                age--;
            }
            return age.toString();
        } else if (user.age) {
            return user.age.toString()
        }
        return "-";
    };

    // const handleToggle = (checked: boolean) => {
    //     setIsActive(checked);
    // };

    const filteredDeaneries: Deanery[] = selectedVicaria
        ? vicars.find((vicar) => {
            //console.log('busqueda del id:', vicar._id, selectedVicaria);
            return vicar._id === selectedVicaria;
        })?.deaneries || deaneries
        : deaneries;
    return (
        <div className="w-full h-screen flex flex-col justify-center sm:p-12 p-2">
            <div className="flex flex-col h-full">
                {/* category */}
                    <div className="h-auto flex flex-wrap w-full md:gap-4 justify-between font-bold">
                            <CategoryAll
                                option={0}
                                optionHeader={0}
                                selectedOption={selectedOption}
                                buttonText="GENERAL"
                                onClick={handleOptionChange}
                            />
                        {/* <div className="w-1/4 bg-blue-400"> */}
                            <CategoryAll
                                option={1}
                                optionHeader={1}
                                selectedOption={selectedOption}
                                buttonText="PARROQUIAS"
                                onClick={handleOptionChange}
                            />
                        {/* </div> */}
                            <CategoryAll
                                option={2}
                                optionHeader={2}
                                selectedOption={selectedOption}
                                buttonText="COLEGIOS"
                                onClick={handleOptionChange}
                            />
                            <CategoryAll
                                option={3}
                                optionHeader={3}
                                selectedOption={selectedOption}
                                buttonText="UNIVERSIDADES"
                                onClick={handleOptionChange}
                            />
                            <CategoryAll
                                option={4}
                                optionHeader={4}
                                selectedOption={selectedOption}
                                buttonText="CONGREGACIONES"
                                onClick={handleOptionChange}
                            />
                            <CategoryAll
                                option={5}
                                optionHeader={5}
                                selectedOption={selectedOption}
                                buttonText="LIBRES"
                                onClick={handleOptionChange}
                            />
                    </div>
                <div className=" gap-2 flex flex-col  h-4/5 justify-baseline bg-amber-200/90  w-full rounded-b-3xl shadow-2xl">
                    {/* SEARCH-BAR */}
                    <div className="mx-4 flex items-center gap-2 flex-row mt-2 justify-center">
                        <div className="bg-white flex h-8 border-gray-400 rounded-xl w-4/5">
                            <input
                                className="font-normal text-xs md:text-base bg-white text-gray-500 block w-full px-2 border-gray-400 rounded-xl focus:outline-none"
                                type="text"
                                placeholder={"Ingrese nombre o dni"}
                                onChange={handleSearch}
                                value={searchTerm}
                            />
                            <div className="flex items-center mx-4">
                                {/* Icono */}
                                <div>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.2099 11.6369C14.0995 10.4257 14.625 8.93047 14.625 7.3125C14.625 3.27392 11.3511 0 7.3125 0C3.27392 0 0 3.27392 0 7.3125C0 11.3511 3.27392 14.625 7.3125 14.625C8.93091 14.625 10.4265 14.0992 11.6378 13.2092L11.6369 13.2099C11.6701 13.2549 11.707 13.298 11.7477 13.3387L16.0795 17.6705C16.5188 18.1098 17.2312 18.1098 17.6705 17.6705C18.1098 17.2312 18.1098 16.5188 17.6705 16.0795L13.3387 11.7477C13.298 11.707 13.2549 11.6701 13.2099 11.6369ZM13.5 7.3125C13.5 10.7298 10.7298 13.5 7.3125 13.5C3.89524 13.5 1.125 10.7298 1.125 7.3125C1.125 3.89524 3.89524 1.125 7.3125 1.125C10.7298 1.125 13.5 3.89524 13.5 7.3125Z"
                                            fill="#A1A5A7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-600 flex gap-4 ml-8 mt-2 md:mt-0 flex-col">
                            {selectedOption === 1 && (
                                <label className="flex gap-2 text-xs md:text-base items-center">
                                    <input
                                        type="checkbox"
                                        checked={showParroquia}
                                        onChange={() => setShowParroquia(!showParroquia)}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out items-center"
                                    />
                                    Parroquia
                                </label>
                            )}
                            <label className="flex gap-2 text-xs md:text-base items-center">
                                <input
                                    type="checkbox"
                                    checked={showDni}
                                    onChange={() => setShowDni(!showDni)}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out items-center"
                                />
                                DNI
                            </label>
                        </div>
                    </div>
                    {/* Select / tabla */}
                    {/* <div
                        className={`flex  w-full h-11/12 ${selectedOption === 0 || selectedOption === 5
                            ? `justify-center`
                            : `justify-between`
                            } `}
                    > */}
                    {/* Select */}
                     {showFilterInstitution && selectedOption !== 0 && selectedOption !== 5 && (
                        <div className="flex sm:flex-row h-1/6 justify-center items-center gap-8 w-full text-gray-500">
                            {selectedOption === 4 && (
                                <div className="flex flex-col items-center py-20 gap-8 w-96 text-gray-500">
                                    <select
                                        className="text-xs md:text-base py-1.5 block w-1/5 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">
                                            CONGREGACION
                                        </option>
                                        {institutions
                                            .filter((institution) => institution.type === 4)
                                            .map((inst, i) => {
                                                return (
                                                    <option key={i} value={inst._id}>
                                                        {inst.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            )}
                            {selectedOption === 3 && (
                                <div className="flex sm:flex-row h-1/6 justify-center items-center gap-8 w-full text-gray-500">
                                    <select
                                        className="text-xs md:text-base py-1.5 block w-1/5 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">
                                            UNIVERSIDAD
                                        </option>
                                        {institutions
                                            .filter((institution) => institution.type === 3)
                                            .map((inst, i) => {
                                                return (
                                                    <option key={i} value={inst._id}>
                                                        {inst.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            )}
                            {selectedOption === 2 && (
                                <div className="flex sm:flex-row h-1/6 justify-center items-center gap-8 w-full text-gray-500">
                                    <select
                                        className="text-xs md:text-base py-1.5 block w-1/5 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">COLEGIO</option>
                                        {institutions
                                            .filter((institution) => institution.type === 2)
                                            .map((inst, i) => {
                                                return (
                                                    <option key={i} value={inst._id}>
                                                        {inst.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            )}
                            {selectedOption === 1 && (
                                <div className="flex flex-row sm:flex-row h-1/6 justify-center items-center gap-8 w-full text-gray-500">
                                    <select
                                        className="text-xs md:text-base py-1.5 block w-1/5 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleVicariaChange}
                                        value={selectedVicaria || "option-default"}
                                    >
                                        <option value="option-default">VICARIA</option>
                                        {vicars.map((vicars, i) => {
                                            return (
                                                <option key={i} value={vicars._id}>
                                                    {vicars.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        className="text-xs md:text-base py-1.5 block w-1/5 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleDeaneryChange}
                                        value={selectedDeanery || "option-default"}
                                    >
                                        <option value="option-default">DECANATO</option>
                                        {filteredDeaneries.map((deanery, i) => {
                                            return (
                                                <option key={i} value={deanery._id}>
                                                    {deanery.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        className="text-xs md:text-base py-1.5 block w-1/5 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">PARROQUIA</option>
                                        {institutions
                                            .filter((institution) => {
                                                if (selectedDeanery && selectedDeanery != "option-default") {
                                                    return (
                                                        institution.type === 1 &&
                                                        institution.deanery?._id == selectedDeanery
                                                    );
                                                } else return institution.type === 1;
                                            })
                                            .map((institution) => {
                                                return (
                                                    <option key={institution._id} value={institution._id}>
                                                        {institution.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Tabla */}
                    <div className="flex w-full h-full  overflow-x-auto  justify-center m-1">
                        {/* Tabla de asistencia */}
                        {loading ? (
                            // false
                            <div className="flex h-11/12 p-28">
                                <Loader />
                            </div>
                        ) : currentData.length > 0 ? (
                                <div className="overflow-x-auto h-full">
                                    <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300">
                                        {/* Cabecera */}
                                        <thead className="text-xs md:text-base bg-gray-300 sticky top-0 z-10">
                                            <tr>
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Nombre
                                                </th>
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Apellido
                                                </th>
                                                {showDni && (
                                                    <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                        DNI
                                                    </th>
                                                )}
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Equipo
                                                </th>
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Edad
                                                </th>
    
                                                {selectedOption === 0 && (
                                                    <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                        Institucion
                                                    </th>
                                                )}
                                                {selectedOption === 1 && showParroquia && (
                                                    <>
                                                        <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                            Decanato
                                                        </th>
                                                        <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                            Vicaria
                                                        </th>
                                                        <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                            Parroquia
                                                        </th>
                                                    </>
                                                )}
                                                {selectedOption === 2 && (
                                                    <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                        Colegio
                                                    </th>
                                                )}
                                                {selectedOption === 3 && (
                                                    <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                        Universidad
                                                    </th>
                                                )}
                                                {selectedOption === 4 && (
                                                    <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                        Congregacion/Movimiento
                                                    </th>
                                                )}
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Autorizacion
                                                </th>
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Sábado
                                                </th>
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Domingo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-300 text-xs md:text-base">
                                            {/* Cuerpo de Tabla */}
                                            {currentData.map((row, i) => (
                                                <tr key={row._id} className="hover:bg-gray-200">
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        {row.first_name}
                                                    </td>
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        {row.last_name}
                                                    </td>
                                                    {showDni && (
                                                        <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                            {row.DNI}
                                                        </td>
                                                    )}
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        {
                                                            row.key ? (
                                                                row.key.toLowerCase() === "alegría" ? (
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                                                                        &nbsp;Alegría&nbsp;
                                                                    </div>
                                                                ) : row.key.toLowerCase() === "misión" ? (
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="w-6 h-6 bg-lime-800 rounded-full"></div>
                                                                        &nbsp;Mision&nbsp;
                                                                    </div>
                                                                ) : row.key.toLowerCase() === "esperanza" ? (
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="w-6 h-6 bg-lime-200 rounded-full"></div>
                                                                        &nbsp;&nbsp;&nbsp;Esperanza&nbsp;
                                                                    </div>
                                                                ): (
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                                                                        &nbsp;Unidad&nbsp;
                                                                    </div>
                                                                )
                                                            ):  (
                                                                <div className="flex justify-between items-center">
                                                                    Sin equipo
                                                                </div>
                                                            ) 
                                                        }
                                                    </td>
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        {edad(row)}
                                                    </td>
    
                                                    {selectedOption !== 1 && selectedOption !== 5 && (
                                                        <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                            {row.institution?.name}
                                                        </td>
                                                    )}
    
                                                    {selectedOption === 1 && showParroquia && (
                                                        <>
                                                            <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                                {
                                                                    deaneries.find((deanery) => deanery._id == row.institution?.deanery_id)?.name
                                                                }
                                                            </td>
                                                            <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                                {vicars.find((vicar) => {
                                                                    const deaneries = vicar.deaneries
                                                                    return deaneries?.findIndex((deanery) => deanery._id == row.institution?.deanery_id) !== -1
                                                                })?.name
                                                                }
                                                            </td>
                                                            <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                                {row.institution?.name}
                                                            </td>
                                                        </>
                                                    )}
                                                    <td className='px-6 py-2 text-center flex justify-center itmes-center text-gray-500'>
                                                        {parseInt(edad(row)) < 18 ?
                                                            <div className='w-4 h-4 flex items-center justify-center border-[2px] border-red-500 shadow-xl'>
    
                                                                <Checkbox
                                                                    sx={{
                                                                        color: red[500],
                                                                        "&.Mui-checked": {
                                                                            color: green[700],
                                                                        }
                                                                    }}
                                                                    defaultChecked={row.have_auth}
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            row._id,
                                                                            "have_auth",
                                                                            row.have_auth ?? false,
                                                                            row.first_name,
    
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            // <span>hola</span>
                                                            :
                                                            <span>-</span>
                                                        }
                                                    </td>
    
    
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={row.saturday}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    row._id,
                                                                    "saturday",
                                                                    row.saturday,
                                                                    row.first_name
    
                                                                )
                                                            }
                                                            className="ml-2 cursor-pointer"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={row.sunday}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    row._id,
                                                                    "sunday",
                                                                    row.sunday,
                                                                    row.first_name
    
                                                                )
                                                            }
                                                            className="ml-2 cursor-pointer"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                        ): <div>
                                <h3>No se encontraron datos para <span className="font-bold">{searchTerm}</span> 😢</h3>
                            </div>
                        }
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};
