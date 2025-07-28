"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import config from "@/config";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-red-900 border-b border-red-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Admin Brand */}
          <div className="flex items-center">
            <Link
              href="/admin"
              className="text-2xl font-bold text-white hover:text-red-200 transition-colors"
            >
              🛡️ {config.appName} Admin
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/admin"
              className="text-red-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="text-red-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Users
            </Link>
            <Link
              href="/admin/analytics"
              className="text-red-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/admin/beta"
              className="text-red-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Beta Management
            </Link>
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-sm rounded-full text-white hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-red-900 transition-colors"
              >
                <span className="sr-only">Open admin menu</span>
                {session?.user?.image ? (
                  <img
                    className="h-8 w-8 rounded-full border-2 border-red-300"
                    src={session.user.image}
                    alt={session.user.name || "Admin"}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-red-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-red-900">
                      {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "A"}
                    </span>
                  </div>
                )}
                <span className="ml-2 hidden md:block">{session?.user?.name || "Admin"}</span>
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-red-800 rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-red-200 hover:bg-red-700 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Back to User Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-red-200 hover:bg-red-700 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Back to Homepage
                  </Link>
                  <div className="border-t border-red-700 my-1"></div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-200 hover:bg-red-700 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/admin"
            className="text-red-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="text-red-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Users
          </Link>
          <Link
            href="/admin/analytics"
            className="text-red-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/admin/beta"
            className="text-red-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Beta Management
          </Link>
        </div>
      </div>
    </nav>
  );
}
