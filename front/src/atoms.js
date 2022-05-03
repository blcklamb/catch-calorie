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

// 음식 전체 리스트
export const foodListState = atom({
  key: 'foodListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 개인 트래킹 정보
export const trackingState = atom({
  key: 'trackingState',
  default: [],
  // effects_UNSTABLE: [persistAtom],
});


export const foodSelectedState = atom({
  key: 'foodSelectedState',
  default: [],
});

export const exerciseSelectedState = atom({
  key: 'exerciseSelectedState',
  default: [],
});

export const kcalPerGramState = atom({
  key: 'kcalPerGramState',
  default: [],
});

export const kcalPerHourState = atom({
  key: 'kcalPerHourState',
  default: [],
});

export const gramState = atom({
  key: 'gramState',
  default: [],
});

export const timeState = atom({
  key: 'timeState',
  default: [],
});

export const trackingUpdateState = atom({
  key: 'trackingUpdateState',
  default: false,
});
