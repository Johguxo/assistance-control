"use client"

import React, { useState } from "react";
import { Box, Button, Container, Grid, Paper, Select, MenuItem, TextField, Typography } from "@mui/material";

export default function Inscription() {
  const [institution, setInstitution] = useState('');
  const [belongsToInstitution, setBelongsToInstitution] = useState('');
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    dni: '',
    celular: '',
    fechaNacimiento: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log({
      ...formData,
      belongsToInstitution,
      institution: belongsToInstitution === "Yes" ? institution : 'N/A'
    });
  };

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
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="nombres"
                margin="normal"
                fullWidth
                label="Nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                sx={{ mt: 2, mb: 1.5 }}
              />
              <TextField
                type="text"
                name="apellidos"
                margin="normal"
                fullWidth
                label="Apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <TextField
                type="text"
                name="edad"
                margin="normal"
                fullWidth
                label="Edad"
                value={formData.edad}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <TextField
                type="text"
                name="dni"
                margin="normal"
                fullWidth
                label="Nº DNI"
                value={formData.dni}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <TextField
                type="text"
                name="celular"
                margin="normal"
                fullWidth
                label="Nº de Celular (WhatsApp)"
                value={formData.celular}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <TextField
                type="date"
                name="fechaNacimiento"
                margin="normal"
                fullWidth
                label="Fecha de nacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
                InputLabelProps={{shrink:true}}
              />
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
              {belongsToInstitution === "Yes" && (
                <>
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
                </>
              )}
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
