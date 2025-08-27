import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    todas: [],
    filtro: '', 

};

const incidenciaSlice = createSlice({
    name: 'incidencias',
    initialState,
    reducers: {
        setFiltro: (state, action) =>{
            state.filtro =action.payload
         },
         setIncidencias : (state, action) =>{
            state.todas = action.payload
         }
    }
})

export const { setFiltro, setIncidencias } = incidenciaSlice.actions;
export default incidenciaSlice.reducer;
