import React from 'react';
import PropTypes from 'prop-types';

export default function Filter({ findChange }) {
  return (
    <>
      <h4>Find contacts by name</h4>
      <input type="text" name="find" onChange={findChange} />
    </>
  );
}

Filter.prototype = {
  findChange: PropTypes.func.isRequired,
};
