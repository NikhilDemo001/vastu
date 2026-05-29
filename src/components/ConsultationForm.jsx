import React, { useState } from 'react';
import { submitConsultationRequest } from '../services/firebaseService';
import { validateEmail, validateName, validatePhone, validateRequired } from '../utils/validation';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  propertyType: '',
  timeline: '',
  concern: '',
};

const propertyTypes = ['Apartment', 'Independent House', 'Villa', 'Office', 'Plot / Land', 'Retail Space'];
const timelines = ['This week', 'Within 2 weeks', 'This month', 'Planning stage'];

const ConsultationForm = ({ compact = false }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!validateRequired(formData.name)) nextErrors.name = 'Full name is required.';
    else if (!validateName(formData.name)) nextErrors.name = 'Please enter a valid name (minimum 2 letters).';

    if (!validateRequired(formData.email)) nextErrors.email = 'Email address is required.';
    else if (!validateEmail(formData.email)) nextErrors.email = 'Please enter a valid email address.';

    if (!validateRequired(formData.phone)) nextErrors.phone = 'Phone number is required.';
    else if (!validatePhone(formData.phone)) nextErrors.phone = 'Please enter a valid 10-digit number.';

    if (!validateRequired(formData.propertyType)) nextErrors.propertyType = 'Please select your property type.';
    if (!validateRequired(formData.timeline)) nextErrors.timeline = 'Please select a preferred timeline.';

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    
    // Touch all fields
    setTouched({
      name: true,
      email: true,
      phone: true,
      propertyType: true,
      timeline: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await submitConsultationRequest(formData);
      setSubmitSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Could not connect. Please check your internet connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setSubmitSuccess(false);
  };

  return (
    <section className={compact ? 'py-6' : 'py-16'}>
      <div className="section-shell max-w-4xl mx-auto">
        
        {/* Page Headings */}
        {!compact && (
          <div className="mb-12 text-center">
            <p className="eyebrow mx-auto justify-center">Consultation Studio</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-[#111715] dark:text-[#f0ede8] sm:text-6xl max-w-3xl mx-auto leading-none">
              Get a practical Vastu plan for your exact space.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-[#68736d] dark:text-[#a8b8b2]">
              Share the property type, your priorities, and timeline. The form validates instantly and keeps the next step clear.
            </p>
          </div>
        )}

        {/* Form Container */}
        <div className="relative overflow-hidden rounded-[20px] border border-[#111715]/10 dark:border-white/10 bg-[#fffaf2] dark:bg-[#0c100f] shadow-[0_32px_90px_rgba(17,23,21,0.08)] dark:shadow-[0_32px_90px_rgba(0,0,0,0.4)]">
          <div className="noise" />

          {submitSuccess ? (
            /* SUCCESS VIEW */
            <div className="text-center py-16 px-6 max-w-xl mx-auto space-y-6 relative z-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0f766e]/10 border border-[#0f766e]/30 text-[#0f766e] dark:text-[#2a9d8f] text-4xl animate-bounce">
                ✓
              </div>

              <div className="space-y-2">
                <p className="eyebrow mx-auto justify-center">Request Received</p>
                <h3 className="font-display text-4xl font-extrabold text-[#111715] dark:text-white leading-none">
                  Vastu Vault Active.
                </h3>
                <p className="text-sm text-[#68736d] dark:text-[#a8b8b2] leading-relaxed pt-2">
                  Thank you, **{formData.name}**. We have securely registered your consultation ticket. A certified chief Vastu consultant will review your details shortly.
                </p>
              </div>

              {/* Summary box styled like a luxury card receipt */}
              <div className="p-6 rounded-2xl border border-dashed border-[#c8922a]/30 bg-[#c8922a]/5 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-[#111715]/5 pb-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400">DIGITAL AUDIT RECEIPT</span>
                  <span className="font-mono text-xs font-bold text-[#c8922a]">PORTAL_LINK_LIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="block text-slate-400 text-[10px]">VISITOR</span>
                    <strong className="text-slate-800 dark:text-slate-200">{formData.name}</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px]">PHONE NUMBER</span>
                    <strong className="text-slate-800 dark:text-slate-200">{formData.phone}</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px]">PROPERTY TYPE</span>
                    <strong className="text-slate-800 dark:text-slate-200">{formData.propertyType}</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px]">AUDIT TIMELINE</span>
                    <strong className="text-slate-800 dark:text-slate-200">{formData.timeline}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <p className="text-xs text-slate-400">
                  A verification confirmation has been mapped to **{formData.email}**. Keep your floor plans ready.
                </p>
                <button onClick={handleReset} className="btn-secondary">
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            /* CLEAN SINGLE-COLUMN FORM */
            <div className="p-8 sm:p-12 lg:p-16 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Full Name */}
                  <label className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                    Full name
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleTextChange}
                      className={`mt-1.5 w-full rounded-lg border bg-white/70 dark:bg-[#080c0b] px-4 py-3 text-[#111715] dark:text-white shadow-sm transition text-sm ${
                        errors.name && touched.name
                          ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#111715]/10 dark:border-white/10 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && touched.name && <span className="mt-1 block text-[10px] font-bold text-red-500">{errors.name}</span>}
                  </label>

                  {/* Email address */}
                  <label className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                    Email address
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleTextChange}
                      className={`mt-1.5 w-full rounded-lg border bg-white/70 dark:bg-[#080c0b] px-4 py-3 text-[#111715] dark:text-white shadow-sm transition text-sm ${
                        errors.email && touched.email
                          ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#111715]/10 dark:border-white/10 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && touched.email && <span className="mt-1 block text-[10px] font-bold text-red-500">{errors.email}</span>}
                  </label>

                  {/* Phone number */}
                  <label className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleTextChange}
                      className={`mt-1.5 w-full rounded-lg border bg-white/70 dark:bg-[#080c0b] px-4 py-3 text-[#111715] dark:text-white shadow-sm transition text-sm ${
                        errors.phone && touched.phone
                          ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#111715]/10 dark:border-white/10 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]'
                      }`}
                      placeholder="10 digit number"
                    />
                    {errors.phone && touched.phone && <span className="mt-1 block text-[10px] font-bold text-red-500">{errors.phone}</span>}
                  </label>

                  {/* Property Type */}
                  <label className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                    Property type
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleTextChange}
                      className={`mt-1.5 w-full rounded-lg border bg-white/70 dark:bg-[#080c0b] px-4 py-3 text-[#111715] dark:text-white shadow-sm transition text-sm ${
                        errors.propertyType && touched.propertyType
                          ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#111715]/10 dark:border-white/10 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]'
                      }`}
                    >
                      <option value="">Select property type</option>
                      {propertyTypes.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                    {errors.propertyType && touched.propertyType && <span className="mt-1 block text-[10px] font-bold text-red-500">{errors.propertyType}</span>}
                  </label>
                </div>

                {/* Timeline */}
                <label className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                  Preferred Timeline
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleTextChange}
                    className={`mt-1.5 w-full rounded-lg border bg-white/70 dark:bg-[#080c0b] px-4 py-3 text-[#111715] dark:text-white shadow-sm transition text-sm ${
                      errors.timeline && touched.timeline
                        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#111715]/10 dark:border-white/10 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]'
                    }`}
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.timeline && touched.timeline && <span className="mt-1 block text-[10px] font-bold text-red-500">{errors.timeline}</span>}
                </label>

                {/* Main Concern or Goal */}
                <label className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block">
                  Main concern or goal
                  <textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleTextChange}
                    rows={4}
                    className="mt-1.5 w-full rounded-lg border border-[#111715]/10 dark:border-white/10 bg-white/70 dark:bg-[#080c0b] px-4 py-3 text-[#111715] dark:text-white shadow-sm transition text-sm focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]"
                    placeholder="Example: improve bedroom layout, review kitchen fire energy, plan a new building entrance..."
                  />
                </label>

                {errors.submit && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 font-semibold text-xs text-red-500">
                    {errors.submit}
                  </div>
                )}

                {/* Submit button block */}
                <div className="grid gap-4 pt-3 sm:grid-cols-[auto_1fr] sm:items-center">
                  <button
                    className="btn btn-gold px-10 w-full sm:w-auto"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Securing portal...' : 'Submit Request ➔'}
                  </button>
                  <p className="text-[10px] font-semibold leading-normal text-slate-400">
                    🔒 Details are encrypted securely. Floorplans stay confidential under legal non-disclosure.
                  </p>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
