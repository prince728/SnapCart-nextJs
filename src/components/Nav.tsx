
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ShoppingCart,
  User,
  Package,
  LogOut,
  Search,
  X,
} from "lucide-react";

interface NavProps {
  user: {
    name?: string | null;
    image?: string | null;
    role?: string;
  };
  cartCount?: number;
}

const Nav = ({ user, cartCount = 0 }: NavProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchbarOpen, setSearchbarOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const searchbarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Search handler
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`);

      setSearch("");
      setSearchbarOpen(false);
    }
  };

  // Close mobile search
  const closeSearch = () => {
    setSearchbarOpen(false);
  };

  return (
    <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 z-50">

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-16 px-4 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
        >
          SnapCart
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md"
        >
          <Search className="w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none px-3 text-sm text-gray-700 bg-transparent"
          />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchbarOpen((prev) => !prev)}
            aria-label={searchbarOpen ? "Close search" : "Open search"}
            aria-expanded={searchbarOpen}
            className="md:hidden bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          >
            {searchbarOpen ? (
              <X className="text-green-600 w-5 h-5" />
            ) : (
              <Search className="text-green-600 w-5 h-5" />
            )}
          </button>

          {/* Shopping Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative bg-white flex items-center justify-center shadow-md hover:scale-105 transition rounded-full w-11 h-11"
          >
            <ShoppingCart className="text-green-600 w-6 h-6" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-5 h-5 px-1 flex items-center justify-center rounded-full font-semibold shadow">
              {cartCount}
            </span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Open profile menu"
              aria-expanded={open}
              className="relative bg-white w-11 h-11 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform overflow-hidden"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt="User"
                  fill
                  sizes="44px"
                  className="object-cover rounded-full"
                />
              ) : (
                <User className="text-green-600 w-6 h-6" />
              )}
            </button>

            {/* Profile Dropdown Animation */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-[99]"
                >

                  {/* User Details */}
                  <div className="flex items-center gap-3 px-3 py-3 border-b border-gray-100">

                    <div className="w-10 h-10 relative rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt="User"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <User className="text-green-600 w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="text-gray-800 font-semibold truncate">
                        {user.name || "User"}
                      </div>

                      <div className="text-xs text-gray-500 capitalize">
                        {user.role || "Customer"}
                      </div>
                    </div>

                  </div>

                  {/* My Orders */}
                  <Link
                    href="/orders"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium transition"
                  >
                    <Package className="w-5 h-5 text-green-600" />
                    My Orders
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium transition"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    Log Out
                  </button>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchbarOpen && (
          <motion.div
            ref={searchbarRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full mt-3 left-0 w-full bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-2"
          >
            <Search className="text-gray-500 w-5 h-5 mr-2 shrink-0" />

            <form onSubmit={handleSearch} className="flex-1">
              <input
                type="text"
                placeholder="Search groceries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-gray-700 text-sm bg-transparent py-1"
                autoFocus
              />
            </form>

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="ml-2 hover:bg-gray-100 rounded-full p-1 transition"
            >
              <X className="text-gray-500 w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Nav;
