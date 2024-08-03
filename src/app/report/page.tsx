"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/pieChart";
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
                console.log("here")
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function sumArray(arr: number[]) {
        var total: number = 0;
        arr.forEach(function(num) {
          total += num;
        });
        return total;
      }

    if (!dataGraphs.length) {
        return <div>No data available</div>;
    }

    const { data: dataTotalInscriptions, labels: labelsTotalInscriptions } = dataGraphs[0];
    const { data: dataAssistances, labels: labelsAssistances } = dataGraphs[1];

    return (
        <div className="h-screen">
            {
                !loading ?
                (<div className="gap-8 grid grid-cols-2 w-full h-full justify-center items-center p-24">
                    <div className="grid gap-2 grid-rows-2">
                        <div className="flex flex-col bg-white items-center justify-center p-4 shadow-2xl rounded-3xl">
                            <h3> Total de asistentes al evento: {sumArray(dataTotalInscriptions)} </h3>
                            <BarChart title='Total de asistentes al evento según el area' labels={labelsTotalInscriptions} data={dataTotalInscriptions} />
                        </div>
                        <div className="flex flex-col bg-white items-center justify-center p-4 shadow-2xl rounded-3xl">
                            <h3>Total de inscritos al evento: {sumArray(dataAssistances)}</h3>
                            <BarChart title='Total de inscritos al evento' labels={labelsAssistances} data={dataAssistances} />
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                        <div className="flex flex-col bg-white items-center justify-center p-4 shadow-2xl rounded-3xl">
                            <h3> Total de asistentes al evento: {sumArray(dataTotalInscriptions)}</h3>
                            <PieChart title='Total de asistentes al evento según el area' labels={labelsTotalInscriptions} data={dataTotalInscriptions} />
                        </div>
                        <div className="flex flex-col bg-white items-center justify-center p-4 shadow-2xl rounded-3xl">
                            <h3>Total de inscritos al evento: {sumArray(dataAssistances)}</h3>
                            <PieChart title='Total de inscritos al evento' labels={labelsAssistances} data={dataAssistances} />
                        </div>
                    </div>
                </div>)
                :
                (
                    <div>Loading...</div>
                )
            }
           
        </div>
    );
}