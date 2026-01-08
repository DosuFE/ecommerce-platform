'use client';
import { useState } from 'react';
import { Product, CreateProductDto, UpdateProductDto, api } from '../lib/api';
import '../../styles/productform.css';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isEditing = false }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || '',
    brand: product?.brand || '',
    description: product?.description || '',
    stock: product?.stock || 0,
    images: product?.images.join(', ') || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const productData: CreateProductDto = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        stock: Number(formData.stock),
        images: formData.images.split(',').map(img => img.trim()).filter(img => img),
      };

      await onSubmit(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="form_container bg-black/30 bg-opacity-50">
      <div className="sub_form_container">
        <h2 className="form-title">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>

        {error && (
          <div className="error_form_container">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="form-label">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="form-input"
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter category"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter brand"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="form-textarea"
              placeholder="Enter product description"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="form-input"
              placeholder="Enter stock quantity"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Image URLs (comma separated)
            </label>
            <textarea
              name="images"
              value={formData.images}
              onChange={handleChange}
              required
              rows={2}
              className="form-textarea"
              placeholder="Enter image URLs separated by commas"
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}