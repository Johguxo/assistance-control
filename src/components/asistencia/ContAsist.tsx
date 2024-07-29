'use client';
import React, { useEffect, useState } from 'react';
import { parroquias, colegios, univerdidad, DataRowType1, listParroquias } from '../../db';
import { fetchUsers } from '@/controller/fetchUsers';
import { fetchDeaneries } from '@/controller/fetchDeaneries';
// import { fetchInstitutions } from '@/pages/api/institutions';
import { fetchVicars } from '@/controller/fetchVicars';
import { User, Institution, Deanery, Vicaria } from '@/models/interfaces';
import { updateUserDay } from '@/controller/updateDayStatus';
import { fetchInstitutions } from '@/controller/fetchInstitutions';
import Loader from './Loader';

export const ContAsist: React.FC = () => {

    const [showDni, setShowDni] = useState(true); // Estado para mostrar columna dni
    const [showParroquia, setShowParroquia] = useState(true); // Estado para mostrar columna parroquia / dato fake
    const [currentData, setCurrentData] = useState<DataRowType1[]>(parroquias); // Estado para cambiar data // dato fake
    const [selectedOption, setSelectedOption] = useState<number | null>(1); // Estado para elegir pestaña
    const [loading, setLoading] = useState<boolean>(true); // estado del loader

    // conexion de data-back 
    const [users, setUsers] = useState<User[]>([]); // dato fake
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [deaneries, setDeaneries] = useState<Deanery[]>([]);  // datos de la db
    const [vicars, setVicars] = useState<Vicaria[]>([]);  // datos de la db
    const [selectedVicaria, setSelectedVicaria] = useState<string | null>(); // estado select
    // const [saturday, setSaturday] = useState(users.saturday);
    // const [sunday, setSunday] = useState(users.sunday);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    userData,
                    institutionData,
                    decanatoData,
                    vicarsData,
                ] = await Promise.all([
                    fetchUsers({ type: 0 }),
                    fetchInstitutions(),
                    fetchDeaneries(),
                    fetchVicars()
                ]);
                // console.log("institu -->", institutionData)
                // console.log("decanato -->", decanatoData)
                // console.log("extraccion de la DB-->", vicarsData)
                // console.log("usuarios -->", userData)
                setUsers(userData);
                setInstitutions(institutionData);
                setDeaneries(decanatoData);
                setVicars(vicarsData);
            } catch (error) {
                console.log("error")
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, []);

    // console.log("como")
    // console.log("del back -->", users)
    // console.log("para cambiar -->", colegios)
    // console.log("esta es la funciona -->", fetchUsers());
    // console.log("institu -->", institutions)
    // console.log("decanato -->", deaneries)
    // console.log("fuera de la funcion vicaria-->", vicars)

    const findUsers = async (type_institution: number | undefined = undefined) => {
        if (type_institution != undefined) {
            try {
                const userData = await fetchUsers({ type: type_institution });
                setUsers(userData);
            } catch (error) {
                console.log("error")
            }
        } else fetchUsers({})
    }

    const handleOptionChange = (option: number) => {
        setSelectedOption(option);
        switch (option) {
            case 1:
                findUsers(0)
                break;
            case 2:
                findUsers(1)
                break;
            case 3:
                findUsers(2)
                break;
            case 4:
                findUsers(3)
                break;
            case 5:
                findUsers()
                break;
            default:
                findUsers()
                break;
        }
    };

    const handleCheckboxChange = async (userId: string, day: 'saturday' | 'sunday', checked: boolean) => {
        // console.log('valor del booleano que entrea', checked);
        await updateUserDay(userId, day, !checked);
        setUsers(users.map(user => user._id === userId ? { ...user, [day]: !checked } : user));
    };

    const handleVicariaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log('valor del select actual', selectedVicaria);
        setSelectedVicaria(event.target.value);
        // console.log('valor de lo que se envia', event.target.value);
    };
    // console.log('vicaria a tratar', handleVicariaChange)
    // console.log('valor del select despues', selectedVicaria);



    const filteredDeaneries: Deanery[] = selectedVicaria
        ? vicars.find(vicar => {
            // console.log('busqueda del id:', vicar._id, selectedVicaria);
            return vicar._id === selectedVicaria;
        })?.deaneries || []
        : [];

    // console.log('filtrado', filteredDeaneries)

    return (
        <div className=' w-screen h-full flex flex-col items-center px-20 mt-10'>
            <div className="flex w-full gap-4 felx justify-between font-bold text-sm">
                <button
                    className={`w-1/3 py-2 px-4  ${selectedOption === 1 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(1)}
                >
                    GENERAL
                </button>
                <button
                    className={`w-1/3 py-2 px-4  ${selectedOption === 2 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(2)}
                >
                    PARROQUIAS
                </button>

                <button
                    className={`w-1/3 px-4 ${selectedOption === 3 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(3)}
                >
                    COLEGIOS
                </button>

                <button
                    className={`w-1/3 py-2 px-4 ${selectedOption === 4 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(4)}
                >
                    UNIVERSIDADES
                </button>
                <button
                    className={`w-1/3 py-2 px-4 ${selectedOption === 5 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'shadow-3xl mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(5)}
                >
                    LIBRES
                </button>
            </div>
            <div className='flex flex-col items-center h-full justify-baseline bg-amber-200/90  w-full mb-20 rounded-b-3xl shadow-2xl'>

                {/* SEARCH-BAR */}

                <div className='flex items-center justify-center w-full'>

                    <div className="bg-white flex w-1/2 border-gray-400 rounded-xl my-8">
                        <input
                            className="font-normal text-lg bg-white text-gray-500 block w-full py-2 px-2 border-gray-400 rounded-xl focus:outline-none"
                            type="text"
                            placeholder={'Ingrese nombre'}
                        />
                        <div className='flex items-center mx-4'>
                            {/* Icono */}
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2099 11.6369C14.0995 10.4257 14.625 8.93047 14.625 7.3125C14.625 3.27392 11.3511 0 7.3125 0C3.27392 0 0 3.27392 0 7.3125C0 11.3511 3.27392 14.625 7.3125 14.625C8.93091 14.625 10.4265 14.0992 11.6378 13.2092L11.6369 13.2099C11.6701 13.2549 11.707 13.298 11.7477 13.3387L16.0795 17.6705C16.5188 18.1098 17.2312 18.1098 17.6705 17.6705C18.1098 17.2312 18.1098 16.5188 17.6705 16.0795L13.3387 11.7477C13.298 11.707 13.2549 11.6701 13.2099 11.6369ZM13.5 7.3125C13.5 10.7298 10.7298 13.5 7.3125 13.5C3.89524 13.5 1.125 10.7298 1.125 7.3125C1.125 3.89524 3.89524 1.125 7.3125 1.125C10.7298 1.125 13.5 3.89524 13.5 7.3125Z" fill="#A1A5A7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className=" w-20 text-gray-600 flex flex-col gap-2 ml-8">
                        {
                            selectedOption === 2 && (
                                <label className="flex gap-2 text-md  items-center">
                                    <input
                                        type="checkbox"
                                        checked={showParroquia}
                                        onChange={() => setShowParroquia(!showParroquia)}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out items-center"
                                    />
                                    Parroquia
                                </label>

                            )

                        }
                        <label className="flex gap-2 text-md items-center">
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

                {/* Select */}
                <div className='flex w-11/12 h-full'>
                    {
                        selectedOption === 2 && (
                            <div className='flex flex-col items-center py-20 gap-8 w-96 text-gray-500'>
                                <select
                                    className="block w-64 py-2 border text-center border-gray-300 rounded-md shadow-sm"
                                    onChange={handleVicariaChange}
                                    value={selectedVicaria || "option-default"}
                                >

                                    <option value="option-default">SELECCIONE VICARIA</option>
                                    {
                                        vicars.map((vicars, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={vicars._id}
                                                >{vicars.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <select
                                    className="text-center block w-64 py-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="option-default">SELECCIONE DECANATO</option>
                                    {
                                        filteredDeaneries.map((deanery, i) => (

                                            <option
                                                key={i}
                                                value={deanery._id}
                                            >
                                                {deanery.name}
                                            </option>
                                        ))}
                                </select>
                                <select
                                    className="text-center block w-64 py-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="option-default">SELECCIONE PARROQUIA</option>
                                    {
                                        institutions.map((institution) => {
                                            return (
                                                <option key={institution._id} value={institution._id}>{institution.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        )
                    }
                    {/* Tabla */}
                    <div className='flex flex-col w-full h-11/12 items-center'>
                        {/* Tabla de asistencia */}
                        {
                            loading ?
                                <div className='flex h-full p-28'>

                                    <Loader />
                                </div>

                                :
                                <>

                                    <div className='w-11/12 overflow-x-auto shadow-md shadow-slate-600/50'>

                                        <table className="w-full divide-y divide-gray-200">
                                            {/* Cabecera */}
                                            <thead className="bg-gray-300">
                                                <tr>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                                                    {showDni && (
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                                                    )}
                                                    {
                                                        selectedOption === 1 && (
                                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Institucion</th>
                                                        )
                                                    }
                                                    {
                                                        selectedOption === 2 && (
                                                            showParroquia && (
                                                                <>
                                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Decanato</th>
                                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Vicaria</th>
                                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Parroquia</th>
                                                                </>
                                                            )
                                                        )

                                                    }
                                                    {
                                                        selectedOption === 3 && (
                                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Colegio</th>
                                                        )
                                                    }
                                                    {
                                                        selectedOption === 4 && (
                                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Universidad</th>
                                                        )

                                                    }
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sábado</th>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Domingo</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {/* Cuerpo de Tabla */}
                                                {users.map((row) => (
                                                    <tr key={row._id} >
                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-500">{row.first_name}</td>
                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.last_name}</td>
                                                        {showDni && (
                                                            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.DNI}</td>
                                                        )}
                                                        {
                                                            selectedOption !== 2 && selectedOption !== 5 && (
                                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.institution?.name}</td>
                                                            )}

                                                        {
                                                            selectedOption === 2 && (
                                                                showParroquia && (
                                                                    <>
                                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.institution.deanery?.vicar.name}</td>
                                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.institution.deanery?.name}</td>
                                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.institution.name}</td>
                                                                    </>
                                                                )
                                                            )
                                                        }

                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                                            <input
                                                                type="checkbox"
                                                                defaultChecked={row.saturday}
                                                                onChange={() => handleCheckboxChange(row._id, 'saturday', row.saturday)}
                                                                className="ml-2 cursor-pointer"
                                                            />

                                                        </td>
                                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                                            <input
                                                                type="checkbox"
                                                                defaultChecked={row.sunday}
                                                                onChange={() => handleCheckboxChange(row._id, 'sunday', row.sunday)}
                                                                className="ml-2 cursor-pointer"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
