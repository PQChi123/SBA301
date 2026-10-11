import { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function OrchidCard({ orchid }) {
    const [isFavorite, setIsFavorite] = useState(false);



    return (
        <>
            <Card className="h-100 shadow-sm">
                <Card.Img
                    variant="top"
                    src={orchid.image}
                    alt={orchid.orchidName}
                    className="orchid-image"
                />
                <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                        <Card.Title>{orchid.orchidName}</Card.Title>
                        {orchid.isSpecial && <Badge bg="warning" text="dark">Special</Badge>}
                    </div>
                    <Card.Text>
                        Category: {orchid.category}<br />
                        Origin: {orchid.origin}<br />
                        Rating: {orchid.rating}
                    </Card.Text>
                    <div className="d-flex gap-2 mt-auto">
                    <Button
                        as={Link}
                        to={`/orchid/${orchid.id}`}
                        variant="primary"
                        className="w-100"
                    >
                        View Detail
                    </Button>
                        <Button
                            variant={isFavorite ? "danger" : "outline-danger"}
                            onClick={() => setIsFavorite(!isFavorite)}
                        >
                            {isFavorite ? "Favorite" : "Add Favorite"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {/* <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{orchid.orchidName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p>
  <strong>Art:</strong> 
  <img src={orchid.image} alt="Orchid" style={{ maxWidth: '200px' }} />
</p>
                    <p><strong>Category:</strong> {orchid.category}</p>
                    <p><strong>Origin:</strong> {orchid.origin}</p>
                    <p><strong>Color:</strong> {orchid.color}</p>
                    <p><strong>Rating:</strong> {orchid.rating}</p>
                    <p className="mb-0">{orchid.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetail(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}
OrchidCard.propTypes = {
    orchid: PropTypes.shape({
        id: PropTypes.number.isRequired,
        orchidName: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        color: PropTypes.string,
        rating: PropTypes.number.isRequired,
        isSpecial: PropTypes.bool,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default OrchidCard;