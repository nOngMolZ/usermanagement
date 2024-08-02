import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    hn: {
        type: String,
        unique: true // Ensure that HN is unique
    },
    name: {
        type: String,
        required: true // กำหนดให้ฟิลด์นี้ต้องมีค่าเสมอ
    },
    lastname: {
        type: String,
        required: true // กำหนดให้ฟิลด์นี้ต้องมีค่าเสมอ
    },
    phone: {
        type: String,
        required: true // กำหนดให้ฟิลด์นี้ต้องมีค่าเสมอ
    },
    email: {
        type: String,
        required: true // กำหนดให้ฟิลด์นี้ต้องมีค่าเสมอ
    },
    account: String
});

// ฟังก์ชันสำหรับสร้าง HN ที่ไม่ซ้ำกัน
const generateHN = () => {
    const randomHN = Math.floor(100000 + Math.random() * 900000); // สร้างเลขสุ่ม 6 หลัก
    return randomHN.toString();
};

// Pre-save hook to generate hn
userSchema.pre('save', async function (next) {
    if (this.isNew) { // Only generate hn when creating a new user
        this.hn = generateHN();
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
