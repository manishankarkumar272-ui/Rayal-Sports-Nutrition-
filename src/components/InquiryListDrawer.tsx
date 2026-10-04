import React from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, Phone, Store, ShieldCheck, CheckSquare } from 'lucide-react';
import { StoreInquiryItem } from '../types';
import { STORE_INFO } from '../data/products';

interface InquiryListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: StoreInquiryItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearList: () => void;
}

export const InquiryListDrawer: React.FC<InquiryListDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearList,
}) => {
  if (!isOpen) return null;

  const totalEstimatedPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Generate WhatsApp message with all items
  const generateWhatsAppMessage = () => {
    let msg = `Hello Royal Sports & Nutrition, I am planning to visit your store and would like to check in-store stock/reserve the following items:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name}\n   - Flavor: ${item.flavor}\n   - Size: ${item.size}\n   - Qty: ${item.quantity}\n   - Estimated Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    msg += `Total Estimated: ₹${totalEstimatedPrice.toLocaleString('en-IN')}\n\nIs this stock ready for counter pickup today? Thank you!`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${STORE_INFO.phoneClean}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F172A] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Store Visit List</h2>
                <div className="text-[11px] text-slate-400">
                  {items.reduce((s, i) => s + i.quantity, 0)} items tagged for counter pickup
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* In-Store Notice */}
          <div className="px-6 py-3 bg-amber-950/20 border-b border-amber-900/40 text-xs text-amber-200">
            <span className="font-bold">No online payment required: </span>
            This list is for your store visit or WhatsApp stock reservation. Pay at our counter with Cash, UPI, or Card.
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Your visit list is empty</h3>
                <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
                  Browse our in-store catalog and add products you wish to inspect or purchase at our counter.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate font-serif">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-amber-300/90 truncate">
                      {item.flavor} · {item.size}
                    </div>
                    {item.product.shelfLocation && (
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.product.shelfLocation}
                      </div>
                    )}
                    <div className="text-xs font-mono font-bold text-amber-400 mt-1 tabular-nums">
                      ₹{item.price.toLocaleString('en-IN')} (Store Price)
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white font-mono tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Action Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/90 space-y-3">
              {/* Estimated Total Calculation */}
              <div className="flex justify-between items-center text-sm font-bold text-white pb-3 border-b border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  Total In-Store Counter Amount:
                </span>
                <span className="text-lg text-amber-400 font-mono tabular-nums">
                  ₹{totalEstimatedPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Reserve on WhatsApp button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reserve on WhatsApp (+91 9978378403)</span>
              </a>

              {/* Direct Call Store button */}
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-full py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store Counter for Instant Check</span>
              </a>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cash / UPI / Card at Counter</span>
                </div>
                <button
                  onClick={onClearList}
                  className="text-slate-500 hover:text-slate-300 underline"
                >
                  Clear List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
