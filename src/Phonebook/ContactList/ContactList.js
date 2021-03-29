import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import actions from '../../Redux/items-actions';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import slide from '../ContactList/item.module.css';
import IconButtonDelete from '../IconButton/IconButton';
import { ReactComponent as IconDelete } from '../IconButton/svg/Delete.svg';

const ContactList = ({ contacts, onRemove }) => {
  return (
    <>
      <TransitionGroup component="ul" className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            classNames={slide}
            unmountOnExit
          >
            <li key={id} className={s.item}>
              <strong>{name}</strong>
              <p>{number}</p>
              <IconButtonDelete
                id={id}
                onRemove={onRemove}
                arial-lable="delete-contacts"
              >
                <IconDelete width="16" height="16" fill="white" />
              </IconButtonDelete>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};

const getVisible = (allcontacts, filter) => {
  const normalizer = filter.toLowerCase();
  return allcontacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizer),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisible(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onRemove: contactId => dispatch(actions.deleteContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
