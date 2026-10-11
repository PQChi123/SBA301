import { Link, useParams } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { orchids } from "../data/orchids";

function OrchidDetail() {
    const { id } = useParams();
    const orchid = orchids.find((item) => item.id === Number(id));

    if (!orchid) {
        return (
            <Container className="py-4">
                <Alert variant="warning">Orchid not found.</Alert>
                <Button as={Link} to="/" variant="primary">
                    Back to orchids
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
                Back to orchids
            </Button>
            <Card className="shadow-sm">
                <Row className="g-0">
                    <Col md={6}>
                        <Card.Img src={orchid.image} alt={orchid.orchidName} className="h-100 object-fit-cover" />
                    </Col>
                    <Col md={6}>
                        <Card.Body className="p-4">
                            <Card.Title as="h1">{orchid.orchidName}</Card.Title>
                            <Card.Text>{orchid.description}</Card.Text>
                            <dl>
                                <dt>Category</dt>
                                <dd>{orchid.category}</dd>
                                <dt>Origin</dt>
                                <dd>{orchid.origin}</dd>
                                <dt>Color</dt>
                                <dd>{orchid.color}</dd>
                                <dt>Rating</dt>
                                <dd>{orchid.rating}</dd>
                            </dl>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default OrchidDetail;