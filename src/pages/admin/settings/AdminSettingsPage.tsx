import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Building,
  Phone,
  Share2,
  FileText,
  Bell,
  ShieldAlert,
  Save,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { GlobalSettings } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { Button, Badge } from '../../../components/admin/ui/BasicPrimitives';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'brand' | 'contact' | 'social' | 'footer' | 'forms' | 'maintenance'>('brand');

  const addToast = useAdminStore((s) => s.addToast);
  const setHasUnsavedChanges = useAdminStore((s) => s.setHasUnsavedChanges);

  useEffect(() => {
    setIsLoading(true);
    api.settings
      .get()
      .then((data) => setSettings(data))
      .catch((err) => {
        console.error(err);
        addToast({ title: 'Error', description: 'Failed to load system settings', type: 'error' });
      })
      .finally(() => setIsLoading(false));
  }, [addToast]);

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const updated = await api.settings.update(settings);
      setSettings(updated);
      setHasUnsavedChanges(false);
      addToast({ title: 'Settings Saved', description: 'Global website configurations updated', type: 'success' });
    } catch {
      addToast({ title: 'Error', description: 'Failed to save settings', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (section: keyof GlobalSettings, updates: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: {
        ...(settings[section] as any),
        ...updates,
      },
    });
    setHasUnsavedChanges(true);
  };

  if (isLoading || !settings) {
    return (
      <div className="p-8 text-center text-xs text-neutral-500">
        Loading Global Website Settings...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-600" /> Global Website Settings
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Control brand identity, contact desk, social channels, footer disclaimers, and lead routing.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          isLoading={isSaving}
          className="flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" /> Save All Settings
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto pb-px">
        {[
          { key: 'brand', label: 'Brand & Identity', icon: <Building className="w-4 h-4" /> },
          { key: 'contact', label: 'Contact Desk', icon: <Phone className="w-4 h-4" /> },
          { key: 'social', label: 'Social Channels', icon: <Share2 className="w-4 h-4" /> },
          { key: 'footer', label: 'Footer & Compliance', icon: <FileText className="w-4 h-4" /> },
          { key: 'forms', label: 'Lead & Enquiry Forms', icon: <Bell className="w-4 h-4" /> },
          { key: 'maintenance', label: 'Maintenance Mode', icon: <ShieldAlert className="w-4 h-4" /> },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === t.key
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800 p-6 space-y-5">
        {/* BRAND & IDENTITY */}
        {activeTab === 'brand' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Corporate Site Name
              </label>
              <input
                type="text"
                value={settings.brand?.siteName || ''}
                onChange={(e) => updateSection('brand', { siteName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.brand?.tagline || ''}
                onChange={(e) => updateSection('brand', { tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Primary Gold Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.brand?.primaryGoldColor || '#A8823C'}
                    onChange={(e) => updateSection('brand', { primaryGoldColor: e.target.value })}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{settings.brand?.primaryGoldColor || '#A8823C'}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Primary Ink Charcoal Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.brand?.primaryInkColor || '#131616'}
                    onChange={(e) => updateSection('brand', { primaryInkColor: e.target.value })}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <span className="text-xs font-mono">{settings.brand?.primaryInkColor || '#131616'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT DESK */}
        {activeTab === 'contact' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Corporate Headquarters Address
              </label>
              <input
                type="text"
                value={settings.contact?.headquartersAddress || ''}
                onChange={(e) => updateSection('contact', { headquartersAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Registered Office Address
              </label>
              <input
                type="text"
                value={settings.contact?.registeredOffice || ''}
                onChange={(e) => updateSection('contact', { registeredOffice: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Toll Free Number
                </label>
                <input
                  type="text"
                  value={settings.contact?.tollFreeNumber || ''}
                  onChange={(e) => updateSection('contact', { tollFreeNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  WhatsApp Direct Number
                </label>
                <input
                  type="text"
                  value={settings.contact?.whatsappNumber || ''}
                  onChange={(e) => updateSection('contact', { whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  General Inquiries Email
                </label>
                <input
                  type="email"
                  value={settings.contact?.generalEmail || ''}
                  onChange={(e) => updateSection('contact', { generalEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Sales Concierge Email
                </label>
                <input
                  type="email"
                  value={settings.contact?.salesEmail || ''}
                  onChange={(e) => updateSection('contact', { salesEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SOCIAL CHANNELS */}
        {activeTab === 'social' && (
          <div className="space-y-4 max-w-2xl">
            {['facebook', 'instagram', 'linkedin', 'youtube', 'x'].map((platform) => {
              const soc = (settings.social as any)?.[platform] || { url: '', isVisible: true };
              return (
                <div key={platform} className="p-3 bg-[#FAFAFA] dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                  <span className="w-24 text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    {platform}
                  </span>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => {
                      updateSection('social', {
                        [platform]: { ...soc, url: e.target.value },
                      });
                    }}
                    placeholder={`https://${platform}.com/...`}
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono"
                  />
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="checkbox"
                      id={`soc-${platform}`}
                      checked={soc.isVisible}
                      onChange={(e) => {
                        updateSection('social', {
                          [platform]: { ...soc, isVisible: e.target.checked },
                        });
                      }}
                      className="rounded text-amber-600"
                    />
                    <label htmlFor={`soc-${platform}`} className="text-xs text-neutral-600 select-none cursor-pointer">
                      Visible
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FOOTER & COMPLIANCE */}
        {activeTab === 'footer' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Statutory Disclaimer Copy
              </label>
              <textarea
                rows={4}
                value={settings.footer?.disclaimerText || ''}
                onChange={(e) => updateSection('footer', { disclaimerText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Copyright Line & CIN Number
              </label>
              <input
                type="text"
                value={settings.footer?.copyrightText || ''}
                onChange={(e) => updateSection('footer', { copyrightText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>
          </div>
        )}

        {/* FORMS & LEAD ROUTING */}
        {activeTab === 'forms' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Legal Consent Notice Copy (Enquiry Form)
              </label>
              <textarea
                rows={2}
                value={settings.forms?.enquiryFields?.consentNoticeText || ''}
                onChange={(e) =>
                  updateSection('forms', {
                    enquiryFields: {
                      ...settings.forms.enquiryFields,
                      consentNoticeText: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Form Submission Success Toast Message
              </label>
              <input
                type="text"
                value={settings.forms?.enquiryFields?.successMessage || ''}
                onChange={(e) =>
                  updateSection('forms', {
                    enquiryFields: {
                      ...settings.forms.enquiryFields,
                      successMessage: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>
          </div>
        )}

        {/* MAINTENANCE MODE */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4 max-w-2xl">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                Website Maintenance Mode
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                When enabled, non-admin visitors to the public website will see an architectural maintenance screen. The Admin Suite remains accessible.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="maintenanceEnabled"
                className="rounded text-amber-600"
              />
              <label htmlFor="maintenanceEnabled" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 select-none cursor-pointer">
                Enable Maintenance Mode
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
