import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Robots from './pages/Robots.jsx';
import Tasks from './pages/Tasks.jsx';
import Inventory from './pages/Inventory.jsx';
import CreateTask from './pages/CreateTask.jsx';

function Header() {
  const isAuthed = !!localStorage.getItem('token');
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">AGV Warehouse</Typography>
        {isAuthed ? (
          <>
            <Button color="inherit" component={Link} to="/robots">Robots</Button>
            <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
            <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
            <Button color="inherit" component={Link} to="/create-task">Create Task</Button>
            <Button color="inherit" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Create User</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function Protected({ children }) {
  const isAuthed = !!localStorage.getItem('token');
  const loc = useLocation();
  if (!isAuthed) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/robots" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/robots" element={<Protected><Robots /></Protected>} />
          <Route path="/tasks" element={<Protected><Tasks /></Protected>} />
          <Route path="/inventory" element={<Protected><Inventory /></Protected>} />
          <Route path="/create-task" element={<Protected><CreateTask /></Protected>} />
          <Route path="*" element={<Box>Not found</Box>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}