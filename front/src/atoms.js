import { atom, selector } from 'recoil';
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

export const foodSelectedState = atom({
  key: 'foodSelectedState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const exerciseSelectedState = atom({
  key: 'exerciseSelectedState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const kcalPerGramState = atom({
  key: 'kcalPerGramState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const kcalPerHourState = atom({
  key: 'kcalPerHourState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const gramState = atom({
  key: 'gramState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
