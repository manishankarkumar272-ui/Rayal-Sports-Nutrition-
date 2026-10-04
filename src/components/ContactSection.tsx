import React, { useState } from 'react';
import { Phone, Clock, MessageSquare, CheckCircle, Send, MapPin, Store, CreditCard, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [productInquiry, setProductInquiry] = useState<string>('Royal 100% Isolate');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="store-info" className="py-20 sm:py-28 bg-[#0B0F18] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Store Details & Counter Helpline */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2 flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span>Visit Our Retail Store</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
              Have Questions? We’re Here to Help.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              For product enquiries, assistance, dosage guidance, or general information, contact
              Royal Sports & Nutrition or drop by our physical store counter.
            </p>

            <div className="space-y-4">
              {/* Call Us Box with Direct Phone */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Store Helpline & Counter Desk
                    </div>
                    <div className="text-sm font-bold text-white">Royal Sports & Nutrition</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-baseline justify-between flex-wrap gap-2">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-xl sm:text-2xl font-black text-amber-300 hover:text-white font-mono transition-colors tracking-wide"
                  >
                    {STORE_INFO.phone}
                  </a>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
                  >
                    Call Store
                  </a>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href={`https://wa.me/${STORE_INFO.phoneClean}?text=Hello%20Royal%20Sports%20%26%20Nutrition%2C%20I%20have%20an%20enquiry%20regarding%20store%20availability`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      WhatsApp Store Counter
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Instant response on live stock and reserve requests
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </a>

              {/* Operating Hours & Physical Store Services */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-200">Store Hours</div>
                    <div>{STORE_INFO.operatingHours} (Open Everyday)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-200">Counter Payment Methods</div>
                    <div>Cash, UPI (Google Pay, PhonePe, Paytm), and All Cards</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-200">In-Store Authenticity Guarantee</div>
                    <div>Inspect batch hologram & seal in person before paying</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-Visit Stock Check / Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white font-serif mb-1">
                Check In-Store Stock & Enquire
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Planning to visit? Send an enquiry below and our store staff will confirm shelf stock and set it aside for you.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-slate-950/70 rounded-xl border border-emerald-800/60">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white font-serif mb-1">
                    Enquiry Received!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Thank you, {name}! Our store counter team will call or WhatsApp you on {phone} with stock availability.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99783 78403"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Product You Wish to Check / Reserve
                    </label>
                    <select
                      value={productInquiry}
                      onChange={(e) => setProductInquiry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Royal 100% Isolate">Royal 100% Isolate Protein Powder (5 lbs)</option>
                      <option value="Herculez Gainer">Herculez Gainer Mass Builder (6 lbs)</option>
                      <option value="Protein Matrix">Protein Matrix Multi-Source Blend (4.8 lbs)</option>
                      <option value="VITA LIFE">VITA LIFE Daily Multivitamin (60 Tablets)</option>
                      <option value="Multiple Products / Diet Plan">Multiple Products / Diet Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Message / Preferred Flavor / Expected Visit Time
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Please check if Chocolate Delight flavor is available. I will visit the store today around 6 PM..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Store Counter</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
