import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
import { togglePrayerModal } from '../actions/modalListenerAction';
import { isValidHex } from '../helpers/isValidHex';

const TriggerModalFromUrl = props => {
  const { dispatch, search, modalListener } = props;
  const {
    prayerModal,
    prayerId,
    collectionId,
  } = queryString.parse(search);

  if (prayerModal && !modalListener.prayerModal.open) {
    const modalOptions = { prayerId, collectionId: null };
    if (collectionId && isValidHex(collectionId)) {
      modalOptions.collectionId = collectionId;
    }

    dispatch(togglePrayerModal(prayerModal === "open", modalOptions))
  } else if (!prayerModal && modalListener.prayerModal.open) {
    dispatch(togglePrayerModal(false))
  }

  return <></>;
}

TriggerModalFromUrl.propTypes = {
  search: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  search: state.router.location.search,
  modalListener: state.modalListener
});

export default connect(mapStateToProps)(TriggerModalFromUrl);