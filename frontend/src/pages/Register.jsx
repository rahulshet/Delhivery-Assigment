import React, { useState } from 'react';
import { api } from '../services/api';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('Operator');
  const [email, setEmail] = useState('op@example.com');
  const [password, setPassword] = useState('op12345');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  async function register() {
    try {
      await api.post('/api/auth/register', { name, email, password });
      setMsg('User created. You can login now.');
      setTimeout(() => nav('/login'), 800);
    } catch (e) {
      setMsg(e.response?.data?.error || 'Failed');
    }
  }

  return (
    <Paper sx={{ maxWidth: 480, mx: 'auto', p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Create User</Typography>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
        {msg && <Typography color="primary">{msg}</Typography>}
        <Button variant="contained" onClick={register}>Create</Button>
      </Stack>
    </Paper>
  );
}