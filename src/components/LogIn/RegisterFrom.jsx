import React, { useState } from 'react';
import { registerUser } from '../../services/auth';
import { toast } from 'react-hot-toast';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    avatar: null,
    coverImage: null,
  });

  const [preview, setPreview] = useState({
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      const res = await registerUser(payload);
      const { message } = res;

      toast.success(message || 'User registered successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      console.error('❌ Registration error:', err.response?.data || err.message);

      // Clear form and preview on error
      setFormData({
        username: '',
        fullName: '',
        email: '',
        password: '',
        avatar: null,
        coverImage: null,
      });
      setPreview({
        avatar: null,
        coverImage: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 bg-zinc-800 rounded"
      />

      {/* Avatar Upload */}
      <div>
        <label className="block text-sm mb-1">Avatar*</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 p-1 rounded"
        />
        {preview.avatar && (
          <img src={preview.avatar} alt="Avatar Preview" className="mt-2 h-12 rounded-full" />
        )}
      </div>

      {/* Cover Image Upload */}
      <div>
        <label className="block text-sm mb-1">Cover Image</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full bg-zinc-800 p-1 rounded"
        />
        {preview.coverImage && (
          <img src={preview.coverImage} alt="Cover Preview" className="mt-2 h-20 w-full rounded" />
        )}
      </div>

      <button type="submit" className="w-full bg-red-600 hover:bg-red-700 p-2 rounded">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
