import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

import React, { Component } from 'react';
import { MainConteiner } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: [],
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.state?.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onFormSubmit = (name, number) => {
    const existingContact = this.state.contacts.find(
      contact => contact.name === name
    );
    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { id: nanoid(3), name: name, number: number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      filter: [...prevState.contacts, newContact],
    }));
  };

  findChange = e => {
    const name = e.target.value;
    this.setState(prevState => {
      const filteredContacts = prevState.contacts.filter(val =>
        val.name.toLowerCase().includes(name.toLowerCase())
      );

      return {
        filter:
          filteredContacts.length > 0
            ? filteredContacts
            : [{ id: 'id-1', name: 'no matches found' }],
      };
    });
  };

  onDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
      filter: prevState.filter.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <MainConteiner>
        <h1>Phonebook</h1>
        <ContactForm onSabmit={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter findChange={this.findChange} />
        <ContactList
          onDelete={this.onDelete}
          contacts={this.state.contacts}
          filter={this.state.filter}
        />
      </MainConteiner>
    );
  }
}
