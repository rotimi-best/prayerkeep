import * as firebase from 'firebase/app';
import 'firebase/storage'
import configs from '../configs';

firebase.initializeApp({
  apiKey: configs.firebase.apiKey,
  authDomain: configs.firebase.authDomain,
  storageBucket: configs.firebase.storageBucket,
});

const storage = firebase.storage()

export  {
  storage,
  firebase as default
}
