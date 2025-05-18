import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Stack,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Icons
import {
  VerifiedUser as VerifiedUserIcon,
  Warning as WarningIcon,
  ErrorOutline as ErrorIcon,
  CheckCircleOutline as CheckCircleIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Pending as PendingIcon,
  MonetizationOn as MonetizationOnIcon,
  Report as ReportIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  LanOutlined as NetworkIcon,
} from '@mui/icons-material';

// Interfaces for dashboard data
interface SystemService {
  id: string;
  name: string;
  status: string;
  uptime: string;
  lastIncident: string | null;
}

interface SystemMetrics {
  cpu: { current: number; history: number[] };
  memory: { current: number; history: number[] };
  disk: { current: number; history: number[] };
  network: { current: number; history: number[] };
}

interface Activity {
  type: string;
  user: string;
  timestamp: string;
}

interface DashboardData {
  userCount: number;
  activeUsers: number;
  newUsersToday: number;
  pendingApprovals: number;
  systemHealth: {
    overallStatus: string;
    services: SystemService[];
    metrics: SystemMetrics;
  };
  recentActivity: Activity[];
  tickets: {
    open: number;
    inProgress: number;
    resolved: number;
    critical: number;
  };
  revenue: {
    daily: number[];
    monthly: number[];
    forecast: number;
  };
}

const DashboardPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const response = await fetch('/api/admin/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
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
        Error loading dashboard data. Please try refreshing the page.
      </Alert>
    );
  }

  // Transform data for charts
  const ticketData = [
    { name: 'Open', value: data.tickets.open, color: '#ff9800' },
    { name: 'In Progress', value: data.tickets.inProgress, color: '#2196f3' },
    { name: 'Resolved', value: data.tickets.resolved, color: '#4caf50' },
    { name: 'Critical', value: data.tickets.critical, color: '#f44336' },
  ];

  const revenueData = data.revenue.monthly.map((value, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index],
    revenue: value,
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'degraded':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'critical':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      default:
        return <WarningIcon sx={{ color: 'warning.main' }} />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Overview
        </Typography>
        <Button variant="contained">Generate Report</Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" component="div">
                {data.userCount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
              <VerifiedUserIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" component="div">
                {data.activeUsers.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Users
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
              <PersonAddIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" component="div">
                {data.newUsersToday}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New Users Today
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
              <PendingIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" component="div">
                {data.pendingApprovals}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Approvals
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="System Health" 
              subheader={
                <Chip 
                  label={data.systemHealth.overallStatus} 
                  color={data.systemHealth.overallStatus === 'healthy' ? "success" : "warning"} 
                  size="small"
                  sx={{ mt: 1 }}
                />
              } 
            />
            <Divider />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Services</Typography>
              <List dense sx={{ mb: 2 }}>
                {data.systemHealth.services.map((service) => (
                  <ListItem
                    key={service.id}
                    secondaryAction={getStatusIcon(service.status)}
                  >
                    <ListItemText
                      primary={service.name}
                      secondary={`Uptime: ${service.uptime}${
                        service.lastIncident ? ` | Last incident: ${service.lastIncident}` : ''
                      }`}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" gutterBottom>System Metrics</Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SpeedIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ width: 80 }}>CPU:</Typography>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={data.systemHealth.metrics.cpu.current}
                      color={data.systemHealth.metrics.cpu.current > 80 ? "error" : data.systemHealth.metrics.cpu.current > 60 ? "warning" : "primary"}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="body2">{data.systemHealth.metrics.cpu.current}%</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MemoryIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="body2" sx={{ width: 80 }}>Memory:</Typography>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={data.systemHealth.metrics.memory.current}
                      color={data.systemHealth.metrics.memory.current > 80 ? "error" : data.systemHealth.metrics.memory.current > 60 ? "warning" : "secondary"}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="body2">{data.systemHealth.metrics.memory.current}%</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StorageIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography variant="body2" sx={{ width: 80 }}>Disk:</Typography>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={data.systemHealth.metrics.disk.current}
                      color={data.systemHealth.metrics.disk.current > 80 ? "error" : data.systemHealth.metrics.disk.current > 60 ? "warning" : "primary"}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="body2">{data.systemHealth.metrics.disk.current}%</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NetworkIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography variant="body2" sx={{ width: 80 }}>Network:</Typography>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={data.systemHealth.metrics.network.current}
                      color={data.systemHealth.metrics.network.current > 80 ? "error" : data.systemHealth.metrics.network.current > 60 ? "warning" : "info"}
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="body2">{data.systemHealth.metrics.network.current}%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Feed */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Recent Activity" />
            <Divider />
            <CardContent sx={{ maxHeight: 400, overflow: 'auto' }}>
              <List dense>
                {data.recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {activity.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {activity.user}
                            </Typography>
                            {` — ${new Date(activity.timestamp).toLocaleString()}`}
                          </>
                        }
                      />
                    </ListItem>
                    {index < data.recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Support Tickets */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Support Tickets" />
            <Divider />
            <CardContent>
              <Box height={280}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ticketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Tickets']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Button variant="outlined" size="small">View All Tickets</Button>
                <Button variant="contained" size="small">Create Ticket</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Revenue Overview" 
              subheader={`Forecast: $${data.revenue.forecast.toLocaleString()}`}
              action={
                <Stack direction="row" spacing={1}>
                  <Chip label="Monthly" color="primary" size="small" />
                  <Chip label="Weekly" variant="outlined" size="small" />
                </Stack>
              }
            />
            <Divider />
            <CardContent>
              <Box height={280}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#2196f3" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Button variant="outlined" size="small">Detailed Report</Button>
                <Button variant="contained" size="small">Financial Dashboard</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;