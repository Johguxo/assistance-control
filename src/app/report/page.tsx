<<<<<<< HEAD
import BarChart from "@/components/BarChart"
import PieChart from "@/components/pieChart"
import PolarAreaCharts from "@/components/PolarAreaCharts"
import DoughnutCharts from "@/components/DoughnutChart"
=======
>>>>>>> 39ae9c8a60d02b4d7e3d04a10507a9f3aa492ecf

export default function Report() {
  return (
    <div className="container">
      Chart js
      <div >
        <h3>Bar Chart</h3>
        <BarChart></BarChart>
        <h3>Pie Chart</h3>
        <PieChart></PieChart>
      </div>

      <div>
        <h3>Polar Area Chart</h3>
        <PolarAreaCharts></PolarAreaCharts>
        <h3>Doughnut Chart</h3>
        <DoughnutCharts></DoughnutCharts>
      </div>

    </div>
  );
}