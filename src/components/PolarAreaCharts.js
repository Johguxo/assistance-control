"use client"

import { useRef, useEffect } from "react"
import { Chart } from "chart.js/auto"

export default function PolarAreaChart() {
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.Chart) {
                chartRef.current.Chart.destroy()
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "polarArea",
                data: {
                    labels: ["John", "Jane", "Doe", "Emily", "Jack", "David", "Julio"],
                    datasets: [
                        {
                            label: "Info",
                            data: [34, 64, 23, 45, 67, 24, 64],
                            backgroundColor: [
                                "rgb(255,99,132,0.6)",
                                "rgb(255,159,64,0.6)",
                                "rgb(255,205,86,0.6)",
                                "rgb(75,192,192,0.6)",
                                "rgb(54,162,235,0.6)",
                                "rgb(153,162,235,0.6)",
                                "rgb(201,203,207,0.6)",
                            ],
                            borderColor:[
                                 "rgb(255,99,132)",
                                 "rgb(255,159,64)",
                                 "rgb(255,205,86)",
                                 "rgb(75,192,192)",
                                 "rgb(54,162,235)",
                                 "rgb(153,162,235)",
                                 "rgb(201,203,207)",
                            ],
                            borderWidth:1,
                        },
                    ],
                },
                options:{
                    // responsive:true
                },
            });

            chartRef.current.Chart=newChart
        }
    }, []);
    return <div style={{position:"relative",width:"50vw",height:"50vh"}}>
        <canvas ref={chartRef}/>
    </div>
}