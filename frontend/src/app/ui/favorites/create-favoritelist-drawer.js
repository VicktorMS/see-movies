'use client';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { createFavoriteList } from '@/app/lib/data';
import Title from '@/app/ui/title';
import { Plus } from '@phosphor-icons/react/dist/ssr';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório').min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: Yup.string().required('Descrição é obrigatória').min(5, 'A descrição deve ter pelo menos 5 caracteres'),
});

export default function CreateFavoriteListDrawer({onUpdate}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      onUpdate();
      handleCloseModal();
    } else {
      console.log('Error creating the favorite list');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.getElementById("create-list-modal").showModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.getElementById("create-list-modal").close();
  };

  return (
    <>
      <button 
      className="fixed bottom-20 left-6 md:left-auto md:right-6 btn btn-primary z-30" 
      onClick={handleOpenModal}>
        <Plus size={24} weight="bold" />
        Criar Nova Lista
      </button>

      <CreateFavoriteListModal onClose={handleCloseModal} onSubmit={handleSubmit}>
        <Title>Criar Nova Lista de Favoritos</Title>
        <div className="divider"></div>
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
      </CreateFavoriteListModal>
    </>
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

function CreateFavoriteListModal({ onClose, onSubmit, children }) {
  return (
    <dialog id="create-list-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form onSubmit={onSubmit} className="flex flex-col justify-center h-full">
          {children}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">Fechar</button>
            <button type="submit" className="btn btn-primary">Criar Lista</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
