import BooksTable from "../components/BooksTable";

function BooksPage({ books, isLoading, editBook, requestDelete, openAddForm }) {
    return (
        <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#302d29]">همهٔ کتاب‌ها</h1>
                    <p className="mt-2 text-sm text-[#777169]">فهرست کامل کتاب‌های ثبت‌شده در کتابخانه</p>
                </div>
            </div>
            <BooksTable
                books={books}
                isLoading={isLoading}
                editBook={editBook}
                requestDelete={requestDelete}
                openAddForm={openAddForm}
                showAddButton
                title="فهرست کتاب‌ها"
                description="فهرست کامل کتاب‌های ثبت‌شده در کتابخانه"
            />
        </section>
    );
}

export default BooksPage;