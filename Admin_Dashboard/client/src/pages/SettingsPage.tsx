import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Snackbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    setSnackbarMessage('Settings saved successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          System Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save All Changes
        </Button>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" />
          <Tab label="Email Templates" />
          <Tab label="Notifications" />
          <Tab label="Integrations" />
          <Tab label="Backup & Restore" />
          <Tab label="Feature Flags" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="System Information" />
                <Divider />
                <CardContent>
                  <TextField
                    label="Platform Name"
                    fullWidth
                    defaultValue="BidBees Platform"
                    margin="normal"
                  />
                  <TextField
                    label="Admin Email"
                    fullWidth
                    defaultValue="admin@bidbees.com"
                    margin="normal"
                  />
                  <TextField
                    label="Support Contact"
                    fullWidth
                    defaultValue="+1 (555) 123-4567"
                    margin="normal"
                  />
                  <TextField
                    label="System Version"
                    fullWidth
                    defaultValue="1.0.0"
                    disabled
                    margin="normal"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Security Settings" />
                <Divider />
                <CardContent>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Two-Factor Authentication"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Password Expiry (90 days)"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="IP Restriction"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Auto-logout (30 minutes)"
                  />
                  <TextField
                    label="Minimum Password Length"
                    type="number"
                    defaultValue="8"
                    fullWidth
                    margin="normal"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Regional Settings" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Default Language</InputLabel>
                        <Select
                          value="en"
                          label="Default Language"
                        >
                          <MenuItem value="en">English</MenuItem>
                          <MenuItem value="fr">French</MenuItem>
                          <MenuItem value="es">Spanish</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Timezone</InputLabel>
                        <Select
                          value="UTC"
                          label="Timezone"
                        >
                          <MenuItem value="UTC">UTC</MenuItem>
                          <MenuItem value="EST">Eastern Time (EST)</MenuItem>
                          <MenuItem value="PST">Pacific Time (PST)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Date Format</InputLabel>
                        <Select
                          value="MM/DD/YYYY"
                          label="Date Format"
                        >
                          <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                          <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                          <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              New Template
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom>Email Templates</Typography>
                <List>
                  <ListItem button selected>
                    <ListItemText primary="Welcome Email" secondary="Sent to new users" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Password Reset" secondary="For password recovery" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Account Verification" secondary="Email verification" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Bid Notification" secondary="New bid alerts" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Support Ticket" secondary="Ticket updates" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Edit Template: Welcome Email</Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  label="Subject"
                  fullWidth
                  defaultValue="Welcome to BidBees Platform!"
                  margin="normal"
                />

                <TextField
                  label="Template Content"
                  fullWidth
                  multiline
                  rows={10}
                  margin="normal"
                  defaultValue={`Hello {{name}},

Thank you for joining BidBees! We're excited to have you on board.

Your account has been successfully created and you can now start exploring the platform.

Username: {{username}}

If you have any questions, please don't hesitate to contact our support team.

Best regards,
The BidBees Team`}
                />

                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Available Variables: {{name}}, {{username}}, {{email}}, {{date}}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Card>
            <CardHeader title="Notification Settings" />
            <Divider />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Email Notifications</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="User Registration"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Password Reset"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="New Tender Submissions"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Bid Notifications"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" gutterBottom>System Notifications</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="System Health Alerts"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Service Degradation"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Database Backup Results"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Security Incidents"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" gutterBottom>Notification Delivery</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="SMTP Server"
                    fullWidth
                    defaultValue="smtp.example.com"
                    margin="normal"
                  />
                  <TextField
                    label="SMTP Port"
                    fullWidth
                    defaultValue="587"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="SMTP Username"
                    fullWidth
                    defaultValue="notifications@bidbees.com"
                    margin="normal"
                  />
                  <TextField
                    label="SMTP Password"
                    fullWidth
                    type="password"
                    defaultValue="************"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="AWS Integration" />
                <Divider />
                <CardContent>
                  <TextField
                    label="AWS Region"
                    fullWidth
                    defaultValue="us-east-1"
                    margin="normal"
                  />
                  <TextField
                    label="S3 Bucket"
                    fullWidth
                    defaultValue="bidbees-storage"
                    margin="normal"
                  />
                  <TextField
                    label="Access Key ID"
                    fullWidth
                    defaultValue="••••••••••••••••••"
                    margin="normal"
                  />
                  <TextField
                    label="Secret Access Key"
                    fullWidth
                    type="password"
                    defaultValue="••••••••••••••••••"
                    margin="normal"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable AWS Integration"
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Payment Gateway" />
                <Divider />
                <CardContent>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Payment Provider</InputLabel>
                    <Select
                      value="stripe"
                      label="Payment Provider"
                    >
                      <MenuItem value="stripe">Stripe</MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                      <MenuItem value="square">Square</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="API Key"
                    fullWidth
                    defaultValue="••••••••••••••••••"
                    margin="normal"
                  />
                  <TextField
                    label="Webhook Secret"
                    fullWidth
                    type="password"
                    defaultValue="••••••••••••••••••"
                    margin="normal"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Test Mode"
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Third-Party Services" />
                <Divider />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Mapbox API" 
                        secondary="Integration for map rendering and location services" 
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText 
                        primary="Firebase" 
                        secondary="Real-time notifications and messaging" 
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText 
                        primary="TensorFlow" 
                        secondary="Machine learning for recommendation engine" 
                      />
                      <ListItemSecondaryAction>
                        <Switch />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText 
                        primary="Brightdata" 
                        secondary="Web scraping integration" 
                      />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Database Backup" />
                <Divider />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    Configure and manage database backups for the system.
                  </Typography>
                  
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Backup Frequency</InputLabel>
                    <Select
                      value="daily"
                      label="Backup Frequency"
                    >
                      <MenuItem value="hourly">Hourly</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <TextField
                    label="Retention Period (days)"
                    fullWidth
                    type="number"
                    defaultValue="30"
                    margin="normal"
                  />
                  
                  <TextField
                    label="Backup Storage Path"
                    fullWidth
                    defaultValue="s3://bidbees-backups/"
                    margin="normal"
                  />
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Create Backup Now
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloudDownloadIcon />}
                    >
                      View Backups
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="System Restore" />
                <Divider />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    Restore the system from a previous backup point.
                  </Typography>
                  
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    Restoring from a backup will replace all current data. This action cannot be undone.
                  </Alert>
                  
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Backup Point</InputLabel>
                    <Select
                      value=""
                      label="Select Backup Point"
                    >
                      <MenuItem value="backup_2023_12_01">2023-12-01 00:00 (Automated)</MenuItem>
                      <MenuItem value="backup_2023_11_30">2023-11-30 00:00 (Automated)</MenuItem>
                      <MenuItem value="backup_2023_11_29">2023-11-29 12:30 (Manual)</MenuItem>
                      <MenuItem value="backup_2023_11_28">2023-11-28 00:00 (Automated)</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<RefreshIcon />}
                    >
                      Restore System
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="System Logs" />
                <Divider />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    Configure system logging and download log archives.
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Log Level</InputLabel>
                        <Select
                          value="info"
                          label="Log Level"
                        >
                          <MenuItem value="debug">Debug</MenuItem>
                          <MenuItem value="info">Info</MenuItem>
                          <MenuItem value="warn">Warning</MenuItem>
                          <MenuItem value="error">Error</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Log Retention</InputLabel>
                        <Select
                          value="30"
                          label="Log Retention"
                        >
                          <MenuItem value="7">7 days</MenuItem>
                          <MenuItem value="14">14 days</MenuItem>
                          <MenuItem value="30">30 days</MenuItem>
                          <MenuItem value="90">90 days</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<CloudDownloadIcon />}
                    >
                      Download System Logs
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloudDownloadIcon />}
                    >
                      Download Application Logs
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              New Feature Flag
            </Button>
          </Box>

          <Card>
            <CardHeader title="Feature Flags" />
            <Divider />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                Manage feature flags to enable or disable specific features in the application.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="AI Recommendation Engine" 
                    secondary="Enable machine learning-based recommendations for users" 
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Real-time Notifications" 
                    secondary="Enable WebSocket-based real-time notifications" 
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Advanced Analytics" 
                    secondary="Enable detailed analytics and reporting features" 
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Smart Contract Integration" 
                    secondary="Enable blockchain-based smart contract functionality" 
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Drone Integration" 
                    secondary="Enable drone contractor features and location services" 
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="Multi-language Support" 
                    secondary="Enable internationalization and translation features" 
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default SettingsPage;