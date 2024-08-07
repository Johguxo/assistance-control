"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/pieChart";
import { fetchDataGraphs } from "@/controller/fetchDataGraphs";
import Loader from "@/components/asistencia/Loader";
export default function Report() {
    const [dataGraphs, setDataGraphs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const graphData = await fetchDataGraphs();
                setDataGraphs(graphData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                console.log("here")
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function sumArray(arr: number[]) {
        var total: number = 0;
        arr.forEach(function (num) {
            total += num;
        });
        return total;
    }

    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    if (!dataGraphs.length) {
        return <div>No data available</div>;
    }

    const { data: dataTotalInscriptions, labels: labelsTotalInscriptions } = dataGraphs[0];
    const { data: dataAssistances, labels: labelsAssistances } = dataGraphs[1];

    return (
        <div className="h-full w-full flex justify-center items-center">
            {!loading ? (
                <div className="flex flex-col w-full h-full justify-center gap-12 p-10">
                    <div className="flex flex-col md:flex-row justify-center  items center gap-12 h-full w-full">
                        <div className="flex flex-col bg-white w-auto md:w-1/2 justify-center items-center p-4 shadow-2xl rounded-3xl text-md">
                            <h3>Total de asistentes al evento: {sumArray(dataTotalInscriptions)}</h3>
                            <BarChart
                                title="Total de asistentes al evento según el area"
                                labels={labelsTotalInscriptions}
                                data={dataTotalInscriptions}
                            />
                        </div>
                        <div className="flex flex-col bg-white w-full md:w-1/2 justify-center items-center p-4 shadow-2xl rounded-3xl">
                            <h3>Total de inscritos al evento: {sumArray(dataAssistances)}</h3>
                            <BarChart
                                title="Total de inscritos al evento"
                                labels={labelsAssistances}
                                data={dataAssistances}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center gap-12 w-full">
                        <div className="flex flex-col bg-white justify-center items-center p-4 shadow-2xl rounded-3xl h-fullw-full md:w-1/2">
                            <h3>Total de asistentes al evento: {sumArray(dataTotalInscriptions)}</h3>
                            <PieChart
                                title="Total de asistentes al evento según el area"
                                labels={labelsTotalInscriptions}
                                data={dataTotalInscriptions}
                            />
                        </div>
                        <div className="flex flex-col bg-white justify-center items-center p-4 shadow-2xl rounded-3xl w-full md:w-1/2">
                            <h3>Total de inscritos al evento: {sumArray(dataAssistances)}</h3>
                            <PieChart
                                title="Total de inscritos al evento"
                                labels={labelsAssistances}
                                data={dataAssistances}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>

    );
}