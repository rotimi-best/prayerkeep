import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { setIsSubscribedToPushNotification } from '../actions/authAction';
import urlBase64ToUint8Array from '../helpers/urlBase64ToUint8Array';
import configs from '../configs';

const { API_URL, publicPushKey } = configs;

export default function RequestPermission() {
  const dispatch = useDispatch();
  const {
    isSubscribedToPushNotification,
    user
  } = useSelector(state => state.authentication);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(!isSubscribedToPushNotification);
  }, [isSubscribedToPushNotification]);

  const handleClose = React.useCallback((requestPush, sendPushImmediately) => async () => {
    setOpen(false);
    console.log('handle close called');
    console.log('requestPush', requestPush)
    console.log('sendPushImmediately', sendPushImmediately)
    if (requestPush) {
      const sw = await navigator.serviceWorker.ready;
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicPushKey)
      });

      console.log('subscription', subscription)

      if (subscription) {
        await fetch(`${API_URL}/subscription`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            subscription: JSON.stringify(subscription),
            userId: user.userId,
            sendPushImmediately
          })
        });
      } else {
        console.log('Dont have subscription')
      }

      dispatch(setIsSubscribedToPushNotification(true));
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    const sendSubscription = localStorage.getItem('sendSubscription');

    if (sendSubscription === 'true') {
      handleClose(true, false)();
      localStorage.setItem('sendSubscription', 'false');
    }
  }, [handleClose]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Allow Push Notification</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To help you in your prayer journey, I will need to send you notifications.
            A prompt will open requesting you to give me permission, please accept it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(false, true)} color="primary">
            Not interested
          </Button>
          <Button onClick={handleClose(true, true)} color="primary" autoFocus>
            Yes, great
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
