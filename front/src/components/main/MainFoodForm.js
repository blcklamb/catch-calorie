import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import { ButtonGroup } from '@mui/material';

import MainInput from './style/MainInput';
import { AutoCompleteCustom, AddButton } from '../styledCompo/MainMuiCustom';

import {
  TrackingForm,
  TrackingAutoContainer,
  TrackingTextFieldContainer,
  TrackingSwitchContainer,
  TrackingText,
} from '../styledCompo/mainStyle';

import { ValidationTextField } from '../styledCompo/muiCustom';
import { RedSpan } from '../styledCompo/LoginStyle';

import { useRecoilState } from 'recoil';
import {
  foodListState,
  foodSelectedState,
  weightState,
  kcalPerUnitState,
  trackingFoodUnitState,
} from '../../atoms';

import * as Api from '../../api';

function MainFoodForm({ idx }) {
  const navigate = useNavigate();

  const [foodSelected, setFoodSelected] = useRecoilState(foodSelectedState);
  const [weight, setWeight] = useRecoilState(weightState);
  const [kcalPerUnit, setKcalPerUnit] = useRecoilState(kcalPerUnitState);
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [unit, setUnit] = useRecoilState(trackingFoodUnitState);

  const [checked, setChecked] = useState(true);

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState([]); // 텍스트 상자에 표시되는 값

  useEffect(() => {
    Api.get(`foods`).then((res) => setFoodList(res.data));

    // + 클릭 시 추가된 폼의 인풋을 0으로 초기화
    // setFoodSelected([...foodSelected.slice(0, idx), 0, ...foodSelected.slice(idx + 1)]);
    // setGram([...gram.slice(0, idx), 0, ...gram.slice(idx + 1)]);
  }, []);

  useEffect(() => {
    if (checked === true) {
      setUnit([...unit.slice(0, idx), 'non us', ...unit.slice(idx + 1)]);
    } else {
      setUnit([...unit.slice(0, idx), 'us', ...unit.slice(idx + 1)]);
    }
  }, [checked]);

  // const handleSwitch = (event) => {
  //   setChecked(event.target.checked);
  // };

  const onChangeFood = (e, value) => {
    setFoodSelected([...foodSelected.slice(0, idx), value, ...foodSelected.slice(idx + 1)]);
  };

  const onChangeWeight = (e) => {
    setWeight([...weight.slice(0, idx), e.target.value, ...weight.slice(idx + 1)]);
  };

  useEffect(() => {
    if (Number(weight[idx]) === 0 || !foodSelected[idx]?.kcal_per_100g) {
      setKcalPerUnit([...kcalPerUnit.slice(0, idx), 0, ...kcalPerUnit.slice(idx + 1)]);
    } else {
      const gram = unit[idx] === 'us' ? weight[idx] * 453.59 : weight[idx];

      setKcalPerUnit([
        ...kcalPerUnit.slice(0, idx),
        Math.floor((gram / 100) * foodSelected[idx]?.kcal_per_100g),
        ...kcalPerUnit.slice(idx + 1),
      ]);
    }

    if (foodSelected[idx] === null) {
      setFoodSelected([...foodSelected.slice(0, idx), 0, ...foodSelected.slice(idx + 1)]);
    }
  }, [unit[idx], weight[idx], foodSelected[idx]]);

  const buttons = [
    <Button
      key="cm/kg"
      color="success"
      variant={checked ? 'contained' : 'outlined'}
      onClick={() => setChecked(true)}
    >
      Metric
    </Button>,
    <Button
      key="ft/lb"
      color="success"
      variant={!checked ? 'contained' : 'outlined'}
      onClick={() => setChecked(false)}
    >
      U.S.Standard
    </Button>,
  ];

  return (
    <>
      <TrackingForm>
        <TrackingAutoContainer>
          <AutoCompleteCustom
            id="controllable-states-demo"
            value={foodSelected[idx]}
            onChange={(event, newValue) => {
              onChangeFood(event, newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={foodList}
            renderInput={(params) => (
              <ValidationTextField
                {...params}
                label="Food"
                placeholder="Please select food"
                helperText={!foodSelected[idx] && <RedSpan>Please select a food</RedSpan>}
              />
            )}
            getOptionLabel={(option) => option.name || ''}
            noOptionsText={
              <div>
                <p>No option</p>
                <AddButton
                  type="button"
                  onClick={() => {
                    navigate('/tracking/addFood', { replace: false });
                  }}
                >
                  Add food
                </AddButton>
              </div>
            }
          />
        </TrackingAutoContainer>
        <TrackingTextFieldContainer>
          <ValidationTextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            value={weight[idx]}
            onChange={onChangeWeight}
            style={{ width: '250px' }}
            helperText={
              !weight[idx] ? (
                <RedSpan>Please enter a weight</RedSpan>
              ) : (
                isNaN(weight[idx]) && <RedSpan>Please enter a number only</RedSpan>
              )
            }
          />
        </TrackingTextFieldContainer>
        <TrackingSwitchContainer>
          <div>
            <ButtonGroup
              style={{ marginBottom: 10, marginTop: 10 }}
              size="small"
              aria-label="small button group"
            >
              {buttons}
            </ButtonGroup>
          </div>
          {/* {console.log(foodSelected[idx]?.kcal_per_100g)}
          {idx}
          <br />
          밸류 {value}
          <br />
          인풋밸류 {inputValue}
          <br />
          {foodSelected[idx]?.kcal_per_100g} 칼로리
          <br />
          {gram[idx]} 그램
          <br />총 {(Number(gram[idx]) / 100) * foodSelected[idx]?.kcal_per_100g}
          <br /> */}
          {/* {foodSelected[idx]?.name} <br />
          {weight[idx]} <br /> */}
          <TrackingText>
            {isNaN(weight[idx]) ? 0 : kcalPerUnit[idx]} kcal/{unit[idx] === 'us' ? 'lb' : 'g'}
          </TrackingText>
        </TrackingSwitchContainer>
      </TrackingForm>
    </>
  );
}

export default MainFoodForm;
