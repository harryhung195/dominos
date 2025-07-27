import axios from "axios";
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

// ✅ Fetch All Offers
export const fetchOffers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/offers");
    dispatch({ type: FETCH_OFFERS, payload: data });
  } catch (error) {
    dispatch({ 
      type: OFFER_ERROR, 
      payload: error.response?.data?.message || "Error fetching offers" 
    });
  }
};

// ✅ Claim an Offer
export const claimOffer = (offer) => (dispatch, getState) => {
  const { currentUser } = getState().user;

  if (!currentUser || currentUser.claimedOffer) {
    return; // Prevent multiple claims
  }

  dispatch({ type: CLAIM_OFFER, payload: offer });
  dispatch({ type: SET_USER_CLAIMED_OFFER, payload: offer });
};

// ✅ Create a New Offer (Admin Only, Using User ID)
export const createOffer = (offer, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/offers", { ...offer, userId }); // Send userId
    dispatch({ type: CREATE_OFFER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: CREATE_OFFER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};

// ✅ Update an Offer (Admin Only, Using User ID)
export const updateOffer = (offerId, updatedOffer, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/offers/${offerId}`, { ...updatedOffer, userId }); // Send userId
    dispatch({ type: UPDATE_OFFER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: UPDATE_OFFER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};

// ✅ Delete an Offer (Admin Only, Using User ID)
export const deleteOffer = (offerId, userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/offers/${offerId}`, { data: { userId } }); // Send userId
    dispatch({ type: DELETE_OFFER_SUCCESS, payload: offerId });
  } catch (error) {
    dispatch({ 
      type: DELETE_OFFER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};
