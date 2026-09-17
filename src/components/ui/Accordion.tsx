import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-line border-t border-b border-line ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-5">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <span className="font-display text-xl sm:text-2xl text-ink font-normal group-hover:text-gold transition-colors duration-300">
                {item.title}
              </span>
              <span className="ml-4 p-1 rounded-sm text-stone group-hover:text-gold transition-colors duration-300">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="pt-4 pb-2 text-stone text-sm leading-relaxed max-w-[70ch]">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
