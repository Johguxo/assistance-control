'use client';
import React, { useState } from 'react';
import { parroquias, colegios, univerdidad, DataRowType1, vicarias, decanatos, listParroquias } from '../../db';


export const ContAsist: React.FC = () => {

    const [showDni, setShowDni] = useState(true); // Estado para mostrar columna dni
    const [showParroquia, setShowParroquia] = useState(true); // Estado para mostrar columna parroquia
    const [currentData, setCurrentData] = useState<DataRowType1[]>(parroquias); // Estado para cambiar data
    const [selectedOption, setSelectedOption] = useState<number | null>(1); // Estado para elegir pestaña

    const handleOptionChange = (option: number) => {
        setSelectedOption(option);
        switch (option) {
            case 1:
                setCurrentData(parroquias);
                break;
            case 2:
                setCurrentData(colegios);
                break;
            case 3:
                setCurrentData(univerdidad);
                break;
            default:
                setCurrentData(parroquias);
                break;
        }
    };


    return (
        <div className=' w-11/12 flex flex-col items-center'>
            <div className="flex w-full gap-4 felx justify-between font-bold text-sm">
                <button
                    className={`w-1/3 py-2 px-4  ${selectedOption === 1 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(1)}
                >
                    PARROQUIAS
                </button>

                <button
                    className={`w-1/3 px-4 ${selectedOption === 2 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(2)}
                >
                    COLEGIOS
                </button>

                <button
                    className={`w-1/3 py-2 px-4 ${selectedOption === 3 ? 'bg-amber-200/90 text-green-700 rounded-t-md py-2' : 'mb-2 rounded-md bg-green-700/90 text-amber-200'}`}
                    onClick={() => handleOptionChange(3)}
                >
                    UNIVERSIDADES
                </button>
            </div>
            <div className='items-center justify-center bg-amber-200/90 flex w-full pb-20'>
                {/* Select */}
                {
                    selectedOption === 1 ? (
                        <div className='flex flex-col items-center py-40 gap-8 w-1/4 text-gray-500'>
                            <select
                                className="block w-3/4 py-2 border text-center border-gray-300 rounded-md shadow-sm"
                            >   <option value="option-default">VICARIA</option>
                                {
                                    vicarias.map((vicaria) => {
                                        return (
                                            <option key={vicaria.id} value={vicaria.id}>{vicaria.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <select
                                className="text-center block w-3/4 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="opcion1">DECANATO</option>
                                {
                                    decanatos.map((decanato) => {
                                        return (
                                            <option key={decanato.id} value={decanato.id}>{decanato.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <select
                                className="text-center block w-3/4 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="opcion1">PARROQUIA</option>
                                {
                                    listParroquias.map((vicaria) => {
                                        return (
                                            <option key={vicaria.id} value={vicaria.id}>{vicaria.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    ) : null

                }
                {/* SearchBar - Tabla */}
                <div className='flex flex-col w-3/4 h-full items-center'>
                    {/* SearchBar */}
                    <div className='flex justify-center items-center py-2 gap-8 w-full'>
                        <div className="bg-white flex w-4/6 h-2/3 border-gray-400 rounded-xl">
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
                        {/* Controladores de visibilidad de columnas */}
                        <div className="text-gray-600 flex flex-col gap-2">

                            {
                                selectedOption === 1 && (
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
                    {/* Tabla de asistencia */}
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
                                        selectedOption === 2 ? (
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Colegio</th>
                                        ) : null
                                    }
                                    {
                                        selectedOption === 3 ? (
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Universidad</th>
                                        ) : null

                                    }
                                    {
                                        selectedOption === 1 ? (
                                            showParroquia && (
                                                <>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Decanato</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Vicaria</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Parroquia</th>
                                                </>
                                            )
                                        ) : null

                                    }

                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sábado</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Domingo</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Cuerpo de Tabla */}
                                {currentData.map((row, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-500">{row.name}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.lastName}</td>
                                        {showDni && (
                                            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.dni}</td>
                                        )}
                                        {
                                            selectedOption === 2 ? (
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.school}</td>
                                            ) : null
                                        }
                                        {
                                            selectedOption === 3 ? (
                                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.university}</td>
                                            ) : null

                                        }
                                        {
                                            selectedOption === 1 ? (
                                                showParroquia && (
                                                    <>
                                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.decanato}</td>
                                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.vicaria}</td>
                                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{row.church}</td>
                                                    </>
                                                )
                                            )
                                                : null

                                        }

                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
