import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

import MainButton from './style/MainButton';

import { BodyContainer, TrackingSwitchContainer } from '../styledCompo/mainStyle';
import {
  AddGlassBodyContainer,
  AddFormsContainer,
  AddTitle,
  AddFormSection,
  AddFormTitle,
  AddButtonContainer,
} from '../styledCompo/Add';
import { LoginGlass, TitleText, RedSpan } from '../styledCompo/LoginStyle';
import { ValidationTextField } from '../styledCompo/muiCustom';

import Header from '../Header';
import Footer from '../Footer';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

import * as Api from '../../api';

function MainExerciseAdd({}) {
  const navigate = useNavigate();

  const user = useRecoilValue(userInfoState);

  const [name, setName] = useState();
  const [kcal, setKcal] = useState();
  const [unit, setUnit] = useState('kilogram');

  const [checked, setChecked] = useState(true);

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isKcalEmpty, setIsKcalEmpty] = useState(false);
  const [isKcalNumber, setIsKcalNumber] = useState(true);

  useEffect(() => {
    if (checked === true) {
      setUnit('kilogram');
    } else {
      setUnit('pound');
    }
  }, [checked]);

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async () => {
    setIsNameEmpty(!name);
    setIsKcalEmpty(!kcal);
    setIsKcalNumber(Number(kcal) > 0);

    try {
      if (name && kcal && Number(kcal) > 0) {
        await Api.post(`exercises`, {
          name: name,
          kcal: kcal,
          unit: unit,
        }).then((res) => res.status === 201 && alert('Exercise has been added'));
        navigate(`/tracking/${user._id}`, { replace: false });
      }
    } catch (err) {
      alert('Exercise that already exists');
    }
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <LoginGlass style={{ marginTop: '150px' }}>
          <AddTitle>
            Add <br />
            Exercise
          </AddTitle>
          <AddFormsContainer>
            <AddFormSection>
              <AddFormTitle>Please Enter a Name</AddFormTitle>
              <ValidationTextField
                id="outlined-basic"
                label="exercise name"
                variant="outlined"
                inputValue={name}
                onBlur={(e) => setName(e.target.value)}
                helperText={isNameEmpty && <RedSpan>Please enter a name</RedSpan>}
                style={{ width: '100%' }}

              />
            </AddFormSection>
            <AddFormSection>
              <AddFormTitle>Please Enter a Kcal Per Unit Weight</AddFormTitle>
              <TrackingSwitchContainer>
                {unit}
                <Switch
                  checked={checked}
                  onChange={handleSwitch}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TrackingSwitchContainer>
              <ValidationTextField
                id="outlined-basic"
                label="kcal"
                variant="outlined"
                inputValue={kcal}
                onBlur={(e) => setKcal(e.target.value)}
                helperText={
                  isKcalEmpty ? (
                    <RedSpan>Please enter a kcal per unit weight</RedSpan>
                  ) : (
                    !isKcalNumber && <RedSpan>Please enter a number only</RedSpan>
                  )
                }
                style={{ width: '70%' }}

              />{' '}
            </AddFormSection>{' '}
          </AddFormsContainer>
          <AddButtonContainer>
            <MainButton variant="contained" onClick={handleSubmit}>
              Add
            </MainButton>
            <MainButton
              variant="contained"
              onClick={() => navigate(`/tracking/${user._id}`, { replace: false })}
            >
              Cancel
            </MainButton>
          </AddButtonContainer>
        </LoginGlass>
      </BodyContainer>
    </>
  );
}

export default MainExerciseAdd;
