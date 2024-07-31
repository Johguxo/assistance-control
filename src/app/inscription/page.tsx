"use client"

import React from "react";
import { Box, Button, Container, Grid, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";


export default function Inscription() {
  const [institution, setInstitution] = React.useState('');
  const [belongsToInstitution, setBelongsToInstitution] = React.useState('');

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">Registro del Participante</Typography>
            <Box component="form">
              <TextField
                type="text"
                margin="normal"
                fullWidth label="Nombres"
                sx={{ mt: 2, mb: 1.5 }} />
              <TextField
                type="text"
                margin="normal"
                fullWidth label="Apellidos"
                sx={{ mt: 1.5, mb: 1.5 }} />
              <TextField
                type="text"
                margin="normal"
                fullWidth label="Edad"
                sx={{ mt: 1.5, mb: 1.5 }} />
              <TextField
                type="text"
                margin="normal"
                fullWidth label="Nº DNI"
                sx={{ mt: 1.5, mb: 1.5 }} />
              <TextField
                type="text"
                margin="normal"
                fullWidth label="Nº de Celular (WhatsApp)"
                sx={{ mt: 1.5, mb: 1.5 }} />
              <TextField
                type="date"
                margin="normal"
                fullWidth label="Fecha de nacimiento"
                sx={{ mt: 1.5, mb: 1.5 }} />
              <Typography sx={{ mt: 1, mb: 1 }} variant="h5">¿Perteneces a alguna institución?</Typography>
              <Select
                value={belongsToInstitution}
                onChange={(e) => setBelongsToInstitution(e.target.value)}
                fullWidth
                sx={{ mt: 1, mb: 2 }}
              >
                <MenuItem value="Yes">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h5">Indica la institución a la que perteneces:</Typography>
              <Select
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                fullWidth
                sx={{ mt: 1, mb: 2 }}
              >
                <MenuItem value="Colegio">Colegio</MenuItem>
                <MenuItem value="Parroquia">Parroquia</MenuItem>
                <MenuItem value="Congregación">Congregación</MenuItem>
              </Select>
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 3 }}>
                Registrar Datos
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}