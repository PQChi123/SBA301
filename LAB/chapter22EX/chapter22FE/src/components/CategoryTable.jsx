
export default function CategoryTable({ categories }) {
    return (
        <div className="table-scroll">
            <table className="orchid-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Mô tả</th>
                        <th>Danh mục cha</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td className="description-cell">{category.categoryDescription || '—'}</td>
                            <td>{category.parentCategoryId ?? '—'}</td>
                            <td>{category.active ? 'Đang hoạt động' : 'Không hoạt động'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}