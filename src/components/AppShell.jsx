import { BookOpen, LayoutDashboard, LibraryBig, Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

function AppShell({ children, onAddBook }) {
    const location = useLocation();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${isActive
            ? "bg-[#e98a2b] font-bold text-white"
            : "font-medium text-[#dedad3] hover:bg-white/10 hover:text-white"}`;

    return (
        <div dir="rtl" className="min-h-screen bg-[#f5f4f1] font-sans text-[#302d29]">
            <aside className="fixed inset-y-0 right-0 z-30 hidden w-[250px] flex-col bg-[#34312d] px-5 py-6 text-white xl:flex">
                <NavLink to="/" className="mb-12 flex items-center gap-3 px-2 text-white no-underline">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-[#e98a2b]"><LibraryBig size={27} strokeWidth={1.7} />
                    </span>
                    <span className="text-lg font-extrabold">کتابخانه رسا</span>
                </NavLink>
                <nav className="space-y-2">
                    <NavLink to="/" end className={linkClass}>
                        <LayoutDashboard size={18} /> داشبورد
                    </NavLink>
                    <NavLink to="/books" className={linkClass}>
                        <BookOpen size={18} /> کتاب‌ها
                    </NavLink>
                </nav>
            </aside>

            <div className="min-h-screen xl:pr-[250px]">
                <header className="border-b border-[#e7e3dc] bg-white px-4 py-3.5 sm:px-7">
                    <div className="text-center text-sm font-bold text-[#101010] sm:text-xl">سیستم مدیریت کتابخانه رصـا</div>
                </header>

                <nav className={`grid ${location.pathname === "/books" ? "grid-cols-2" : "grid-cols-3"} gap-2 border-b border-[#e7e3dc] bg-white px-4 py-2 xl:hidden`}>
                    <NavLink to="/" end className={({ isActive }) => `flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs transition ${isActive ? "bg-[#fff1e2] font-bold text-[#bf6b17]" : "font-semibold text-[#716c64] hover:bg-[#f6f4f0]"}`}>
                        <LayoutDashboard size={15} /> داشبورد
                    </NavLink>
                    <NavLink to="/books" className={({ isActive }) => `flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs transition ${isActive ? "bg-[#fff1e2] font-bold text-[#bf6b17]" : "font-semibold text-[#716c64] hover:bg-[#f6f4f0]"}`}>
                        <BookOpen size={15} /> کتاب‌ها
                    </NavLink>
                    {location.pathname !== "/books" && (
                        <button type="button" onClick={onAddBook} className="flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-[#716c64] hover:bg-[#f6f4f0]">
                            <Plus size={15} /> افزودن
                        </button>
                    )}
                </nav>

                <main id="dashboard" className="mx-auto max-w-7xl px-4 py-6 sm:px-7 sm:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppShell;