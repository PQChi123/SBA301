

export default function CategoryTable({categoriesList,ondelete,onAdd}) {
  



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
                        <th>Thêm danh mục</th>
                        <th>delete category</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesList?.map((category) => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td className="description-cell">{category.categoryDescription || '—'}</td>
                            <td>{category.parentCategoryId ?? '—'}</td>
                            <td>{category.active ? 'Đang hoạt động' : 'Không hoạt động'}</td>
                           
                                    <button className="button button-small button-danger" onClick={() => ondelete(category)}>
                                        Xóa
                                    </button>
                                
                        </tr>
                    ))}
                    <button className="button button-small button-danger" onClick={() => onAdd()}>
                        Thêm danh mục
                    </button>
                    
                </tbody>
            </table>
        </div>
    );

}