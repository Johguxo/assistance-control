import BarChart from "@/components/BarChart"
import PieChart from "@/components/pieChart"
import PolarAreaCharts from "@/components/PolarAreaCharts"
import DoughnutCharts from "@/components/DoughnutChart"


export default function Report() {
  return (
    <div className="h-screen">

      <div className="gap-8 flex flex-col w-full h-full flex justify-center items-center p-24">
        <div className="flex flex-col bg-white w-1/3 h-1/2 items-center justify-center p-4 shadow-2xl rounded-3xl">
          <h3>Bar Chart</h3>
          <BarChart />
        </div>
        <div className="flex w-4/5 h-1/2 gap-8">
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