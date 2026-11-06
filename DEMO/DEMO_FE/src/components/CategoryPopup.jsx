import { useState } from 'react';


const Datadefault={
     
            categoryId: '',
            categoryName: '',
            categoryDescription: '',
            parentCategoryId: '',
            active: true

}

 const CategoryPopup = ({onPop,closePop,handleAddCategories,error,categoriesList}) => {
    const [formdata,setformdata]= useState(Datadefault);
    if(!onPop){
        return null;
    }
    const handleChang= (e) =>{
          const { name, value, type, checked } = e.target;
        setformdata((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

    };
     const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleAddCategories(formdata);
        if (success) {
            closePop();      // Đóng popup sau khi thêm thành công
            setformdata(Datadefault); // Reset form
        }
      // Gọi hàm load lại dữ liệu ở component cha
    };  
    return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <h3>Them danh sách danh mục</h3>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

      {/* TÃªn danh má»¥c */}
      <div className="form-group">
        <label>Tên danh mục (*):</label>
        <input
          type="text"
          name="categoryName"
          value={formdata.categoryName}
          onChange={handleChang}

          required
        />
      </div>

      {/* MÃ´ táº£ danh má»¥c */}
      <div className="form-group">
        <label>MÃ´ táº£:</label>
        <textarea
          name="categoryDescription"
          value={formdata.categoryDescription}
          onChange={handleChang}
          required
          rows="3"
        />
      </div>

      {/* Danh má»¥c cha (parentCategoryId) */}
      <div className="form-group">
        <label>ID Danh mục cha (náº¿u cÃ³):</label>
        <input
          type="number"
          name="parentCategoryId"
          value={formdata.parentCategoryId || ''}
          onChange={handleChang}

        />
      </div>

      {/* Tráº¡ng thÃ¡i (active) */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="active"
            checked={formdata.active}
            onChange={handleChang}
          />
          trạng thái
        </label>
      </div>

      {/* NÃºt thao tÃ¡c */}
      <div className="form-actions">
        <button type="submit" className="btn-save">Tạo mới  </button>
        {closePop && (
          <button type="button" className="btn-cancel" onClick={closePop}>Hủy</button>
        )}
      </div>
    </form>
  );
};

export default CategoryPopup;

