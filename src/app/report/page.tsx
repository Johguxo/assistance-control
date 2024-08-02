
"use client";
import React, { useEffect, useState, ChangeEvent } from "react";

import BarChart from "@/components/BarChart"
import PieChart from "@/components/pieChart"
import PolarAreaCharts from "@/components/PolarAreaCharts"
import DoughnutCharts from "@/components/DoughnutChart"
import { fetchDataGraphs } from "@/controller/fetchDataGraphs"


export default function Report() {
  const [dataGraphs, setDataGraphs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      try {
          const institutionData = await fetchDataGraphs();
          setDataGraphs(institutionData);
      } catch (error) {
          console.log("error");
      } finally {
          setLoading(false);
      }
    };
    fetchData();
  }, []);

  const labelsBar = ["John", "Jane", "Doe", "Emily", "Jack", "David", "Julio"];
  const dataBar = [34, 64, 23, 45, 67, 24, 64];

  return (
    <div className="h-screen">
      <div className="gap-8 flex flex-col w-full h-full justify-center items-center p-24">
        <div className="flex flex-col bg-white w-1/3 h-1/2 items-center justify-center p-4 shadow-2xl rounded-3xl">
          <h3>Bar Chart</h3>
          <BarChart labels={labelsBar} data={dataBar}/>
        </div>
        <div className="flex w-3/2 h-2/3 gap-8">
          <div className="flex flex-col bg-white w-1/3 p-4 items-center shadow-2xl rounded-3xl">
            <h3>Pie Chart</h3>
            <PieChart />
          </div>
          <div className="flex flex-col bg-white w-1/3 p-4 items-center shadow-2xl rounded-3xl">
            <h3>Polar Area Chart</h3>
            <PolarAreaCharts />
          </div>
          <div className="flex flex-col bg-white w-1/3 p-4 items-center shadow-2xl rounded-3xl">
            <h3>Doughnut Chart</h3>
            <DoughnutCharts />
          </div>
        </div>
      </div>

    </div>
  );
}