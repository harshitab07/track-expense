import React from 'react';
import './style.css';

const AddCategory = (props) => {
  return (
    <div className='add-category-overlay'>
    <div className='container container-sm add-category'>
      <form>
      <div class="mb-3">
    <label class="form-label">Category Title</label>
    <input type="text" class="form-control" value={props.category} onChange={(e) => props.setCategory(e.target.value)} />
  </div>
      </form>

      <div className='btn-group'>
        <button className='btn btn-secondary' onClick={props.closeCategory}>Close</button>
        <button className='btn btn-success' onClick={props.addCategory}>Add</button>
      </div>
    </div>
    </div>
  )
}

export default AddCategory;
