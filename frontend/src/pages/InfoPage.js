import React, { useState } from 'react';

const InfoPage = ({ onComplete }) => {
  const [form, setForm] = useState({ name: '', address: '', phone: '', dob: '' });
  const isFormValid = form.name && form.address && form.phone && form.dob;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) onComplete();
  };

  return (
    <div className="gate-container fade-in">
      <div className="info-box">
        <h2>Personal Manifest</h2>
        <p>All fields are required to secure your position in the Vault.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input placeholder="Full Legal Name" style={styles.input} onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Physical Address" style={styles.input} onChange={e => setForm({...form, address: e.target.value})} />
          <input placeholder="Phone Number" style={styles.input} onChange={e => setForm({...form, phone: e.target.value})} />
          <input type="date" style={styles.input} onChange={e => setForm({...form, dob: e.target.value})} />
          <button type="submit" disabled={!isFormValid} style={isFormValid ? styles.btnActive : styles.btnDisabled}>
            STORE DATA & PROCEED
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '15px', background: '#111', border: '1px solid #333', color: '#fff' },
  btnActive: { padding: '15px', background: '#ffd700', color: '#000', fontWeight: 'bold', cursor: 'pointer', border: 'none' },
  btnDisabled: { padding: '15px', background: '#222', color: '#555', cursor: 'not-allowed', border: 'none' }
};

export default InfoPage;
