import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header({ email }) {
  return (
    <div>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
