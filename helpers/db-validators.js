
const { Categoria, Role, Usuario, Producto } = require('../models');



const esRolValido = async (rol = '') => {

  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }

}

const emailExiste = async (correo = '') => {

  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado en la BD`)
  }
}

const existeUsuarioPorID = async (id) => {

  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe en la BD`)
  }
}


const existeCategoriaPorID = async (id) => {

  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`El ID ${id} no existe en la BD`)
  }
}


const existeProductoPorID = async (id) => {

  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El ID ${id} no existe en la BD`)
  }
}






module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorID,
  existeCategoriaPorID,
  existeProductoPorID
}