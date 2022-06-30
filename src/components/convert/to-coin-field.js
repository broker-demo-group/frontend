import { Autocomplete, Box, Input, TextField, Typography } from '@mui/material';

const ariaLabel = { 'aria-label': 'fromCurrency' };

const swappableCoins = [{ label: 'BTC' }, { label: 'ETH' }];

export const ToCoinField = (props) => {
  const { coinSelected, swappableCoins, onSelectNewCoin } = props;

  return (
    <Box>
      <Typography variant="body2">To</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 2,
          justifyContent: 'space-between',
          border: '1px solid grey'
        }}
      >
        <Input placeholder="0.00000" inputProps={ariaLabel} disableUnderline={true} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={swappableCoins}
            value={coinSelected}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => onSelectNewCoin(value)}
          />
        </Box>
      </Box>
    </Box>
  );
};
