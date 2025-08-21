import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Paper, Typography, Stack, TextField, Button, MenuItem } from '@mui/material';

export default function CreateTask() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ description:'', item_id:'', from_location:'', to_station:'' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/api/inventory').then(({data}) => setItems(data));
  }, []);

  async function submit() {
    const payload = { ...form, item_id: form.item_id ? Number(form.item_id) : null };
    const { data } = await api.post('/api/tasks', payload);
    setMsg(data.assigned_robot ? `Task created & auto-assigned to robot #${data.assigned_robot}` : 'Task created (pending).');
    setForm({ description:'', item_id:'', from_location:'', to_station:'' });
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create New Task</Typography>
      <Stack spacing={2} sx={{ maxWidth: 520 }}>
        <TextField label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <TextField label="Item" select value={form.item_id} onChange={e=>setForm({...form, item_id:e.target.value})}>
          <MenuItem value="">(optional) None</MenuItem>
          {items.map(i => <MenuItem key={i.id} value={i.id}>{i.item_name}</MenuItem>)}
        </TextField>
        <TextField label="From (location)" value={form.from_location} onChange={e=>setForm({...form, from_location:e.target.value})} />
        <TextField label="To (station)" value={form.to_station} onChange={e=>setForm({...form, to_station:e.target.value})} />
        <Button variant="contained" onClick={submit}>Create Task</Button>
        {msg && <Typography color="primary">{msg}</Typography>}
      </Stack>
    </Paper>
  );
}