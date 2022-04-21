import React, { useState } from 'react';

function MainGraph({ foodSelected, setFoodSelected, exerciseSelected, setExerciseSelected }){
	return (
		<div>
            <div>{foodSelected}</div>
            <div>{exerciseSelected}</div>
        </div>
	);
}

export default MainGraph;