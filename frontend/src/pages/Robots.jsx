import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Stack
} from '@mui/material';

const StatusChip = ({ status }) => {
  const color =
    status === 'idle'
      ? 'success'
      : status === 'busy'
      ? 'warning'
      : status === 'charging'
      ? 'info'
      : 'default';
  return <Chip label={status} color={color} size="small" />;
};

export default function Robots() {
  const [robots, setRobots] = useState([]);

  async function load() {
    const { data } = await api.get('/api/robots');
    setRobots(data);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Grid container spacing={2}>
      {robots.map(r => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={r.id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: '0.2s',
              '&:hover': { boxShadow: 6, transform: 'scale(1.02)' }
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {r.robot_id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {r.location}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 1 }}>
                <StatusChip status={r.status} />
                <Typography variant="body2">#{r.id}</Typography>
              </Stack>

              <Stack spacing={1} sx={{ mt: 1 }}>
                <Typography variant="body2">Battery</Typography>
                <LinearProgress
                  variant="determinate"
                  value={r.battery_level}
                  sx={{ height: 10, borderRadius: 1 }}
                  color={
                    r.battery_level > 50
                      ? 'success'
                      : r.battery_level > 20
                      ? 'warning'
                      : 'error'
                  }
                />
                <Typography variant="body2">{r.battery_level}%</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
