import React, { useState, useEffect } from 'react';
import {
  Award,
  MessageSquareQuote,
  Users,
  MapPin,
  FileCheck,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  CheckCircle2,
  Star,
  Building,
  Upload,
} from 'lucide-react';
import { api } from '../../../lib/api';
import {
  AdminAward,
  AdminTestimonial,
  AdminLeadership,
  AdminCity,
  InvestorDoc,
} from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { Button, Badge, Modal, Tabs } from '../../../components/admin/ui/BasicPrimitives';

export const AdminContentModulesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'awards' | 'testimonials' | 'leadership' | 'cities' | 'investorDocs'>('awards');
  const [isLoading, setIsLoading] = useState(true);

  // Module collections
  const [awards, setAwards] = useState<AdminAward[]>([]);
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [leadership, setLeadership] = useState<AdminLeadership[]>([]);
  const [cities, setCities] = useState<AdminCity[]>([]);
  const [investorDocs, setInvestorDocs] = useState<InvestorDoc[]>([]);

  // Modals for editing/adding
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const addToast = useAdminStore((s) => s.addToast);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [awRes, testRes, leadRes, cityRes, invRes] = await Promise.all([
        api.awards.list({ limit: 100 }),
        api.testimonials.list({ limit: 100 }),
        api.leadership.list({ limit: 100 }),
        api.cities.list({ limit: 100 }),
        api.investorDocs.list({ limit: 100 }),
      ]);
      setAwards(awRes.data);
      setTestimonials(testRes.data);
      setLeadership(leadRes.data);
      setCities(cityRes.data);
      setInvestorDocs(invRes.data);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Failed to load content modules', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveItem = async () => {
    if (!editingItem) return;
    try {
      if (activeTab === 'awards') {
        if (editingItem.id) {
          const updated = await api.awards.update(editingItem.id, editingItem);
          setAwards((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        } else {
          const created = await api.awards.create({
            ...editingItem,
            id: `aw-${Date.now()}`,
            year: Number(editingItem.year) || 2026,
            order: awards.length,
            createdAt: new Date().toISOString(),
          });
          setAwards((prev) => [...prev, created]);
        }
      } else if (activeTab === 'testimonials') {
        if (editingItem.id) {
          const updated = await api.testimonials.update(editingItem.id, editingItem);
          setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        } else {
          const created = await api.testimonials.create({
            ...editingItem,
            id: `test-${Date.now()}`,
            rating: 5,
            status: 'approved',
            createdAt: new Date().toISOString(),
          });
          setTestimonials((prev) => [...prev, created]);
        }
      } else if (activeTab === 'leadership') {
        if (editingItem.id) {
          const updated = await api.leadership.update(editingItem.id, editingItem);
          setLeadership((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        } else {
          const created = await api.leadership.create({
            ...editingItem,
            id: `lead-${Date.now()}`,
            order: leadership.length,
            isActive: true,
          });
          setLeadership((prev) => [...prev, created]);
        }
      } else if (activeTab === 'cities') {
        if (editingItem.id) {
          const updated = await api.cities.update(editingItem.id, editingItem);
          setCities((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        } else {
          const created = await api.cities.create({
            ...editingItem,
            id: `city-${Date.now()}`,
            slug: editingItem.name?.toLowerCase().replace(/\s+/g, '-') || 'city',
            displayOrder: cities.length,
            isActive: true,
            createdAt: new Date().toISOString(),
          });
          setCities((prev) => [...prev, created]);
        }
      } else if (activeTab === 'investorDocs') {
        if (editingItem.id) {
          const updated = await api.investorDocs.update(editingItem.id, editingItem);
          setInvestorDocs((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        } else {
          const created = await api.investorDocs.create({
            ...editingItem,
            id: `inv-${Date.now()}`,
            quarter: 'Q4',
            downloadCount: 0,
            uploadedAt: new Date().toISOString(),
          });
          setInvestorDocs((prev) => [...prev, created]);
        }
      }

      addToast({ title: 'Success', description: 'Item saved successfully', type: 'success' });
      setIsModalOpen(false);
      setEditingItem(null);
    } catch {
      addToast({ title: 'Error', description: 'Failed to save item', type: 'error' });
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      if (activeTab === 'awards') {
        await api.awards.delete(id);
        setAwards((prev) => prev.filter((a) => a.id !== id));
      } else if (activeTab === 'testimonials') {
        await api.testimonials.delete(id);
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      } else if (activeTab === 'leadership') {
        await api.leadership.delete(id);
        setLeadership((prev) => prev.filter((l) => l.id !== id));
      } else if (activeTab === 'cities') {
        await api.cities.delete(id);
        setCities((prev) => prev.filter((c) => c.id !== id));
      } else if (activeTab === 'investorDocs') {
        await api.investorDocs.delete(id);
        setInvestorDocs((prev) => prev.filter((i) => i.id !== id));
      }
      addToast({ title: 'Deleted', description: 'Item removed', type: 'info' });
    } catch {
      addToast({ title: 'Error', description: 'Failed to delete item', type: 'error' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" /> Content & Brand Modules
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Centrally manage corporate awards, client testimonials, executive board profiles, regional cities, and investor disclosures.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setEditingItem({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Record
        </Button>
      </div>

      {/* Module Selector Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto pb-px">
        {[
          { key: 'awards', label: `Awards & Honors (${awards.length})`, icon: <Award className="w-4 h-4" /> },
          { key: 'testimonials', label: `Resident Testimonials (${testimonials.length})`, icon: <MessageSquareQuote className="w-4 h-4" /> },
          { key: 'leadership', label: `Leadership & Board (${leadership.length})`, icon: <Users className="w-4 h-4" /> },
          { key: 'cities', label: `Regional Hubs & Cities (${cities.length})`, icon: <MapPin className="w-4 h-4" /> },
          { key: 'investorDocs', label: `Investor & Compliance Docs (${investorDocs.length})`, icon: <FileCheck className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Module Display Content */}
      <div className="bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800 p-5">
        {/* AWARDS TAB */}
        {activeTab === 'awards' && (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {awards.map((aw) => (
              <div key={aw.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">{aw.title}</h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {aw.organization} &bull; {aw.year} &bull; {aw.category}
                      {aw.linkedProject && <span className="text-amber-600 font-medium"> &bull; {aw.linkedProject}</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {aw.isFeatured && <Badge variant="warning">Featured</Badge>}
                  <button
                    type="button"
                    onClick={() => { setEditingItem(aw); setIsModalOpen(true); }}
                    className="p-1.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(aw.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 bg-[#FAFAFA] dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {t.photoUrl && (
                      <img src={t.photoUrl} alt={t.clientName} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                    )}
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 dark:text-white">{t.clientName}</div>
                      <div className="text-[10px] text-neutral-400">{t.designationOrProject} &bull; {t.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => { setEditingItem(t); setIsModalOpen(true); }}
                      className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(t.id)}
                      className="p-1 text-neutral-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <blockquote className="text-xs text-neutral-600 dark:text-neutral-300 italic">
                  &ldquo;{t.quoteText}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        )}

        {/* LEADERSHIP TAB */}
        {activeTab === 'leadership' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadership.map((lead) => (
              <div key={lead.id} className="p-4 bg-[#FAFAFA] dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 rounded-md flex items-start gap-3">
                <img
                  src={lead.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                  alt={lead.name}
                  className="w-14 h-14 rounded object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{lead.name}</h4>
                  <p className="text-[11px] text-amber-600 font-medium truncate">{lead.designation}</p>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">{lead.bio}</p>
                  
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => { setEditingItem(lead); setIsModalOpen(true); }}
                      className="text-[11px] text-neutral-600 dark:text-neutral-300 hover:underline flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(lead.id)}
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CITIES TAB */}
        {activeTab === 'cities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <div key={city.id} className="overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-md bg-[#FAFAFA] dark:bg-neutral-800/40 group">
                <div className="h-28 bg-neutral-200 dark:bg-neutral-700 relative">
                  {city.heroImage && (
                    <img src={city.heroImage} alt={city.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent flex items-end p-3">
                    <span className="text-sm font-bold text-white">{city.name}</span>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <div className="text-[11px] text-neutral-500">{city.state}</div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 line-clamp-2">{city.introCopy}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => { setEditingItem(city); setIsModalOpen(true); }}
                      className="text-xs text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Hub
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(city.id)}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INVESTOR DOCS TAB */}
        {activeTab === 'investorDocs' && (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {investorDocs.map((doc) => (
              <div key={doc.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-neutral-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">{doc.title}</h4>
                    <p className="text-[11px] text-neutral-500">
                      Category: <span className="font-medium text-neutral-700 dark:text-neutral-300">{doc.category}</span> &bull; FY {doc.fiscalYear} &bull; {doc.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                    title="Download Document"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(doc.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Item Add/Edit Modal */}
      {isModalOpen && editingItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
          title={`${editingItem.id ? 'Edit' : 'Add New'} ${activeTab.replace(/([A-Z])/g, ' $1').toUpperCase()}`}
          size="md"
        >
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {activeTab === 'awards' && (
              <>
                <div>
                  <label className="block text-xs font-semibold mb-1">Award Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Conferring Organization</label>
                  <input
                    type="text"
                    value={editingItem.organization || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Year</label>
                    <input
                      type="number"
                      value={editingItem.year || 2026}
                      onChange={(e) => setEditingItem({ ...editingItem, year: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'testimonials' && (
              <>
                <div>
                  <label className="block text-xs font-semibold mb-1">Resident / Client Name</label>
                  <input
                    type="text"
                    value={editingItem.clientName || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Project / Occupation</label>
                  <input
                    type="text"
                    value={editingItem.designationOrProject || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, designationOrProject: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Quote</label>
                  <textarea
                    rows={3}
                    value={editingItem.quoteText || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, quoteText: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none resize-none"
                  />
                </div>
              </>
            )}

            {activeTab === 'leadership' && (
              <>
                <div>
                  <label className="block text-xs font-semibold mb-1">Leader Name</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Designation</label>
                  <input
                    type="text"
                    value={editingItem.designation || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Bio / Profile Narrative</label>
                  <textarea
                    rows={3}
                    value={editingItem.bio || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none resize-none"
                  />
                </div>
              </>
            )}

            {activeTab === 'cities' && (
              <>
                <div>
                  <label className="block text-xs font-semibold mb-1">City Name</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={editingItem.state || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, state: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Intro Narrative</label>
                  <textarea
                    rows={3}
                    value={editingItem.introCopy || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, introCopy: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none resize-none"
                  />
                </div>
              </>
            )}

            {activeTab === 'investorDocs' && (
              <>
                <div>
                  <label className="block text-xs font-semibold mb-1">Document Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Category</label>
                  <select
                    value={editingItem.category || 'Annual Report'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none"
                  >
                    <option value="Annual Report">Annual Report</option>
                    <option value="Financial Results">Financial Results</option>
                    <option value="Shareholding Pattern">Shareholding Pattern</option>
                    <option value="Corporate Governance">Corporate Governance</option>
                    <option value="Investor Presentation">Investor Presentation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">File URL</label>
                  <input
                    type="text"
                    value={editingItem.fileUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border rounded outline-none font-mono"
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveItem}>
                Save Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
