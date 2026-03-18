import { getSiteSettings } from "@/app/actions/settings";
import { getServerDictionary } from "@/lib/i18n/get-locale";
import { PhotoUploader } from "./photo-uploader";

export default async function SettingsPage() {
  const [settings, t] = await Promise.all([getSiteSettings(), getServerDictionary()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.settings.title}</h1>
      <p className="text-slate-600 mb-8">{t.settings.description}</p>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">{t.settings.aboutPhoto}</h2>
          <p className="text-sm text-slate-500 mb-6">{t.settings.aboutPhotoDesc}</p>
          <PhotoUploader currentPhotoUrl={settings.photoUrl} />
        </div>
      </div>
    </div>
  );
}
