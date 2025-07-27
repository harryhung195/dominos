import { 
  FETCH_OFFERS,
  OFFER_ERROR, 
  CLAIM_OFFER, 
  SET_USER_CLAIMED_OFFER,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
  UPDATE_OFFER_SUCCESS,
  UPDATE_OFFER_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL
} from "../constants/offerConstants";

const initialState = {
  offers: [],
  claimedOffers: [],
  currentUserClaimedOffer: null,
  loading: true,
  error: null,
};

export const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false,
        error: null,  // Reset error on successful fetch
      };

    case OFFER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLAIM_OFFER:
      return {
        ...state,
        claimedOffers: [...state.claimedOffers, action.payload],
        error: null,  // Reset error when claiming succeeds
      };

    case SET_USER_CLAIMED_OFFER:
      return {
        ...state,
        currentUserClaimedOffer: action.payload, 
        error: null,
      };

    case CREATE_OFFER_SUCCESS:
      return { 
        ...state, 
        offers: [...state.offers, action.payload], 
        loading: false,
        error: null 
      };

    case CREATE_OFFER_FAIL:
      return { ...state, error: action.payload, loading: false };

    case UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.map((offer) =>
          offer._id === action.payload._id ? action.payload : offer
        ),
        loading: false,
        error: null,
      };

    case UPDATE_OFFER_FAIL:
      return { ...state, error: action.payload, loading: false };

    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer._id !== action.payload),
        loading: false,
        error: null,
      };

    case DELETE_OFFER_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
