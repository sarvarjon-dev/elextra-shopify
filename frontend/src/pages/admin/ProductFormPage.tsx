import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import {
  UploadCloud,
  Plus,
  CheckCircle2,
  Clock,
  Save,
  X,
  Tag,
  Package,
  LayoutGrid,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Code,
} from "lucide-react";

interface ProductFormState {
  title: string;
  description: string;
  basePrice: string;
  discount: string;
  stockQuantity: string;
  category: string;
  status: "Active" | "Draft";
}

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ProductFormState>({
    title: "",
    description: "",
    basePrice: "",
    discount: "0",
    stockQuantity: "0",
    category: "",
    status: "Active",
  });

  // Yuklangan rasmlarni vaqtincha ekranda ko'rsatish uchun
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Yuborilayotgan ma'lumot:", formData);
    // Keyingi bosqichda shu yerga FastAPI ga POST/PUT so'rovini yozamiz
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* 1. SAHIFA SARLAVHASI */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update product details or remove it from the store."
            : "Fill in the details below to add a new product to your store."}
        </p>
      </div>

      {/* 2. ASOSIY FORMA (2 USTUNLI GRID) */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* CHAP USTUN (2/3 qism) */}
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          {/* Product Title */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Product Title <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title..."
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Description <span className="text-orange-500">*</span>
            </label>
            <div className="overflow-hidden rounded-lg border border-slate-300 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
              {/* Formatlash paneli (UI) */}
              <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <Italic size={16} />
                </button>
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <Underline size={16} />
                </button>
                <span className="mx-1 h-4 w-px bg-slate-300" />
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <ListOrdered size={16} />
                </button>
                <span className="mx-1 h-4 w-px bg-slate-300" />
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <Link2 size={16} />
                </button>
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <ImageIcon size={16} />
                </button>
                <button
                  type="button"
                  className="rounded p-1.5 hover:bg-slate-200"
                >
                  <Code size={16} />
                </button>
              </div>

              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write product description..."
                required
                className="w-full resize-none p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Base Price & Discount */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Base Price <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-8 pr-4 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Discount (%)
              </label>
              <div className="relative">
                <Tag
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Stock Quantity <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <Package
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="number"
                min="0"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Category <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <LayoutGrid
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="laptops">Laptops & Computers</option>
                <option value="smartphones">Smartphones & Tablets</option>
                <option value="audio">Audio & Headphones</option>
                <option value="wearables">Smartwatches & Wearables</option>
                <option value="gaming">Gaming & Consoles</option>
                <option value="cameras">Cameras & Photo</option>
              </select>
            </div>
          </div>
        </div>

        {/* O'NG USTUN (1/3 qism) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* 1-Karta: Rasmlar yuklash */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/30 px-4 py-8 text-center transition-colors hover:bg-orange-50/60">
              <UploadCloud size={36} className="mb-3 text-orange-500" />
              <p className="text-sm font-semibold text-slate-800">
                Drag & drop images here
              </p>
              <p className="mt-1 text-xs text-slate-500">or click to browse</p>
              <p className="mt-2 text-[11px] text-slate-400">
                Supports: JPG, PNG, WEBP • Max size: 5MB
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Yuklangan rasmlar qatori */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                >
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 hidden rounded-full bg-black/60 p-0.5 text-white group-hover:block"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {imagePreviews.length < 5 && (
                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400 transition-colors hover:border-orange-400 hover:text-orange-500">
                  <Plus size={18} />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* 2-Karta: Product Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Product Status
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, status: "Active" }))
                }
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  formData.status === "Active"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <CheckCircle2 size={16} />
                Active
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, status: "Draft" }))
                }
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  formData.status === "Draft"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Clock size={16} />
                Draft
              </button>
            </div>
          </div>

          {/* Pastki tugmalar: Save va Cancel */}
          <div className="mt-auto flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
            >
              <Save size={16} />
              {isEditMode ? "Update Product" : "Save Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
