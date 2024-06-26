import { useState,useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);
export default function Dougunut({Data,Categories,colors}) {
  const [chartData,setChartData] = useState({
    labels:[Categories.map(cat=>cat)],
    datasets:[
      {
        label:'Expenses',
        data:[Data.Earned,Data.Spent],
        backgroundColor: [
          colors.map(color=>color)
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  })

  useEffect(() => {
    if (Data) {
      setChartData({
        labels: Categories.map(cat=>cat),
        datasets: [
          {
            label: 'Expenses',
            data: [Data.Earned, Data.Spent],
            backgroundColor: colors.map(color=>color),
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
    
  }, [Data]);
  

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={chartData} />
    </div>
  );
}
