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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchUsersLeaders } from "@/controller/fetchUsersLeaders";

const MySwal = withReactContent(Swal)

export const ContAsistLeaders: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // dato fake
    const [showDni, setShowDni] = useState(true); // Estado para mostrar columna dni
    const [showParroquia, setShowParroquia] = useState(true); // Estado para mostrar columna parroquia / dato fake
    const [currentData, setCurrentData] = useState<User[]>(users); // Estado para cambiar data // dato fake
    const [selectedOption, setSelectedOption] = useState<number>(0); // Estado para elegir pestaña
    const [selectedOptionString, setSelectedOptionString] = useState<string>('ALL'); // Estado para elegir pestaña
    const [loading, setLoading] = useState<boolean>(true); // estado del loader
    // conexion de data-back
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [deaneries, setDeaneries] = useState<Deanery[]>([]); // datos de la db
    const [vicars, setVicars] = useState<Vicaria[]>([]); // datos de la db
    const [selectedVicaria, setSelectedVicaria] = useState<string | null>(); // estado select
    const [selectedInstitution, setSelectedInstitution] = useState<
        string | null
    >();
    const [selectedDeanery, setSelectedDeanery] = useState<string | null>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    // const [saturday, setSaturday] = useState(users.saturday);
    // const [sunday, setSunday] = useState(users.sunday);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, institutionData, decanatoData, vicarsData] =
                    await Promise.all([
                        fetchUsersLeaders({ type: 0 }),
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

    const handleOptionChange = (option: string, optionHeader: number) => {
        setSearchTerm('')
        setSelectedOption(optionHeader)
        setSelectedOptionString(option)
        if (option == 'ALL') setCurrentData(users);
        else {
            const filterUsers = users.filter(
                (user) => user.area?.trim().toLowerCase() == option.trim().toLowerCase()
            );
            setCurrentData(filterUsers);
        }
    };

    const handleCheckboxChange = async (
        userId: string,
        field: "saturday" | "sunday",
        checked: boolean | null,
        firstName: string
    ) => {
        let title = `<p>Desea actualizar la asistencia de ${firstName}</p>`
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
        let query_validation = first_name.toLowerCase().includes(key.toLowerCase())
        if (dni) {
            query_validation = query_validation || (dni).toString().toLowerCase().includes(key.toLowerCase())
            
        }
        if (last_name) query_validation = query_validation || last_name.toLowerCase().includes(key.toLowerCase())
        return query_validation
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value)
        let filterUsers = users;
        if (selectedOption == 0) filterUsers = users;
        else {
            filterUsers = filterUsers.filter(
                (user) => user.area?.trim().toLowerCase() == selectedOptionString.trim().toLowerCase()
            );
        }

        if (value) {
            filterUsers = filterUsers.filter((user) => {
                return findSimilarity(user.first_name, user.last_name, user.DNI, value)
            })
        }
        setCurrentData(filterUsers)
    };

    const edad = (user: User): number | string => {
        if (user.date_birth) {
            const birthdateString = user.date_birth;
            const birthdate = new Date(birthdateString);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            const m = today.getMonth() - birthdate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
                age--;
            }
            return age;
        } else if (user.age) {
            return user.age
        }
        return "-";
    };


    const filteredDeaneries: Deanery[] = selectedVicaria
        ? vicars.find((vicar) => {
            return vicar._id === selectedVicaria;
        })?.deaneries || deaneries
        : deaneries;
    return (
        <div className=" w-screen h-screen flex flex-col justify-center px-12  mt-10 sm:mt-2">
            <div className="flex flex-col justify-center h-full ">
                <div className=" h-auto flex flex-wrap w-full md:gap-4 justify-between font-bold">
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 0
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('ALL', 0)}
                    >
                        GENERAL
                    </button>
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 1
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('Coro Juvenil Arquidiocesano', 1)}
                    >
                        CORO
                    </button>

                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 2
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('DANZA', 2)}
                    >
                        DANZA
                    </button>

                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 3
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('REGISTRO Y ESTADÍSTICA', 3)}
                    >
                        REGISTRO
                    </button>
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 4
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('COMUNICACIONES', 4)}
                    >
                        COMUNICACIONES
                    </button>
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 5
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('Animación y adoración ', 5)}
                    >
                        ANIMACION Y ADORACION
                    </button>
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 6
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('FACILITADORES ', 6)}
                    >
                        FACILITADORES
                    </button>
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 7
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('Producción (Logística)', 7)}
                    >
                        PRODUCCION (LOGISTICA)
                    </button>
                    <button
                        className={`py-2 px-2 text-xs md:text-base  ${selectedOption === 8
                            ? "bg-amber-200/90 text-green-700 rounded-md shadow-3xl mb-2 md:!rounded-t-md md:!rounded-b-none md:m-0"
                            : "md:shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                            }`}
                        onClick={() => handleOptionChange('SEGURIDAD', 8)}
                    >
                        SEGURIDAD
                    </button>
                </div>
                <div className=" gap-2 flex flex-col  h-4/5 justify-baseline bg-amber-200/90  w-full rounded-b-3xl shadow-2xl">
                    {/* SEARCH-BAR */}

                    <div className="mx-4 flex items-center flex-col gap-2 sm:flex-row mt-2 justify-center h-1/5">
                        <div className="bg-white flex h-8 border-gray-400 rounded-xl w-full">
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
                        <div className="text-gray-600 flex gap-4 ml-8 mt-2 md:mt-0">
                            <label className="flex gap-2 text-xs md:text-base items-center">
                                <input
                                    type="checkbox"
                                    checked={showParroquia}
                                    onChange={() => setShowParroquia(!showParroquia)}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out items-center"
                                />
                                Parroquia
                            </label>
                            <label className="flex text-xs md:text-base items-center">
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

                    {/* <div
                        className={`flex flex-col items-center overflow-y-auto  w-full h-4/5 items-center`}
                    > */}
                    {/* Select */}
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
                            className="text-center block w-1/5 text-xs md:text-base py-1.5 border border-gray-300 rounded-md shadow-sm"
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
                            className="text-center block w-1/5 text-xs md:text-base py-1.5 border border-gray-300 rounded-md shadow-sm"
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
                                            {institution.name} - {institution.address}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {/* Tabla */}
                    <div className="flex w-full h-screen  overflow-x-auto items-center justify-center m-1">
                        {/* Tabla de asistencia */}
                        {loading ? (
                            // false
                            <div className="flex h-11/12 p-28">
                                <Loader />
                            </div>
                        ) : (
                            // <div
                            //     className={`h-full overflow-x-auto  shadow-md shadow-slate-600/50 bg-white ${selectedOption === 0 || selectedOption === 5
                            //         ? `w-full`
                            //         : `w-full`
                            //         }`}
                            // >
                            <div className="overflow-x-auto h-full">
                                <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300">
                                    {/* Cabecera */}
                                    <thead className="text-xs md:text-base bg-gray-300 sticky top-0 z-10">
                                        <tr>
                                            <th className="text-xs md:text-base sticky top-0 z-10 px-6 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className=" sticky top-0 z-10 px-6 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                                                Apellido
                                            </th>
                                            {showDni && (
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                    DNI
                                                </th>
                                            )}

                                            <th className=" sticky top-0 z-10 px-6 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                                                Edad
                                            </th>
                                            <th className=" sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                Comision
                                            </th>
                                            {showParroquia && (
                                                <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                    Parroquia
                                                </th>
                                            )}
                                            <th className=" sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                Equipo
                                            </th>
                                            <th className="sticky top-0 z-10 px-6 py-2 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                                Sábado
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-300 text-xs md:text-base">
                                        {/* Cuerpo de Tabla */}
                                        {currentData.map((row) => (
                                            <tr key={row._id} className="hover:bg-gray-200">
                                                <td className="px-6 py-2 text-center whitespace-nowrap  font-medium text-gray-500">
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
                                                    {edad(row)}
                                                </td>
                                                <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                    {row.area}
                                                </td>
                                                {showParroquia && (
                                                    <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                        {row.institution?.name}
                                                    </td>)}
                                                <td className="px-6 py-2 text-center whitespace-nowrap  text-gray-500">
                                                    {row.key === "ALEGRÍA" ? (
                                                        <div className="flex justify-between items-center">
                                                            <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                                                            &nbsp;Alegría&nbsp;
                                                        </div>
                                                    ) : row.key === "MISIÓN" ? (
                                                        <div className="flex justify-between items-center">
                                                            <div className="w-6 h-6 bg-lime-800 rounded-full"></div>
                                                            &nbsp;Mision&nbsp;
                                                        </div>
                                                    ) : row.key === "ESPERANZA" ? (
                                                        <div className="flex justify-between items-center">
                                                            <div className="w-6 h-6 bg-lime-200 rounded-full"></div>
                                                            &nbsp;&nbsp;&nbsp;Esperanza&nbsp;
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-between items-center">
                                                            <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                                                            &nbsp;Unidad&nbsp;
                                                        </div>
                                                    )}
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};
