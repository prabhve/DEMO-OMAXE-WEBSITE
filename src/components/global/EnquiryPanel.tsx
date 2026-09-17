import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { CITIES } from '../../data/cities';
import { PROJECTS } from '../../data/projects';
import { EnquiryFormData } from '../../types';
import { trackEvent } from '../../utils/analytics';
import { ANALYTICS_EVENTS } from '../../constants/analytics';

interface EnquiryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
  preselectedCity?: string;
}

export const EnquiryPanel: React.FC<EnquiryPanelProps> = ({
  isOpen,
  onClose,
  preselectedProject = '',
  preselectedCity = '',
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    email: '',
    phone: '',
    city: preselectedCity || 'New Delhi',
    project: preselectedProject || '',
    residentType: 'Resident Indian',
    message: '',
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackEvent(ANALYTICS_EVENTS.ENQUIRY_OPEN, {
        project_name: preselectedProject || 'General Enquiry',
        city: preselectedCity || 'All Cities',
      });
    }
  }, [isOpen, preselectedProject, preselectedCity]);

  useEffect(() => {
    if (preselectedCity) {
      setFormData((prev) => ({ ...prev, city: preselectedCity }));
    }
    if (preselectedProject) {
      setFormData((prev) => ({ ...prev, project: preselectedProject }));
    }
  }, [preselectedCity, preselectedProject]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone number';
    } else if (!/^[+0-9\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must authorize contact to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    trackEvent(ANALYTICS_EVENTS.ENQUIRY_SUBMIT, {
      project_name: formData.project || 'General Inquiry',
      city: formData.city,
      resident_type: formData.residentType,
    });
    // Simulate brief luxury processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: 'New Delhi',
      project: '',
      residentType: 'Resident Indian',
      message: '',
      consent: true,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-400 ease-luxury"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-panel-title"
        className="relative w-full max-w-lg bg-cream text-ink h-full shadow-2xl z-10 flex flex-col overflow-y-auto transform transition-transform duration-500 ease-luxury"
      >
        {/* Panel Header */}
        <div className="p-8 pb-6 border-b border-line flex items-center justify-between bg-cream sticky top-0 z-20">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold block mb-1">
              Private Consultation
            </span>
            <h2 id="enquiry-panel-title" className="font-display text-2xl sm:text-3xl text-ink font-normal">
              Enquire with Omaxe
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close enquiry panel"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-stone hover:text-ink transition-colors duration-200 cursor-pointer rounded-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-8 flex-1">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-14 h-14 mx-auto border border-gold/40 flex items-center justify-center text-gold">
                <CheckCircle className="w-8 h-8 text-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl text-ink">Thank You</h3>
                <p className="text-sm text-stone max-w-sm mx-auto leading-relaxed">
                  Your enquiry has been received with high priority. A dedicated senior relationship manager will connect with you shortly.
                </p>
              </div>
              <div className="pt-6 flex flex-col gap-3 max-w-xs mx-auto">
                <Button variant="secondary" onClick={handleReset} size="sm">
                  Send Another Enquiry
                </Button>
                <Button variant="primary" onClick={onClose} size="sm">
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resident Type Radio */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-2">
                  Resident Status
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(['Resident Indian', 'NRI'] as const).map((type) => (
                    <label
                      key={type}
                      className={`flex items-center justify-center py-2.5 px-4 text-xs font-medium uppercase tracking-wide border cursor-pointer transition-all duration-200 rounded-sm ${
                        formData.residentType === type
                          ? 'border-ink bg-ink text-cream'
                          : 'border-line bg-ivory text-stone hover:border-ink/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="residentType"
                        value={type}
                        checked={formData.residentType === type}
                        onChange={() => setFormData((prev) => ({ ...prev, residentType: type }))}
                        className="sr-only"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="enquiry-name" className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5">
                  Full Name *
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Vikramaditya Singhania"
                  className="w-full bg-ivory border border-line px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors rounded-sm"
                />
                {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-email" className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@domain.com"
                    className="w-full bg-ivory border border-line px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors rounded-sm"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full bg-ivory border border-line px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors rounded-sm"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
                </div>
              </div>

              {/* City & Project Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-city" className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5">
                    City of Interest
                  </label>
                  <select
                    id="enquiry-city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full bg-ivory border border-line px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors rounded-sm cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enquiry-project" className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5">
                    Specific Project
                  </label>
                  <select
                    id="enquiry-project"
                    value={formData.project}
                    onChange={(e) => setFormData((prev) => ({ ...prev, project: e.target.value }))}
                    className="w-full bg-ivory border border-line px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors rounded-sm cursor-pointer"
                  >
                    <option value="">Select a project (optional)</option>
                    {PROJECTS.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="enquiry-message" className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5">
                  Message or Preference
                </label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Share your preferred configuration, possession timeline, or questions..."
                  className="w-full bg-ivory border border-line px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors rounded-sm resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                    className="mt-1 h-4 w-4 rounded-sm border-line text-gold focus:ring-gold"
                  />
                  <span className="text-xs text-stone leading-relaxed">
                    I authorize Omaxe Limited and its representatives to contact me via phone, email, or WhatsApp regarding this enquiry.
                  </span>
                </label>
                {errors.consent && <p className="mt-1 text-xs text-red-700">{errors.consent}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-xs tracking-btn"
                  disabled={isSubmitting}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Confidential Enquiry'}
                </Button>
              </div>

              <p className="text-[11px] text-stone/80 text-center">
                Your information is held in strict confidence in accordance with our Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
