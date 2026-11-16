import { BookOpen, UsersRound } from "lucide-react";
import BooksTable from "../components/BooksTable";

function DashboardPage({ books, isLoading, editBook, requestDelete, openAddForm }) {
    const authorsCount = new Set(books.map((book) => book.author).filter(Boolean)).size;

    return (
        <>
            <section aria-label="آمار کتابخانه" className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6">
                <article className="flex min-h-32 items-center justify-between rounded-lg border border-[#e7e1d7] bg-white p-4 sm:min-h-36 sm:p-7">
                    <div>
                        <p className="text-3xl font-extrabold text-[#302d29]">{books.length}</p>
                        <p className="mt-2 text-md font-bold text-[#4e4b4b]">کتاب ثبت‌شده</p>
                    </div>
                    <span className="flex size-16 items-center justify-center rounded-full bg-[#fff1df] text-[#ee8824]"><BookOpen size={29} /></span>
                </article>
                <article className="flex min-h-32 items-center justify-between rounded-lg border border-[#e7e1d7] bg-white p-4 sm:min-h-36 sm:p-7">
                    <div>
                        <p className="text-3xl font-extrabold text-[#302d29]">{authorsCount}</p>
                        <p className="mt-2 text-md font-bold text-[#4e4b4b]">نویسنده</p>
                    </div>
                    <span className="flex size-16 items-center justify-center rounded-full bg-[#fff1df] text-[#ee8824]"><UsersRound size={29} /></span>
                </article>
            </section>

            <BooksTable
                books={books.slice(0, 5)}
                isLoading={isLoading}
                editBook={editBook}
                requestDelete={requestDelete}
                openAddForm={openAddForm}
                title="کتاب‌های تازه"
                description="آخرین کتاب‌های ثبت‌شده در کتابخانه"
            />
        </>
    );
}

export default DashboardPage;