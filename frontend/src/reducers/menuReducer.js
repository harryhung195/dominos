import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  
  ADD_MENU_REQUEST, ADD_MENU_SUCCESS, ADD_MENU_FAIL,
  
  
  DELETE_MENU_REQUEST, 
  DELETE_MENU_SUCCESS, 
  DELETE_MENU_FAIL,
  RESET_MENU_SUCCESS
} from "../constants/menuConstants";

const initialState = {
  menuItems: [],
  myDominosBoxMenu: [],
  meltzzMenu: [],
  snacksidesMenu: [],
  chickenMenu: [],
  drinksMenu: [],
  dessertMenu: [],
  loading: false,
  error: null,
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      
        case ADD_MENU_REQUEST:
          case DELETE_MENU_REQUEST:
      return { ...state, loading: true };

    case FETCH_MENU_SUCCESS:
    

       
  case ADD_MENU_SUCCESS:
    

    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: action.payload,
        myDominosBoxMenu: action.payload,
        meltzzMenu: action.payload,
        snacksidesMenu: action.payload,
        chickenMenu: action.payload,
        drinksMenu: action.payload,
        dessertMenu: action.payload,
      };
    case FETCH_MENU_FAILURE:
    
        case ADD_MENU_FAIL:
          case DELETE_MENU_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export const resetMenuSuccess = () => (dispatch) => {
  dispatch({ type: RESET_MENU_SUCCESS });
};
