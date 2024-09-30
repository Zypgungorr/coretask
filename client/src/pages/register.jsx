import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    //   return;
    // }

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Registration successful');
        navigate('/login'); 
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred while trying to register.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', paddingLeft: '70px' }}>
      <h2>Signup Page</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            style={{ height: '25px', width: '250px' }} 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <input 
            style={{ height: '25px', width: '250px', marginTop: '10px' }} 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <input 
            style={{ height: '25px', width: '250px', marginTop: '10px' }} 
            type="number" 
            placeholder="Age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required 
          />
        </div>
        <div>
          <input 
            style={{ height: '25px', width: '250px', marginTop: '10px' }} 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {/* <div>
          <input 
            style={{ height: '25px', width: '250px', marginTop: '10px' }} 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div> */}
        <button style={{ marginLeft: '70px' }} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
