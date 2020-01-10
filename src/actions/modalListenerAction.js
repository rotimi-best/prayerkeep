import {
  OPEN_PRAYER_MODAL,
  CLOSE_PRAYER_MODAL
} from '../constants/actionsTypes';

export const togglePrayerModal = (open, prayerId) => {
  if (open) {
    return {
      type: OPEN_PRAYER_MODAL,
      payload: prayerId
    }
  }

  return {
    type: CLOSE_PRAYER_MODAL,
  }
};

