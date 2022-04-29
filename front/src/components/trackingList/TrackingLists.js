import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import Button from '@mui/material/Button';

import TrackingFoodList from './TrackingFoodList';
import TrackingExerciseList from './TrackingExerciseList';

import * as Api from '../../api';

function TrackingLists({ user }) {
  const params = useParams();

  // const [isEditing, setIsEditing] = useState(false)
  const [trackingList, setTrackingList] = useState('');

  const list = {
    _id: { $oid: '626a0e0c9cb6fcce010cc8ad' },
    user_id: { $oid: '6269e866dcb6c02563b8e561' },
    date: '2022-04-28',
    rec_cal: 194425,
    food_record: [
      { id: 'c878c2a2-e983-40f5-a2ad-8a3fb236f753', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'faca014f-c778-4427-ac58-830e65d9bbb6', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'e5db3951-cd69-49dd-be43-271c5cd71fa8', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '2b2eb415-e681-47c7-9b17-d1086265b046', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'cefe5a1d-5b41-4dd6-a65b-41a5066c0e15', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'f9e428c5-1da9-44ca-a6fe-65f16fba3566', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '365b9872-66ca-4047-9dee-dfc95ce8a104', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'ae5691ac-7ba7-4b7c-9839-f15fe31dfb67', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '6207199d-44f0-436c-8a26-89ed8907ca41', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '9b3843b9-6e89-4792-b495-e38cc5e42690', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '826f6328-5af3-4b7e-a3dd-e1e7ad7a9808', name: 'Canned Figs', gram: 0, calorie: 0 },
      {
        id: '509ede66-92ac-40a4-a5f4-0591cd78eae4',
        name: 'Canned Blueberries',
        gram: 88,
        calorie: 77.44,
      },
      {
        id: '95119f16-bcf1-4290-b191-6db619298106',
        name: 'Canned Blueberries',
        gram: 55,
        calorie: 48.4,
      },
      {
        id: 'a3ed7d5a-e01d-40f5-9a4b-2baedddd78ed',
        name: 'Canned Cherries',
        gram: 100,
        calorie: 54,
      },
      {
        id: 'baab32f7-0412-4a2c-80b6-f57d2faffb2c',
        name: 'Applesauce',
        gram: 12,
        calorie: 7.4399999999999995,
      },
      {
        id: 'ad96914d-71ad-429e-a151-8cd91ef89579',
        name: 'Canned Cherries',
        gram: 100,
        calorie: 54,
      },
      {
        id: '4c178a3a-d33b-4bd1-b7b3-6c76a41d13b9',
        name: 'Canned Cherries',
        gram: 900,
        calorie: 486.00000000000006,
      },
      { id: 'e3dfaf4b-ca10-4509-8cda-92092c1fce3d', name: 'Applesauce', gram: 100, calorie: 62 },
      {
        id: '1b99f1e8-2bf8-4326-b19a-0364edc27fbb',
        name: 'Canned Cranberries',
        gram: 23,
        calorie: 40.94,
      },
      {
        id: 'c55a2fc1-510c-47fa-8679-64b8f4d042cc',
        name: 'Canned Gooseberries',
        gram: 0,
        calorie: 0,
      },
      { id: '669f4bd3-974d-4e34-b258-1f30e8060c39', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '48bf22b3-23db-4227-a969-c3d51bd347f9', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'd7631df2-e57f-445b-8d56-5e9411cfc34e', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '94c318b2-21d3-4377-a16a-aa535584f93c', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '6da9266d-434d-483d-8e5d-7f5631c1a15a', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'eaea8d85-d7e6-4ec8-9ed9-cc751e7ac490', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '6951377a-73e5-4877-82d0-cedfd755bb62', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '307dab1d-b6e9-462a-b232-669b886d12f9', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '9aa48ab9-26ed-46c4-a51d-6b9633b44991', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '3380ef2d-eaa2-4d79-a563-25ceceee675b', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'd2e7cd99-d673-4c74-94bd-cba60311096e', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '6353473d-32c7-41da-a335-5dba4e2427e5', name: 'Chicken', gram: 300, calorie: 657 },
      { id: '94aa9908-5b86-44dd-9769-febc067ef82d', name: 'Chicken', gram: 300, calorie: 657 },
      { id: 'eb04acf4-544c-4c71-8857-3d123112f9f9', name: 'Chicken', gram: 300, calorie: 657 },
    ],
    exer_record: [
      {
        id: 'eb86c7d2-fd14-49af-a8cf-3a2d73808140',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: '56fdbf3a-266e-4e19-94be-a28bdb741ce9',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: 'a17559a7-df75-497c-bb01-735f109dc838',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: '10beccb6-f65d-48d4-aeb7-503296a0d3d7',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: '9cd7c5bd-bdb6-4ad8-86eb-af34931f6a0a',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: '2dbd84ad-6612-4dd1-9a5e-e81e3d1c6fd0',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: '0001cc96-0bd6-4e18-9437-2b629781ee70',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: 'cc1b24f4-0141-4cf2-ad5c-3b46a5641b02',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: 'ddf97c97-6370-4656-9f68-fb180d4331d7',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      {
        id: '6aae6b22-2040-42f4-93e1-9abdba538dd6',
        name: 'Swimming',
        minute: 120,
        calorie: 18331.5,
      },
      { id: '8b29ff2b-d060-4166-8954-41bd51334938', name: 'Swimming', minute: 120, calorie: 0 },
      { id: '6158e2ec-cf1a-4c04-9638-cb729dfeda8d', name: 'Swimming', minute: 120, calorie: 0 },
      { id: '82268625-6d9d-4b82-aeb6-0ca2e181f317', name: 'Swimming', minute: 120, calorie: 0 },
      { id: '93f94214-1fc7-4034-800e-d6cd4a48aeba', name: 'Swimming', minute: 120, calorie: 0 },
      { id: '7de1e99f-9e6f-426d-97ea-c6d2449c9afa', name: 'Swimming', minute: 120, calorie: 0 },
    ],
    acc_cal: -166716.78,
    createdAt: { $date: { $numberLong: '1651117580442' } },
    updatedAt: { $date: { $numberLong: '1651149703185' } },
    __v: 0,
  };

  // const testId = '626a3729ba01295e19fc9e11';
  // const userId = user._id;
  // const user_Id = '626a377e9c156294b58377af';
  // console.log(params.user_id);

  useEffect(() => {
    Api.get(`tracking/${params.user_id}`).then((res) => {
      console.log(res.data);
      setTrackingList(res.data);
    });
    // setTrackingList(list);
  }, []);

  const handleModify = () => {};

  return (
    <>
      트래킹 리스트 데모
      {/* {console.log(trackingList)} */}
      <div>
        <h1>Food</h1>
        {trackingList.food_record?.length ? (
          trackingList.food_record.map((food) => {
            return (
              <TrackingFoodList food={food} />
              // <div>
              //   {food.name}
              //   {food.calorie}
              //   <Button variant="contained" type="submit" onClick={() => handleModify}>
              //     Modify
              //   </Button>
              //   <Button variant="contained" type="submit">
              //     Delete
              //   </Button>
              // </div>
            );
          })
        ) : (
          <div>No Food Tracking</div>
        )}
      </div>
      <div>
        <h1>Exercise</h1>
        {trackingList.exer_record?.length ? (
          trackingList.exer_record.map((exercise) => {
            return (
              // console.log('dsf')
              <TrackingExerciseList exercise={exercise} />
              // <div>
              //   {exercise.name}
              //   {exercise.calorie}
              //   <Button variant="contained" type="submit">
              //     Modify
              //   </Button>
              //   <Button variant="contained" type="submit">
              //     Delete
              //   </Button>
              // </div>
            );
          })
        ) : (
          <div>No Exercise Tracking</div>
        )}
      </div>
    </>
  );
}

export default TrackingLists;
