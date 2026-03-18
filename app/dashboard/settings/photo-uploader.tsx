"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Check } from "lucide-react";
import { updatePhotoUrl } from "@/app/actions/settings";
import { useTranslation } from "@/lib/i18n/i18n-context";

export function PhotoUploader({ currentPhotoUrl }: { currentPhotoUrl: string }) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentPhotoUrl);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || t.settings.uploadError);
      }

      const { url } = await res.json();
      setPreview(url);
      setPendingUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.settings.uploadError);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!pendingUrl) return;
    setSaving(true);
    setError(null);

    try {
      await updatePhotoUrl(pendingUrl);
      setPendingUrl(null);
      setSuccess(true);
    } catch {
      setError(t.settings.uploadError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current photo preview */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">{t.settings.currentPhoto}</p>
        <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-slate-200 bg-slate-100">
          <Image
            src={preview}
            alt="About photo"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Upload */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? t.settings.uploading : t.settings.uploadNew}
        </button>
        <p className="text-xs text-slate-400 mt-1.5">{t.settings.allowedFormats}</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
          <Check size={16} />
          {t.settings.saved}
        </div>
      )}

      {/* Save button - only show when there's a pending upload */}
      {pendingUrl && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors text-sm"
        >
          {saving ? t.settings.saving : t.settings.save}
        </button>
      )}
    </div>
  );
}
