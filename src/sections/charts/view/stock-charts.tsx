import { Box, Container, Typography, LinearProgress, linearProgressClasses } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { AnalyticsCharts } from '../analytics-charts';
import { useStockData } from '../../../hooks/useStockData';

export function StockCharts() {
  const { data, loading } = useStockData();

  if (loading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="1 1 auto"
        height="100vh"
      >
        <LinearProgress
          sx={{
            width: 1,
            maxWidth: 320,
            bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
            [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
          }}
        />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Stock Charts
      </Typography>

      <AnalyticsCharts
        title="AAPL Stock Prices"
        subheader="From last year"
        chart={{
          categories: data.categories,
          series: data.series,
        }}
      />
    </Container>
  );
}
