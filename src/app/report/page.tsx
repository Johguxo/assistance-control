"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/components/BarChart";
import { fetchDataGraphs } from "@/controller/fetchDataGraphs";

export default function Report() {
    const [dataGraphs, setDataGraphs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const graphData = await fetchDataGraphs();
                setDataGraphs(graphData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!dataGraphs.length) {
        return <div>No data available</div>;
    }

    const { data: dataTotalInscriptions, labels: labelsTotalInscriptions } = dataGraphs[0];
    const { data: dataAssistances, labels: labelsAssistances } = dataGraphs[1];

    return (
        <div className="h-screen">
            <div className="gap-8 flex flex-col w-full h-full justify-center items-center p-24">
                <div className="flex flex-col bg-white w-1/3 h-1/2 items-center justify-center p-4 shadow-2xl rounded-3xl">
                    <h3> Total de asistentes al evento según el area </h3>
                    <BarChart labels={labelsTotalInscriptions} data={dataTotalInscriptions} />
                </div>
                <div className="flex flex-col bg-white w-1/3 h-1/2 items-center justify-center p-4 shadow-2xl rounded-3xl">
                    <h3>Total de inscritos al evento</h3>
                    <BarChart labels={labelsAssistances} data={dataAssistances} />
                </div>
            </div>
        </div>
    );
}