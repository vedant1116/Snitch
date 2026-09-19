import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth.js';
import { useNavigate, Link } from 'react-router';

export default function Register() {
  const { handleRegister, loading, error: authError } = useAuth();


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: '',
    countryCode: '+1',
    phoneNumber: '',
    email: '',
    password: '',
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Password strength calculation matching latest Stitch design
  const getPasswordStrength = (val) => {
    if (!val) return { score: 0, label: 'WEAK', color: 'bg-[#353534]' };
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score === 1) {
      return { score: 1, label: 'POOR', color: 'bg-[#ffb4ab]' };
    } else if (score === 2) {
      return { score: 2, label: 'FAIR', color: 'bg-[#ffb95f]' };
    } else if (score === 3) {
      return { score: 3, label: 'SECURE', color: 'bg-[#ffd165]' };
    } else if (score >= 4) {
      return { score: 4, label: 'VAULT', color: 'bg-[#eab308]' };
    }
    return { score: 0, label: 'WEAK', color: 'bg-[#353534]' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (successMessage) setSuccessMessage('');
    
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullname.trim()) {
      errors.fullname = 'Full name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.replace(/[\s-]/g, ''))) {
      errors.phoneNumber = 'Valid phone number required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Valid email address required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Min 8 characters required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const fullPhoneNumber = `${formData.countryCode} ${formData.phoneNumber.trim()}`;

    const res = await handleRegister({
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      phoneno: fullPhoneNumber,
      password: formData.password,
      isSeller: formData.isSeller,
    });

    if (res?.success) {
      setSuccessMessage('Welcome to the collective. Your Snitch ID has been verified.');
      setTimeout(() => {
        navigate('/');
      }, 1200);
    }
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-body antialiased selection:bg-[#eab308] selection:text-[#0e0e0e] min-h-screen flex flex-col justify-between">
      {/* TOP APP BAR (Latest Stitch Header) */}
      <header className="bg-[#131313]/80 backdrop-blur-md docked full-width top-0 fixed border-b border-[#4f4633]/30 flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-full z-50">
        {/* Brand Logo Anchor */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-[22px] font-display font-extrabold tracking-tight text-[#e5e2e1] hover:text-[#ffd165] transition duration-200"
          >
            SNITCH
          </a>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#collections"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac] hover:text-[#e5e2e1] transition-colors duration-200"
            >
              COLLECTIONS
            </a>
            <a
              href="#archive"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac] hover:text-[#e5e2e1] transition-colors duration-200"
            >
              ARCHIVE
            </a>
            <a
              href="#editorial"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac] hover:text-[#e5e2e1] transition-colors duration-200"
            >
              EDITORIAL
            </a>
          </nav>
        </div>

        {/* Trailing Actions Cluster */}
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffd165] border-b border-[#ffd165] pb-1 transition duration-200 ease-out active:scale-95"
          >
            SIGN IN
          </Link>
          <button
            aria-label="Shopping Bag"
            className="p-1 text-[#d3c5ac] hover:text-[#ffd165] transition-colors duration-200 flex items-center justify-center active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* MAIN REGISTRATION CANVAS (Split Screen Architectural Grid) */}
      <main className="w-full pt-20 flex-1 flex items-stretch">
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
          {/* LEFT EDITORIAL MOOD & VISUAL PANEL (Col 1-6 / Desktop) */}
          <section className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative flex-col justify-between p-12 xl:p-16 border-r border-[#4f4633]/30 overflow-hidden bg-[#0e0e0e]">
            {/* High Contrast Editorial Imagery */}
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-top brightness-90 contrast-105 transition duration-1000 ease-out scale-100 hover:scale-105"
                alt="Snitch High-Fashion Runway Lookbook Collection"
                src="/images/snitch_lookbook.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#0e0e0e]/50 to-[#131313]/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/70 via-transparent to-[#0e0e0e]/40"></div>
            </div>

            {/* Clean Minimalist Header Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffd165]">
                PRIVATE ACCESS // ARCHIVE
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/60">
                EDITION 09
              </span>
            </div>

            {/* Centered Sharp Typography with Breathable Space */}
            <div className="relative z-10 my-auto py-16 max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffd165] mb-4">
                EXCLUSIVE MEMBERSHIP
              </p>
              <h1 className="text-[44px] xl:text-[48px] font-display font-bold text-[#e5e2e1] tracking-[-0.03em] leading-none mb-6">
                JOIN THE INNER CIRCLE.
              </h1>
              <p className="text-[17px] text-[#d3c5ac] leading-[26px]">
                Curated runway previews, unreleased drops, and private archive allocations engineered for deliberate collectors.
              </p>
            </div>

            {/* Subdued Subtle Brand Note */}
            <div className="relative z-10 text-[#d3c5ac]/50 text-[11px] font-bold uppercase tracking-[0.16em]">
              PARIS · MILAN · TOKYO · NYC
            </div>
          </section>

          {/* RIGHT REGISTRATION FORM CARD (Col 7-12 / Desktop) */}
          <section className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center px-6 py-12 md:px-16 xl:px-24 bg-[#131313] relative">
            {/* Subtle Ambient Background Glow */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#ffd165]/5 blur-[120px] pointer-events-none rounded-full"></div>

            <div className="max-w-xl w-full mx-auto relative z-10">
              {/* Editorial Heading Cluster */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-6 bg-[#ffd165]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffd165]">
                    IDENTITY ENROLLMENT
                  </span>
                </div>
                <h2 className="text-[32px] font-display font-semibold text-[#e5e2e1] tracking-[-0.02em] mb-2">
                  CREATE YOUR SNITCH ID
                </h2>
                <p className="text-[15px] text-[#d3c5ac]">
                  Enter your credentials to claim verification within the digital archive.
                </p>
              </div>

              {/* Quick Sign-in Obsidian Action Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <button
                  type="button"
                  className="group h-12 px-4 bg-[#1c1b1b] border border-[#4f4633]/50 hover:border-[#eab308] text-[#e5e2e1] flex items-center justify-center gap-3 transition-colors duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#E5E2E1" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#D3C5AC" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#9B8F79" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#FFD165" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5e2e1]">Google</span>
                </button>

                <button
                  type="button"
                  className="group h-12 px-4 bg-[#1c1b1b] border border-[#4f4633]/50 hover:border-[#eab308] text-[#e5e2e1] flex items-center justify-center gap-3 transition-colors duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-[#e5e2e1] transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-.07 1.73.05 2.78 1.01.08 2.03-.53 2.65-1.28z" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5e2e1]">Apple</span>
                </button>
              </div>

              {/* Hairline Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="w-full border-t border-[#4f4633]/30"></div>
                <span className="bg-[#131313] px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/60">
                  OR COMPLETE DOSSIER
                </span>
              </div>

              {/* Feedback Alerts */}
              {authError && (
                <div className="mb-5 p-3.5 bg-red-950/40 border border-red-800/60 text-[#ffb4ab] text-xs flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{authError}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 p-3.5 bg-emerald-950/40 border border-emerald-700/60 text-emerald-300 text-xs flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Registration Form Fields */}
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]" htmlFor="fullname">
                      FULL NAME <span className="text-[#ffd165]">*</span>
                    </label>
                    {formErrors.fullname && (
                      <span className="text-[10px] text-[#ffb4ab] uppercase tracking-wide">{formErrors.fullname}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      className="w-full h-12 bg-[#1c1b1b] border border-[#4f4633]/60 focus:border-[#eab308] focus:ring-0 focus:outline-none px-4 text-[15px] text-[#e5e2e1] placeholder:text-[#d3c5ac]/40 transition-colors duration-200 rounded-none"
                      id="fullname"
                      name="fullname"
                      placeholder="Alexander Vance"
                      value={formData.fullname}
                      onChange={handleChange}
                      type="text"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#d3c5ac]/40">
                      <span className="material-symbols-outlined">badge</span>
                    </div>
                  </div>
                </div>

                {/* Field 2: Phone Number with Country Code */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]" htmlFor="phoneNumber">
                      PHONE NUMBER <span className="text-[#ffd165]">*</span>
                    </label>
                    {formErrors.phoneNumber && (
                      <span className="text-[10px] text-[#ffb4ab] uppercase tracking-wide">{formErrors.phoneNumber}</span>
                    )}
                  </div>
                  <div className="flex">
                    <div className="relative w-28 shrink-0">
                      <select
                        className="w-full h-12 bg-[#1c1b1b] border border-r-0 border-[#4f4633]/60 focus:border-[#eab308] focus:ring-0 focus:outline-none px-3 text-[13px] text-[#e5e2e1] cursor-pointer rounded-none appearance-none"
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+91">+91 (IN)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+33">+33 (FR)</option>
                        <option value="+81">+81 (JP)</option>
                        <option value="+49">+49 (DE)</option>
                        <option value="+39">+39 (IT)</option>
                      </select>
                      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-[#d3c5ac]/60">
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </div>
                    </div>
                    <input
                      className="flex-1 h-12 bg-[#1c1b1b] border border-[#4f4633]/60 focus:border-[#eab308] focus:ring-0 focus:outline-none px-4 text-[15px] text-[#e5e2e1] placeholder:text-[#d3c5ac]/40 transition-colors duration-200 rounded-none"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="(555) 019-2834"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      type="tel"
                    />
                  </div>
                </div>

                {/* Field 3: Email Address */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]" htmlFor="email">
                      EMAIL ADDRESS <span className="text-[#ffd165]">*</span>
                    </label>
                    {formErrors.email && (
                      <span className="text-[10px] text-[#ffb4ab] uppercase tracking-wide">{formErrors.email}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      className="w-full h-12 bg-[#1c1b1b] border border-[#4f4633]/60 focus:border-[#eab308] focus:ring-0 focus:outline-none px-4 text-[15px] text-[#e5e2e1] placeholder:text-[#d3c5ac]/40 transition-colors duration-200 rounded-none"
                      id="email"
                      name="email"
                      placeholder="alexander@snitch-archive.com"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#d3c5ac]/40">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                  </div>
                </div>

                {/* Field 4: Password & Interactive Strength Indicator */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]" htmlFor="password">
                      PASSWORD <span className="text-[#ffd165]">*</span>
                    </label>
                    {formErrors.password ? (
                      <span className="text-[10px] text-[#ffb4ab] uppercase tracking-wide">{formErrors.password}</span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/60">MIN 8 CHARACTERS</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      className="w-full h-12 bg-[#1c1b1b] border border-[#4f4633]/60 focus:border-[#eab308] focus:ring-0 focus:outline-none px-4 pr-12 text-[15px] text-[#e5e2e1] placeholder:text-[#d3c5ac]/40 transition-colors duration-200 rounded-none tracking-widest"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <button
                      aria-label="Toggle password view"
                      className="absolute inset-y-0 right-0 px-3.5 flex items-center text-[#d3c5ac]/60 hover:text-[#ffd165] transition-colors duration-150 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  {/* Password Strength Indicator Bars */}
                  <div className="pt-1 flex items-center gap-1.5">
                    <div
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        strength.score >= 1 ? strength.color : 'bg-[#353534]'
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        strength.score >= 2 ? strength.color : 'bg-[#353534]'
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        strength.score >= 3 ? strength.color : 'bg-[#353534]'
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 transition-colors duration-300 ${
                        strength.score >= 4 ? strength.color : 'bg-[#353534]'
                      }`}
                    ></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/80 pl-1 min-w-[55px] text-right">
                      {strength.label}
                    </span>
                  </div>
                </div>

                {/* Field 5: isSeller Checkbox Flag (Sharp Minimalist Styling) */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isSeller: !prev.isSeller }))
                  }
                  className={`p-4 border transition-colors duration-200 cursor-pointer rounded-none ${
                    formData.isSeller
                      ? 'bg-[#1c1b1b] border-[#eab308] shadow-[0_0_16px_-4px_rgba(234,179,8,0.25)]'
                      : 'bg-[#0e0e0e] border-[#4f4633]/40 hover:border-[#4f4633]'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      id="isSellerCheckbox"
                      name="isSeller"
                      checked={formData.isSeller}
                      onChange={handleChange}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-0.5 w-4 h-4 rounded-none bg-[#1c1b1b] border-[#4f4633]/80 accent-[#eab308] cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-[#e5e2e1] group-hover:text-[#ffd165] transition-colors">
                          Register as a Seller / Brand Partner
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.16em] bg-[#eab308]/10 text-[#ffd165] border border-[#eab308]/30 px-1.5 py-0.5">
                          PRO TIER
                        </span>
                      </div>
                      <p className="text-[13px] text-[#d3c5ac]/70 mt-0.5 leading-relaxed">
                        Access Snitch Designer Marketplace, Wholesale Portal &amp; inventory syndication.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Primary Action CTA Button */}
                <div className="pt-2">
                  <button
                    className="w-full h-[52px] bg-[#eab308] text-[#0e0e0e] text-[11px] font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 aurum-bloom hover:bg-[#f3d73e] transition-all duration-200 active:scale-[0.99] cursor-pointer disabled:opacity-75"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                        <span>CREATING ACCOUNT...</span>
                      </div>
                    ) : (
                      <>
                        <span>CREATE ACCOUNT</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Streamlined Legal Policy Micro-Copy */}
                <p className="text-[13px] text-[#d3c5ac]/60 text-center text-xs leading-relaxed pt-1">
                  By enrolling, you accept our{' '}
                  <a className="underline hover:text-[#e5e2e1] text-[#d3c5ac] transition-colors" href="#terms">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="underline hover:text-[#e5e2e1] text-[#d3c5ac] transition-colors" href="#privacy">
                    Privacy Statement
                  </a>.
                </p>

                {/* Footer Return Prompt */}
                <div className="pt-4 border-t border-[#4f4633]/30 text-center">
                  <p className="text-[15px] text-[#d3c5ac]">
                    Already part of the collective?{' '}
                    <Link to="/login" className="text-[#ffd165] font-bold hover:underline transition-all duration-200 ml-1">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER (Shared Component Source of Truth) */}
      <footer className="bg-[#0e0e0e] docked full-width bottom border-t border-[#4f4633]/20 w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left z-20">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/70">
          © 2025 SNITCH ARCHIVE INC. ALL RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/70 hover:text-[#ffd165] transition-opacity duration-200 hover:opacity-100" href="#privacy">
            PRIVACY POLICY
          </a>
          <a className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/70 hover:text-[#ffd165] transition-opacity duration-200 hover:opacity-100" href="#terms">
            TERMS OF SERVICE
          </a>
          <a className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/70 hover:text-[#ffd165] transition-opacity duration-200 hover:opacity-100" href="#care">
            CLIENT CARE
          </a>
          <a className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d3c5ac]/70 hover:text-[#ffd165] transition-opacity duration-200 hover:opacity-100" href="#stores">
            STORES
          </a>
        </div>
      </footer>
    </div>
  );
}
