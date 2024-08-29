"use client"; // ทำให้ component นี้เป็น Client Component

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function NextUserId() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/nextUserId`);
    return response.data.nextUserId;
  }

  async function Register() {
    try {
      // เรียกใช้ฟังก์ชันเพื่อสร้าง user ID ใหม่
      const nextUserId = await NextUserId();

      // ส่งข้อมูลการสมัครไปที่ API และรอผลลัพธ์
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/register`, {
        userid: nextUserId,
        email: email,
        password: password,
      });

      // แสดงข้อความเมื่อสร้างบัญชีสำเร็จ
      Swal.fire({
        icon: 'success',
        title: 'User Created',
        text: 'Your account has been successfully created!',
      }).then(() => {
        router.push('/'); // เปลี่ยนเส้นทางไปยังหน้าแรก
      });
    } catch (error) {
      console.log(error);

      // แสดงข้อความเมื่อเกิดข้อผิดพลาด
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create account. Please try again.',
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold mb-8">Register</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="กรอกอีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="btn custom-green hover:bg-green-600 bg-green-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={Register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
