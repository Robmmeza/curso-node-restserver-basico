

const { response } = require("express");
const { Producto } = require('../models');


// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, productos] = await Promise.all([

        Producto.countDocuments(query),
        Producto.find(query)

            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        productos

    })
}

// obtenerProducto - populate
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params.id;

    const producto = await Producto.findOne(id).populate('usuario', 'nombre').populate('categoria', 'nombre');


    res.json(producto)

}


//Crear producto

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if (productoDB) {

        return res.status(400).json({
            msg: `El producto: ${productoDB.nombre}, ya existe`
        });
    }

    //Generar data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}


//actualizarProducto

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params.id;

    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {

        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findOneAndUpdate(id, data, { new: true });

    res.json(producto)

}


//borrarProducto - estado:false

const borrarProducto = async (req, res) => {

    const { id } = req.params.id;

    const productoBorrado = await Producto.findOneAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);

}



module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}