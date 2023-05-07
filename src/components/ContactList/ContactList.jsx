import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactList extends Component {
  clickDelete = id => {
    this.props.onDelete(id);
  };
  render() {
    let { contacts, filter } = this.props;
    contacts = filter.length ? filter : contacts;
    return (
      <ul>
        {contacts.map(val => (
          <li className="item" key={val.id}>
            <p>
              {val.name} {val.number}
            </p>
            {val.name !== 'no matches found' && (
              <button
                className="button"
                type="button"
                onClick={() => this.clickDelete(val.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
