
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    genero: { type: String, required: true },
    plataformas: { type: [String], required: true },
});

// Definimos el modelo
const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

// Tus funciones
function email() { /* ... */ }
function sumar() { /* ... */ }


module.exports = {
    UsuarioModel, 
    email,
    sumar
};
