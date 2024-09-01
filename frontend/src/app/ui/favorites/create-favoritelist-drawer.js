import React, { useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { createFavoriteList } from '@/app/lib/data';
import Title from '@/app/ui/title';
import BottomDrawer from "@/app/ui/bottom-drawer";


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório').min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: Yup.string().required('Descrição é obrigatória').min(5, 'A descrição deve ter pelo menos 5 caracteres'),
});

function CreateFavoriteListDrawer({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});

  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const result = await createFavoriteList(formData.title, formData.description);
      
      if (result) {
        setFormData({ title: '', description: '' });
        onClose();
        router.push('/favorites/' + result.id + '/details');
      } else {
        console.log('Erro ao criar a lista de favoritos');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Erro inesperado:', error);
      }
    }
  };

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose} >
      <Title>Criar Nova Lista de Favoritos</Title>
      <div className="divider"></div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center h-full'>
        <label className="form-control w-full max-w-md">
          <div className='label'>
            <span className='label-text text-lg'>
              Título da Lista de Favoritos
            </span>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full max-w-md"
            placeholder="Digite o título"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </label>
        <label className="form-control w-full max-w-md">
          <div className='label'>
            <span className='label-text text-lg'>
              Descrição
            </span>
          </div>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered w-full max-w-md"
            placeholder="Digite a descrição"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </label>
        <button
          type="submit"
          className="btn btn-primary mt-4"
        >
          Criar Lista
        </button>
      </form>
    </BottomDrawer>
  );
}

export default CreateFavoriteListDrawer;
