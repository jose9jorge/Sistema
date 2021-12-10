
import React, { Fragment, useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, FormGroup} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Prueba/Insertar.css';


//Insertandp Datos en la BD

const InsertarInventario = ({datos, setDatos}) => {
  const [modal, setModal]= useState(false);   //Para abrir y cerrar el modal


  const modalStyles={
    width: '100%',
    height: '100%',
    position: "absolute",
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  const modelo={
    width: '70%',
    height: '100%',
    position: "absolute",
    top: '0%',
    left: '30%',

  }

  const boton={
    width: '20%',
    height: '10%',
    position: "absolute",
    top: '90%',
    left: '20%',
  }

  const botonII={
    width: '20%',
    height: '10%',
    position: "absolute",
    top: '90%',
    left: '60%',
  }


      const onChange = (e) => {
     setDatos({
        ...datos,
       [e.target.name]: e.target.value
      })
    }

    let {cod_producto,nombre,cantidad } = datos;



/*Esto es para verificar que no se repita el dato en la bd, con esto trato de verificar
 de que el dato no se repita en la bd luego mas abajo llamo a la funcion ProductoUnico, consulto, pero no me funciona y no entiendo porque.*/


aqui es la consulta
    const ProductoUnico = async (datos)=>  {

      try {

        const response = await fetch(`http://localhost:5000/todoinventario/${datos}`);

        const jsonData = await response.json();

        const resp = jsonData.cod_producto;

        return resp;

      } catch (err) {
       console.error(err.message);
      }
    };

  const onSubmitForm = async e => {
    e.preventDefault();

    if (cod_producto.trim() === '' ||
      nombre.trim() === '' ||
      cantidad.trim() === '') {
      toast.info('Todos los campos son obligatorios',{position: "top-center"});
      return;
    }

//aqui llamo a la funcion y si me devuelve el mismo codigo q ingrese por el frontend deberia de decirme producto repetido, se debe romper el ciclo hasta que ingrese un prodcuto distinto
    if(ProductoUnico(cod_producto)===(cod_producto)){
      toast.info('Codigo de producto repetido, por favor introduzca otro ',{position: "top-center"});
      return ;
    }else{

//si el código producto es distinto no esta en la bd se procede a insertar el dato
    try {
      const datos = { cod_producto,nombre,cantidad };
       // eslint-disable-next-line
      const response = await fetch("http://localhost:5000/todoinventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });


      toast.info("Datos insertados correctamente",{position: "top-center"});

      //reiniciando state de datos de los campos
      setDatos({
        cod_producto:"",
        nombre:"",
        cantidad:""
      });


    //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }
  };

  return (
    <Fragment>
      <div className="principal">
        <div className="secundario">
          <Button className="boton" color="success" onClick={() => setModal(true)}> Insertar</Button>
        </div>
      </div>
      <br/>

    <Modal isOpen={modal} style={modalStyles}>
    <ModalBody>
              <ModalHeader style={modelo}>
                Agregar Nuevo Producto
              </ModalHeader>

      <FormGroup>
         <form onSubmit={onSubmitForm}>
                    <br/><br/><br/>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="cod_producto"
                      value={cod_producto}
                      placeholder="Codigo Producto"
                      onChange={(e) => onChange(e)}
                      />
                  </div>

                  <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="nombre"
                              value={nombre}
                              placeholder="Nombre"
                              onChange={(e) => onChange(e)}
                            />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="cantidad"
                      value={cantidad}
                      placeholder="Cantidad"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                    <br/>
                  <div>
                    <Button style={boton} color="primary" >Guardar</Button>
                    <Button style={botonII} color="danger" onClick={() => setModal(false)}>Cerrar</Button>
                  </div>
                  <ToastContainer />
        </form>
     </FormGroup>
  </ModalBody>
       <br/>
  </Modal>

 </Fragment>
 );
 };
 //Espero que me puedan ayudar soy nuevo y ando un poco perdido, no entiendo porque no funciona,
 // por favor diganme que estoy haciendo mal, diganme que debe quitar o colocar, gracias.

export default InsertarInventario;
