import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-[10000] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="text-sage-600 shrink-0 mt-0.5" size={18} />,
            warning: <AlertTriangle className="text-status-warning shrink-0 mt-0.5" size={18} />,
            error: <AlertCircle className="text-status-critical shrink-0 mt-0.5" size={18} />,
            info: <Info className="text-slateBlue-500 shrink-0 mt-0.5" size={18} />,
          };

          const borders = {
            success: 'border-sage-200 bg-white/95',
            warning: 'border-status-warning/30 bg-white/95',
            error: 'border-status-critical/30 bg-white/95',
            info: 'border-slateBlue-100 bg-white/95',
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 rounded-xl border shadow-lift flex items-start gap-3 backdrop-blur-md ${borders[toast.type]}`}
            >
              {icons[toast.type]}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-charcoal-800 leading-tight">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-[11px] text-charcoal-500 mt-1 leading-normal">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-charcoal-400 hover:text-charcoal-700 p-0.5 transition-colors"
                aria-label="Close notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
