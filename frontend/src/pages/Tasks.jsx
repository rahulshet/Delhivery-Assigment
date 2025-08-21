import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Stack } from '@mui/material';

const StatusChip = ({ status }) => {
  const map = { pending:'default', assigned:'info', in_progress:'warning', completed:'success', failed:'error' };
  return <Chip size="small" label={status} color={map[status] || 'default'} />;
};

export default function Tasks() {
  const [rows, setRows] = useState([]);

  async function load() {
    const { data } = await api.get('/api/tasks');
    setRows(data);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, []);

  async function mark(id, status) {
    await api.patch(`/api/tasks/${id}/status`, { status });
    load();
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Tasks</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Robot</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(t => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.from_location}</TableCell>
                <TableCell>{t.to_station}</TableCell>
                <TableCell><StatusChip status={t.status} /></TableCell>
                <TableCell>{t.robot_assigned || '-'}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" onClick={() => mark(t.id, 'in_progress')}>Start</Button>
                    <Button size="small" onClick={() => mark(t.id, 'completed')}>Complete</Button>
                    <Button size="small" color="error" onClick={() => mark(t.id, 'failed')}>Fail</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}