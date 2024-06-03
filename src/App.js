import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError('All fields are required.');
      return false;
    }
    const emailExists = contacts.some((contact, index) => contact.email === form.email && index !== editingIndex);
    const phoneExists = contacts.some((contact, index) => contact.phone === form.phone && index !== editingIndex);
    if (emailExists) {
      setError('Email must be unique.');
      return false;
    }
    if (phoneExists) {
      setError('Phone number must be unique.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }

    if (editingIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editingIndex] = form;
      setContacts(updatedContacts);
      setEditingIndex(null);
    } else {
      setContacts([...contacts, form]);
    }

    setForm({ name: '', email: '', phone: '', address: '' });
  };

  const handleEdit = (index) => {
    setForm(contacts[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${contacts[index].name}?`);
    if (confirmDelete) {
      const updatedContacts = contacts.filter((_, i) => i !== index);
      setContacts(updatedContacts);
      if (editingIndex === index) {
        setForm({ name: '', email: '', phone: '', address: '' });
        setEditingIndex(null);
      }
    }
  };

  return (
    <div className="container">
      <h1>Contact Management System</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleInputChange} required />
        <button type="submit">{editingIndex !== null ? 'Update Contact' : 'Add Contact'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {contacts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts</p>
      )}
    </div>
  );
}

export default App;
