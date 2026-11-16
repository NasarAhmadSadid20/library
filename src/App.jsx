import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import BookFormModal from "./components/BookFormModal";
import DeleteBookDialog from "./components/DeleteBookDialog";
import BooksPage from "./pages/BooksPage";
import DashboardPage from "./pages/DashboardPage";

const apiBase = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");
const booksUrl = `${apiBase}/books`;

async function request(url, options) {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.error || "ارتباط با سرور ناموفق بود.");
    }

    return data;
}

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState(null);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        request(booksUrl, { signal: controller.signal })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("پاسخ سرور برای فهرست کتاب‌ها معتبر نیست.");
                }
                setBooks(data);
            })
            .catch((loadError) => {
                if (loadError.name !== "AbortError") {
                    setError(loadError.message);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    }, []);

    const clearForm = () => {
        setTitle("");
        setAuthor("");
        setCategory("");
        setEditId(null);
        setIsFormOpen(false);
    };

    const openAddForm = () => {
        clearForm();
        setIsFormOpen(true);
    };

    const saveBook = async (event) => {
        event.preventDefault();
        setError("");

        const book = { title, author, category };
        const url = editId === null ? booksUrl : `${booksUrl}/${editId}`;
        const method = editId === null ? "POST" : "PUT";

        setIsSaving(true);
        try {
            const savedBook = await request(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            setBooks((currentBooks) => (
                editId === null
                    ? [savedBook, ...currentBooks]
                    : currentBooks.map((currentBook) => currentBook.id === editId ? savedBook : currentBook)
            ));
            clearForm();
        } catch (saveError) {
            setError(saveError.message);
        } finally {
            setIsSaving(false);
        }
    };

    const editBook = (book) => {
        setTitle(book.title || "");
        setAuthor(book.author || "");
        setCategory(book.category || "");
        setEditId(book.id);
        setIsFormOpen(true);
    };

    const deleteBook = async () => {
        if (bookToDelete === null) return;

        setError("");
        setIsDeleting(true);
        try {
            await request(`${booksUrl}/${bookToDelete.id}`, { method: "DELETE" });
            setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookToDelete.id));
            setBookToDelete(null);
        } catch (deleteError) {
            setError(deleteError.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const categories = [...new Set([
        "رمان",
        "ادبیات",
        "تاریخ",
        "برنامه‌نویسی",
        "علوم",
        "روانشناسی",
        "کودک و نوجوان",
        "سایر",
        ...books.map((book) => book.category),
    ].filter(Boolean))];

    return (
        <AppShell onAddBook={openAddForm}>
            {error && (
                <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-md border border-[#f1c7c5] bg-[#fff0ef] px-4 py-3 text-sm text-[#a93438]">
                    <span>{error}</span>
                    <button type="button" onClick={() => setError("")} className="font-bold" aria-label="بستن پیام خطا">×</button>
                </div>
            )}
         <Routes>
                <Route path="/" element={(
                    <DashboardPage
                        books={books}
                        isLoading={isLoading}
                        editBook={editBook}
                        requestDelete={setBookToDelete}
                        openAddForm={openAddForm}
                    />
         )} />
                <Route path="/books" element={(
                    <BooksPage
                        books={books}
                        isLoading={isLoading}
                        editBook={editBook}
                        requestDelete={setBookToDelete}
                        openAddForm={openAddForm}
                    />
                )} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {isFormOpen && (
                <BookFormModal
                    title={title}
                    author={author}
                    category={category}
                    categories={categories}
                    editId={editId}
                    setTitle={setTitle}
                    setAuthor={setAuthor}
                    setCategory={setCategory}
                    onClose={clearForm}
                    onSubmit={saveBook}
                    isSubmitting={isSaving}
                />
            )}

            {bookToDelete !== null && (
                <DeleteBookDialog
                    book={bookToDelete}
                    isDeleting={isDeleting}
                    onCancel={() => setBookToDelete(null)}
                    onConfirm={deleteBook}
                />
            )}
        </AppShell>
    );
}

export default App;