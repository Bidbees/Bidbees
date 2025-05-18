import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Grid, 
  Badge, 
  Tooltip, 
  Skeleton,
  Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  Person as BidderIcon,
  BusinessCenter as TendererIcon,
  LocalShipping as CourierIcon,
  Inventory as SupplierIcon,
  FlightTakeoff as DroneIcon,
  Accessible as BeeIcon
} from '@mui/icons-material';

interface ModuleSummary {
  id: string;
  name: string;
  activeUsers: number;
  pendingIssues: number;
}

const ModuleAccessButtons: React.FC = () => {
  const { data, isLoading, error } = useQuery<{ modules: ModuleSummary[] }>({
    queryKey: ['moduleSummary'],
    queryFn: async () => {
      const response = await fetch('/api/admin/modules/summary');
      if (!response.ok) {
        throw new Error('Failed to fetch module summary');
      }
      return response.json();
    },
  });

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'bidder':
        return <BidderIcon />;
      case 'tenderer':
        return <TendererIcon />;
      case 'courier':
        return <CourierIcon />;
      case 'supplier':
        return <SupplierIcon />;
      case 'drone':
        return <DroneIcon />;
      case 'bee':
        return <BeeIcon />;
      default:
        return <BidderIcon />;
    }
  };

  if (isLoading) {
    return (
      <Box>
        <Grid container spacing={1}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={6} key={i}>
              <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Typography variant="body2" color="error">
        Error loading module data
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={1}>
        {data.modules.map((module) => (
          <Grid item xs={6} key={module.id}>
            <Tooltip title={`${module.activeUsers} active users, ${module.pendingIssues} pending issues`}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={getModuleIcon(module.id)}
                color={module.pendingIssues > 0 ? "warning" : "primary"}
                sx={{ 
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  mb: 1,
                }}
              >
                <Badge badgeContent={module.pendingIssues} color="error" sx={{ mr: 1 }}>
                  <Box sx={{ display: 'block', textAlign: 'left' }}>
                    {module.name}
                  </Box>
                </Badge>
              </Button>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModuleAccessButtons;