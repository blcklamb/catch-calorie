import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
  TrackingListTr,
  TrackingListTd,
  TrackingListTdAction,
  TrackingListTdStart,
  TrackingListTdEnd,
  TrackingListTdInput,
  TrackingListTdInputText,
  TrackingListIconContainer,
  TrackingListIcon,
} from '../styledCompo/mainStyle';

import { ValidationTextField } from '../styledCompo/muiCustom';

import { RedSpan } from '../styledCompo/LoginStyle';

import { useRecoilState } from 'recoil';
import { trackingUpdateState } from '../../atoms';

import * as Api from '../../api';

function TrackingExerciseList({ exercise, isTrackingPage }) {
  const [trackingUpdate, setTrackingUpdate] = useRecoilState(trackingUpdateState);

  const [isEditing, setIsEditing] = useState(false);

  const [hour, setHour] = useState(parseInt(exercise.minute / 60));
  const [minute, setMinute] = useState(exercise.minute % 60);

  const [isTimeEmpty, setIsTimeEmpty] = useState(false);
  const [isHourNumber, setIsHourNumber] = useState(true);
  const [isMinNumber, setIsMinNumber] = useState(true);

  useEffect(() => {
    setHour(parseInt(exercise.minute / 60));
    setMinute(exercise.minute % 60);
  }, [exercise.minute]);

  const onChange = (e) => {
    setHour(e.target.value);
  };

  const handleCheck = async (e) => {
    setIsTimeEmpty(!Number(hour) && !Number(minute));

    setIsHourNumber(!isNaN(hour));
    setIsMinNumber(!isNaN(minute));

    try {
      if (!(!Number(hour) && !Number(minute)) && !isNaN(hour) && !isNaN(minute)) {
        await Api.put('tracking/exer', {
          id: exercise.id,
          minute: Number(hour) * 60 + Number(minute),
        });

        setIsEditing(false);
        setTrackingUpdate(!trackingUpdate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleModify = (e) => {
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    setHour(parseInt(exercise.minute / 60));
    setMinute(exercise.minute % 60);

    setIsTimeEmpty(false);
    setIsHourNumber(true);
    setIsMinNumber(true);

    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    await Api.delete(`tracking/exer/${exercise.id}`);

    setTrackingUpdate(!trackingUpdate);
  };

  const previewKcal = () => {
    //hour, minute에 숫자가 아닌 값이 입력되면 미리보기 칼로리 0
    if (!isNaN(hour) && !isNaN(minute)) {
      return Math.round(
        (exercise.calorie * (Number(hour) * 60 + Number(minute))) / exercise.minute,
      );
    } else {
      return 0;
    }
  };

  return (
    <>
      {isEditing ? (
        <TrackingListTr>
          <TrackingListTdStart>{exercise.name}</TrackingListTdStart>
          <TrackingListTdInput>
            <tr>
              <td>
                <ValidationTextField
                  id="outlined-name"
                  label="hour"
                  value={hour}
                  onChange={onChange}
                  style={{ marginRight: '30px' }}
                  helperText={
                    !isHourNumber || !isMinNumber ? (
                      <RedSpan>Please enter a number only</RedSpan>
                    ) : (
                      isTimeEmpty && <RedSpan>Please enter a time</RedSpan>
                    )
                  }
                />
              </td>
              <td>
                <ValidationTextField
                  id="outlined-name"
                  label="minute"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  style={{ marginRight: '30px' }}
                  helperText={
                    !isHourNumber || !isMinNumber ? (
                      <span style={{ color: 'white' }}>Please enter a number only</span>
                    ) : (
                      isTimeEmpty && <span style={{ color: 'white' }}>Please enter a time</span>
                    )
                  }
                />
              </td>
            </tr>
          </TrackingListTdInput>
          <TrackingListTd>{previewKcal()}kcal</TrackingListTd>
          <TrackingListTdAction>
            <TrackingListIcon src="/done.png" alt="Done" onClick={handleCheck}></TrackingListIcon>
          </TrackingListTdAction>
          <TrackingListTdEnd>
            <TrackingListIcon
              src="/cancel.png"
              alt="Cancel"
              onClick={handleCancel}
            ></TrackingListIcon>
          </TrackingListTdEnd>
        </TrackingListTr>
      ) : (
        <TrackingListTr>
          <TrackingListTdStart>{exercise.name}</TrackingListTdStart>
          <TrackingListTd>
            {parseInt(exercise.minute / 60)}H {exercise.minute % 60}M
          </TrackingListTd>
          <TrackingListTd>{exercise.calorie}kcal</TrackingListTd>
          {/* 트래킹 페이지에서만 버튼 O */}
          {isTrackingPage === 'tracking' && (
            <>
              <TrackingListTdAction>
                <TrackingListIcon
                  src="/edit.png"
                  alt="Edit"
                  onClick={handleModify}
                ></TrackingListIcon>
              </TrackingListTdAction>
              <TrackingListTdEnd>
                <TrackingListIcon
                  src="/del.png"
                  alt="Del"
                  onClick={handleDelete}
                ></TrackingListIcon>
              </TrackingListTdEnd>
            </>
          )}
        </TrackingListTr>
      )}
    </>
  );
}

export default TrackingExerciseList;
