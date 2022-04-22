import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function MainGraph({
	foodSelected,
	setFoodSelected,
	IsFoodSelected,
	setIsFoodSelected,
	exerciseSelected,
	setExerciseSelected,
}) {
	// const [totalFood, setTotalFood] = useState(0);

	const labels = ['오늘의 칼로리'];

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
				display: true,
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

    // 여기서 작업 멈춤!!!!!!!!!!!!!!!!!!!! 아마 동기/비동기 때문에 적용이 안되는 듯
	// useEffect(() => {
	// 	// setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal, 0));
	// 	if (IsFoodSelected) {
	// 		setTotalFood(foodSelected.reduce((acc, cur) => acc + cur.kcal, 0));
	// 	}
	// }, [IsFoodSelected]);
	// // IsFoodSelected && console.log('dfs')

	// // if (IsFoodSelected) {
	// // 	const totalFood = foodSelected.reduce((acc, cur) => acc + cur.kcal, 0);
	// // }
	const totalFood = foodSelected.reduce((acc, cur) => acc + cur.kcal, 0);

	const totalKcal = () => {
		if (!exerciseSelected?.kcal) {
			return [totalFood];
		} else if (!foodSelected?.kcal) {
			return [0 - exerciseSelected?.kcal];
		} else {
			return [totalFood - exerciseSelected?.kcal];
		}
	};

	const data = {
		labels: labels,
		datasets: [
			{
				label: '현재 칼로리',
				data: totalKcal(),
				backgroundColor: ['rgba(255, 99, 132, 0.2)'],
				borderColor: ['rgb(255, 99, 132)'],
				borderWidth: 1,
			},
			{
				label: '최대 칼로리',
				data: [3000],
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
			console.log(food, idx);
			const newDataset = {
				label: food.label,
				backgroundColor: backgroundColor[idx],
				borderColor: borderColor[idx],
				borderWidth: 1,
				data: [food.kcal],
			};

			data.datasets.splice(1, 0, newDataset);
		});
	};

	addData();

	return (
		<div>
			<div>
				{foodSelected.map((food) => food.label)}
				<br />
				{foodSelected.map((food) => food.kcal)}
				<br />
				총합
				{foodSelected.reduce((acc, cur) => acc + cur.kcal, 0)}
			</div>
			<div>
				{exerciseSelected.label}
				{exerciseSelected.kcal}
			</div>
			<div style={{ width: 400 }}>
				<Bar data={data} options={options} height={300} />
			</div>
		</div>
	);
}

export default MainGraph;
