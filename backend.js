app.get("/todoinventario/:producto", async (req, res) => {
  try {

    const  producto = req.params.producto;

    const productoUnico= await pool.query(`SELECT cod_producto from inventario WHERE cod_producto= '${producto}'`);

    res.json(productoUnico.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

// con este codigo hago la filtracion para ver si existe el codigo producto en la BD
