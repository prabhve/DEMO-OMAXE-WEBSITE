import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/company';
import { trackEvent } from '../../utils/analytics';
import { ANALYTICS_EVENTS } from '../../constants/analytics';

export const WhatsAppPill: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Omaxe,%20I%20am%20interested%20in%20exploring%20your%20luxury%20properties.`;

  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
      source: 'floating_pill',
    });
  };

  return (
    <aside aria-label="Concierge contact" className="fixed bottom-8 right-8 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Connect with Omaxe Private Concierge"
        className="group flex items-center gap-3 bg-ink/95 hover:bg-ink text-cream hover:text-gold px-5 py-3.5 rounded-none border border-cream/20 hover:border-gold shadow-2xl transition-all duration-400 ease-luxury"
      >
        <MessageSquare className="w-3.5 h-3.5 text-gold shrink-0" />
        <span className="hidden sm:inline-block text-[10px] font-body uppercase tracking-[0.22em] font-light">
          Private Concierge
        </span>
      </a>
    </aside>
  );
};
