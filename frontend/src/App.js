import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePrediction = (predictionResults) => {
    setResults(predictionResults);
    setLoading(false);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
    setResults(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Network Parameters
            </Typography>
            <InputForm 
              onPredictionStart={() => setLoading(true)}
              onPredictionComplete={handlePrediction}
              onPredictionError={handleError}
            />
          </Paper>
          
          {(results || loading || error) && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                QoS Prediction Results
              </Typography>
              <ResultsDisplay 
                results={results} 
                loading={loading} 
                error={error} 
              />
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;