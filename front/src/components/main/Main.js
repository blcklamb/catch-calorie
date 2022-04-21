import React, { useState } from 'react';

import MainTabs from './MainTabs';
import MainGraph from './MainGraph';

const Main = () => {
	const [foodSelected, setFoodSelected] = useState('');
	const [exerciseSelected, setExerciseSelected] = useState('');

	return (
		<div>
			<div>안녕하세요 땡땡땡님!</div>

			<MainTabs
				foodSelected={foodSelected}
				setFoodSelected={setFoodSelected}
				exerciseSelected={exerciseSelected}
				setExerciseSelected={setExerciseSelected}
			/>
			<MainGraph
				foodSelected={foodSelected}
				setFoodSelected={setFoodSelected}
				exerciseSelected={exerciseSelected}
				setExerciseSelected={setExerciseSelected}
			/>
		</div>
	);
};

export default Main;
