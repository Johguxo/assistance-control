"use client"

import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, Select, MenuItem, TextField, Typography, FormControlLabel, Switch } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { createUser } from "@/controller/createUser";
import { Institution } from "@/models/interfaces";
import { fetchInstitutions } from "@/controller/fetchInstitutions";

export default function Inscription() {
  const [loading, setLoading] = useState<boolean>(true);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    dni: '',
    phone: '',
    date_birth: '',
    belongsToInstitution: 'Yes',
    typeInstitution: '1',
    institution: 'default',
    isLeader: false,
    comision: 'default'  
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const institutionData = await fetchInstitutions();
        setInstitutions(institutionData);
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
      typeInstitution: checked ? '1' : formData.typeInstitution 
    }));
  };

  const handleSelectTypeInstitutionChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const institution = institutions.find((institution) => institution.type === parseInt(value));
    setFormData((prevState) => ({
      ...prevState,
      typeInstitution: value,
      institution: institution ? institution._id : ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const newUser = await createUser(formData);
    console.log("Usuario creado!", newUser);
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
            <Typography sx={{ mt: 10, mb: 1 }} variant="h4">Registro del Participante</Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <FormControlLabel
                control={
                  <Switch
                    name="isLeader"
                    checked={formData.isLeader}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                }
                label={formData.isLeader ? "Facilitador" : "Participante"}
                sx={{ mt: 2, mb: 2 }}
              />
              <TextField
                type="text"
                name="first_name"
                margin="normal"
                fullWidth
                label="Nombres"
                value={formData.first_name}
                onChange={handleInputChange}
                sx={{ mt: 2, mb: 1.5 }}
              />
              <TextField
                type="text"
                name="last_name"
                margin="normal"
                fullWidth
                label="Apellidos"
                value={formData.last_name}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <TextField
                type="text"
                name="age"
                margin="normal"
                fullWidth
                label="Edad"
                value={formData.age}
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
                name="phone"
                margin="normal"
                fullWidth
                label="Nº de Celular (WhatsApp)"
                value={formData.phone}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <TextField
                type="date"
                name="date_birth"
                margin="normal"
                fullWidth
                label="Fecha de nacimiento"
                value={formData.date_birth}
                onChange={handleInputChange}
                sx={{ mt: 1.5, mb: 1.5 }}
                InputLabelProps={{ shrink: true }}
              />
              {!formData.isLeader && (
                <>
                  <Typography sx={{ mt: 1, mb: 1 }} variant="h5">¿Perteneces a alguna institución?</Typography>
                  <Select
                    name="belongsToInstitution"
                    value={formData.belongsToInstitution}
                    onChange={handleSelectChange}
                    fullWidth
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <MenuItem value="Yes">Sí</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </>
              )}
              {(!formData.isLeader && formData.belongsToInstitution === "Yes") && (
                <>
                  <Typography sx={{ mt: 1, mb: 1 }} variant="h5">A qué tipo de institución perteneces:</Typography>
                  <Select
                    name="typeInstitution"
                    value={formData.typeInstitution}
                    onChange={handleSelectTypeInstitutionChange}
                    fullWidth
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <MenuItem value="1">Parroquia</MenuItem>
                    <MenuItem value="2">Colegio</MenuItem>
                    <MenuItem value="3">Universidad</MenuItem>
                    <MenuItem value="4">Congregación</MenuItem>
                  </Select>
                </>
              )}
              {(formData.isLeader || (!formData.isLeader && formData.belongsToInstitution === "Yes")) && (
                <>
                  <Typography sx={{ mt: 1, mb: 1 }} variant="h5">
                    {formData.isLeader ? "Indica la parroquia a la que perteneces:" : "Indica la institución a la que perteneces:"}
                  </Typography>
                  <Select
                    name="institution"
                    value={formData.institution}
                    onChange={handleSelectChange}
                    fullWidth
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <MenuItem value="default" disabled>
                    {formData.isLeader ? "Selecciona una parroquia" : "Selecciona una institución"}
                    </MenuItem>
                    {institutions
                      .filter((institution) => formData.isLeader ? institution.type === 1 : institution.type === parseInt(formData.typeInstitution))
                      .map((inst, i) => (
                        <MenuItem key={i} value={inst._id}>
                          {inst.name}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
              {formData.isLeader && (
                <>
                  <Typography sx={{ mt: 1, mb: 1 }} variant="h5">Área que perteneces:</Typography>
                  <Select
                    name="comision"
                    value={formData.comision}
                    onChange={handleSelectChange}
                    fullWidth
                    sx={{ mt: 1, mb: 2 }}
                  >
                    <MenuItem value="default" disabled>
                    Seleccione una comisión
                    </MenuItem>

                    <MenuItem value="1">Comunicaciones</MenuItem>
                    <MenuItem value="2">Coro Juvenil Arquidiocesano</MenuItem>
                    <MenuItem value="3">Animación y adoración</MenuItem>
                    <MenuItem value="4">Danza</MenuItem>
                    <MenuItem value="5">Registro y Estadística</MenuItem>
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
