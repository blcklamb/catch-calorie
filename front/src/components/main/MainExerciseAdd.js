import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonGroup } from '@mui/material';

import { AddAddButton, AddCancelButton } from '../styledCompo/MainMuiCustom';

import { BodyContainer, TrackingSwitchContainer } from '../styledCompo/mainStyle';
import {
  AddFormsContainer,
  AddTitle,
  AddFormSection,
  AddFormTitle,
  AddButtonContainer,
} from '../styledCompo/Add';
import { LoginGlass, RedSpan } from '../styledCompo/LoginStyle';
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
                <ButtonGroup
                  style={{ marginBottom: -10, marginTop: 10 }}
                  size="small"
                  aria-label="small button group"
                >
                  {buttons}
                </ButtonGroup>
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
                style={{ width: '50%' }}
              />{' '}
            </AddFormSection>{' '}
          </AddFormsContainer>
          <AddButtonContainer>
            <AddAddButton variant="contained" onClick={handleSubmit}>
              Add
            </AddAddButton>
            <AddCancelButton
              variant="contained"
              onClick={() => navigate(`/tracking/${user._id}`, { replace: false })}
            >
              Cancel
            </AddCancelButton>
          </AddButtonContainer>
        </LoginGlass>
      </BodyContainer>
    </>
  );
}

export default MainExerciseAdd;
