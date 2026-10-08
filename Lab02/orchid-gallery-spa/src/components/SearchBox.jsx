import { Form } from 'react-bootstrap';

export default function SearchBox({ keyword, onChange }) {
  return (
    <Form.Control
      type="text"
      placeholder="Tìm kiếm hoa lan..."
      value={keyword}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}