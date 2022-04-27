import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 유저 정보가 담겨있는 아톰
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
