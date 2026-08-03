"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Image as ImageIcon, Plus, Trash2, Upload, CheckCircle2, X, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { galleryItems as initialGalleryItems, galleryCategories, GalleryItem } from "@/data/extended-data";
import { cn } from "@/lib/utils";

export default function GalleryAdminPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Events");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved custom gallery items
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lakshya_custom_gallery");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems([...parsed, ...initialGalleryItems]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  function saveToLocalStorage(updatedItems: GalleryItem[]) {
    try {
      const customItems = updatedItems.filter((item) => item.id.startsWith("upload-"));
      localStorage.setItem("lakshya_custom_gallery", JSON.stringify(customItems));
    } catch (e) {
      console.error(e);
    }
  }

  // Handle direct file upload via /api/admin/gallery API
  async function handleDirectFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setNotification("Uploading image(s) to server...");

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      let uploadedList: { name: string; url: string }[] = [];

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          uploadedList = data.data;
        }
      }

      // Fallback to local Data URL if server upload returns empty
      if (uploadedList.length === 0) {
        const readPromises = Array.from(files).map(
          (file, idx) =>
            new Promise<GalleryItem>((resolve) => {
              const reader = new FileReader();
              reader.onload = (ev) => {
                resolve({
                  id: `upload-${Date.now()}-${idx}`,
                  title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                  category: selectedCategory === "All" ? "Events" : selectedCategory,
                  image: ev.target?.result as string,
                  gradient: "from-emerald-600 to-[#0F7A3C]",
                  icon: "📸",
                  date: "Just now",
                });
              };
              reader.readAsDataURL(file);
            })
        );
        const fallbackItems = await Promise.all(readPromises);
        setItems((prev) => {
          const nextList = [...fallbackItems, ...prev];
          saveToLocalStorage(nextList);
          return nextList;
        });
      } else {
        const newItems: GalleryItem[] = uploadedList.map((item, idx) => ({
          id: `upload-${Date.now()}-${idx}`,
          title: item.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          category: selectedCategory === "All" ? "Events" : selectedCategory,
          image: item.url,
          gradient: "from-emerald-600 to-[#0F7A3C]",
          icon: "📸",
          date: "Just now",
        }));

        setItems((prev) => {
          const nextList = [...newItems, ...prev];
          saveToLocalStorage(nextList);
          return nextList;
        });
      }

      setNotification(`Successfully added ${files.length} photo(s) to the gallery!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error(err);
      alert("Error uploading image. Please try selecting a smaller image file.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  // Handle file select in modal
  function handleModalFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle custom upload modal submit
  async function handleAddPhotoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newImageFile && !previewUrl) {
      alert("Please select an image file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      let finalImageUrl = previewUrl || "";

      if (newImageFile) {
        const formData = new FormData();
        formData.append("files", newImageFile);
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data[0]?.url) {
            finalImageUrl = data.data[0].url;
          }
        }
      }

      const newItem: GalleryItem = {
        id: `upload-${Date.now()}`,
        title: newTitle || "Lakshya Event Photo",
        category: newCategory,
        image: finalImageUrl,
        gradient: "from-emerald-600 to-[#0F7A3C]",
        icon: "📸",
        date: "Just now",
      };

      setItems((prev) => {
        const nextList = [newItem, ...prev];
        saveToLocalStorage(nextList);
        return nextList;
      });

      setNotification(`"${newItem.title}" added to gallery successfully!`);
      setTimeout(() => setNotification(null), 4000);
      setShowModal(false);
      setNewTitle("");
      setPreviewUrl(null);
      setNewImageFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }

  // Delete photo
  function handleDeleteItem(id: string) {
    if (confirm("Are you sure you want to remove this photo from the gallery?")) {
      setItems((prev) => {
        const nextList = prev.filter((item) => item.id !== id);
        saveToLocalStorage(nextList);
        return nextList;
      });
      setNotification("Photo removed from gallery.");
      setTimeout(() => setNotification(null), 3000);
    }
  }

  const filtered = items.filter(
    (g) => selectedCategory === "All" || g.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Photo Gallery Manager"
        description={`Manage ${items.length} authentic campus photos, victory rallies, toppers, and classroom facilities`}
        icon={ImageIcon}
        breadcrumbs={[{ label: "Admin" }, { label: "Gallery" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-[#0F7A3C] border border-emerald-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <Upload className="h-4 w-4" /> Custom Title Photo
            </button>

            {/* Hidden Input Ref */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleDirectFileUpload}
            />

            <button
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 cursor-pointer transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Add Photos
                </>
              )}
            </button>
          </div>
        }
      />

      {/* Success Notification Banner */}
      {notification && (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold p-3.5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0F7A3C]" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-700 hover:text-emerald-950 font-bold">✕</button>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                selectedCategory === cat
                  ? "bg-[#0F7A3C] text-white border-[#0F7A3C] shadow-sm"
                  : "bg-white border-emerald-100 text-gray-600 hover:text-emerald-900 hover:bg-emerald-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-bold text-gray-500">
          Total Photos: <span className="text-[#0F7A3C] font-black">{filtered.length}</span>
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-2xl overflow-hidden bg-white border border-emerald-100 shadow-sm aspect-square"
          >
            {item.image?.startsWith("data:") || item.image?.startsWith("/uploads/") ? (
              /* User Uploaded Image */
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Static Public Image */
              <Image
                src={item.image || "/images/gallery/street-procession.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
            <div className="absolute inset-0 bg-emerald-950/75 transition-all flex flex-col justify-end p-3.5 opacity-0 group-hover:opacity-100">
              <p className="text-white text-xs font-bold line-clamp-2 leading-tight">{item.title}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                <span className="text-[9px] text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-bold">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-100 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-emerald-100 bg-emerald-50/40">
              <h2 className="font-heading font-bold text-gray-900 text-base flex items-center gap-2">
                <Upload className="h-4 w-4 text-[#0F7A3C]" /> Add New Photo Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="p-6 space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 uppercase tracking-wider mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. JEE Advanced Topper Felicitation 2026"
                  className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 uppercase tracking-wider mb-1">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 font-bold"
                >
                  <option value="Achievements">Achievements</option>
                  <option value="Classrooms">Classrooms</option>
                  <option value="Events">Events</option>
                  <option value="Celebrations">Celebrations</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 uppercase tracking-wider mb-1">Select Image File *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleModalFileSelect}
                  className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-3 py-2 text-xs text-gray-700 cursor-pointer"
                />
              </div>

              {previewUrl && (
                <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-emerald-200">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-emerald-950/70 text-white px-2 py-0.5 rounded-full">
                    Image Preview
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 bg-[#0F7A3C] hover:bg-[#0D6B34] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Add Photo to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
