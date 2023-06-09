import React from 'react';
import { Grid, Container, TextField, MenuItem, Button, InputAdornment, IconButton, Tooltip } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const CalcForm = ({ calculation, change }) => {
  const currencies = [
    {
      value: 'Базовий розрахунок',
      label: 'Базовий розрахунок',
    },
    {
      value: 'Набір ваги',
      label: 'Набір ваги',
    },
    {
      value: 'Схуднення',
      label: 'Схуднення',
    },
  ];

  return (
    <Container maxWidth="sm">
      <form onSubmit={calculation}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              name='target'
              id="1"
              select
              label="Ціль"
              defaultValue=""
              helperText="Будь-ласка оберіть ціль"
              variant="standard"
              fullWidth
              onChange={change}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mass"
              name='mass'
              label="Поточна вага (кг):"
              variant="standard"
              fullWidth
              required
              onChange={change}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Введіть Вашу поточну вагу в кілограммах.">
                      <IconButton
                        edge="end"
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="amount-of-receptions"
              name='amount-of-receptions'
              label="Кількість порцій:"
              variant="standard"
              fullWidth
              required
              onChange={change}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Введіть кількість порцій яку бажаєте вживати протягом доби.">
                      <IconButton
                        edge="end"
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="amount-of-carbohydrates"
              name='amount-of-carbohydrates'
              label="Кількість вуглеводів(г):"
              variant="standard"
              fullWidth
              required
              onChange={change}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Введіть кількість вуглеводів в 100 граммах Вашого продукту який бажаєте розрахувати.">
                      <IconButton
                        edge="end"
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="nameProduct"
              label="Назва продукту:"
              variant="standard"
              fullWidth
              required
              onChange={change}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Введіть назву Вашого продукту який бажаєте розрахувати.">
                      <IconButton
                        edge="end"
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained">Розрахувати</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CalcForm;