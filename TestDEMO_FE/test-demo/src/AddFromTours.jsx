import { useState } from 'react';

function AddTours({ addProduct}){
    const [toursName, setToursName]= useState({
        tourName:'',
        destination:'',
        capacity:'',
        duration:'',
        startDate:'',
        price:'',
        status:'Active'

    });
    //
    const handleChange =(e) => {
        const {name, value} = e.target;
        setToursName({
            ...toursName,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!toursName.tourName || !toursName.destination || !toursName.capacity ||  !toursName.duration|| !toursName.price){
            alert('You can not leave it empty');
            return;
            
        }
    
    const tourDataToSend = {
      ...toursName,
      capacity: parseInt(toursName.capacity, 10) || 0,
      duration: parseInt(toursName.duration, 10) || 0,
      price: parseFloat(toursName.price) || 0
    };

    
    addProduct(tourDataToSend);
    setToursName({
         tourName:'',
        destination:'',
        capacity:'',
        duration:'',
        startDate:'',
        price:'',
        status:'Active'
    });
};



  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
      <h3>Thêm Tour Mới</h3>

      <div>
        <label>Tên Tour: </label>
        <input type="text" name="tourName" value={toursName.tourName} onChange={handleChange} required />
      </div>

      <div>
        <label>Điểm Đến: </label>
        <input type="text" name="destination" value={toursName.destination} onChange={handleChange} required />
      </div>

      <div>
        <label>Sức Chứa (Người): </label>
        <input type="number" name="capacity" value={toursName.capacity} onChange={handleChange} required />
      </div>

      <div>
        <label>Thời Gian (Ngày): </label>
        <input type="number" name="duration" value={toursName.duration} onChange={handleChange} required />
      </div>

      <div>
        <label>Ngày Khởi Hành: </label>
        <input type="date" name="startDate" value={toursName.startDate} onChange={handleChange} required />
      </div>

      <div>
        <label>Giá ($): </label>
        <input type="number" name="price" value={toursName.price} onChange={handleChange} required />
      </div>

      <div>
        <label>Trạng Thái: </label>
        <select name="status" value={toursName.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>Thêm Tour</button>
    </form>
  );
}

export default AddTours;