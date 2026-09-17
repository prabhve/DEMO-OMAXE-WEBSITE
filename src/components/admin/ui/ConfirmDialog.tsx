import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Input } from './FormField';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  requireTypedConfirmation?: boolean;
  expectedText?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  requireTypedConfirmation = false,
  expectedText = 'DELETE',
  isDestructive = true,
}) => {
  const [typedInput, setTypedInput] = useState('');

  const isMatches = !requireTypedConfirmation || typedInput.trim() === expectedText.trim();

  const handleConfirm = () => {
    if (!isMatches) return;
    onConfirm();
    setTypedInput('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setTypedInput('');
        onClose();
      }}
      title={title}
      maxWidth="sm"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isMatches}
            onClick={handleConfirm}
            className={`px-3.5 py-1.5 text-xs font-medium text-white rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              isDestructive ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>

        {requireTypedConfirmation && (
          <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-[11px] text-neutral-500">
              Please type <strong className="text-neutral-900 dark:text-neutral-100 font-mono">{expectedText}</strong> to confirm:
            </p>
            <Input
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={expectedText}
              className="font-mono text-xs"
              autoFocus
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
