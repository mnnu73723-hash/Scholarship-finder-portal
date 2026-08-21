"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Home,
  LayoutDashboard,
  Award,
  ShieldCheck,
  Info,
  Mail,
  LogIn,
  UserPlus,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Logout failed.");
        setLoading(false);
        return;
      }

      setIsOpen(false);
      window.location.href = "/pages/login";
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Unable to logout. Please try again.");
      setLoading(false);
    }
  };

  // =========================
  // CLOSE MENU
  // =========================

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full max-w-full overflow-x-hidden border-b border-slate-800/80 bg-slate-950/95 shadow-xl shadow-black/10 backdrop-blur-xl">

      {/* ========================= */}
      {/* FULL WIDTH CONTAINER */}
      {/* ========================= */}

      <div className="w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="flex h-[76px] w-full min-w-0 items-center gap-4">

          {/* ========================= */}
          {/* LOGO */}
          {/* ========================= */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500 group-hover:shadow-blue-500/40">

              <GraduationCap
                className="h-6 w-6 text-white"
                strokeWidth={2.3}
              />

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />

            </div>

            <div className="hidden min-w-0 sm:block">
              <h1 className="whitespace-nowrap text-xl font-extrabold tracking-tight text-white">
                Scholar<span className="text-blue-500">Find</span>
              </h1>

              <p className="whitespace-nowrap text-[10px] font-medium tracking-wide text-slate-500">
                SCHOLARSHIP DISCOVERY PORTAL
              </p>
            </div>
          </Link>

          {/* ========================= */}
          {/* DESKTOP MENU */}
          {/* ========================= */}

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">

            <NavItem
              href="/"
              icon={<Home className="h-4 w-4" />}
              label="Home"
            />

            <NavItem
              href="/pages/dashboard"
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Dashboard"
            />

            <NavItem
              href="/pages/scholarships"
              icon={<Award className="h-4 w-4" />}
              label="Scholarships"
            />

            <NavItem
              href="/pages/eligibility"
              icon={<ShieldCheck className="h-4 w-4" />}
              label="Eligibility"
            />

            <NavItem
              href="/about"
              icon={<Info className="h-4 w-4" />}
              label="About"
            />

            <NavItem
              href="/contact"
              icon={<Mail className="h-4 w-4" />}
              label="Contact"
            />

          </div>

          {/* ========================= */}
          {/* DESKTOP ACTIONS */}
          {/* ========================= */}

          <div className="hidden shrink-0 items-center gap-2 xl:flex">

            {/* LOGIN */}

            <Link
              href="/pages/login"
              className="group flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
            >
              <LogIn className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />

              Login
            </Link>

            {/* REGISTER */}

            <Link
              href="/pages/register"
              className="group flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              <UserPlus className="h-4 w-4 shrink-0" />

              Register

              <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="group flex shrink-0 items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />

              {loading ? "Logging out..." : "Logout"}
            </button>

          </div>

          {/* ========================= */}
          {/* TABLET / MOBILE BUTTON */}
          {/* ========================= */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>

        {/* ========================= */}
        {/* MOBILE MENU */}
        {/* ========================= */}

        {isOpen && (
          <div className="border-t border-slate-800 py-4 xl:hidden">

            <div className="space-y-1">

              <MobileNavItem
                href="/"
                icon={<Home className="h-5 w-5" />}
                label="Home"
                onClick={closeMenu}
              />

              <MobileNavItem
                href="/pages/dashboard"
                icon={<LayoutDashboard className="h-5 w-5" />}
                label="Dashboard"
                onClick={closeMenu}
              />

              <MobileNavItem
                href="/pages/scholarships"
                icon={<Award className="h-5 w-5" />}
                label="Scholarships"
                onClick={closeMenu}
              />

              <MobileNavItem
                href="/pages/eligibility"
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Eligibility"
                onClick={closeMenu}
              />

              <MobileNavItem
                href="/about"
                icon={<Info className="h-5 w-5" />}
                label="About"
                onClick={closeMenu}
              />

              <MobileNavItem
                href="/contact"
                icon={<Mail className="h-5 w-5" />}
                label="Contact"
                onClick={closeMenu}
              />

            </div>

            {/* ========================= */}
            {/* MOBILE ACTIONS */}
            {/* ========================= */}

            <div className="mt-4 grid gap-2 border-t border-slate-800 pt-4">

              {/* LOGIN */}

              <Link
                href="/pages/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <LogIn className="h-4 w-4" />

                Login
              </Link>

              {/* REGISTER */}

              <Link
                href="/pages/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <UserPlus className="h-4 w-4" />

                Create Account
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />

                {loading ? "Logging out..." : "Logout"}
              </button>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

/* ========================================================= */
/* DESKTOP NAV ITEM */
/* ========================================================= */

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-900 hover:text-white 2xl:px-3"
    >
      <span className="text-slate-500 transition-colors group-hover:text-blue-400">
        {icon}
      </span>

      <span className="whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}

/* ========================================================= */
/* MOBILE NAV ITEM */
/* ========================================================= */

function MobileNavItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-800 hover:bg-slate-900 hover:text-white"
    >
      <span className="flex items-center gap-3">
        <span className="text-slate-500 transition-colors group-hover:text-blue-400">
          {icon}
        </span>

        {label}
      </span>

      <ChevronRight className="h-4 w-4 text-slate-700 transition-all group-hover:translate-x-1 group-hover:text-blue-400" />
    </Link>
  );
}


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import {
//   Menu,
//   X,
//   GraduationCap,
//   Home,
//   LayoutDashboard,
//   Award,
//   ShieldCheck,
//   Info,
//   Mail,
//   LogIn,
//   UserPlus,
//   LogOut,
//   ChevronRight,
// } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     if (loading) return;

//     try {
//       setLoading(true);

//       const res = await fetch("/api/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || "Logout failed.");
//         setLoading(false);
//         return;
//       }

//       setIsOpen(false);
//       window.location.href = "/pages/login";
//     } catch (error) {
//       console.error("Logout Error:", error);
//       alert("Unable to logout. Please try again.");
//       setLoading(false);
//     }
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   return (
//     <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 shadow-xl shadow-black/10 backdrop-blur-xl">

//      <div className="w-full px-5 sm:px-8 lg:px-10 xl:px-14">

//         {/* ================= HEADER ================= */}

//         <div className="flex h-[76px] w-full items-center gap-6">
//           {/* ================= LOGO ================= */}

//           <Link
//             href="/"
//             onClick={closeMenu}
//             className="group flex items-center gap-3"
//           >
//             <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500 group-hover:shadow-blue-500/40">

//               <GraduationCap
//                 className="h-6 w-6 text-white"
//                 strokeWidth={2.3}
//               />

//               <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
//             </div>

//             <div className="hidden sm:block">
//               <h1 className="text-xl font-extrabold tracking-tight text-white">
//                 Scholar<span className="text-blue-500">Find</span>
//               </h1>

//               <p className="text-[10px] font-medium tracking-wide text-slate-500">
//                 SCHOLARSHIP DISCOVERY PORTAL
//               </p>
//             </div>
//           </Link>

//           {/* ================= DESKTOP MENU ================= */}

//        <div className="group flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-900 hover:text-white">

//             <NavItem
//               href="/"
//               icon={<Home className="h-4 w-4" />}
//               label="Home"
//             />

//             <NavItem
//               href="/pages/dashboard"
//               icon={<LayoutDashboard className="h-4 w-4" />}
//               label="Dashboard"
//             />

//             <NavItem
//               href="/pages/scholarships"
//               icon={<Award className="h-4 w-4" />}
//               label="Scholarships"
//             />

//             <NavItem
//               href="/pages/eligibility"
//               icon={<ShieldCheck className="h-4 w-4" />}
//               label="Eligibility"
//             />

//             <NavItem
//               href="/about"
//               icon={<Info className="h-4 w-4" />}
//               label="About"
//             />

//             <NavItem
//               href="/contact"
//               icon={<Mail className="h-4 w-4" />}
//               label="Contact"
//             />

//           </div>

//           {/* ================= DESKTOP ACTIONS ================= */}

//           <div className="hidden items-center gap-2 lg:flex">

//             {/* LOGIN */}

//             <Link
//               href="/pages/login"
//               className="group flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
//             >
//               <LogIn className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />

//               Login
//             </Link>

//             {/* REGISTER */}

//             <Link
//               href="/pages/register"
//               className="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30"
//             >
//               <UserPlus className="h-4 w-4" />

//               Register

//               <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
//             </Link>

//             {/* LOGOUT */}

//             <button
//               type="button"
//               onClick={handleLogout}
//               disabled={loading}
//               className="group flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />

//               {loading ? "Logging out..." : "Logout"}
//             </button>

//           </div>

//           {/* ================= MOBILE BUTTON ================= */}

//           <button
//             type="button"
//             onClick={() => setIsOpen(!isOpen)}
//             className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white lg:hidden"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>

//         </div>

//         {/* ================= MOBILE MENU ================= */}

//         {isOpen && (
//           <div className="border-t border-slate-800 py-4 lg:hidden">

//             <div className="space-y-1">

//               <MobileNavItem
//                 href="/"
//                 icon={<Home className="h-5 w-5" />}
//                 label="Home"
//                 onClick={closeMenu}
//               />

//               <MobileNavItem
//                 href="/pages/dashboard"
//                 icon={<LayoutDashboard className="h-5 w-5" />}
//                 label="Dashboard"
//                 onClick={closeMenu}
//               />

//               <MobileNavItem
//                 href="/pages/scholarships"
//                 icon={<Award className="h-5 w-5" />}
//                 label="Scholarships"
//                 onClick={closeMenu}
//               />

//               <MobileNavItem
//                 href="/pages/eligibility"
//                 icon={<ShieldCheck className="h-5 w-5" />}
//                 label="Eligibility"
//                 onClick={closeMenu}
//               />

//               <MobileNavItem
//                 href="/about"
//                 icon={<Info className="h-5 w-5" />}
//                 label="About"
//                 onClick={closeMenu}
//               />

//               <MobileNavItem
//                 href="/contact"
//                 icon={<Mail className="h-5 w-5" />}
//                 label="Contact"
//                 onClick={closeMenu}
//               />

//             </div>

//             {/* MOBILE ACTIONS */}

//             <div className="mt-4 grid gap-2 border-t border-slate-800 pt-4">

//               <Link
//                 href="/pages/login"
//                 onClick={closeMenu}
//                 className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
//               >
//                 <LogIn className="h-4 w-4" />

//                 Login
//               </Link>

//               <Link
//                 href="/pages/register"
//                 onClick={closeMenu}
//                 className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
//               >
//                 <UserPlus className="h-4 w-4" />

//                 Create Account
//               </Link>

//               <button
//                 type="button"
//                 onClick={handleLogout}
//                 disabled={loading}
//                 className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
//               >
//                 <LogOut className="h-4 w-4" />

//                 {loading ? "Logging out..." : "Logout"}
//               </button>

//             </div>

//           </div>
//         )}

//       </div>
//     </nav>
//   );
// }


// /* ========================================================= */
// /* DESKTOP NAV ITEM */
// /* ========================================================= */

// function NavItem({
//   href,
//   icon,
//   label,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-900 hover:text-white"
//     >
//       <span className="text-slate-500 transition-colors group-hover:text-blue-400">
//         {icon}
//       </span>

//       {label}
//     </Link>
//   );
// }


// /* ========================================================= */
// /* MOBILE NAV ITEM */
// /* ========================================================= */

// function MobileNavItem({
//   href,
//   icon,
//   label,
//   onClick,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   onClick: () => void;
// }) {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className="group flex items-center justify-between rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-800 hover:bg-slate-900 hover:text-white"
//     >
//       <span className="flex items-center gap-3">
//         <span className="text-slate-500 transition-colors group-hover:text-blue-400">
//           {icon}
//         </span>

//         {label}
//       </span>

//       <ChevronRight className="h-4 w-4 text-slate-700 transition-all group-hover:translate-x-1 group-hover:text-blue-400" />
//     </Link>
//   );
// }