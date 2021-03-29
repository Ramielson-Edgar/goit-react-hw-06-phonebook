import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import MyPnotify from '../MyPnotify';
import actions from '../../Redux/items-actions';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import slideLogo from '../ContactForm/logoSlide.module.css';
import '../../Alert.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    isAlert: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { name, number } = this.state;
    const { contacts } = this.props;
    const contact = contacts.find(contact => contact.name === name);

    if (contact) {
      this.showAlert();
      return;
    }

    if (number && name !== '') {
      this.props.addcontact({ ...this.state });
      this.reset();
    }
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  showAlert = () => {
    this.setState(state => ({
      isAlert: !state.isAlert,
    }));
  };

  render() {
    const { name, number, isAlert } = this.state;
    const className = isAlert === true ? 'fade' : 'hide';
    const hideAlert =
      isAlert && setTimeout(() => this.setState({ isAlert: false }), 3000);

    return (
      <div>
        <MyPnotify className={className} hideAlert={Boolean(hideAlert)} />

        <CSSTransition
          in={true}
          appear={true}
          timeout={250}
          classNames={slideLogo}
          unmountOnExit
        >
          <div>
            <h1 className="logo">Phonebook</h1>
          </div>
        </CSSTransition>

        <div className={s.wrapper}>
          <div className={s.inputContainer}>
            <h1 className={s.hedaline}>Welcome</h1>
            <form className={s.form} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={this.handleChange}
                id={this.id}
                className={s.inputName}
              />

              <input
                type="text"
                name="number"
                placeholder="+38(097) 9732 656 "
                value={number}
                onChange={this.handleChange}
                id={this.id}
                className={s.inputNumber}
              />
              <button className={s.btn} type="submit">
                Add contact
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      handleChange: PropTypes.func,
      id: PropTypes.string,
    }),
  ),
};

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  addcontact: ({ name, number }) =>
    dispatch(actions.addContact({ name, number })),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
