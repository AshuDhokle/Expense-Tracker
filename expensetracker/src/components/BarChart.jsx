import { useState,useEffect } from "react";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

export default function BarChart({Data,colors}) {
  const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Expenses',
            data: [],
            backgroundColor: [],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
  useEffect(() => {
    if (Data) {
      setChartData({
        labels: ['Food','Rent','Salary','Freelancing','Utilities','Entertainment','Other'],
        datasets: [
          {
            label: 'Expenses',
            data:[Data.Food,Data.Rent,Data.Salary,Data.Freelancing,Data.Utilities,Data.Entertainment,Data.Other],
            backgroundColor: colors.map(color=>color),
            borderColor: "#01204E",
            borderWidth: 2,
          },
        ],
      });
    }
    
  }, [Data]);
  
  
  
  return (
    <div style={{ width: '400px', height: '300px' }}>
    {Data && <Bar data={chartData}  />}
      
    </div>
  );
}
