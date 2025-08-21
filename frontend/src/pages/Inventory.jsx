import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function Inventory() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ item_name:'', location:'', quantity:0 });

  async function load() {
    const { data } = await api.get('/api/inventory');
    setRows(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    await api.post('/api/inventory', form);
    setOpen(false);
    setForm({ item_name:'', location:'', quantity:0 });
    load();
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Inventory</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Item</Button>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(i => (
              <TableRow key={i.id}>
                <TableCell>{i.id}</TableCell>
                <TableCell>{i.item_name}</TableCell>
                <TableCell>{i.location}</TableCell>
                <TableCell>{i.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Inventory Item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 360 }}>
            <TextField label="Item name" value={form.item_name} onChange={e=>setForm({...form, item_name:e.target.value})} />
            <TextField label="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
            <TextField label="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form, quantity:Number(e.target.value)})} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}