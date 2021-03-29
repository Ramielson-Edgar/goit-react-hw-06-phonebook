import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import action from './items-actions';
import defaultItems from '../defaut-items/default-items.json';

const items = createReducer(defaultItems, {
  [action.addContact]: (state, { payload }) => [...state, payload],
  [action.deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [action.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
