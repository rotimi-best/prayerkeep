import { TOGGLE_SIDE_BAR, SET_IS_MOBILE } from '../constants/actionsTypes';

export const toggleSideBar = () => ({
  type: TOGGLE_SIDE_BAR
});

export const setIsMobile = (payload) => ({
  type: SET_IS_MOBILE,
  payload
});