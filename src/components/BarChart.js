"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart({ title, labels, data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.Chart) {
                chartRef.current.Chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        {
                            label: title,
                            data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)",
                                "rgba(75, 192, 192, 0.6)",
                                "rgba(153, 102, 255, 0.6)",
                                "rgb(194, 199, 243, 0.6)",
                                "rgba(223, 224, 226, 0.6)",
                                "rgba(47, 177, 64, 0.6)"
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(194, 199, 243, 1)",
                                "rgba(223, 224, 226, 1)",
                                "rgba(47, 177, 64, 1)"
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: "category",
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            chartRef.current.Chart = newChart;
        }
    }, [labels, data, title]);

    return (
        <div className='flex items-center justify-center' style={{ width: "100%" }}>
            <canvas ref={chartRef} />
        </div>
    );
}