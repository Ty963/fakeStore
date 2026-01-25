// pages/Sell/SellPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import fakeStoreApi from '../../services/api/fakeStoreApi.js';
import styles from './SellPage.module.css';

export default function SellPage() {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    // User-triggered: Submit new product
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            console.log('[SellPage] Submitting new product:', data);

            // Generate a temporary ID (backend will assign real one)
            const tempId = Date.now();

            // Call API to add new product
            const newProduct = await fakeStoreApi.addNewProduct(
                tempId,
                data.title,
                parseFloat(data.price),
                data.description,
                data.category,
                data.imageUrl
            );

            console.log('[SellPage] Product created:', newProduct);

            // Show success message
            setSubmitSuccess(true);

            // Reset form
            reset();

            // Redirect to products page after 2 seconds
            setTimeout(() => {
                navigate('/products');
            }, 2000);

        } catch (err) {
            console.error('[SellPage] Failed to create product:', err);
            setSubmitError(err.message || 'Failed to create product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${styles.container} ${styles[`container__${theme}`]}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Sell Your Product</h1>
                <p className={styles.subtitle}>
                    Fill out the form below to list your product on FakeStore
                </p>
            </div>

            <div className={`${styles.formContainer} ${styles[`formContainer__${theme}`]}`}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* Product Title */}
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>
                            Product Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            className={`${styles.input} ${styles[`input__${theme}`]}`}
                            placeholder="e.g., Fjallraven Backpack"
                            disabled={isSubmitting}
                            {...register('title', {
                                required: 'Product title is required',
                                minLength: {
                                    value: 5,
                                    message: 'Title must be at least 5 characters'
                                }
                            })}
                        />
                        {errors.title && (
                            <span className={styles.error}>{errors.title.message}</span>
                        )}
                    </div>

                    {/* Price */}
                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.label}>
                            Price ($) *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            className={`${styles.input} ${styles[`input__${theme}`]}`}
                            placeholder="e.g., 29.99"
                            disabled={isSubmitting}
                            {...register('price', {
                                required: 'Price is required',
                                min: {
                                    value: 0.01,
                                    message: 'Price must be greater than 0'
                                }
                            })}
                        />
                        {errors.price && (
                            <span className={styles.error}>{errors.price.message}</span>
                        )}
                    </div>

                    {/* Category */}
                    <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.label}>
                            Category *
                        </label>
                        <select
                            id="category"
                            className={`${styles.select} ${styles[`select__${theme}`]}`}
                            disabled={isSubmitting}
                            {...register('category', {
                                required: 'Category is required'
                            })}
                        >
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                        </select>
                        {errors.category && (
                            <span className={styles.error}>{errors.category.message}</span>
                        )}
                    </div>

                    {/* Image URL */}
                    <div className={styles.formGroup}>
                        <label htmlFor="imageUrl" className={styles.label}>
                            Image URL *
                        </label>
                        <input
                            type="url"
                            id="imageUrl"
                            className={`${styles.input} ${styles[`input__${theme}`]}`}
                            placeholder="https://example.com/image.jpg"
                            disabled={isSubmitting}
                            {...register('imageUrl', {
                                required: 'Image URL is required',
                                pattern: {
                                    value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                                    message: 'Must be a valid image URL'
                                }
                            })}
                        />
                        {errors.imageUrl && (
                            <span className={styles.error}>{errors.imageUrl.message}</span>
                        )}
                        <span className={styles.hint}>
                            Paste a direct link to your product image (jpg, png, gif)
                        </span>
                    </div>

                    {/* Description */}
                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>
                            Description *
                        </label>
                        <textarea
                            id="description"
                            rows="5"
                            className={`${styles.textarea} ${styles[`textarea__${theme}`]}`}
                            placeholder="Describe your product in detail..."
                            disabled={isSubmitting}
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 20,
                                    message: 'Description must be at least 20 characters'
                                }
                            })}
                        />
                        {errors.description && (
                            <span className={styles.error}>{errors.description.message}</span>
                        )}
                    </div>

                    {/* Success Message */}
                    {submitSuccess && (
                        <div className={`${styles.successMessage} ${styles[`successMessage__${theme}`]}`}>
                            ✓ Product created successfully! Redirecting to products page...
                        </div>
                    )}

                    {/* Error Message */}
                    {submitError && (
                        <div className={`${styles.errorMessage} ${styles[`errorMessage__${theme}`]}`}>
                            ✗ {submitError}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || submitSuccess}
                        className={`${styles.submitButton} ${styles[`submitButton__${theme}`]}`}
                    >
                        {isSubmitting ? 'Creating Product...' : 'List Product'}
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className={`${styles.cancelButton} ${styles[`cancelButton__${theme}`]}`}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </form>

                {/* Preview Card */}
                <div className={`${styles.previewSection} ${styles[`previewSection__${theme}`]}`}>
                    <h3 className={styles.previewTitle}>Preview</h3>
                    <p className={styles.previewSubtitle}>
                        This is how your product will appear in the store
                    </p>
                    <div className={`${styles.previewCard} ${styles[`previewCard__${theme}`]}`}>
                        <div className={styles.previewImage}>
                            📦
                        </div>
                        <div className={styles.previewInfo}>
                            <h4>Product Title</h4>
                            <p className={styles.previewCategory}>Category</p>
                            <p className={styles.previewPrice}>$0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
