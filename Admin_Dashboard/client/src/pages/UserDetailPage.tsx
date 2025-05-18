import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  VpnKey as RoleIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  name: string;
  createdAt: string;
  lastLogin: string;
  status: string;
}

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch user details
  const { data, isLoading, error } = useQuery<{ user: User }>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading user details. Please try refreshing the page.
      </Alert>
    );
  }

  const { user } = data;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Details
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            sx={{ mr: 2 }}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              // Handle save changes
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* User Profile */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Profile Information"
              avatar={
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                  {user.name.charAt(0)}
                </Avatar>
              }
            />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Username" secondary={user.username} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RoleIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Role" 
                    secondary={<Chip label={user.role} color="primary" size="small" />} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Created At" 
                    secondary={new Date(user.createdAt).toLocaleString()} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimeIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Last Login" 
                    secondary={user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Edit User
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  defaultValue={user.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  fullWidth
                  defaultValue={user.username}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  defaultValue={user.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    defaultValue={user.role}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="moderator">Moderator</MenuItem>
                    <MenuItem value="support">Support</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={user.status}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Password"
                  fullWidth
                  type="password"
                  variant="outlined"
                  placeholder="Leave blank to keep current password"
                />
              </Grid>
            </Grid>
          </Paper>
          
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Activity
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This section will display user activity logs.
            </Typography>
            
            <Button variant="outlined" size="small">
              View Complete Activity Log
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetailPage;