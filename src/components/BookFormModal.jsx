import { Check, Plus, X } from "lucide-react";

function BookFormModal({ title, author, category, categories, editId, setTitle, setAuthor, setCategory, onClose, onSubmit, isSubmitting }) {
    return (
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-[#302d29]/45 p-3 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="book-form-title" className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-lg border border-[#e7e1d7] bg-white p-4 shadow-[0_20px_70px_rgba(48,45,41,0.18)] sm:max-h-[calc(100dvh-2rem)] sm:p-6">
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                
                        <div>
                            <h2 id="book-form-title" className="text-base font-extrabold text-[#302d29]">{editId !== null ? "ویرایش کتاب" : "افزودن کتاب تازه"}</h2>
                            <p className="mt-1 text-xs text-[#817b73]">مشخصات کتاب را وارد کنید.</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="بستن" className="flex size-8 items-center justify-center rounded-md text-[#817b73] transition hover:bg-[#f4f2ed] disabled:opacity-50">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="book-title" className="mb-1.5 block text-xs font-semibold text-[#5d5851]">نام کتاب</label>
                        <input id="book-title" type="text" maxLength="255" placeholder="نام کتاب را بنویسید" value={title} onChange={(event) => setTitle(event.target.value)} required className="w-full rounded-md border border-[#e2ddd5] bg-[#fcfbf9] px-3 py-2.5 text-sm text-[#302d29] outline-none transition placeholder:text-[#a39d94] focus:border-[#e98a2b] focus:ring-3 focus:ring-[#e98a2b]/15" />
                    </div>
                    <div>
                        <label htmlFor="book-author" className="mb-1.5 block text-xs font-semibold text-[#5d5851]">نام نویسنده</label>
                        <input id="book-author" type="text" maxLength="255" placeholder="نام نویسنده را بنویسید" value={author} onChange={(event) => setAuthor(event.target.value)} required className="w-full rounded-md border border-[#e2ddd5] bg-[#fcfbf9] px-3 py-2.5 text-sm text-[#302d29] outline-none transition placeholder:text-[#a39d94] focus:border-[#e98a2b] focus:ring-3 focus:ring-[#e98a2b]/15" />
                    </div>
                    <div>
                        <label htmlFor="book-category" className="mb-1.5 block text-xs font-semibold text-[#5d5851]">دسته‌بندی</label>
                        <select id="book-category" value={category} onChange={(event) => setCategory(event.target.value)} required className="w-full rounded-md border border-[#e2ddd5] bg-[#fcfbf9] px-3 py-2.5 text-sm text-[#302d29] outline-none transition focus:border-[#e98a2b] focus:ring-3 focus:ring-[#e98a2b]/15">
                            <option value="" disabled>یک دسته‌بندی انتخاب کنید</option>
                            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 border-t border-[#eeeae4] pt-4">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="rounded-md border border-[#e2ddd5] px-4 py-2.5 text-xs font-semibold text-[#6d675f] transition hover:bg-[#f7f5f1] disabled:opacity-50">انصراف</button>
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-md bg-[#e98a2b] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#d7791d] disabled:cursor-wait disabled:opacity-70">
                            {editId !== null ? <Check size={15} /> : <Plus size={15} />}
                            {isSubmitting ? "در حال ذخیره…" : editId !== null ? "ذخیرهٔ تغییرات" : "افزودن کتاب"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default BookFormModal;