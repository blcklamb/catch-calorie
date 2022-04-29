import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function MainGraph({
  foodSelected,
  setFoodSelected,
  totalFood,
  setTotalFood,
  exerciseSelected,
  setExerciseSelected,
  totalExercise,
  kcalPerGram,
  setKcalPerGram,
  kcalPerHour,
  setKcalPerHour,
}) {
  const labels = ["Today's calories"];

  const options = {
    // legend: {
    // 	display: false, // label 보이기 여부
    // },
    // scales: {
    // 	yAxes: [
    // 		{
    // 			ticks: {
    // 				min: 0, // y축 스케일에 대한 최소값 설정
    // 				stepSize: 1, // y축 그리드 한 칸당 수치
    // 			},
    // 		},
    // 	],
    // },

    // // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // // true : 크기가 알아서 결정됨.
    // maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: '오늘의 칼로리',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // const totalGram = gram.reduce((acc, cur) => Number(acc) + Number(cur), 0);

  const totalKcal = totalFood - totalExercise;

  const remainingKcal = () => {
    // console.log(totalFood)
    // console.log(kcalPerGram)
    // 엑스(clear) 눌러서 처리됐을 경우 처리, 추후 함수로 분리
    if (foodSelected[0] === null) {
      // 음식이 없을 경우
      // console.log('첫')
      setFoodSelected([]);
    }
    if (totalFood - totalExercise < 0) {
      // console.log('둘')
      return [3000];
    }
    if (isNaN(kcalPerGram[0])) {
      // console.log('셋')
      return [3000 - totalKcal];
    }
    // console.log('넷')
    return [3000 - totalKcal - kcalPerGram.reduce((acc, cur) => acc + cur, 0)];
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Current Calories',
        data: [totalKcal],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgb(255, 99, 132)'],
        borderWidth: 1,
      },
      {
        label: 'Calories Remaining',
        data: remainingKcal(),
        backgroundColor: ['rgba(201, 203, 207, 0.2)'],
        borderColor: ['rgb(201, 203, 207)'],
        borderWidth: 1,
      },
    ],
  };

  const backgroundColor = [
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ];

  const borderColor = [
    'rgba(255, 159, 64)',
    'rgba(255, 205, 86)',
    'rgba(75, 192, 192)',
    'rgba(54, 162, 235)',
    'rgba(153, 102, 255)',
  ];

  const addData = () => {
    foodSelected.map((food, idx) => {
      const newDataset = {
        label: food?.name,
        backgroundColor: backgroundColor[idx],
        borderColor: borderColor[idx],
        borderWidth: 1,
        data: [kcalPerGram[idx]],
      };

      data.datasets.splice(1, 0, newDataset);
    });
    exerciseSelected.map((exercise, idx) => {
      const newDataset = {
        label: exercise?.name,
        backgroundColor: backgroundColor[idx],
        borderColor: borderColor[idx],
        borderWidth: 1,
        data: [-kcalPerHour[idx]]
        // data: [-exercise?.kcal],
      };

      data.datasets.splice(1, 0, newDataset);
    });
  };

  addData();

  return (
    <div>
      {/* <div>
        {foodSelected.map((food) => food?.label)}
        <br />
        {foodSelected.map((food) => food?.kcal)}
        <br />
        미리보기 합{foodSelected.reduce((acc, cur) => acc + cur?.kcal, 0)}
        <br />
        총합
        {totalFood}
      </div>
      <div>
        {exerciseSelected.map((exercise) => exercise?.label)}
        <br />
        {exerciseSelected.map((exercise) => exercise?.kcal)}
        <br />
      </div> */}
      {/* {console.log(exerciseSelected)} */}
      <div style={{ width: 400 }}>
        <Bar data={data} options={options} height={300} />
      </div>
    </div>
  );
}

export default MainGraph;