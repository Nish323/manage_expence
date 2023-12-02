import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from '@mui/material';

Chart.register(...registerables);

const getCategoryColor = (categoryId) => {
  const baseHue = 200;
  const hue = (baseHue + (categoryId - 1) * 30) % 360;
  const rgbColor = `hsl(${hue}, 70%, 50%)`;
  return rgbColor;
};

const Graph = (props) => {
  const { CmonthTotals, categories } = props;
  

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const decrementYear = () => {
    setSelectedYear((prevYear) => prevYear - 1);
  };

  const incrementYear = () => {
    setSelectedYear((prevYear) => prevYear + 1);
  };

  const groupedData = {};
  CmonthTotals.forEach((item) => {
    const categoryId = item.category_id;
    if (!groupedData[categoryId]) {
      groupedData[categoryId] = [];
    }
    groupedData[categoryId].push(item);
  });
  
  console.log(CmonthTotals, selectedYear);
  console.log(typeof selectedYear);
  if (Array.isArray(CmonthTotals) && CmonthTotals.length > 0) {
  // 配列の最初の要素のyearプロパティの型を確認
  console.log(typeof CmonthTotals[0].year);
} else {
  console.log("CmonthTotals is not a non-empty array");
}

    console.log(CmonthTotals);
    console.log(selectedYear);
     const filteredData = CmonthTotals.filter(
      (item) => true
    );
    console.log(filteredData);

  const labels = Array.from(
    new Set(
      categories.flatMap((category) =>
        groupedData[category.id]?.map((item) => item.month) || []
      )
    )
  ).sort((a, b) => new Date(a) - new Date(b));

  const datasets = categories.map((category) => {
    const categoryId = category.id;
    const dataValues = labels.map((month) => {
      const selectedItem = groupedData[categoryId]?.find(
        (item) => item.month === month && (!selectedYear || new Date(item.year).getFullYear() === selectedYear)
      );
      return selectedItem?.expense_total || 0;
    });

    return {
      label: category.name,
      data: dataValues,
      borderColor: getCategoryColor(categoryId),
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const availableYears = Array.from(new Set(filteredData.map((item) => new Date(item.year).getFullYear())));

  return (
    <Authenticated auth={props.auth} header={
      <div>
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Transition
        </h2>
        <div>
          <Button onClick={decrementYear}>{'<'}</Button>
          <span> {selectedYear} 年 </span>
          <Button onClick={incrementYear}>{'>'}</Button>
        </div>
      </div>
    }>
      <Line height={80} width={200} data={data} />
    </Authenticated>
  );
};

export default Graph;
