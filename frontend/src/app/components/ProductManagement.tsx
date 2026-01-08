'use client';
import { useState, useEffect } from 'react';
import { Product, api } from '../lib/api';
import ProductForm from './ProductForm';
import '../../styles/productmanagement.css';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (productData: any) => {
    try {
      await api.createProduct(productData);
      setShowForm(false);
      await loadProducts();
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateProduct = async (updateData: any) => {
    if (!editingProduct) return;
    
    try {
      await api.updateProduct(editingProduct.id, updateData);
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    
    try {
      await api.deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteClick = (product: Product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      handleDeleteProduct();
    }
  };

  const cancelDelete = () => {
    setDeletingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="management-container pt-32 sm:pt-24">
      <div className="header-container">
        <h1 className="title">Product Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="add-button"
        >
          Add New Product
        </button>
      </div>

      {error && (
        <div className="error-container">
          {error}
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-meta">{product.brand} - {product.category}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-stock">Stock: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="images-info">
              <span className="images-label">Images: </span>
              <span className="images-count">{product.images.length}</span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
          isEditing={false}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
          isEditing={true}
        />
      )}

      {deletingProduct && (
        <div className="delete-modal-container bg-black bg-opacity-50">
          <div className="delete-modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete "{deletingProduct.name}"? This action cannot be undone.
            </p>
            <div className="delete-modal-actions">
              <button
                onClick={cancelDelete}
                className='btn-cancel'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}