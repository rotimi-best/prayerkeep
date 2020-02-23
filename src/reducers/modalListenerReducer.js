import {
  OPEN_PRAYER_MODAL,
  CLOSE_PRAYER_MODAL
} from '../constants/actionsTypes';

const initialState = {
  prayerModal: {
    open: false,
    prayerId: null,
    collectionId: null
  }
};

export default function (state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch (type) {
    case OPEN_PRAYER_MODAL:
      return {
        ...newState,
        prayerModal: {
          open: true,
          prayerId: payload.prayerId,
          collectionId: payload.collectionId,
        }
      };
    case CLOSE_PRAYER_MODAL:
      return {
        ...newState,
        prayerModal: {
          open: false,
          prayerId: null,
          collectionId: null,
        }
      };
    default:
      return newState;
  }
};
