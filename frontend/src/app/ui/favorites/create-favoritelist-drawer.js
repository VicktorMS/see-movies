'use client';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { createFavoriteList } from '@/app/lib/data';
import Title from '@/app/ui/title';
import BottomDrawer from "@/app/ui/bottom-drawer";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório').min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: Yup.string().required('Descrição é obrigatória').min(5, 'A descrição deve ter pelo menos 5 caracteres'),
});

export default function CreateFavoriteListDrawer({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateFormData();
    if (isValid) {
      await submitFormData();
    }
  };

  const validateFormData = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Unexpected error:', error);
      }
      return false;
    }
  };

  const submitFormData = async () => {
    const result = await createFavoriteList(formData.title, formData.description);
    if (result) {
      resetForm();
      onClose();
      router.push(`/favorites/${result.id}/details`);
    } else {
      console.log('Error creating the favorite list');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
  };

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose}>
      <Title>Criar Nova Lista de Favoritos</Title>
      <div className="divider"></div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center h-full">
        <FormInput
          label="Título da Lista de Favoritos"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Digite o título"
        />
        <FormInput
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Digite a descrição"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Criar Lista
        </button>
      </form>
    </BottomDrawer>
  );
}

// Component for rendering input fields with error messages
function FormInput({ label, name, value, onChange, error, placeholder }) {
  return (
    <label className="form-control w-full max-w-md">
      <div className="label">
        <span className="label-text text-lg">{label}</span>
      </div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full max-w-md"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </label>
  );
}
