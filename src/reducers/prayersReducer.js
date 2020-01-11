import {
  PRAYERS_FETCHED,
  PRAYERS_ERROR,
  PRAYERS_START_FETCHING,
  PRAYERS_STOP_REQUEST,
  PRAYER_ADD_ERROR,
  PRAYER_ADD_REQUEST,
  PRAYER_ADD_SUCCESS,
  PRAYER_UPDATE_ERROR,
  PRAYER_UPDATE_REQUEST,
  PRAYER_UPDATE_SUCCESS
} from '../constants/actionsTypes';

const initialState = {
  allPrayers: [{
    _id: "someId1",
    description: "Father, I come before you today, please forgive me and every user of this platform from every sin of drug addiction, sex addiction, e.t.c, committed against the body and against you, in Jesus’ Name",
    answered: false,
    start: Date.now(),
    end: Date.now(),
    creator: {
      _id: "someId",
      userId: "",
      email: "",
      name: "Rotimi Best",
      pictureUrl: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2596302853931584&height=50&width=50&ext=1581187978&hash=AeRutKbKhgJO3BiM",
      lastDatePrayed: Date.now(),
      streak: 0
    },
    owner: {
      _id: "someId",
      userId: "",
      email: "",
      name: "Rotimi Best",
      pictureUrl: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2596302853931584&height=50&width=50&ext=1581187978&hash=AeRutKbKhgJO3BiM",
      lastDatePrayed: Date.now(),
      streak: 0
    },
    lastDatePrayed: Date.now(),
    collection: [
      {
        key: 1,
        title: "Spiritual",
      },
      {
        key: 2,
        title: "Financial",
      },
      {
        key: 3,
        title: "Relationship",
      },
      {
        key: 4,
        title: "Unanswered",
      },
      {
        key: 5,
        title: "Answered",
      },
    ]
    },
    {
      _id: "someId2",
      description: "Heavenly father, thank you for the forgiveness of sin and your mercy upon my life each day. Glorious God, you alone deserve my praise let my life be daily filled with your praise, in Jesus’ Name",
      answered: false,
      start: Date.now(),
      end: Date.now(),
      creator: {},
      owner: {},
      lastDatePrayed: Date.now(),
      collection: [
        {
          key: 1,
          title: "Spiritual",
        },
        {
          key: 3,
          title: "Relationship",
        },
        {
          key: 5,
          title: "Answered",
        },
      ]
    },
    {
      _id: "someId3",
      description: "Heavenly father, Father, I’m using this medium to pray for all hard drugs addicts, cleanse all of their wounds, brokenness and depressions. Redeem and restore their lives to live and love freely, in Jesus’ Name",
      answered: false,
      start: Date.now(),
      end: Date.now(),
      creator: {},
      owner: {},
      lastDatePrayed: Date.now(),
      collection: [
        {
          key: 3,
          title: "Relationship",
        },
        {
          key: 5,
          title: "Answered",
        },
      ]
    },{
      _id: "someId1",
      description: "Father, I come before you today, please forgive me and every user of this platform from every sin of drug addiction, sex addiction, e.t.c, committed against the body and against you, in Jesus’ Name",
      answered: false,
      start: Date.now(),
      end: Date.now(),
      creator: {
        _id: "someId",
        userId: "",
        email: "",
        name: "Rotimi Best",
        pictureUrl: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2596302853931584&height=50&width=50&ext=1581187978&hash=AeRutKbKhgJO3BiM",
        lastDatePrayed: Date.now(),
        streak: 0
      },
      owner: {
        _id: "someId",
        userId: "",
        email: "",
        name: "Rotimi Best",
        pictureUrl: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2596302853931584&height=50&width=50&ext=1581187978&hash=AeRutKbKhgJO3BiM",
        lastDatePrayed: Date.now(),
        streak: 0
      },
      lastDatePrayed: Date.now(),
      collection: [
        {
          key: 1,
          title: "Spiritual",
        },
        {
          key: 2,
          title: "Financial",
        },
        {
          key: 3,
          title: "Relationship",
        },
        {
          key: 4,
          title: "Unanswered",
        },
        {
          key: 5,
          title: "Answered",
        },
      ]
    },
    {
      _id: "someId2",
      description: "Heavenly father, thank you for the forgiveness of sin and your mercy upon my life each day. Glorious God, you alone deserve my praise let my life be daily filled with your praise, in Jesus’ Name",
      answered: false,
      start: Date.now(),
      end: Date.now(),
      creator: {},
      owner: {},
      lastDatePrayed: Date.now(),
      collection: [
        {
          key: 1,
          title: "Spiritual",
        },
        {
          key: 3,
          title: "Relationship",
        },
        {
          key: 5,
          title: "Answered",
        },
      ]
    },
    {
      _id: "someId3",
      description: "Heavenly father, Father, I’m using this medium to pray for all hard drugs addicts, cleanse all of their wounds, brokenness and depressions. Redeem and restore their lives to live and love freely, in Jesus’ Name",
      answered: false,
      start: Date.now(),
      end: Date.now(),
      creator: {},
      owner: {},
      lastDatePrayed: Date.now(),
      collection: [
        {
          key: 3,
          title: "Relationship",
        },
        {
          key: 5,
          title: "Answered",
        },
      ]
    }
  ],
  isFetching: false,
  isUpdating: false,
  isAdding: false,
  error: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case PRAYERS_FETCHED:
    case PRAYER_ADD_SUCCESS:
    case PRAYER_UPDATE_SUCCESS:
      return {
        allPrayers: payload,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: null,
      };
    case PRAYERS_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case PRAYERS_STOP_REQUEST:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
      };
    case PRAYERS_ERROR:
    case PRAYER_UPDATE_ERROR:
    case PRAYER_ADD_ERROR:
      return {
        ...state,
        isFetching: false,
        isUpdating: false,
        isAdding: false,
        error: payload,
      }
    case PRAYER_ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
        error: null
      };
    case PRAYER_UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null
      };
    default:
      return state;
  }
}