import React, { useState } from 'react';
import { Box, Grid, TextField, Button, MenuItem, Slider, Typography } from '@mui/material';
import { predictQoS } from '../services/api';

const InputForm = ({ onPredictionStart, onPredictionComplete, onPredictionError }) => {
  const [formData, setFormData] = useState({
    bandwidth: 100,
    network_load: 50,
    packet_size: 1000,
    distance: 100,
    hop_count: 5,
    protocol: 0,
    time_of_day: 12,
    network_type: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  const handleSliderChange = (name) => (e, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onPredictionStart();

    try {
      const results = await predictQoS(formData);
      onPredictionComplete(results);
    } catch (error) {
      onPredictionError(error.message || 'Failed to predict QoS metrics');
    }
  };

  const protocols = [
    { value: 0, label: 'TCP' },
    { value: 1, label: 'UDP' },
    { value: 2, label: 'HTTP' },
    { value: 3, label: 'HTTPS' },
    { value: 4, label: 'QUIC' }
  ];

  const networkTypes = [
    { value: 0, label: 'Ethernet' },
    { value: 1, label: 'WiFi' },
    { value: 2, label: '4G' },
    { value: 3, label: '5G' },
    { value: 4, label: 'Fiber' }
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Bandwidth (Mbps)</Typography>
          <Slider
            value={formData.bandwidth}
            onChange={handleSliderChange('bandwidth')}
            aria-labelledby="bandwidth-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={1000}
          />
          <TextField
            margin="normal"
            fullWidth
            id="bandwidth"
            name="bandwidth"
            label="Bandwidth (Mbps)"
            type="number"
            value={formData.bandwidth}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 10, max: 1000 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Network Load (%)</Typography>
          <Slider
            value={formData.network_load}
            onChange={handleSliderChange('network_load')}
            aria-labelledby="network-load-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={95}
          />
          <TextField
            margin="normal"
            fullWidth
            id="network_load"
            name="network_load"
            label="Network Load (%)"
            type="number"
            value={formData.network_load}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 5, max: 95 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            id="packet_size"
            name="packet_size"
            label="Packet Size (bytes)"
            type="number"
            value={formData.packet_size}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 64, max: 1500 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            id="distance"
            name="distance"
            label="Distance (km)"
            type="number"
            value={formData.distance}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1, max: 1000 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            id="hop_count"
            name="hop_count"
            label="Hop Count"
            type="number"
            value={formData.hop_count}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1, max: 20 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            id="protocol"
            name="protocol"
            select
            label="Protocol"
            value={formData.protocol}
            onChange={handleChange}
          >
            {protocols.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Time of Day (hour)</Typography>
          <Slider
            value={formData.time_of_day}
            onChange={handleSliderChange('time_of_day')}
            aria-labelledby="time-of-day-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={23}
          />
          <TextField
            margin="normal"
            fullWidth
            id="time_of_day"
            name="time_of_day"
            label="Time of Day (hour)"
            type="number"
            value={formData.time_of_day}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0, max: 23 } }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            fullWidth
            id="network_type"
            name="network_type"
            select
            label="Network Type"
            value={formData.network_type}
            onChange={handleChange}
          >
            {networkTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Predict QoS Metrics
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;