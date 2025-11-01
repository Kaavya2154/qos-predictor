import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const ResultsDisplay = ({ results, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!results) {
    return null;
  }

  // Handle both array and object formats from the API
  let latency, jitter, packet_loss, throughput;
  
  if (Array.isArray(results)) {
    // If results is an array [latency, jitter, packet_loss, throughput]
    [latency, jitter, packet_loss, throughput] = results;
  } else {
    // If results is an object with named properties
    ({ latency, jitter, packet_loss, throughput } = results);
  }
  
  // Ensure all values are numbers to prevent toFixed errors
  latency = Number(latency) || 0;
  jitter = Number(jitter) || 0;
  packet_loss = Number(packet_loss) || 0;
  throughput = Number(throughput) || 0;

  // Data for bar chart
  const barChartData = {
    labels: ['Latency (ms)', 'Jitter (ms)', 'Packet Loss (%)', 'Throughput (Mbps)'],
    datasets: [
      {
        label: 'QoS Metrics',
        data: [latency, jitter, packet_loss, throughput],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for radar chart
  const radarChartData = {
    labels: ['Latency', 'Jitter', 'Packet Loss', 'Throughput'],
    datasets: [
      {
        label: 'QoS Metrics (Normalized)',
        data: [
          // Normalize values for radar chart
          latency / 100,  // Assuming max latency is 100ms
          jitter / 20,    // Assuming max jitter is 20ms
          packet_loss / 5, // Assuming max packet loss is 5%
          throughput / 100 // Assuming max throughput is 100Mbps
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'QoS Metrics Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'QoS Metrics Profile',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 1,
      },
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="metric-card" elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Latency
              </Typography>
              <Typography variant="h4" component="div" className="metric-value">
                {latency.toFixed(2)}
              </Typography>
              <Typography className="metric-unit" color="textSecondary">
                milliseconds
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="metric-card" elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Jitter
              </Typography>
              <Typography variant="h4" component="div" className="metric-value">
                {jitter.toFixed(2)}
              </Typography>
              <Typography className="metric-unit" color="textSecondary">
                milliseconds
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="metric-card" elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Packet Loss
              </Typography>
              <Typography variant="h4" component="div" className="metric-value">
                {packet_loss.toFixed(2)}
              </Typography>
              <Typography className="metric-unit" color="textSecondary">
                percent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="metric-card" elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Throughput
              </Typography>
              <Typography variant="h4" component="div" className="metric-value">
                {throughput.toFixed(2)}
              </Typography>
              <Typography className="metric-unit" color="textSecondary">
                Mbps
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className="chart-container">
            <Bar data={barChartData} options={barOptions} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="chart-container">
            <Radar data={radarChartData} options={radarOptions} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultsDisplay;