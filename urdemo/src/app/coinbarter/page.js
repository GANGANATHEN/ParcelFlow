"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  CircleX,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  Check,
} from "lucide-react"; // Example icons for the toggle
import Image from "next/image";

// import product1 from "../../../public/assets/hero_banner/product-1.png";
// import product2 from "../../../public/assets/hero_banner/product-2.png";
// import product3 from "../../../public/assets/hero_banner/product-3.png";
// import product4 from "../../../public/assets/hero_banner/product-4.png";
// import product5 from "../../../public/assets/hero_banner/product-5.png";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlassSVG from "./GlassSvg";
// import { useSearch } from "../context/page";

import {
  LiquidGlassProvider,
  LiquidGlassFilters,
} from "@gracefullight/liquid-glass";
import LiquidCrystalGlass from "../border/page";
import GlassToast from "../border/page";

const Nav_Component = () => {
  // State to manage the visibility of the mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const navItems = [
    {
      name: "Products",
      //   image: product1,
      items: [
        { title: "Exchange" },
        { title: "Buy Crypto" },
        { title: "Sell Crypto" },
        { title: "Bridge" },
        { title: "Spend Crypto" },
      ],
    },
    {
      name: "Business",
      //   image: product2,
      items: [
        { title: "API" },
        { title: "Merchant Tools" },
        { title: "Enterprise Wallet" },
      ],
    },
    {
      name: "Support",
      //   image: product3,
      items: [
        { title: "Help Center" },
        { title: "Contact" },
        { title: "FAQ" },
        { title: "Report Issue" },
      ],
    },
    {
      name: "About",
      //   image: product4,
      items: [{ title: "Company" }, { title: "Team" }, { title: "Careers" }],
    },
    {
      name: "Explore",
      //   image: product5,
      items: [{ title: "Blog" }, { title: "News" }, { title: "Events" }],
    },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ];

  const [selectedLang, setSelectedLang] = useState(languages[0]);

  // Sticky Menu
  const [sticky, setSticky] = useState("");
  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 300 ? "stickys" : "");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // Language Dropdown
  const [langOpen, setLangOpen] = useState(false);
  useEffect(() => {
    const closeOnOutside = (e) => {
      if (!e.target.closest(".lang-dropdown-area")) {
        setLangOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, []);

  // Navber Dropdown
  const [openMenu, setOpenMenu] = useState(null);

  // close when clicking outside
  useEffect(() => {
    const closeOnOutside = (e) => {
      if (!e.target.closest(".nav-dropdown-area")) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, []);

  // Mobile View Navber Function
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selected, setSelected] = useState(null);

  const panelRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const close = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
        setActiveMenu(null);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // NAvber Hide Function
  const [hideNavbar, setHideNavbar] = useState(false);
  useEffect(() => {
    const handleHideOnBottom = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      // If user is within 700px from bottom → hide
      setHideNavbar(scrolled > pageHeight - 700);
    };

    window.addEventListener("scroll", handleHideOnBottom);
    return () => window.removeEventListener("scroll", handleHideOnBottom);
  }, []);

  // for accPop
  const [accPop, setAccPop] = useState(false);

  // Login Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validation helpers
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Min 6 chars, 1 number, 1 special char
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters and include 1 number and 1 special character",
      );
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // Fake API
    setTimeout(() => {
      if (email === "ajith@gmail.com" && password === "Ajith@123") {
        setIsLoggedIn(true);
        setAccPop(false);
      } else {
        setPasswordError("Invalid email or password");
      }
      setLoading(false);
    }, 1500);
  };

  // Forgot password
  const [isForgot, setIsForgot] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const handleForgotSubmit = (e) => {
    e.preventDefault();

    setResetError("");
    setResetSuccess("");

    if (!resetEmail) {
      setResetError("Email is required");
      return;
    }

    if (!validateEmail(resetEmail)) {
      setResetError("Enter a valid email address");
      return;
    }

    setLoading(true);

    // Fake API
    setTimeout(() => {
      setResetSuccess("Password reset link sent to your email");
      setLoading(false);
    }, 1500);
  };

  // Create Account
  const [createOpen, setCreateOpen] = useState(false);

  const [createEmail, setCreateEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [captcha, setCaptcha] = useState(false);

  const [error, setError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const createValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const createHandleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!createValidateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Use");
      return;
    }

    if (!captcha) {
      setError("Please verify you are not a robot");
      return;
    }

    setCreateLoading(true);

    // Fake API
    setTimeout(() => {
      alert("Account created successfully");
      setCreateLoading(false);
    }, 1500);
  };

  // Login Function
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);
    if (profileOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [profileOpen]);

  const [openWallet, setOpenWallet] = useState(false);

  const WALLETS = [
    { name: "MetaMask", icon: "../assets/hero_banner/wallet-1.svg" },
    { name: "Coinbase Wallet", icon: "../assets/hero_banner/wallet-2.svg" },
    { name: "WalletConnect", icon: "../assets/hero_banner/wallet-3.png" },
    { name: "SafePal", icon: "../assets/hero_banner/wallet-1.svg" },
  ];

  return (
    <div className="w-full">
      {/* Wallet open Modal */}
      {openWallet && (
        <div
          onClick={() => setOpenWallet(false)}
          className="fixed pop-hide inset-0 z-55 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-60"
            onClick={() => setOpenWallet(false)}
          />
          <div className="left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 z-62">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative  sm:max-w-[400px] max-w-[500px] min-h-[400px] rounded-2xl border-0 bg-white/10 backdrop-blur-xl shadow-2xl pt-4 pb-4"
            >
              <div className="flex items-center justify-between gap-5 mb-4 sm:px-5 px-4 ">
                <h3 className="text-sm font-medium text-white">
                  Available Wallets ({WALLETS.length})
                </h3>
                <button
                  onClick={() => setOpenWallet(false)}
                  className="text-white cursor-pointer"
                >
                  <CircleX />
                </button>
              </div>

              <div className="h-px bg-white/10 mt-2 mb-4" />

              <div className="px-4">
                <div className="grid grid-cols-2 gap-3 text-white">
                  {WALLETS.map((wallet) => {
                    return (
                      <button
                        key={wallet.name}
                        className={`flex items-center gap-3 border rounded-xl bg-[#C4C4C44D]/30 px-3 py-3 transition hover:border-[#d3ed05]`}
                      >
                        <div className="border border-[#CFCFCF] rounded-sm w-8 h-8 min-w-8 min-h-8 flex items-center justify-center">
                          <img className="w-5" src={wallet.icon} alt="" />
                        </div>
                        <span className="text-sm">{wallet.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {accPop && (
        <div className={`pop-hide fixed inset-0 z-55 px-4`}>
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-60"
            onClick={() => setAccPop(false)}
          />

          <div className="left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 z-61">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative  sm:max-w-[400px] max-w-[500px] min-h-[400px] rounded-2xl border-0 bg-white/10 backdrop-blur-xl shadow-2xl sm:px-6 px-4 pt-13 pb-6"
            >
              <button
                onClick={() => setAccPop(false)}
                className="absolute right-3 top-3 text-white cursor-pointer"
              >
                <CircleX />
              </button>

              <Tabs className={`gap-4`} defaultValue="Invaders">
                <TabsList className="bg-[#FFFFFF14] border border-[#FFFFFF1F] rounded-full px-2 py-1.5 h-full">
                  <TabsTrigger
                    value="Invaders"
                    className="sm:text-md text-sm data-[state=active]:bg-[#FFFFFF14] data-[state=active]:text-[#D3ED05] text-[white] rounded-full py-2 sm:px-5 px-2 h-full"
                  >
                    Invaders Club
                  </TabsTrigger>

                  <TabsTrigger
                    value="Affiliate"
                    className="sm:text-md text-sm data-[state=active]:bg-[#FFFFFF14] data-[state=active]:text-[#D3ED05] text-[white] rounded-full py-2 sm:px-5 px-2 h-full"
                  >
                    Affiliate Program
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Invaders">
                  <div>
                    <h5 className="mb-4 text-lg text-white font-semibold">
                      Connect your wallet
                    </h5>

                    {/* Wallet Button */}
                    <div
                      onClick={() => setOpenWallet(true) || setAccPop(false)}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-white"
                    >
                      <img
                        className="w-6"
                        src="../assets/hero_banner/blocknative.png"
                        alt=""
                      />
                      <span className="text-sm">Blocknative</span>
                    </div>

                    <div className="max-w-[200px] mx-auto">
                      <button className="mt-6 w-full rounded-xl bg-[#D3ED05] py-3 px-3 font-semibold text-black">
                        LOGIN
                      </button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="Affiliate">
                  {!createOpen ? (
                    <div>
                      {!isForgot ? (
                        <form onSubmit={handleSubmit} className="space-y-3">
                          {/* Email */}
                          <div>
                            <label className="text-sm font-semibold text-white">
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="Enter Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="mt-1 w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white placeholder-white focus:outline-none"
                            />
                            {emailError && (
                              <p className="mt-1 text-xs text-red-600">
                                {emailError}
                              </p>
                            )}
                          </div>

                          {/* Password */}
                          <div>
                            <label className="text-sm font-semibold text-white">
                              Password
                            </label>
                            <div className="relative mt-1">
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white placeholder-white focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                            {passwordError && (
                              <p className="mt-1 text-xs text-red-600">
                                {passwordError}
                              </p>
                            )}
                          </div>

                          {/* Forgot password */}
                          <div className="text-right">
                            <button
                              onClick={() => setIsForgot(true)}
                              type="button"
                              className="text-sm text-white hover:text-[#D3ED05]"
                            >
                              Forget Password ?
                            </button>
                          </div>

                          {/* Submit */}
                          <div className="max-w-[200px] mx-auto">
                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full rounded-xl bg-[#D3ED05] py-2.5 px-3 font-semibold text-black transition disabled:opacity-70"
                            >
                              {loading ? "Logging in..." : "LOGIN"}
                            </button>
                          </div>

                          <p className="text-center text-sm text-white">or</p>

                          {/* Create account */}
                          <p className="text-center sm:text-sm text-[13px] text-white">
                            Do you have an account?{" "}
                            <span
                              className="cursor-pointer text-[#D3ED05] hover:underline"
                              onClick={() => setCreateOpen(true)}
                            >
                              Create Account
                            </span>
                          </p>
                        </form>
                      ) : (
                        <form
                          onSubmit={handleForgotSubmit}
                          className="space-y-3"
                        >
                          <h2 className="text-md font-medium text-white">
                            Forget your password
                          </h2>
                          <p className="text-sm font-normal text-white">
                            Please, enter the email address associated with your
                            account. We&apos;ll send you a password recovery
                            link to set new password.
                          </p>

                          <div>
                            <div className="mt-1">
                              <input
                                type="email"
                                placeholder="Enter e-mail"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white placeholder-white focus:outline-none"
                              />
                              {resetError && (
                                <p className="mt-1 text-xs text-red-600">
                                  {resetError}
                                </p>
                              )}
                              {resetSuccess && (
                                <p className="mt-1 text-xs text-green-500">
                                  {resetSuccess}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="max-w-[200px] mx-auto mt-5">
                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full rounded-xl bg-[#D3ED05] py-2.5 font-semibold text-black disabled:opacity-70"
                            >
                              {loading ? "Sending..." : "SEND"}
                            </button>
                          </div>

                          <p
                            onClick={() => setIsForgot(false)}
                            className="cursor-pointer text-center font-semibold text-sm text-[#D3ED05] hover:underline"
                          >
                            Back to Login
                          </p>
                        </form>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={createHandleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-white">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Your Email"
                          value={createEmail}
                          onChange={(e) => setCreateEmail(e.target.value)}
                          className="mt-1 mb-1 w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white placeholder-white focus:outline-none"
                        />
                        {error && (
                          <p className="text-xs text-red-600">{error}</p>
                        )}
                      </div>

                      <label className="flex items-start gap-2 sm:text-sm text-[13px] text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={() => setAgreeTerms(!agreeTerms)}
                          className="peer hidden"
                        />
                        <div
                          className={`mt-1 flex min-h-4.5 min-w-4.5 max-h-4.5 max-w-4.5 items-center justify-center rounded border transition  ${agreeTerms ? "bg-[#D3ED05] border-[#D3ED05]" : "border-white"}`}
                        >
                          {agreeTerms && (
                            <Check className=" text-black font-bold" />
                          )}
                        </div>
                        <span>
                          I agree to the terms of the{" "}
                          <span className="text-[#D3ED05] cursor-pointer">
                            Terms of Use
                          </span>
                          ,{" "}
                          <span className="text-[#D3ED05] cursor-pointer">
                            Privacy Policy
                          </span>{" "}
                          and{" "}
                          <span className="text-[#D3ED05] cursor-pointer">
                            Affiliate Terms
                          </span>{" "}
                          of Coin Barter LLC
                        </span>
                      </label>

                      <label className="flex cursor-pointer items-start gap-3 sm:text-sm text-[13px] text-white">
                        <input
                          type="checkbox"
                          checked={newsletter}
                          onChange={() => setNewsletter(!newsletter)}
                          className="peer hidden"
                        />

                        <div
                          className={`mt-1 flex min-h-4.5 min-w-4.5 max-h-4.5 max-w-4.5 items-center justify-center rounded border transition  ${newsletter ? "bg-[#D3ED05] border-[#D3ED05]" : "border-white"}`}
                        >
                          {newsletter && (
                            <Check className=" text-black font-bold" />
                          )}
                        </div>

                        <span>
                          I want to receive the hottest Coin Barter news in the
                          newsletter
                        </span>
                      </label>

                      <div className="flex items-center justify-between rounded-lg bg-white p-3">
                        <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
                          <input
                            type="checkbox"
                            checked={captcha}
                            onChange={() => setCaptcha(!captcha)}
                            className="h-4 w-4"
                          />
                          I’m not a robot
                        </label>
                        <img
                          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                          alt="captcha"
                          className="h-6"
                        />
                      </div>

                      <div className="max-w-[200px] mx-auto">
                        <button
                          type="submit"
                          disabled={createLoading}
                          className="w-full rounded-xl bg-[#D3ED05] py-3 text-sm font-bold text-black transition hover:bg-[#D3ED05] disabled:opacity-70"
                        >
                          {createLoading ? "CREATING..." : "CREATE ACCOUNT"}
                        </button>
                      </div>

                      <p
                        onClick={() => setCreateOpen(false)}
                        className="text-center text-sm text-[#D3ED05] cursor-pointer hover:underline"
                      >
                        Already have an account
                      </p>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${
          sticky
            ? "stickys"
            : "absolute top-0 z-50 min-[117.5rem]:px-60! bg-amber-  lg:px-12 xl:py-6! xl:px-16! 2xl:py-11! lg:py-6 md:py-8 sm:6"
        } ${openMenu ? "nav-responsive" : "sticky-bg"} ${
          hideNavbar ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-all duration-300  w-full navber-dasktop `}
      >
        <nav
          ref={navRef}
          className={`text-white px-5  ${sticky ? "relative py-2" : "py-2"}`}
        >
          <div className="flex justify-between items-center gap-5 lg:gap-3">
            {/* Logo */}

            {!sticky ? (
              <Link href="/" className="text-3xl lg:text-3xl font-extrabold">
                Coin Barter
              </Link>
            ) : (
              <div className="home-img">
                <img
                  className="home-1"
                  src="../../assets/hero_banner/home-1.svg"
                  alt=""
                />
                <img
                  className="home-2"
                  src="../../assets/hero_banner/home-2.svg"
                  alt=""
                />
              </div>
            )}

            {/* Desktop Menu */}
            <div className="flex nav-gap items-center">
              {navItems.map((nav) => (
                <div
                  key={nav.name}
                  className={` nav-dropdown-area ${sticky ? "" : "relative"}`}
                >
                  {/* Trigger */}
                  <button
                    onPointerDown={() =>
                      setOpenMenu(openMenu === nav.name ? null : nav.name)
                    }
                    className={`${
                      openMenu === nav.name
                        ? "nav-active-bg nav-sticky-bg"
                        : "nav-sticky-bg"
                    } font-semibold cursor-pointer flex items-center gap-1 hover:text-[#D3ED05]`}
                  >
                    <span
                      className={`${
                        openMenu === nav.name ? "text-[#D3ED05] " : "text-white"
                      }`}
                    >
                      {nav.name}
                    </span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        sticky ? "hidden" : "relative block"
                      } ${
                        openMenu === nav.name
                          ? "rotate-180 text-[#D3ED05]"
                          : "text-white"
                      }`}
                    />
                  </button>

                  {/* <div className="absolute mt-2 navopen-below w-40 py-2 z-[9999]">
                      <div className="relative rounded-2xl overflow-hidden">

                        <div
                          className="absolute inset-0 backdrop-blur-[3px] bg-[#ffffff8f] 
shadow-[inset_1px_1px_1px_rgba(255,255,255,0.17),inset_-1px_-1px_1px_rgba(255,255,255,0.17)]"
                        ></div>

                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5"></div>

                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl 
  before:content-[''] before:absolute before:inset-0 before:rounded-2xl 
  before:border-2 before:border-white/30"
                          style={{
                            WebkitMaskImage: `
      linear-gradient(black, black),
      radial-gradient(circle 18px at top right, transparent 98%, black 100%),
      radial-gradient(circle 18px at bottom left, transparent 98%, black 100%)
    `,
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                          }}
                        ></div>

                        <div className="relative z-10 p-3">
                          {nav.items.map((item, index) => (
                            <div
                              key={index}
                              className={`px-3 py-1 cursor-pointer transition-colors liquidGlass-text ${
                                sticky
                                  ? "text-white"
                                  : "text-black hover:text-[#D3ED05]"
                              }`}
                              onPointerDown={() => {
                                setOpenMenu(null);
                              }}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div> */}

                  {/* Menu */}
                  {openMenu === nav.name && (
                    <div className="absolute mt-5 navopen-below w-40 py-2 z-[9999]">
                      <div className="relative rounded-2xl overflow-hidden">
                        {/* <div
                          className="absolute inset-0 backdrop-blur-[3px] bg-[#ffffff8f] 
shadow-[inset_1px_1px_1px_rgba(255,255,255,0.17),inset_-1px_-1px_1px_rgba(255,255,255,0.17)]"
                        ></div> */}
                        {/* BORDER */}
                        <div
                          className="pointer-events-none absolute inset-0 z-10 rounded-2xl 
  before:content-[''] before:absolute before:inset-0 before:rounded-2xl brightness-175
  before:border-1 before:border-white/80"
                          style={{
                            WebkitMaskImage: `
  linear-gradient(black, black),

  radial-gradient(circle 24px at top right,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ),

  radial-gradient(circle 24px at bottom left,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ) `,
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                          }}
                        ></div>
                        {/* MAIN GLASS (IMPORTANT) */}
                        <div className="absolute inset-0 backdrop-blur-[9px] bg-blend-hard-light bg-white/50  "></div>
                        {/* SOFT INNER LIGHT */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"></div>
                        {/* TOP REFLECTION (REDUCED) */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-40"></div>
                        {/* EDGE HIGHLIGHT (SOFT) */}
                        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.3),inset_0_-1px_0.5px_rgba(255,255,255,0.1)]"></div>
                        <div
                          className="absolute inset-0 rounded-2xl 
  shadow-[
    inset_0_1px_1px_rgba(255,255,255,0.3),
    inset_0_-1px_1px_rgba(255,255,255,0.1),
    0_4px_10px_rgba(0,0,0,0.15),
    0_10px_30px_rgba(0,0,0,0.25)
  ]"
                        ></div>

                        {/* BORDER */}
                        {/* <div className="absolute inset-0 rounded-2xl border-2 border-white/20"></div> */}
                        {/* CONTENT */}
                        <div className="relative z-10 p-3">
                          {nav.items.map((item, index) => (
                            <div
                              key={index}
                              className={`px-3 py-1 cursor-pointer transition-colors ${
                                sticky
                                  ? "text-white"
                                  : "text-black hover:text-[#D3ED05]"
                              }`}
                              onPointerDown={() => {
                                setOpenMenu(null);
                              }}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-5 items-center">
              {/* Desktop Language Dropdown */}
              <div
                className={`relative lang-dropdown-area ${
                  sticky ? "hidden" : "block"
                }`}
              >
                <button
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setLangOpen((prev) => !prev);
                  }}
                  className="px-3 py-2 bg-[#D3ED05] text-black font-semibold rounded-md flex items-center gap-1"
                >
                  {selectedLang.code.toUpperCase()}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {langOpen && (
                  <div className="absolute mt-2 w-40 z-50 navopen-below">
                    <div className="liquidGlass-wrapper">
                      <div className="liquidGlass-effect"></div>
                      <div className="liquidGlass-tint"></div>
                      <div className="liquidGlass-shine"></div>

                      {languages.map((lang) => (
                        <div
                          key={lang.code}
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            setSelectedLang(lang);
                            setLangOpen(false);
                          }}
                          className={`px-4 py-1 cursor-pointer hover:text-[#D3ED05] liquidGlass-text ${
                            selectedLang.code === lang.code
                              ? "text-[#D3ED05]"
                              : "text-black"
                          }`}
                        >
                          {lang.name} ({lang.code.toUpperCase()})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Account Button */}
              {!isLoggedIn ? (
                <button
                  onClick={() => setAccPop(true)}
                  className="bg-[#D3ED05] text-black font-semibold py-2 px-4 account-btn rounded-md"
                >
                  Account
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileOpen(!profileOpen);
                    }}
                    className="flex items-center gap-2 rounded-3xl bg-[#e2ff0087] shadow-[0px_1px_8px_0px_#0000001F] backdrop-blur-[40px] pl-1 pr-2 py-1 text-white"
                  >
                    <div className="min-w-7 min-h-7 h-7 w-7 rounded-full bg-white flex items-center justify-center">
                      <img
                        src="../assets/hero_banner/profile-circle.svg"
                        alt="profile"
                        className="w-5.5 h-5.5"
                      />
                    </div>
                    <span className="text-xs font-medium">
                      Affiliate Program
                    </span>

                    {/* Arrow */}
                    <svg
                      className={`min-h-4 min-w-4 h-4 w-4 text-white transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="nav-header-position absolute right-0 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#000000ab] backdrop-blur-[40px] z-50 px-3 py-3">
                      <div className="flex items-center justify-between gap-10 mb-3 text-white w-full">
                        <div className="flex items-center gap-2">
                          <div className="min-w-7 min-h-7 h-7 w-7 rounded-full bg-white flex items-center justify-center">
                            <img
                              src="../assets/hero_banner/profile-circle.svg"
                              alt="profile"
                              className="w-5.5 h-5.5"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Affiliate Program</p>
                            <p className="text-sm">dummy@gmail.com</p>
                          </div>
                        </div>
                        <img
                          src="../assets/hero_banner/copy.svg"
                          alt="copy"
                          className="w-4.5"
                        />
                      </div>

                      <button className="w-full mb-2 text-left text-sm text-white flex items-center gap-2">
                        <img
                          src="../assets/hero_banner/login-profile.svg"
                          alt="copy"
                          className="w-4"
                        />
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-sm text-[#FF001A] flex items-center gap-2"
                      >
                        <img
                          src="../assets/hero_banner/red-logout.svg"
                          alt="copy"
                          className="w-4"
                        />
                        Logout
                      </button>

                      <div className="h-px bg-white/10 my-3 w-[250px]" />

                      <div className="max-w-[200px] mx-auto">
                        <button className="w-full text-center text-sm text-[#FF001A] py-1.5 px-2 border border-[#D3ED05] rounded-lg">
                          Login Invaders Club
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onPointerDown={() => setMobileOpen(!mobileOpen)}
              className="hidden text-white"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Dropdown Panel */}
          {mobileOpen && (
            <div className="lg:hidden mt-4 bg-black/40 backdrop-blur-xl rounded-xl p-4 space-y-3">
              {/* Mobile Nav Items */}
              {navItems.map((nav) => (
                <div
                  key={nav.name}
                  className={` nav-dropdown-area ${sticky ? "" : "relative"}`}
                >
                  <button
                    onPointerDown={() =>
                      setOpenMenu(openMenu === nav.name ? null : nav.name)
                    }
                    className="w-full text-left font-semibold py-2 flex items-center justify-between"
                  >
                    {nav.name}

                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        openMenu === nav.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMenu === nav.name && (
                    <div className="bg-white text-black mt-1 rounded-md shadow-md py-2">
                      {nav.items.map((item, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 cursor-pointer text-black hover:text-[#D3ED05]"
                          onPointerDown={() => {
                            setOpenMenu(null);
                            setMobileOpen(false); // close mobile menu
                          }}
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Language */}
              <div className="flex items-center gap-5">
                <div className="relative lang-dropdown-area">
                  <button
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setLangOpen((prev) => !prev);
                    }}
                    className="px-3 py-2 bg-[#D3ED05] text-black font-semibold rounded-md flex items-center gap-1"
                  >
                    {selectedLang.code.toUpperCase()}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        langOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {langOpen && (
                    <div className="absolute mt-2 w-40 z-50 navopen-below">
                      <div className="liquidGlass-wrapper">
                        <div className="liquidGlass-effect"></div>
                        <div className="liquidGlass-tint"></div>
                        <div className="liquidGlass-shine"></div>

                        {languages.map((lang) => (
                          <div
                            key={lang.code}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              setSelectedLang(lang);
                              setLangOpen(false);
                            }}
                            className={`px-4 py-1 cursor-pointer hover:text-[#D3ED05] liquidGlass-text ${
                              selectedLang.code === lang.code
                                ? "text-[#D3ED05]"
                                : "text-black"
                            }`}
                          >
                            {lang.name} ({lang.code.toUpperCase()})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Account */}
                <button
                  onClick={() => setAccPop(true)}
                  className="bg-[#D3ED05] text-black font-semibold py-2 px-3 rounded-md"
                >
                  Account
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
      {/* liquid glass effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="bg-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.003 0.003"
            numOctaves="2"
            seed="55"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blur"
            scale="-45"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <svg className="absolute w-0 h-0">
        <filter id="bg-1">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.002 0.005"
            numOctaves="1"
            seed="55"
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="-39"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* working code */}
      <div className="absolute hidden rounded-3xl top-120 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-br from-white/10 via-white/5 to-white-20">
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            top: "-6px",
            left: "-16px",
            right: "-16px",
            bottom: "-16px",
            transform: "scale(1.05)",
            opacity: 0.09,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px) brightness(1)",
            WebkitBackdropFilter: "blur(12px) brightness(1)",
            filter: "blur(9px)",
            zIndex: 0,
          }}
        />
        <div className="relative w-120 h-55 rounded-3xl overflow-hidden">
          {/* GLASS CONTAINER */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden z-10">
            {/* BACKGROUND DISTORTION ONLY */}
            <div
              className="absolute inset-0 bg-white/20 backdrop-blur-[6px]"
              style={{
                filter: "url(#bg-1)",
                width: "300%",
                height: "300%",
              }}
            ></div>
            {/*  LIGHT / GLASS LOOK */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[6px]"></div>

            {/* GLASS EDGE (REAL REFRACTION) */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              {/* 🧊 SOFT CUT MASK (FEATHERED) */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  WebkitMaskImage: `
        linear-gradient(black, black),
        radial-gradient(circle 22px at top right, transparent 92%, black 100%),
        radial-gradient(circle 22px at bottom left, transparent 92%, black 100%)
      `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",

                  /* 🔥 THIS FIXES SHARPNESS */
                  filter: "blur(0.6px)",
                }}
              ></div>
              {/* BORDER */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl 
  before:content-[''] before:absolute before:inset-0 before:rounded-3xl brightness-200
  before:border-1 before:border-white/80"
                style={{
                  WebkitMaskImage: `
  linear-gradient(black, black),
  radial-gradient(circle 24px at top right,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ),
  radial-gradient(circle 24px at bottom left,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ) `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                }}
              ></div>

              {/* 💧 INNER GLASS REFLECTION */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  padding: "1.5px",

                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",

                  backdropFilter: "blur(14px) brightness(1.25)",
                  WebkitBackdropFilter: "blur(14px) brightness(1.25)",
                }}
              ></div>

              {/* ✨ EDGE LIGHT (soft, not sharp) */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: `
        inset 0 1px 2px rgba(255,255,255,0.5),
        inset 0 -1px 2px rgba(255,255,255,0.12)
      `,
                  filter: "blur(0.3px)",
                }}
              ></div>
            </div>

            {/* SHADOW */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: `
        0 20px 40px rgba(0,0,0,0.25),
        0 5px 15px rgba(0,0,0,0.15)
      `,
              }}
            ></div>
            {/* CONTENT (NO FILTER!) */}
            <div className="relative z-10 p-6 space-y-4 text-white overflow-hidden">
              <h2 className="text-xl font-semibold">Liquid Glass</h2>

              <p className="text-sm text-white/80">
                Real glass with proper reflection, distortion and adaptive
                shadow.
              </p>

              <button className="mt-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition">
                Action
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute hidden rounded-3xl top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-br from-white/10 via-white/5 to-white-20">
        {/* shadow */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            top: "-6px",
            left: "-16px",
            right: "-16px",
            bottom: "-16px",
            transform: "scale(1.05)",
            opacity: 0.09,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px) brightness(1)",
            WebkitBackdropFilter: "blur(12px) brightness(1)",
            filter: "blur(9px)",
            zIndex: 0,
          }}
        />

        {/* liquid glass */}
        <div className="relative w-120 h-55 rounded-3xl overflow-hidden">
          {/* GLASS CONTAINER */}
          <div className="absolute inset-0 rounded-3xl z-10">
            {/* BACKGROUND DISTORTION ONLY */}
            <div
              className="absolute inset-0 bg-white/20 backdrop-blur-[6px]"
              style={{
                filter: "url(#bg-1)",
                left: "-50%",
                top: "-50%",
                width: "300%",
                height: "300%",
              }}
            ></div>

            {/* BACKGROUND REFLECTION LAYER */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(2px) brightness(1.1)",
                WebkitBackdropFilter: "blur(2px) brightness(1.2)",
                zIndex: 0,
              }}
            />

            {/*  LIGHT / GLASS LOOK */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[6px]"></div>

            {/* GLASS EDGE (REAL REFRACTION) */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              {/* SOFT CUT MASK (FEATHERED) */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  WebkitMaskImage: `
        linear-gradient(black, black),
        radial-gradient(circle 22px at top right, transparent 92%, black 100%),
        radial-gradient(circle 22px at bottom left, transparent 92%, black 100%)
      `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  filter: "blur(0.6px)",
                }}
              ></div>

              {/* BORDER */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl 
  before:content-[''] before:absolute before:inset-0 before:rounded-3xl brightness-200
  before:border-1 before:border-white/80"
                style={{
                  WebkitMaskImage: `
  linear-gradient(black, black),

  radial-gradient(circle 24px at top right,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ),

  radial-gradient(circle 24px at bottom left,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ) `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                }}
              ></div>

              {/* INNER GLASS REFLECTION */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  padding: "1.5px",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              ></div>
            </div>

            {/* CONTENT (NO FILTER!) */}
            <div className="relative z-10 p-6 space-y-4 text-white overflow-hidden">
              <h2 className="text-xl font-semibold">Liquid Glass</h2>

              <p className="text-sm text-white/80">
                Real glass with proper reflection, distortion and adaptive
                shadow.
              </p>

              {/* button */}
              <div
                className="mt-2 w-fit px-4 py-2 relative rounded-full bg-black/25 backdrop-blur-[12px]
                hover:bg-black/30 transition text-lime-300 overflow-hidden
                "
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-full 
  before:content-[''] before:absolute before:inset-0 before:rounded-full brightness-200
  before:border-1 before:border-white/60"
                  style={{
                    WebkitMaskImage: `
  linear-gradient(black, black),

  radial-gradient(circle 22px at top right,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ),

  radial-gradient(circle 22px at bottom left,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ) `,
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  }}
                ></div>
                Business
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute hidden rounded-3xl top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-br from-white/10 via-white/5 to-white-20">
        {/* shadow */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            top: "-6px",
            left: "-16px",
            right: "-16px",
            bottom: "-16px",
            transform: "scale(1.05)",
            opacity: 0.09,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px) brightness(1)",
            WebkitBackdropFilter: "blur(12px) brightness(1)",
            filter: "blur(9px)",
            zIndex: 0,
          }}
        />

        {/* liquid glass */}
        <div className="relative w-120 h-55 rounded-3xl overflow-hidden">
          {/* GLASS CONTAINER */}
          <div className="absolute inset-0 rounded-3xl z-10">
            {/* BACKGROUND DISTORTION ONLY */}
            <div
              className="absolute inset-0 bg-white/20 backdrop-blur-[6px]"
              style={{
                filter: "url(#bg-1)",
                left: "-50%",
                top: "-50%",
                width: "300%",
                height: "300%",
              }}
            ></div>

            {/* BACKGROUND REFLECTION LAYER */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(2px) brightness(1.1)",
                WebkitBackdropFilter: "blur(2px) brightness(1.2)",
                zIndex: 0,
              }}
            />

            {/*  LIGHT / GLASS LOOK */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[6px]"></div>

            {/* GLASS EDGE (REAL REFRACTION) */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              {/* SOFT CUT MASK (FEATHERED) */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  WebkitMaskImage: `
        linear-gradient(black, black),
        radial-gradient(circle 22px at top right, transparent 92%, black 100%),
        radial-gradient(circle 22px at bottom left, transparent 92%, black 100%)
      `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  filter: "blur(0.6px)",
                }}
              ></div>

              {/* BORDER */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl 
  before:content-[''] before:absolute before:inset-0 before:rounded-3xl brightness-200
  before:border-1 before:border-white/80"
                style={{
                  WebkitMaskImage: `
  linear-gradient(black, black),
  radial-gradient(circle 24px at top right,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ),
  radial-gradient(circle 24px at bottom left,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ) `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                }}
              ></div>

              {/* INNER GLASS REFLECTION */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  padding: "1.5px",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              ></div>
            </div>

            {/* CONTENT (NO FILTER!) */}
            <div className="relative z-10 p-6 space-y-4 text-white overflow-hidden">
              <h2 className="text-xl font-semibold">Liquid Glass</h2>

              <p className="text-sm text-white/80">
                Real glass with proper reflection, distortion and adaptive
                shadow.
              </p>

              {/* button */}
              <div
                className="mt-2 w-fit px-4 py-2 relative rounded-full bg-black/30 backdrop-blur-[12px]
                hover:bg-black/30 transition text-lime-300 overflow-hidden
                "
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-full 
  before:content-[''] before:absolute before:inset-0 before:rounded-full brightness-200
  before:border-1 before:border-white/60"
                  style={{
                    WebkitMaskImage: `
  linear-gradient(black, black),

  radial-gradient(circle 22px at top right,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ),

  radial-gradient(circle 22px at bottom left,
    transparent 0%,
    rgba(0,0,0,0.08) 42%,
    rgba(0,0,0,0.22) 58%,
    rgba(0,0,0,0.48) 76%,
    black 100%
  ) `,
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  }}
                ></div>
                Business
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* final code */}
      <div className="absolute rounded-3xl top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* "Elastic" distortion Definition */}
        <svg className="absolute w-0 h-0">
          <filter id="liquid-refraction">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="monoNoise"
              scale="-37"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        {/* Adaptive Shadow Layer */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            inset: "-16px",
            transform: "scale(1.05)",
            opacity: 0.15,
            background: "rgba(255,255,255,0.3)",
            backdropFilter: "blur(15px)",
            filter: "blur(10px)",
            zIndex: 0,
          }}
        />

        {/* Main Glass Container */}
        <div className="relative w-120 h-55 rounded-3xl overflow-hidden shadow-2xl">
          {/* CORRECT FILTER PLACEMENT: Only for Background Distraction */}
          {/* <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: "blur(6px) saturate(1.2) url(#liquid-refraction)",
              WebkitBackdropFilter:
                "blur(6px) saturate(1.2) url(#liquid-refraction)",
              background: "rgba(255, 255, 255, 0.3)",
              transform: "scale(1.1)",
            }}
          /> */}

          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(6px) saturate(1.2)",
              WebkitBackdropFilter: "blur(6px) saturate(1.2)",
              background: "rgba(255,255,255,0.28)",
            }}
          />

          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              backdropFilter: "url(#liquid-refraction)",
              WebkitBackdropFilter: "url(#liquid-refraction)",
              opacity: 0.45,
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          />

          {/* BORDER (No changes) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl z-10
      before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
      before:border-[1.5px] before:border-white/40"
            style={{
              WebkitMaskImage: `
          linear-gradient(black, black),
          radial-gradient(circle 24px at top right, transparent 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.48) 76%, black 100%),
          radial-gradient(circle 24px at bottom left, transparent 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.48) 76%, black 100%)
        `,
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            }}
          ></div>

          {/* LIGHT LEAK (No changes) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40 z-20 pointer-events-none" />

          {/* CONTENT (Sharp - No Filter) */}
          <div className="relative z-30 p-6 space-y-4 text-white overflow-hidden">
            <h2 className="text-xl font-semibold">Liquid Glass</h2>
            <p className="text-sm text-white/80">
              Real glass with proper reflection, distortion and adaptive shadow.
            </p>

            {/* Button (No changes) */}
            <div className="mt-2 w-fit px-4 py-2 relative rounded-full bg-black/40 backdrop-blur-[12px] hover:bg-black/30 transition text-lime-300 overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 rounded-full 
          before:content-[''] before:absolute before:inset-0 before:rounded-full brightness-200
          before:border-1 before:border-white/60"
                style={{
                  WebkitMaskImage: `
              linear-gradient(
    to bottom,
    #7A7A7A 30%,
    #F2F2F2 100%
  ),

  radial-gradient(
    circle 22px at top right,
    transparent 0%,
    rgba(122,122,122,0.08) 42%,
    rgba(122,122,122,0.22) 58%,
    rgba(122,122,122,0.48) 76%,
    #7A7A7A 100%
  ),

  radial-gradient(
    circle 22px at bottom left,
    transparent 0%,
    rgba(242,242,242,0.08) 42%,
    rgba(242,242,242,0.22) 58%,
    rgba(242,242,242,0.48) 76%,
    #F2F2F2 100%
  )
            `,
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                }}
              ></div>
              Business
            </div>
          </div>
        </div>
      </div>

      {/* liquid glass effect */}

      <div className="navber-tab-mobile">
        <div className="absolute top-0 z-50 md:px-12 py-7 px-8 ">
          <Link href="/" className="text-4xl text-white font-extrabold">
            Coin Barter
          </Link>
        </div>
      </div>

      <div className="navber-tab-mobile">
        {/* Floating Menu Button */}
        {!open && (
          <button
            onPointerUp={() => setOpen(true)}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2  bg-black/50 backdrop-blur-md text-white rounded-full flex items-center gap-2 shadow-xl border border-white/20 z-50 ${
              hideNavbar ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            Menu <Menu className="text-[#D3ED05]" size={22} />
          </button>
        )}

        {/* Fullscreen Mobile Nav */}
        {open && (
          <div className="fixed inset-0 bg-[#D3ED05] z-50 py-10 px-4 overflow-y-auto ">
            <div ref={panelRef} className="space-y-6 relative nav-heght">
              {/* Close Button */}
              {/* <button onPointerUp={() => { setOpen(false); setActiveMenu(null); }} className="absolute cursor-pointer right-0 top-0 p-2"
                            >
                                <X className="text-black" size={25} />
                            </button> */}

              {/* Nav Items */}
              <div className="pt-0 menu-height pb-5">
                {navItems.map((nav) => (
                  <div key={nav.name}>
                    {/* Main Item */}
                    <button
                      onPointerUp={() =>
                        setActiveMenu(activeMenu === nav.name ? null : nav.name)
                      }
                      className={`w-full flex items-center gap-4 px-2 pt-2 pb-4 rounded-xl  transition ${
                        activeMenu === nav.name
                          ? "bg-[#EAFF43]"
                          : "bg-transparent"
                      }`}
                    >
                      <Image
                        src={nav.image}
                        width={50}
                        height={50}
                        alt={nav.name}
                        className="rounded-lg"
                      />
                      <span className="text-lg font-semibold">{nav.name}</span>

                      {/* <ChevronDown
                                                className={`ml-auto transition duration-300 ${
                                                    activeMenu === nav.name ? "rotate-180" : ""
                                                }`}
                                            /> */}
                    </button>

                    {/* Submenu */}
                    {activeMenu === nav.name && (
                      <button className=" bg-[#F0FF78] sub-menu-bg p-4 space-y-4 w-full">
                        {nav.items.map((item) => (
                          <div
                            key={item.title}
                            className="nav-list-style relative pl-16 cursor-pointer"
                            onClick={() => setSelected(item.title)}
                          >
                            <p className="text-[#6F6F6F] hover:text-[#000] font-semibold text-start">
                              {item.title}
                            </p>
                          </div>
                        ))}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Language Section */}
              <div className="pt-3 border-t border-[#EBFF49]">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-4 p-4 text-xl font-semibold"
                >
                  <img
                    className="w-6"
                    src="../assets/hero_banner/mobile-lan.svg"
                    alt=""
                  />
                  Language
                  {/* <ChevronDown className={`ml-auto transition ${  langOpen ? "rotate-180" : "" }`} /> */}
                </button>

                {langOpen && (
                  <div className="ml-14 mt-1 space-y-2">
                    {languages.map((lang) => (
                      <p
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang);
                          setLangOpen(false);
                        }}
                        className={`cursor-pointer text-lg ${
                          selectedLang.code === lang.code
                            ? "underline font-semibold"
                            : ""
                        }`}
                      >
                        {lang.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/*  Floating Selected Chip*/}
              {!activeMenu && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
                  <div className="bg-[#EAFF43] rounded-full px-6 py-3 shadow-xl flex justify-center items-center gap-3 w-[150px]">
                    <span className="text-[#667300] font-semibold">Menu</span>
                    <button
                      onPointerUp={() => {
                        setOpen(false);
                        setActiveMenu(null);
                      }}
                      className="text-[#667300]"
                    >
                      <CircleX size={22} />
                    </button>
                  </div>
                </div>
              )}
              {activeMenu && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
                  <div className="bg-[#EAFF43] rounded-full px-6 py-3 shadow-xl flex justify-center items-center gap-3 w-[150px]">
                    <span className="text-[#667300] font-semibold">
                      {activeMenu}
                    </span>
                    <button
                      onPointerUp={() => setActiveMenu(null)}
                      className="text-[#667300]"
                    >
                      <CircleX size={22} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav_Component;
