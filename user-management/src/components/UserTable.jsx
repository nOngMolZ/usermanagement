import React from 'react';
import { SquarePen } from 'lucide-react';

const UserTable = ({ users, onEditClick }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Operation</th>
            <th className="py-2 px-4 text-left">HN เจ้าของ</th>
            <th className="py-2 px-4 text-left">ชื่อเจ้าของ</th>
            <th className="py-2 px-4 text-left">เบอร์ติดต่อ</th>
            <th className="py-2 px-4 text-left">อีเมล์</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">
                <button 
                  className="text-black hover:text-gray-500"
                  onClick={() => onEditClick(user)}
                >
                  <SquarePen />
                </button>
              </td>
              <td className="py-2 px-4">{user.hn}</td>
              <td className="py-2 px-4">{user.name} {user.lastname}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
