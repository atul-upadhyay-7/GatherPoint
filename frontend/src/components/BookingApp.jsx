import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api/public';

// Customer authentication check function
const checkCustomerAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check`, {
      credentials: 'include'
    });
    if (response.ok) {
      const customer = await response.json();
      return customer;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a100d 0%, #1a2e23 50%, #0d1f16 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: '"Outfit", sans-serif',
  },
  card: {
    maxWidth: '520px',
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '40px',
    border: '1px solid rgba(207,173,86,0.2)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  brand: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  brandName: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#cfad56',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    letterSpacing: '0.02em',
  },
  tagline: {
    color: '#8b9691',
    fontSize: '0.9rem',
    marginTop: '4px',
  },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#a0aba6',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.3)',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.3)',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  btn: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #cfad56, #b8943f)',
    color: '#0a100d',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  successBox: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  successIcon: {
    fontSize: '4rem',
    marginBottom: '16px',
  },
};

export default function BookingApp() {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    guestCount: 2,
    notes: '',
    tableId: '',
  });
  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [customer, setCustomer] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check customer authentication
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const cust = await checkCustomerAuth();
        if (cust) {
          setCustomer(cust);
          // Pre-fill form with customer info if available
          setForm(prev => ({
            ...prev,
            customerName: cust.name || '',
            customerEmail: cust.email || '',
            customerPhone: cust.phone || '',
          }));
        } else {
          // Redirect to login if not authenticated
          window.location.href = '/customer-login.html';
        }
      } catch (error) {
        window.location.href = '/customer-login.html';
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuth();
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/tables`)
      .then(r => r.json())
      .then(data => setAvailableTables(data))
      .catch(() => setAvailableTables([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.bookingDate) {
      setMessage('Name and date/time are required');
      return;
    }
    setLoading(true);
    setMessage('');

    const payload = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      bookingTime: new Date(form.bookingDate).toISOString(),
      guestCount: parseInt(form.guestCount) || 2,
      notes: form.notes,
      status: 'CONFIRMED',
      table: form.tableId ? { id: parseInt(form.tableId) } : null,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStep('success');
      } else {
        const err = await res.text();
        setMessage(err || 'Failed to create booking');
      }
    } catch (err) {
      setMessage('Could not connect to server. Please try again.');
    }
    setLoading(false);
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔐</div>
            <h2 style={{ color: '#fff', marginBottom: '8px' }}>Verifying Access</h2>
            <p style={{ color: '#8b9691', marginBottom: '24px' }}>
              Please wait while we check your authentication...
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid rgba(207, 173, 86, 0.3)', borderTop: '3px solid #cfad56', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>🎉</div>
            <h2 style={{ color: '#fff', marginBottom: '8px' }}>Booking Confirmed!</h2>
            <p style={{ color: '#8b9691', marginBottom: '24px' }}>
              Your table has been booked. We look forward to serving you!
            </p>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{ color: '#cfad56', marginBottom: '4px' }}>{form.customerName}</div>
              <div style={{ color: '#8b9691', fontSize: '0.85rem' }}>
                {new Date(form.bookingDate).toLocaleString()} · {form.guestCount} guests
              </div>
              {form.customerEmail && <div style={{ color: '#8b9691', fontSize: '0.85rem' }}>{form.customerEmail}</div>}
            </div>
            <button style={styles.btn} onClick={() => { setStep('form'); setForm({ customerName: '', customerEmail: '', customerPhone: '', bookingDate: '', guestCount: 2, notes: '', tableId: '' }); }}>
              Book Another Table
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.brandName}>GatherPoint</div>
          <div style={styles.tagline}>Reserve your table in seconds</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Your Name *</label>
            <input style={styles.input} type="text" placeholder="John Doe" value={form.customerName}
              onChange={e => setForm({ ...form, customerName: e.target.value })} required />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" placeholder="john@example.com" value={form.customerEmail}
              onChange={e => setForm({ ...form, customerEmail: e.target.value })} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Phone</label>
            <input style={styles.input} type="tel" placeholder="+1 234 567 8900" value={form.customerPhone}
              onChange={e => setForm({ ...form, customerPhone: e.target.value })} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Date & Time *</label>
            <input style={styles.input} type="datetime-local" value={form.bookingDate}
              onChange={e => setForm({ ...form, bookingDate: e.target.value })} required />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Number of Guests</label>
            <input style={styles.input} type="number" min="1" max="50" value={form.guestCount}
              onChange={e => setForm({ ...form, guestCount: e.target.value })} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Preferred Table (optional)</label>
            <select style={styles.select} value={form.tableId}
              onChange={e => setForm({ ...form, tableId: e.target.value })}>
              <option value="">No preference</option>
              {availableTables.map(t => (
                <option key={t.id} value={t.id}>Table {t.tableNumber} ({t.seats} seats)</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={styles.label}>Special Requests (optional)</label>
            <textarea style={{ ...styles.input, minHeight: '60px', resize: 'vertical' }} placeholder="Any special occasion or request..."
              value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>

          {message && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', marginBottom: '16px', fontSize: '0.85rem', textAlign: 'center' }}>
              {message}
            </div>
          )}

          <button type="submit" style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}
