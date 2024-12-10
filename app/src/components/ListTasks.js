import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const ListTasks = (rol ) => {
    const navigate = useNavigate();
    const [tasks, settasks] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        getUser()
        getData()
    }, [])

    const getUser = () => {
        const user = JSON.parse(localStorage.user);
        setUser(user);
    }

    const getData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/tasks/get-all");
            settasks(data.tasks);
        } catch (error) {
            console.log(error)
            alert("Upss, hubo un error al obtener las tareas :(")
        }
    }



    const onSubmit = async (taskId) => {
        try {
            const res = await axios.delete(
                `http://localhost:4000/task/deleteTasks/${taskId}`);
                alert("!Yeii, Tarea eliminada con éxito!");
                window.location.reload();
            navigate("/list-t");
        } catch (error) {
            alert("Chintriolas, hubo un error :(");
        }
    };
    
    return (
        
        <Container style={{backgroundColor: "#22543d"}} className='mt-3 mb-3'>
            <Row>
                {
                    tasks.map(({ _id, title, description, dateFinish, status }, i) => (
                        <Col>
                            <Card style={{ width: "15rem" }} className='mb-3'>
                                <Card.Body>
                                    <a
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <Card.Img src="https://logodix.com/logo/2090429.jpg" />
                                    </a>
                                    <Row className='m-1'>
                                        <Col xs={8}>
                                            <Card.Title>
                                                {title}
                                            </Card.Title>
                                        </Col>
                                        {
                                            user?.rol == "client" && (
                                                <Col className="text-center">
  
  
  <Button 
    onClick={() => onSubmit(_id)} 
    style={{
      width: "6rem", 
      marginRight: "10px", 
      backgroundColor: "#A8D5BA", // Verde suave
      border: "none", 
      borderRadius: "25px", // Bordes más redondeados
      color: "white", 
      fontSize: "0.9rem", // Fuente más pequeña
      padding: "6px 0",
      marginTop: "10px" // Espaciado entre el texto y el botón
    }}
  >
    Eliminar
  </Button>
  <Button className='mt-2'
    style={{
      width: "6rem", 
      backgroundColor: "#A1D3B1", // Verde suave
      border: "none", 
      borderRadius: "25px", // Bordes más redondeados
      color: "white", 
      fontSize: "0.9rem", // Fuente más pequeña
      padding: "6px 0",
      marginTop: "10px" // Espaciado entre los botones
    }}
  >
    Editar
  </Button>
</Col>



                                            )
                                        }
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            Descripción: {description}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            Fecha Límite: {dateFinish}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            Estado: {status}
                                        </Card.Text>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {
                user?.rol == "client" &&(
                    <div className='text-end'>
                        <Button onClick={() => navigate("/create-task")}>Crear Homework  </Button>
                    </div>
                )
            }
        </Container>
    )
}
