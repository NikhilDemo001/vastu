import React, { useState } from 'react';
import { submitConsultationRequest } from '../services/firebaseService';
import { validateEmail, validateName, validatePhone, validateRequired } from '../utils/validation';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  propertyType: '',
  concern: '',
  timeline: '',
};

const propertyTypes = ['Apartment', 'Independent House', 'Villa', 'Office', 'Plot / Land', 'Retail Space'];
const timelines = ['This week', 'Within 2 weeks', 'This month', 'Planning stage'];

const nextSteps = [
  'We review your goals and plan type.',
  'You receive a focused discovery call.',
  'We prepare room-wise Vastu recommendations.',
];

const ConsultationForm = ({ compact = false }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const nextErrors = {};
    if (!validateRequired(formData.name)) nextErrors.name = 'Name is required.';
    else if (!validateName(formData.name)) nextErrors.name = 'Use at least two letters.';
    if (!validateRequired(formData.email)) nextErrors.email = 'Email is required.';
    else if (!validateEmail(formData.email)) nextErrors.email = 'Enter a valid email.';
    if (!validateRequired(formData.phone)) nextErrors.phone = 'Phone is required.';
    else if (!validatePhone(formData.phone)) nextErrors.phone = 'Enter a valid 10 digit phone.';
    if (!validateRequired(formData.propertyType)) nextErrors.propertyType = 'Choose a property type.';
    if (!validateRequired(formData.concern)) nextErrors.concern = 'Tell us what you want to improve.';
    if (!validateRequired(formData.timeline)) nextErrors.timeline = 'Choose a preferred timeline.';
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setTouched(Object.keys(initialFormData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    try {
      await submitConsultationRequest(formData);
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setTouched({});
    } catch (error) {
      setErrors({ submit: 'We could not submit the request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `mt-2 w-full rounded-[8px] border bg-white px-4 py-3 text-[#111715] shadow-sm transition ${
      errors[name] && touched[name]
        ? 'border-red-400 focus:border-red-500'
        : 'border-[#111715]/20 focus:border-[#0f766e]'
    }`;

  return (
    <section className={compact ? 'py-8' : 'py-20'}>
      <div className="section-shell">
        {!compact && (
          <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="eyebrow">Personal consultation</p>
              <h2 className="mt-3 font-display text-5xl font-bold leading-none">
                Get a practical Vastu plan for your exact space.
              </h2>
            </div>
            <p className="max-w-2xl leading-8 text-[#68736d] md:justify-self-end">
              Share the property type, your priorities, and timeline. The form validates instantly and keeps the next step
              clear on mobile and desktop.
            </p>
          </div>
        )}

        <div className="grid overflow-hidden rounded-[8px] border border-[#111715]/10 bg-[#fffaf2] shadow-[0_24px_70px_rgba(17,23,21,0.12)] lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="ink-panel relative min-h-[430px] overflow-hidden p-6 text-[#fffaf2] sm:p-8">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
            <div className="relative">
              <p className="eyebrow text-[#f2b84b]">What happens next</p>
              <h3 className="mt-3 font-display text-5xl font-bold leading-none">A guided audit, not a generic report.</h3>
              <div className="mt-8 grid gap-4">
                {nextSteps.map((item, index) => (
                  <div key={item} className="grid grid-cols-[44px_1fr] gap-4 rounded-[8px] border border-white/10 bg-white/10 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#f2b84b] font-bold text-[#111715]">
                      {index + 1}
                    </span>
                    <p className="leading-7 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="p-5 sm:p-8">
            {submitSuccess ? (
              <div className="grid min-h-[420px] place-items-center py-10 text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-[8px] bg-[#0f766e] text-2xl font-bold text-white">
                    OK
                  </div>
                  <h3 className="mt-5 font-display text-5xl font-bold leading-none">Request received.</h3>
                  <p className="mx-auto mt-3 max-w-xl leading-8 text-[#68736d]">
                    Thank you. We will review your details and contact you with the next step shortly.
                  </p>
                  <button className="btn-secondary mt-7" onClick={() => setSubmitSuccess(false)}>
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="font-bold">
                    Full name
                    <input name="name" value={formData.name} onChange={handleChange} className={fieldClass('name')} placeholder="Your name" />
                    {errors.name && touched.name && <span className="mt-2 block text-sm text-red-600">{errors.name}</span>}
                  </label>
                  <label className="font-bold">
                    Email address
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className={fieldClass('email')} placeholder="you@example.com" />
                    {errors.email && touched.email && <span className="mt-2 block text-sm text-red-600">{errors.email}</span>}
                  </label>
                  <label className="font-bold">
                    Phone number
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={fieldClass('phone')} placeholder="10 digit number" />
                    {errors.phone && touched.phone && <span className="mt-2 block text-sm text-red-600">{errors.phone}</span>}
                  </label>
                  <label className="font-bold">
                    Property type
                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={fieldClass('propertyType')}>
                      <option value="">Select one</option>
                      {propertyTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                    {errors.propertyType && touched.propertyType && <span className="mt-2 block text-sm text-red-600">{errors.propertyType}</span>}
                  </label>
                </div>

                <label className="font-bold">
                  Main concern or goal
                  <textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    rows={4}
                    className={fieldClass('concern')}
                    placeholder="Example: improve bedroom layout, review kitchen placement, plan a new office..."
                  />
                  {errors.concern && touched.concern && <span className="mt-2 block text-sm text-red-600">{errors.concern}</span>}
                </label>

                <label className="font-bold">
                  Preferred timeline
                  <select name="timeline" value={formData.timeline} onChange={handleChange} className={fieldClass('timeline')}>
                    <option value="">Select timeline</option>
                    {timelines.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                  {errors.timeline && touched.timeline && <span className="mt-2 block text-sm text-red-600">{errors.timeline}</span>}
                </label>

                {errors.submit && <div className="rounded-[8px] bg-red-50 p-4 font-semibold text-red-700">{errors.submit}</div>}

                <div className="grid gap-4 pt-2 sm:grid-cols-[auto_1fr] sm:items-center">
                  <button className="btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <p className="text-sm font-semibold leading-6 text-[#68736d]">
                    Your details stay private and are used only for consultation follow-up.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
