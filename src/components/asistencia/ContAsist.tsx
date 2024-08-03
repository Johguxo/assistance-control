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
import { all } from "axios";
// import { Esperanza } from "./icons/Esperanza";
// import { Alegria } from "./icons/Alegria";
// import { Mision } from "./icons/Mision";
// import { Unidad } from "./icons/Unidad";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from "./contAsist.module.css"

const MySwal = withReactContent(Swal)

export const ContAsist: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // dato fake
    const [showDni, setShowDni] = useState(true); // Estado para mostrar columna dni
    const [showParroquia, setShowParroquia] = useState(true); // Estado para mostrar columna parroquia / dato fake
    const [currentData, setCurrentData] = useState<User[]>(users); // Estado para cambiar data // dato fake
    const [selectedOption, setSelectedOption] = useState<number>(0); // Estado para elegir pestaña
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
        let  title = `<p>Desea actualizar la asistencia de ${firstName}</p>`
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
                } catch(error) {
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

    const findSimilarity = (first_name: string, last_name: string, key: string) => {
        return first_name.toLowerCase().includes(key) || last_name.toLowerCase().includes(key)
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
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
                return findSimilarity(user.first_name, user.last_name, value)
            })
        }
        setCurrentData(filterUsers)
    };

    const edad = (birthdateString: string): number => {
        const birthdate = new Date(birthdateString);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        return age;
    };

    const filteredDeaneries: Deanery[] = selectedVicaria
        ? vicars.find((vicar) => {
            //console.log('busqueda del id:', vicar._id, selectedVicaria);
            return vicar._id === selectedVicaria;
        })?.deaneries || deaneries
        : deaneries;
    return (
        <div className=" w-11/12 h-1/2 flex flex-col bg-blue-500">
            <div className="flex w-full h-11/12 gap-4 felx justify-between font-bold text-sm">
                <button
                    className={`w-1/3 py-2 px-4  ${selectedOption === 0
                        ? "bg-amber-200/90 text-green-700 rounded-t-md py-2"
                        : "shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                        }`}
                    onClick={() => handleOptionChange(0)}
                > 
                    GENERAL
                </button>
                <button
                    className={`w-1/3 py-2 px-4  ${selectedOption === 1
                        ? "bg-amber-200/90 text-green-700 rounded-t-md py-2"
                        : "shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                        }`}
                    onClick={() => handleOptionChange(1)}
                >
                    PARROQUIAS
                </button>

                <button
                    className={`w-1/3 px-4 ${selectedOption === 2
                        ? "bg-amber-200/90 text-green-700 rounded-t-md py-2"
                        : "shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                        }`}
                    onClick={() => handleOptionChange(2)}
                >
                    COLEGIOS
                </button>

                <button
                    className={`w-1/3 py-2 px-4 ${selectedOption === 3
                        ? "bg-amber-200/90 text-green-700 rounded-t-md py-2"
                        : "shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                        }`}
                    onClick={() => handleOptionChange(3)}
                >
                    UNIVERSIDADES
                </button>
                <button
                    className={`w-1/3 py-2 px-4 ${selectedOption === 4
                        ? "bg-amber-200/90 text-green-700 rounded-t-md py-2"
                        : "shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                        }`}
                    onClick={() => handleOptionChange(4)}
                >
                    CONGREGACIONES
                </button>
                <button
                    className={`w-1/3 py-2 px-4 ${selectedOption === 5
                        ? "bg-amber-200/90 text-green-700 rounded-t-md py-2"
                        : "shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200"
                        }`}
                    onClick={() => handleOptionChange(5)}
                >
                    LIBRES
                </button>
            </div>
            <div className="flex flex-col items-center h-full bg-amber-200/90  w-full rounded-b-3xl shadow-2xl">
                {/* SEARCH-BAR */}

                <div className="bg-blue-200 flex items-center justify-center h-full w-full"> 
                    <div className="bg-white flex w-1/2 border-gray-400 rounded-xl">
                        <input
                            className="font-normal text-lg bg-white text-gray-500 block w-full py-2 px-2 border-gray-400 rounded-xl focus:outline-none"
                            type="text"
                            placeholder={"Ingrese nombre o dni"}
                            onChange={handleSearch}
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
                    <div className="w-20 text-gray-600 flex flex-col gap-2 ml-8">
                        {selectedOption === 1 && (
                            <label className="flex gap-2 text-md  items-center">
                                <input
                                    type="checkbox"
                                    checked={showParroquia}
                                    onChange={() => setShowParroquia(!showParroquia)}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out items-center"
                                />
                                Parroquia
                            </label>
                        )}
                        <label className="flex  text-md items-center">
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

                <div
                    className={`flex  w-full h-full ${selectedOption === 0 || selectedOption === 5
                        ? `justify-center`
                        : `justify-between`
                        } `}
                >
                    {selectedOption === 0 || selectedOption === 5 ? null : (
                        <div className={`flex felx-col w-full justify-center bg-red-200`}>
                            {/* Select */}
                            {selectedOption === 4 && (
                                <div className="flex flex-col items-center py-20 gap-8 w-full text-gray-500 bg-orange-500">
                                    <select
                                        className="block w-64 py-2 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">
                                            SELECCIONE CONGREGACION
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
                                <div className="flex flex-col items-center py-20 gap-8 w-96 text-gray-500">
                                    <select
                                        className="block w-64 py-2 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">
                                            SELECCIONE UNIVERSIDAD
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
                                <div className="flex flex-col items-center py-20 gap-8 w-96 text-gray-500">
                                    <select
                                        className="block w-64 py-2 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">SELECCIONE COLEGIO</option>
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
                                <div className="flex flex-col items-center py-20 gap-8 w-96 text-gray-500">
                                    <select
                                        className="block w-64 py-2 border text-center border-gray-300 rounded-md shadow-sm"
                                        onChange={handleVicariaChange}
                                        value={selectedVicaria || "option-default"}
                                    >
                                        <option value="option-default">SELECCIONE VICARIA</option>
                                        {vicars.map((vicars, i) => {
                                            return (
                                                <option key={i} value={vicars._id}>
                                                    {vicars.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        className="text-center block w-64 py-2 border border-gray-300 rounded-md shadow-sm"
                                        onChange={handleDeaneryChange}
                                        value={selectedDeanery || "option-default"}
                                    >
                                        <option value="option-default">SELECCIONE DECANATO</option>
                                        {filteredDeaneries.map((deanery, i) => {
                                          return (
                                            <option key={i} value={deanery._id}>
                                                {deanery.name}
                                            </option>
                                          );
                                        })}
                                    </select>
                                    <select
                                        className="text-center block w-64 py-2 border border-gray-300 rounded-md shadow-sm"
                                        onChange={handleInstitutionChange}
                                        value={selectedInstitution || "option-default"}
                                    >
                                        <option value="option-default">SELECCIONE PARROQUIA</option>
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
                            {/* Tabla */}
                        </div>
                    )}
                    <div className="flex flex-col w-4/5 h-11/12 items-center bg-blue-100 opacity-50">
                        {/* Tabla de asistencia */}
                        {loading ? (
                            // false
                            <div className="flex h-11/12 p-28">
                                <Loader />
                            </div>
                        ) : (
                                <div 
                                    className={`h-full shadow-md overflow-x-auto shadow-slate-600/50 bg-red-100 ${selectedOption === 0 || selectedOption === 5
                                        ? `w-full`
                                        : `w-11/12`
                                        }`}
                                >
                                    <table className="w-full  overflow-x-auto divide-gray-200">
                                        {/* Cabecera */}
                                        <thead className="">
                                            <tr className="">
                                                <th className={styles.th_style}>
                                                    Nombre
                                                </th>
                                                <th className={styles.th_style}>
                                                    Apellido
                                                </th>
                                                {showDni && (
                                                    <th className={styles.th_style}>
                                                        DNI
                                                    </th>
                                                )}
                                                <th className={styles.th_style}>
                                                    Equipo
                                                </th>
                                                <th className={styles.th_style}>
                                                    Edad
                                                </th>

                                                {selectedOption === 0 && (
                                                    <th className={styles.th_style}>
                                                        Institucion
                                                    </th>
                                                )}
                                                {selectedOption === 1 && showParroquia && (
                                                    <>
                                                        <th className={styles.th_style}>
                                                            Decanato
                                                        </th>
                                                        <th className={styles.th_style}>
                                                            Vicaria
                                                        </th>
                                                        <th className={styles.th_style}>
                                                            Parroquia
                                                        </th>
                                                    </>
                                                )}
                                                {selectedOption === 2 && (
                                                    <th className={styles.th_style}>
                                                        Colegio
                                                    </th>
                                                )}
                                                {selectedOption === 3 && (
                                                    <th className={styles.th_style}>
                                                        Universidad
                                                    </th>
                                                )}
                                                {selectedOption === 4 && (
                                                    <th className={styles.th_style}>
                                                        Congregacion/Movimiento
                                                    </th>
                                                )}
                                                <th className={styles.th_style}>
                                                    Autorizacion
                                                </th>
                                                <th className={styles.th_style}>
                                                    Sábado
                                                </th>
                                                    <th className={styles.th_style}>
                                                    Domingo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {/* Cuerpo de Tabla */}
                                            {currentData.map((row) => (
                                                <tr key={row._id} >
                                                    <td className={styles.td_style}>
                                                        {row.first_name}
                                                    </td>
                                                    <td className={styles.td_style}>
                                                        {row.last_name}
                                                    </td>
                                                    {showDni && (
                                                        <td className={styles.td_style}>
                                                            {row.DNI}
                                                        </td>
                                                    )}
                                                    <td className={styles.td_style}>
                                                        {row.key === "Alegría" ? (
                                                            <div className={styles.icon_equipo}>
                                                                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                                                                &nbsp;Alegría&nbsp;
                                                            </div>
                                                        ) : row.key === "misión" ? (
                                                            <div className={styles.icon_equipo}>
                                                                <div className="w-6 h-6 bg-lime-500 rounded-full"></div>
                                                                &nbsp;Mision&nbsp;
                                                            </div>
                                                        ) : row.key === "esperanza" ? (
                                                            <div className={styles.icon_equipo}>
                                                                <div className="w-6 h-6 bg-lime-200 rounded-full"></div>
                                                                &nbsp;&nbsp;&nbsp;Esperanza&nbsp;
                                                            </div>
                                                        ) : (
                                                            <div className={styles.icon_equipo}>
                                                                <div className="w-6 h-6 bg-green-900 rounded-full"></div>
                                                                &nbsp;Unidad&nbsp;
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className={styles.td_style}>
                                                        {edad(row.date_birth)}
                                                    </td>

                                                    {selectedOption !== 1 && selectedOption !== 5 && (
                                                        <td className={styles.td_style}>
                                                            {row.institution?.name}
                                                        </td>
                                                    )}

                                                    {selectedOption === 1 && showParroquia && (
                                                        <>
                                                            <td className={styles.td_style}>
                                                                {
                                                                  deaneries.find((deanery) => deanery._id == row.institution?.deanery_id)?.name
                                                                }
                                                            </td>
                                                            <td className={styles.td_style}>
                                                              { vicars.find((vicar) => {
                                                                    const deaneries = vicar.deaneries
                                                                    return deaneries?.findIndex((deanery) => deanery._id == row.institution?.deanery_id) !== -1
                                                                  })?.name
                                                                }
                                                            </td>
                                                            <td className={styles.td_style}>
                                                                { row.institution?.name }
                                                            </td>
                                                        </>
                                                    )}
                                                    <td className={styles.td_style}>


                                                        {Number(edad(row.date_birth)) < 18 && (
                                                            row.have_auth === true ? (
                                                                <svg
                                                                    height="15px"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    style={{ fill: "green" }}
                                                                    className="cursor-pointer"
                                                                    onClick={() => handleCheckboxChange(
                                                                        row._id,
                                                                        "have_auth",
                                                                        row.have_auth,
                                                                        row.first_name
                                                                    )
                                                                    }

                                                                >
                                                                    <g>
                                                                        <g>
                                                                            <path d="M12,0C5.373,0,0,5.373,0,12c0,6.628,5.373,12,12,12c6.627,0,12-5.372,12-12C24,5.373,18.627,0,12,0z M19.754,9.561 l-8.607,8.607c-0.176,0.177-0.462,0.177-0.637,0l-1.272-1.285c-0.175-0.176-0.462-0.464-0.636-0.642l-2.96-3.112 c-0.087-0.087-0.133-0.21-0.133-0.327c0-0.115,0.046-0.227,0.133-0.314l1.297-1.169c0.088-0.09,0.205-0.134,0.321-0.134 c0.114,0.001,0.228,0.046,0.315,0.134l2.936,2.995c0.175,0.178,0.461,0.178,0.637,0l6.699-6.681c0.176-0.177,0.461-0.177,0.636,0 l1.272,1.285C19.93,9.094,19.93,9.384,19.754,9.561z" />
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    className="cursor-pointer"
                                                                    height="15px"
                                                                    viewBox="0 0 84 84"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    onClick={() => handleCheckboxChange(
                                                                        row._id,
                                                                        "have_auth",
                                                                        row.have_auth,
                                                                        row.first_name

                                                                    )
                                                                    }

                                                                >
                                                                    <g>
                                                                        <path
                                                                            d="M42,0C18.804,0,0,18.807,0,42c0,23.197,18.804,42,42,42c23.195,0,42-18.803,42-42C84,18.807,65.195,0,42,0z M67.248,36.889 l0.002,10.223h-50.5V36.891L67.248,36.889z"
                                                                            fill="red"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            )
                                                        )}

                                                        {/* {
                                                                row.have_auth === true
                                                                    ?
                                                                    <svg height="15px" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path d="M42,0C18.804,0,0,18.807,0,42c0,23.197,18.804,42,42,42c23.195,0,42-18.803,42-42C84,18.807,65.195,0,42,0z M67.248,36.889 l0.002,10.223h-50.5V36.891L67.248,36.889z"
                                                                                fill="red" />
                                                                        </g>
                                                                    </svg>
                                                                    : row.have_auth === false
                                                                        ?
                                                                        <svg height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                                            style={{ fill: 'green' }}>
                                                                            <g>
                                                                                <g>
                                                                                    <path d="M12,0C5.373,0,0,5.373,0,12c0,6.628,5.373,12,12,12c6.627,0,12-5.372,12-12C24,5.373,18.627,0,12,0z M19.754,9.561 l-8.607,8.607c-0.176,0.177-0.462,0.177-0.637,0l-1.272-1.285c-0.175-0.176-0.462-0.464-0.636-0.642l-2.96-3.112 c-0.087-0.087-0.133-0.21-0.133-0.327c0-0.115,0.046-0.227,0.133-0.314l1.297-1.169c0.088-0.09,0.205-0.134,0.321-0.134 c0.114,0.001,0.228,0.046,0.315,0.134l2.936,2.995c0.175,0.178,0.461,0.178,0.637,0l6.699-6.681c0.176-0.177,0.461-0.177,0.636,0 l1.272,1.285C19.93,9.094,19.93,9.384,19.754,9.561z" />
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                        :
                                                                        <svg height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'green' }}>
                                                                            <g>
                                                                                <g>
                                                                                    <path d="M12,0C5.373,0,0,5.373,0,12c0,6.628,5.373,12,12,12c6.627,0,12-5.372,12-12C24,5.373,18.627,0,12,0z M19.754,9.561 l-8.607,8.607c-0.176,0.177-0.462,0.177-0.637,0l-1.272-1.285c-0.175-0.176-0.462-0.464-0.636-0.642l-2.96-3.112 c-0.087-0.087-0.133-0.21-0.133-0.327c0-0.115,0.046-0.227,0.133-0.314l1.297-1.169c0.088-0.09,0.205-0.134,0.321-0.134 c0.114,0.001,0.228,0.046,0.315,0.134l2.936,2.995c0.175,0.178,0.461,0.178,0.637,0l6.699-6.681c0.176-0.177,0.461-0.177,0.636,0 l1.272,1.285C19.93,9.094,19.93,9.384,19.754,9.561z" />
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                            } */}
                                                    </td>

                                                    <td className={styles.td_style}>
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
                                                    <td className={styles.td_style}>
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
                
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
