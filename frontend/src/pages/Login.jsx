import React, { useState } from 'react';
import { api } from '../services/api';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const loc = useLocation();

  async function login() {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      const dest = loc.state?.from?.pathname || '/robots';
      nav(dest, { replace: true });
    } catch (e) {
      setError(e.response?.data?.error || 'Login failed');
    }
  }

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Login</Typography>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={login}>Login</Button>
        <Typography variant="body2">No account? <Link to="/register">Create user</Link></Typography>
      </Stack>
    </Paper>
  );
}