import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  Save,
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  History,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Tag,
  ShieldCheck,
  Building,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ProjectSchema } from '../../../lib/api/schemas';
import { ProjectEntity } from '../../../lib/api/types';
import { api } from '../../../lib/api';
import { FormField, Input, Textarea, Select, Switch } from '../../../components/admin/ui/FormField';
import { Tabs, Badge } from '../../../components/admin/ui/BasicPrimitives';
import { MediaPicker } from '../../../components/admin/ui/MediaPicker';
import { IconPicker } from '../../../components/admin/ui/IconPicker';
import { RichTextEditor } from '../../../components/admin/ui/RichTextEditor';
import { ImageUploader } from '../../../components/admin/ui/ImageUploader';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { useAuthStore } from '../../../lib/admin/auth-store';

export const AdminProjectEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<string | null>(null);
  const [activeIconTarget, setActiveIconTarget] = useState<{ index: number } | null>(null);

  const addToast = useAdminStore((s) => s.addToast);
  const setHasUnsavedChanges = useAdminStore((s) => s.setHasUnsavedChanges);
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const defaultValues: any = {
    name: '',
    slug: '',
    tagline: '',
    description: '',
    overviewHtml: '',
    city: 'Delhi NCR',
    state: 'Delhi',
    address: '',
    pincode: '110001',
    latitude: 28.6139,
    longitude: 77.209,
    propertyType: 'Residential',
    status: 'Draft',
    featured: false,
    startingPrice: '₹1.50 Cr',
    pricePerSqFt: '₹8,500/sq.ft',
    bhkOptions: ['3 BHK', '4 BHK'],
    totalLandArea: '15 Acres',
    totalTowers: '6 Towers',
    totalUnits: '450 Units',
    possessionDate: 'Ready to Move',
    reraNumber: 'UPRERAPRJ12345',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      { id: '1', name: 'Olympic-size Swimming Pool', icon: 'Waves', description: 'Heated pool with deck' },
      { id: '2', name: 'Grand Clubhouse', icon: 'Building2', description: '50,000 sq.ft lifestyle club' },
      { id: '3', name: '24/7 Tier-3 Security', icon: 'ShieldCheck', description: 'Biometric & CCTV surveillance' },
    ],
    specifications: [
      { category: 'Structure', items: [{ key: 'Earthquake Resistance', value: 'RCC framed structure Zone V compliant' }] },
      { category: 'Flooring', items: [{ key: 'Living/Dining', value: 'Imported Italian Marble' }] },
    ],
    floorPlans: [
      {
        id: 'fp-1',
        title: '3 BHK Royal Residence',
        bhk: '3 BHK',
        superArea: '2,250 sq.ft',
        carpetArea: '1,780 sq.ft',
        price: '₹2.10 Cr',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    approvals: ['UP RERA Approved', 'State Bank of India Pre-Approved', 'HDFC Bank Approved'],
    seo: {
      metaTitle: 'Luxury Flats in Delhi NCR | Omaxe Developments',
      metaDescription: 'Discover premier luxury apartments and villas with world-class clubhouse amenities by Omaxe.',
      focusKeywords: ['luxury apartments', 'omaxe properties', 'real estate delhi'],
    },
    versionHistory: [],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<any>({
    resolver: zodResolver(ProjectSchema) as any,
    defaultValues: defaultValues as any,
  });

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({ control, name: 'amenities' });

  const {
    fields: floorPlanFields,
    append: appendFloorPlan,
    remove: removeFloorPlan,
  } = useFieldArray({ control, name: 'floorPlans' });

  // Update dirty state for navigation guard
  useEffect(() => {
    setHasUnsavedChanges(isDirty);
    return () => setHasUnsavedChanges(false);
  }, [isDirty, setHasUnsavedChanges]);

  // Load existing project if editing
  useEffect(() => {
    if (!isNew && id) {
      api.projects
        .getById(id)
        .then((project) => {
          if (project) {
            reset(project as any);
          } else {
            addToast({ title: 'Not Found', description: 'Project was not found', type: 'error' });
            navigate('/admin/projects');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isNew, reset, navigate, addToast]);

  // Auto-generate slug from name if empty
  const projectName = watch('name');
  useEffect(() => {
    if (isNew && projectName) {
      const generated = projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generated, { shouldValidate: true });
    }
  }, [projectName, isNew, setValue]);

  const onSave = async (data: any, statusOverride?: 'Published' | 'Draft') => {
    setIsSaving(true);
    try {
      const payload = {
        ...data,
        status: statusOverride || data.status,
      };

      if (isNew) {
        const created = await api.projects.create(payload as any);
        addToast({
          title: 'Project Created',
          description: `"${created.name}" has been created successfully.`,
          type: 'success',
        });
        navigate(`/admin/projects/${created.id}`);
      } else {
        const updated = await api.projects.update(id!, payload);
        reset(updated);
        addToast({
          title: 'Changes Saved',
          description: `Updated project "${updated.name}".`,
          type: 'success',
        });
      }
    } catch (err: any) {
      addToast({
        title: 'Save Failed',
        description: err.message || 'An error occurred while saving.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const currentHeroImage = watch('heroImage');
  const currentGallery = watch('galleryImages') || [];
  const currentStatus = watch('status');

  if (isLoading) {
    return (
      <div className="p-12 text-center text-xs text-neutral-400 space-y-2">
        <div className="w-6 h-6 border-2 border-[#A8823C] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading project editor...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((d) => onSave(d))} className="space-y-6">
      {/* Top Action Bar */}
      <div className="sticky top-14 z-10 -mx-6 px-6 py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-md">
                {isNew ? 'Create New Development' : watch('name') || 'Edit Project'}
              </h1>
              <Badge variant={currentStatus === 'Published' ? 'success' : 'warning'}>
                {currentStatus}
              </Badge>
              {isDirty && (
                <span className="text-[10px] text-amber-600 font-medium">● Unsaved edits</span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400">
              {watch('city')} · {watch('propertyType')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <a
              href={`/projects/${watch('slug')}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              <span>Preview Live</span>
            </a>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSubmit((d) => onSave(d, 'Draft'))}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSubmit((d) => onSave(d, 'Published'))}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded-md transition-colors shadow-2xs disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Project</span>
          </button>
        </div>
      </div>

      {/* Navigation Editor Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'basic', label: 'Basic Info & Hero' },
            { id: 'location', label: 'Location & Map' },
            { id: 'pricing', label: 'Pricing & Units' },
            { id: 'amenities', label: 'Amenities' },
            { id: 'floorplans', label: 'Floor Plans' },
            { id: 'gallery', label: 'Media Gallery' },
            { id: 'approvals', label: 'RERA & Approvals' },
            { id: 'seo', label: 'SEO & Metadata' },
          ]}
        />
      </div>

      {/* TAB 1: BASIC INFO & HERO */}
      {activeTab === 'basic' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-100">
          <div className="lg:col-span-2 space-y-4 bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Project Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Development Name" error={errors.name} required>
                <Input {...register('name')} placeholder="e.g. The Lake Luxury Residences" />
              </FormField>

              <FormField label="URL Slug" error={errors.slug} required>
                <Input {...register('slug')} placeholder="the-lake-luxury-residences" />
              </FormField>
            </div>

            <FormField label="Tagline / Short Pitch" error={errors.tagline}>
              <Input
                {...register('tagline')}
                placeholder="e.g. Waterfront living reimagined amidst 100 acres of green tranquility"
              />
            </FormField>

            <FormField label="Short Description" error={errors.description} required>
              <Textarea
                {...register('description')}
                rows={3}
                placeholder="Summarize the core luxury proposition for cards and search results..."
              />
            </FormField>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Detailed Overview (Rich Content)
              </label>
              <Controller
                control={control}
                name="overviewHtml"
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder="Provide in-depth architectural narrative, design philosophy, and community amenities..."
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Hero Image Block */}
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  Hero Cover Asset
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveMediaTarget('heroImage')}
                  className="text-xs text-[#A8823C] hover:underline"
                >
                  Media Library
                </button>
              </div>

              <ImageUploader
                value={currentHeroImage}
                onChange={(url) => setValue('heroImage', url, { shouldDirty: true })}
                onRemove={() => setValue('heroImage', '', { shouldDirty: true })}
                label="Upload High-Res Hero"
              />
            </div>

            {/* Categorization & Settings */}
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Classification
              </h3>

              <FormField label="Property Classification" error={errors.propertyType}>
                <Select {...register('propertyType')}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Integrated Township">Integrated Township</option>
                  <option value="Hi-Street Retail">Hi-Street Retail</option>
                  <option value="Plots / Land">Plots / Land</option>
                </Select>
              </FormField>

              <Controller
                control={control}
                name="featured"
                render={({ field }) => (
                  <Switch
                    checked={Boolean(field.value)}
                    onChange={field.onChange}
                    label="Feature on Homepage Carousel"
                    description="Pinned to prime display spots on consumer public portals."
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOCATION & MAP */}
      {activeTab === 'location' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Geographic Coordinates & Locality
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="City / Region Hub" error={errors.city} required>
              <Input {...register('city')} placeholder="e.g. New Chandigarh" />
            </FormField>

            <FormField label="State" error={errors.state} required>
              <Input {...register('state')} placeholder="e.g. Punjab" />
            </FormField>

            <FormField label="Postal Pincode" error={errors.pincode}>
              <Input {...register('pincode')} placeholder="e.g. 140901" />
            </FormField>
          </div>

          <FormField label="Full Street Address" error={errors.address} required>
            <Input
              {...register('address')}
              placeholder="e.g. Sector 8, Omaxe New Chandigarh Township, Near Medicity"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FormField label="GPS Latitude (decimal)">
              <Input
                type="number"
                step="any"
                {...register('latitude', { valueAsNumber: true })}
                placeholder="28.6139"
              />
            </FormField>

            <FormField label="GPS Longitude (decimal)">
              <Input
                type="number"
                step="any"
                {...register('longitude', { valueAsNumber: true })}
                placeholder="77.2090"
              />
            </FormField>
          </div>
        </div>
      )}

      {/* TAB 3: PRICING & UNITS */}
      {activeTab === 'pricing' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Commercial Terms & Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Starting Price Display" error={errors.startingPrice} required>
              <Input {...register('startingPrice')} placeholder="e.g. ₹1.85 Cr onwards" />
            </FormField>

            <FormField label="Price per Sq. Ft." error={errors.pricePerSqFt}>
              <Input {...register('pricePerSqFt')} placeholder="e.g. ₹8,500 / sq.ft" />
            </FormField>

            <FormField label="Possession Timeline" error={errors.possessionDate}>
              <Input {...register('possessionDate')} placeholder="e.g. December 2026 / Ready to Move" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Total Land Parcel" error={errors.totalLandArea}>
              <Input {...register('totalLandArea')} placeholder="e.g. 25 Acres" />
            </FormField>

            <FormField label="Towers Count" error={errors.totalTowers}>
              <Input {...register('totalTowers')} placeholder="e.g. 8 High-Rise Towers (G+24)" />
            </FormField>

            <FormField label="Total Inventory Units" error={errors.totalUnits}>
              <Input {...register('totalUnits')} placeholder="e.g. 520 Luxury Units" />
            </FormField>
          </div>
        </div>
      )}

      {/* TAB 4: AMENITIES */}
      {activeTab === 'amenities' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Project Amenities & Club Facilities
            </h3>
            <button
              type="button"
              onClick={() =>
                appendAmenity({
                  id: String(Date.now()),
                  name: 'New Amenity',
                  icon: 'Sparkles',
                  description: 'State of the art amenity',
                })
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#A8823C] bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800"
            >
              <Plus className="w-3 h-3" />
              <span>Add Amenity</span>
            </button>
          </div>

          <div className="space-y-3">
            {amenityFields.map((field, idx) => (
              <div
                key={field.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50"
              >
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveIconTarget({ index: idx })}
                    className="p-2 bg-white dark:bg-neutral-800 border rounded-md text-neutral-700 dark:text-neutral-300 hover:border-[#A8823C]"
                    title="Change Icon"
                  >
                    <Sparkles className="w-4 h-4 text-[#A8823C]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  <Input
                    {...register(`amenities.${idx}.name` as const)}
                    placeholder="Amenity Title (e.g. Olympic Size Pool)"
                  />
                  <Input
                    {...register(`amenities.${idx}.description` as const)}
                    placeholder="Description (e.g. Temperature controlled)"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeAmenity(idx)}
                  className="p-2 text-neutral-400 hover:text-rose-600 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FLOOR PLANS */}
      {activeTab === 'floorplans' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Unit Floor Layouts & Configurations
            </h3>
            <button
              type="button"
              onClick={() =>
                appendFloorPlan({
                  id: String(Date.now()),
                  title: 'New Unit Configuration',
                  bhk: '3 BHK',
                  superArea: '2,000 sq.ft',
                  carpetArea: '1,550 sq.ft',
                  price: '₹1.80 Cr',
                  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                })
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#A8823C] bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800"
            >
              <Plus className="w-3 h-3" />
              <span>Add Floor Plan</span>
            </button>
          </div>

          <div className="space-y-4">
            {floorPlanFields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 items-center"
              >
                <div className="sm:col-span-1">
                  <Input {...register(`floorPlans.${idx}.title` as const)} placeholder="Layout Title" />
                </div>
                <div>
                  <Input {...register(`floorPlans.${idx}.bhk` as const)} placeholder="Config (e.g. 3 BHK)" />
                </div>
                <div>
                  <Input {...register(`floorPlans.${idx}.superArea` as const)} placeholder="Super Area" />
                </div>
                <div>
                  <Input {...register(`floorPlans.${idx}.price` as const)} placeholder="Price" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => removeFloorPlan(idx)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Project Media Gallery ({currentGallery.length} assets)
            </h3>
            <button
              type="button"
              onClick={() => setActiveMediaTarget('galleryImages')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#A8823C] bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Select from Media Hub</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentGallery.map((url, idx) => (
              <div
                key={idx}
                className="relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 aspect-4/3"
              >
                <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const updated = currentGallery.filter((_, i) => i !== idx);
                    setValue('galleryImages', updated, { shouldDirty: true });
                  }}
                  className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: RERA & REGULATORY APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Regulatory Compliance & Bank Sanctions
          </h3>

          <FormField label="Official RERA Registration Number" error={errors.reraNumber}>
            <Input {...register('reraNumber')} placeholder="e.g. UPRERAPRJ12345 / DLRERA2024009" />
          </FormField>

          <FormField label="Approving Banks & Sanctions (Comma-separated)">
            <Input
              value={watch('approvals')?.join(', ') || ''}
              onChange={(e) =>
                setValue(
                  'approvals',
                  e.target.value.split(',').map((s) => s.trim()),
                  { shouldDirty: true }
                )
              }
              placeholder="State Bank of India, HDFC Bank, ICICI Bank, Punjab National Bank"
            />
          </FormField>
        </div>
      )}

      {/* TAB 8: SEO & METADATA */}
      {activeTab === 'seo' && (
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-4 animate-in fade-in duration-100">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Search Engine Optimization (SERP Preview)
          </h3>

          <FormField label="SEO Title Tag (60 chars max)">
            <Input {...register('seo.metaTitle')} placeholder="Luxury 3 & 4 BHK Flats in New Chandigarh | Omaxe" />
          </FormField>

          <FormField label="Meta Description (160 chars max)">
            <Textarea
              {...register('seo.metaDescription')}
              rows={3}
              placeholder="Explore world-class amenities, transparent floor plans, and ready-to-move luxury apartments in New Chandigarh by Omaxe."
            />
          </FormField>

          {/* Google SERP Snippet Preview */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-900/60 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold block">
              Google Search Result Snippet
            </span>
            <p className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">
              {watch('seo.metaTitle') || `${watch('name')} | Omaxe Developments`}
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
              https://omaxe.com/projects/{watch('slug')}
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {watch('seo.metaDescription') || watch('description')}
            </p>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPicker
        isOpen={Boolean(activeMediaTarget)}
        onClose={() => setActiveMediaTarget(null)}
        onSelect={(url) => {
          if (activeMediaTarget === 'heroImage') {
            setValue('heroImage', url, { shouldDirty: true });
          } else if (activeMediaTarget === 'galleryImages') {
            setValue('galleryImages', [...currentGallery, url], { shouldDirty: true });
          }
          setActiveMediaTarget(null);
        }}
      />

      {/* Icon Picker Modal */}
      <IconPicker
        isOpen={Boolean(activeIconTarget)}
        onClose={() => setActiveIconTarget(null)}
        onSelect={(iconName) => {
          if (activeIconTarget !== null) {
            setValue(`amenities.${activeIconTarget.index}.icon` as const, iconName, {
              shouldDirty: true,
            });
          }
          setActiveIconTarget(null);
        }}
      />
    </form>
  );
};
