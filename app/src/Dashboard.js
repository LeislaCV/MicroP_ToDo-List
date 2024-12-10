import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';


export const Dashboard = () => {

    const [user, setUser] = useState();
    const [metrics, setmetrics] = useState({
        numberOfUsers:0,
        numberOfTasks:0
    })  

    useEffect(() => {
        getUser()
        getMetrics()
    }, []);

    const getUser = () => {
        const user = JSON.parse(localStorage.user);
        setUser(user);
    }

    const getMetrics = async () => {
        try {
            const res = await axios.get("http://localhost:4000/data/getdata");
            const data = {
                numberOfTasks:res.data.numberOfTasks,
                numberOfUsers:res.data.numberOfUsers
            }
            setmetrics(data)
        } catch (error) {
            alert("Hubo un error xddxdxddxd")
        }
    }



    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Hi de nuevo {user?.name} </Card.Title>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Alaa, Numero de usuarios registrados: </Card.Title>
                                    <div> {metrics.numberOfUsers}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title> Yeii, Numero de cuestionarios creados: </Card.Title>
                                    <div> {metrics.numberOfTasks}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
