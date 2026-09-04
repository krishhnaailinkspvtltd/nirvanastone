import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">Settings</h1>
      <p className="mt-1 text-sm text-mist">
        Shipping, Cash-on-Delivery limits and promo codes — applied to the live
        store the moment you save.
      </p>
      <div className="mt-5">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
