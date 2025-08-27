import { createSelector } from '@reduxjs/toolkit';

export const selectIncidenciasFiltradas = createSelector(
  [(state) => state.incidencias.todas, (state) => state.incidencias.filtro],
  (todas, filtro) => {
    if (!filtro.trim()) return todas;
    return todas.filter((i) =>
      i.modulo.toLowerCase().includes(filtro.toLowerCase())
    );
  }
);
