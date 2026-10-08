import { useMemo, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useOrchids from '../hooks/useOrchids';
import CategoryFilter from './CategoryFilter';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import OrchidCard from './OrchidCard';
import OrchidDetailModal from './OrchidDetailModal';
import SearchBox from './SearchBox';

export default function Orchids() {
  const { orchids, loading, error, reload } = useOrchids();
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  // Search & Filter state
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('ALL');
  const [specialOnly, setSpecialOnly] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(orchids.map((o) => o.category)));
  }, [orchids]);

  const visibleOrchids = useMemo(() => {
    return orchids.filter((o) => {
      const matchName = o.orchidName.toLowerCase().includes(keyword.trim().toLowerCase());
      const matchCategory = category === 'ALL' || o.category === category;
      const matchSpecial = !specialOnly || o.isSpecial;
      return matchName && matchCategory && matchSpecial;
    });
  }, [orchids, keyword, category, specialOnly]);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedOrchid(null);
  };

  return (
    <Container id="orchids" className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Orchids List</h2>
        <Button variant="outline-primary" onClick={reload} disabled={loading}>
          Reload
        </Button>
      </div>

      {/* Filter Controls */}
      <Row className="mb-4 g-2">
        <Col md={5}>
          <SearchBox keyword={keyword} onChange={setKeyword} />
        </Col>
        <Col md={4}>
          <CategoryFilter category={category} onChange={setCategory} categories={categories} />
        </Col>
        <Col md={3} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            id="special-check"
            label="Chỉ hiện loại Special"
            checked={specialOnly}
            onChange={(e) => setSpecialOnly(e.target.checked)}
          />
        </Col>
      </Row>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!loading && !error && visibleOrchids.length === 0 && (
        <p className="text-center my-4">Không tìm thấy Orchid nào phù hợp.</p>
      )}

      {!loading && !error && visibleOrchids.length > 0 && (
        <Row>
          {visibleOrchids.map((orchid) => (
            <Col xs={12} sm={6} lg={3} key={orchid.id} className="mb-4">
              <OrchidCard orchid={orchid} onDetail={handleShow} />
            </Col>
          ))}
        </Row>
      )}

      <OrchidDetailModal show={show} orchid={selectedOrchid} onClose={handleClose} />
    </Container>
  );
}