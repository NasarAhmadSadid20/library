import { BookMarked, Pencil, Plus, Trash2 } from "lucide-react";

function BooksTable({ books, isLoading, editBook, requestDelete, openAddForm, showAddButton = true, title, description }) {
    return (
        <section id="books" className="overflow-hidden rounded-lg border border-[#e7e1d7] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
                <div className="flex items-center gap-2.5">
                    <BookMarked size={20} className="text-[#df8124]" />
                    <div>
                        <h2 className="text-sm font-extrabold text-[#302d29]">{title}</h2>
                        {description && <p className="mt-1 text-[11px] text-[#817b73]">{description}</p>}
                    </div>
                </div>
                {showAddButton && (
                    <button type="button" onClick={openAddForm} className="flex items-center gap-2 rounded-md bg-[#e98a2b] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#d7791d] focus:outline-none focus:ring-3 focus:ring-[#e98a2b]/20">
                        <Plus size={16} /> افزودن کتاب
                    </button>
                )}
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-170 border-collapse text-right">
                    <thead className="border-b border-[#c8c2b8] bg-[#f7f6f3] text-xs font-bold text-[#5d5851]">
                        <tr>
                            <th className="px-4 py-3.5 font-bold sm:px-5">شماره</th>
                            <th className="px-4 py-3.5 font-bold">عنوان کتاب</th>
                            <th className="px-4 py-3.5 font-bold">نویسنده</th>
                            <th className="px-4 py-3.5 font-bold">دسته‌بندی</th>
                            <th className="px-4 py-3.5 font-bold">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d6d0c6] text-sm">
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-12 text-center text-sm text-[#817b73]">در حال دریافت فهرست کتاب‌ها…</td>
                            </tr>
                        ) : books.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-12 text-center text-sm text-[#817b73]">هنوز کتابی ثبت نشده است.</td>
                            </tr>
                        ) : books.map((book, index) => (
                            <tr key={book.id} className="transition hover:bg-[#fdfbf8]">
                                <td className="px-4 py-4 text-xs text-[#817b73] sm:px-5">{index + 1}</td>
                                <td className="max-w-64 truncate px-4 py-4 font-bold text-[#39352f]" title={book.title || ""}>{book.title || "—"}</td>
                                <td className="px-4 py-4 text-[#716c64]">{book.author || "—"}</td>
                                <td className="px-4 py-4">
                                    <span className="rounded-md bg-[#fff1df] px-2.5 py-1 text-[11px] font-semibold text-[#bd6b1b]">{book.category || "—"}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3 px-1">
                                        <button type="button" onClick={() => editBook(book)} title="ویرایش کتاب" aria-label={`ویرایش ${book.title || "بدون عنوان"}`} className="flex size-8 items-center justify-center rounded-md bg-[#fff1df] text-[#c8751f] transition hover:bg-[#ffe6c6]">
                                            <Pencil size={15} />
                                        </button>
                                        <button type="button" onClick={() => requestDelete(book)} title="حذف کتاب" aria-label={`حذف ${book.title || "بدون عنوان"}`} className="flex size-8 items-center justify-center rounded-md bg-[#fff0ef] text-[#d64d50] transition hover:bg-[#ffe0df]">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="divide-y divide-[#eeeae4] md:hidden">
                {isLoading ? (
                    <p className="px-4 py-10 text-center text-sm text-[#817b73]">در حال دریافت فهرست کتاب‌ها…</p>
                ) : books.length === 0 ? (
                    <p className="px-4 py-10 text-center text-sm text-[#817b73]">هنوز کتابی ثبت نشده است.</p>
                ) : books.map((book, index) => (
                    <article key={book.id} className="space-y-3 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-[11px] text-[#817b73]">کتاب {index + 1}</p>
                                <h3 className="mt-1 break-words text-sm font-bold text-[#39352f]">{book.title || "بدون عنوان"}</h3>
                            </div>
                            <span className="shrink-0 rounded-md bg-[#fff1df] px-2.5 py-1 text-[11px] font-semibold text-[#bd6b1b]">{book.category || "—"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <p className="min-w-0 truncate text-xs text-[#716c64]">نویسنده: {book.author || "—"}</p>
                            <div className="flex shrink-0 items-center gap-2">
                                <button type="button" onClick={() => editBook(book)} title="ویرایش کتاب" aria-label={`ویرایش ${book.title || "بدون عنوان"}`} className="flex size-9 items-center justify-center rounded-md bg-[#fff1df] text-[#c8751f] transition hover:bg-[#ffe6c6]">
                                    <Pencil size={15} />
                                </button>
                                <button type="button" onClick={() => requestDelete(book)} title="حذف کتاب" aria-label={`حذف ${book.title || "بدون عنوان"}`} className="flex size-9 items-center justify-center rounded-md bg-[#fff0ef] text-[#d64d50] transition hover:bg-[#ffe0df]">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default BooksTable;