import React from 'react';
import AddNewButton from './AddNewButton';

const UserForm = ({ 
  isAddingNew, 
  user, 
  newUser, 
  onChange, 
  onCancel, 
  onSave, 
  onAdd, 
  onDelete,
  toggleAddNew 
}) => {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">
        {isAddingNew ? 'เพิ่มเจ้าของใหม่' : 'เจ้าของ'}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">HN</label>
          <div className="w-full px-3 py-2 border rounded bg-gray-200">
            {isAddingNew ? 'จะถูกสร้างอัตโนมัติ' : user?.hn}
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">ชื่อ</label>
          <input 
            type="text" 
            name="name"
            value={isAddingNew ? newUser.name : user?.name || ''} 
            onChange={onChange}
            className="w-full px-3 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">นามสกุล</label>
          <input 
            type="text" 
            name="lastname"
            value={isAddingNew ? newUser.lastname : user?.lastname || ''} 
            onChange={onChange}
            className="w-full px-3 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">เบอร์ติดต่อ</label>
          <input 
            type="text" 
            name="phone"
            value={isAddingNew ? newUser.phone : user?.phone || ''} 
            onChange={onChange}
            className="w-full px-3 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">อีเมล์</label>
          <input 
            type="email" 
            name="email"
            value={isAddingNew ? newUser.email : user?.email || ''} 
            onChange={onChange}
            className="w-full px-3 py-2 border rounded" 
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button 
          onClick={onCancel} 
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        {isAddingNew ? (
          <button 
            onClick={onAdd} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        ) : (
          <>
            <AddNewButton 
              className='bg-green-500 text-white px-4 py-2 rounded' 
              isAddingNew={isAddingNew} 
              toggleAddNew={toggleAddNew} 
              buttonText='Add New User'
            />

            <button 
              onClick={onSave} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button 
              onClick={onDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserForm;
