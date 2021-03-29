import { createAction } from '@reduxjs/toolkit';
import shortid from 'shortid';

const addContact = createAction('action/add-contact', ({ name, number }) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));

const changeFilter = createAction('action/change-filter');
const deleteContact = createAction('action/delete-contact');
const action = { changeFilter, deleteContact, addContact };

export default action;
