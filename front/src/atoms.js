import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 유저 로그인시 받는 데이터 전체
export const userState = atom({
  key: 'userState',
  default: { user: null },
  effects_UNSTABLE: [persistAtom],
});

// 유저 로그인시 받는 데이터(토큰이 있는)
export const tokenState = atom({
  key: 'tokenState',
  default: { token: null },
  effects_UNSTABLE: [persistAtom],
});

// 유저 정보
export const userInfoState = atom({
  key: 'userInfoState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

// 음식 전체 리스트
export const foodListState = atom({
  key: 'foodListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 개인 트래킹 정보
export const trackingState = atom({
  key: 'trackingState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const foodSelectedState = atom({
  key: 'foodSelectedState',
  default: [0],
});

export const exerciseSelectedState = atom({
  key: 'exerciseSelectedState',
  default: [0],
});

export const kcalPerUnitState = atom({
  key: 'kcalPerUnitState',
  default: [],
});

export const kcalPerHourState = atom({
  key: 'kcalPerHourState',
  default: [],
});

export const weightState = atom({
  key: 'weightState',
  default: [''],
});

export const hourState = atom({
  key: 'hourState',
  default: [''],
});

export const minState = atom({
  key: 'minState',
  default: [''],
});

export const timeState = atom({
  key: 'timeState',
  default: [''],
});

export const trackingUpdateState = atom({
  key: 'trackingUpdateState',
  default: false,
});

// Main 음식 폼 개수
export const foodFormsState = atom({
  key: 'foodFormsState',
  default: [0],
});

// Main 운동 폼 개수
export const exerciseFormsState = atom({
  key: 'exerciseFormsState',
  default: [0],
});

export const trackingFoodUnitState = atom({
  key: 'trackingFoodUnitState',
  default: [0],
});
