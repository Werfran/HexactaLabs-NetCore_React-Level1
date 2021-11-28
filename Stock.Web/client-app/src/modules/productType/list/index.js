import api from "../../../common/api";
import { pickBy } from "lodash";
import { apiErrorToast } from "../../../common/api/apiErrorToast";

const initialState = {
  loading: false,
  productTypes: [],
};

/* Action types */

const LOADING = "PRODUCTTYPE_LOADING";
const SET = "PRODUCTTYPE_SET";
const CREATE = "PRODUCTTYPE_CREATE";
const UPDATE = "PRODUCTTYPE_UPDATE";
const REMOVE = "PRODUCTTYPE_REMOVE";

export const ActionTypes = {
  LOADING,
  SET,
  CREATE,
  UPDATE,
  REMOVE,
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading,
  };
}

function handleSet(state, { productType }) {
  return {
    ...state,
    productType,
  };
}

function handleNewProductType(state, { productType }) {
  return {
    ...state,
    productTypes: state.productTypes.concat(productType),
  };
}

function handleUpdateProductType(state, { productType }) {
  return {
    ...state,
    productTypes: state.productTypes.map((p) =>
      p.id === productType.id ? productType : p
    ),
  };
}

function handleRemoveProductType(state, { id }) {
  return {
    ...state,
    productTypes: state.productTypes.filter((p) => p.id !== id),
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
  [CREATE]: handleNewProductType,
  [UPDATE]: handleUpdateProductType,
  [REMOVE]: handleRemoveProductType,
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

/* Actions */
export function setLoading(status) {
  return {
    type: LOADING,
    loading: status,
  };
}

export function setProductTypes(productTypes) {
  return {
    type: SET,
    productTypes,
  };
}

export function getAll() {
  return (dispatch) => {
    dispatch(setLoading(true));
    return api
      .get("/ProductType")
      .then((response) => {
        dispatch(setProductTypes(response.data));
        return dispatch(setLoading(false));
      })
      .catch((error) => {
        apiErrorToast(error);
        return dispatch(setLoading(false));
      });
  };
}

/*export function getById(id) {
  return getAll({ id });
}*/

export function fetchByFilters(filters) {
  return function (dispatch) {
    return api
      .post("/ProductType/search", pickBy(filters))
      .then((response) => {
        dispatch(setProductTypes(response.data));
      })
      .catch((error) => {
        apiErrorToast(error);
      });
  };
}

/* Selectors */
function base(state) {
  return state.productType.list;
}

export function getLoading(state) {
  return base(state).loading;
}

export function getProductTypes(state) {
  return base(state).productTypes;
}

export function getProductTypeById(state, id) {
  return getProductTypes(state).find((p) => p.id === id);
}
