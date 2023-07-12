import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [search, setSearch] = useState('')
  console.log(search)
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: "",
    modelo: "",
    año: "",
    color: "",
    combustible: "",
    transmision: "",
    puertas: "",
  });
  const [editarVehiculo, setEditarVehiculo] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editarVehiculo) {
      setEditarVehiculo({ ...editarVehiculo, [name]: value });
    } else {
      setNuevoVehiculo({ ...nuevoVehiculo, [name]: value });
    }
  };


  const agregarVehiculo = () => {
    if (editarVehiculo) {
      const nuevosVehiculos = vehiculos.map((vehiculo, index) =>
        index === editarVehiculo.index ? editarVehiculo : vehiculo
      );
      setVehiculos(nuevosVehiculos);
      setEditarVehiculo(null);
    } else {
      setVehiculos([...vehiculos, nuevoVehiculo]);
      setNuevoVehiculo({
        marca: "",
        modelo: "",
        año: "",
        color: "",
        combustible: "",
        transmision: "",
        puertas: "",
      });
    }
  };
  const eliminarVehiculo = (index) => {
    if (editarVehiculo && editarVehiculo.index === index) {
      setEditarVehiculo(null);
    }
    setVehiculos(vehiculos.filter((_, i) => i !== index));
  };

  const seleccionarVehiculo = (vehiculo, index) => {
    setEditarVehiculo({ ...vehiculo, index });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Registro de Vehículos</h1>

          <Form>
            <br></br>
            <Form.Group controlId="marca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                value={editarVehiculo ? editarVehiculo.marca : nuevoVehiculo.marca}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="modelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={editarVehiculo ? editarVehiculo.modelo : nuevoVehiculo.modelo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="año">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="text"
                name="año"
                value={editarVehiculo ? editarVehiculo.año : nuevoVehiculo.año}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={editarVehiculo ? editarVehiculo.color : nuevoVehiculo.color}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="combustible">
              <Form.Label>Combustible</Form.Label>
              <Form.Control
                type="text"
                name="combustible"
                value={editarVehiculo ? editarVehiculo.combustible : nuevoVehiculo.combustible}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="transmision">
              <Form.Label>Transmisión</Form.Label>
              <Form.Control
                type="text"
                name="transmision"
                value={editarVehiculo ? editarVehiculo.transmision : nuevoVehiculo.transmision}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="puertas">
              <Form.Label className="label-sm">Número de Puertas</Form.Label>
              <Form.Control
                type="text"
                name="puertas"
                value={editarVehiculo ? editarVehiculo.puertas : nuevoVehiculo.puertas}
                onChange={handleInputChange}
              />
            </Form.Group> <br></br>
            <Button variant="success" onClick={agregarVehiculo}>
              {editarVehiculo ? "Guardar Cambios" : "Agregar Vehículo"}
            </Button>
            <br></br>
            <br></br>
            <h3>Buscar Vehículos:</h3>
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar Vehiculo" />
            </InputGroup>
          </Form>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col> 
        <br></br>
          <h2>Lista de Vehículos</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Color</th>
                <th>Combustible</th>
                <th>Transmisión</th>
                <th>Puertas</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.filter((item) => {
                return search.toLowerCase() == '' ? item : item.marca.
                toLowerCase().includes(search)
              }).map((vehiculo, index) => (
                <tr key={index}>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.año}</td>
                  <td>{vehiculo.color}</td>
                  <td>{vehiculo.combustible}</td>
                  <td>{vehiculo.transmision}</td>
                  <td>{vehiculo.puertas}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => seleccionarVehiculo(vehiculo, index)}
                    >
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarVehiculo(index)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

