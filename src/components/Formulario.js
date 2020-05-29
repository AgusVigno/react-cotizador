import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    border: none;
    padding: 1rem;
    width: 100%;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color .3s easy;
    margin-top: 2rem;

    &:hover{
        cursor: pointer;
        background-color: #26C6DA;
    }
`;

const Error = styled.div`
    background-color: red;
    padding: 1rem;
    color: white;
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, actualizarCargando}) => {

    //definir el UseState
    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [ error, actualizarError ] = useState(false);

    //extraer los valore del state
    const { marca, year, plan } = datos;

    //leer los valores del formulario y guardarlos en el State
    const obtenerInformacion = e => {
        guardarDatos({ ...datos, [e.target.name] : e.target.value })
    } 

    //cuando el usuario hace click en cotizar
    const cotizarSeguro = e => {
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            actualizarError(true);
            return
        }
        actualizarError(false);

        //base de 2000
        let resultado = 2000;

        //obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        //por cada año se le resta 3%
        resultado -= ((diferencia * 3) * resultado ) / 100;

        //americano 15% - europeo 30% - asiatico 5%
        resultado = calcularMarca(marca) * resultado;

        
        //basico aumenta 20% - completo 50%
        resultado = parseFloat(calcularPlan(plan) * resultado).toFixed(2);
        
        //agrega el spinner
        actualizarCargando(true);

        setTimeout(() => {
            //elimina el spinner
            actualizarCargando(false)

            //pasa la informacion al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);
    }


    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null }

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                />Basico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}
 
Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    actualizarCargando: PropTypes.func.isRequired
}

export default Formulario;