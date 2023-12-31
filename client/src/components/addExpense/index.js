import React from 'react';
import './style.css';

const AddExpense = (props) => {
  return (
    <div className='add-category-overlay'>
    <div className='container container-sm add-category'>
      <form>
    <div class="mb-3">
    <label class="form-label">Title</label>
    <input type="text" class="form-control" value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
  </div>
  <div class="mb-3">
    <label class="form-label">Category</label>
    <input type="text" class="form-control" value={props.category} onChange={(e) => props.setCategory(e.target.value)} />
  </div>
  <div class="mb-3">
    <label class="form-label">Amount</label>
    <input type="number" class="form-control" value={props.amount} onChange={(e) => props.setAmount(e.target.value)} />
  </div>
  <div class="mb-3">
    <label class="form-label">Date</label>
    <input type="date" class="form-control" value={props.date} onChange={(e) => props.setDate(e.target.value)} />
  </div>
      </form>

      <div className='btn-group'>
        <button className='btn btn-secondary' onClick={props.closeExpense}>Close</button>
        <button className='btn btn-success' onClick={props.addExpense}>Add</button>
      </div>
    </div>
    </div>
  )
}

export default AddExpense;
