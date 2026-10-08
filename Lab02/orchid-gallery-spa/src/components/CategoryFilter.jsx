import { Form } from 'react-bootstrap';

export default function CategoryFilter({ category, onChange, categories }) {
  return (
    <Form.Select value={category} onChange={(e) => onChange(e.target.value)}>
      <option value="ALL">Tất cả Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </Form.Select>
  );
}