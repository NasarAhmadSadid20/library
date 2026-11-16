import { X } from "lucide-react";

function DeleteBookDialog({ book, isDeleting, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#302d29]/45 p-3 sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
            <section role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" className="my-auto w-full max-w-sm rounded-lg border border-[#e7e1d7] bg-white p-5 shadow-[0_20px_70px_rgba(48,45,41,0.18)] sm:p-6">
                <div className="mb-4 flex items-start justify-between">
                 
                    <button type="button" onClick={onCancel} disabled={isDeleting} title="بستن" aria-label="بستن" className="flex size-8 items-center justify-center rounded-md text-[#817b73] transition hover:bg-[#f4f2ed] disabled:opacity-50">
                        <X size={18} />
                    </button>
                </div>
                <h2 id="delete-title" className="text-base font-extrabold text-[#302d29]">حذف این کتاب؟</h2>
                <p id="delete-description" className="mt-2 text-sm leading-6 text-[#77738b]">آیا می‌خواهید کتاب «{book?.title || "بدون عنوان"}» را حذف کنید؟</p>
                <div className="mt-6 flex gap-2">
                    <button type="button" onClick={onCancel} disabled={isDeleting} className="flex-1 rounded-md border border-[#e2ddd5] px-4 py-2.5 text-sm font-semibold text-[#6d675f] transition hover:bg-[#f7f5f1] disabled:opacity-50">لغو</button>
                    <button type="button" onClick={onConfirm} disabled={isDeleting} className="flex-1 rounded-md bg-[#d64d50] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#b83d41] disabled:cursor-wait disabled:opacity-70">{isDeleting ? "در حال حذف…" : "بله، حذف شود"}</button>
                </div>
            </section>
        </div>
    );
}

export default DeleteBookDialog;