
require("dotenv").config({
    path: require("path").join(__dirname, "..", ".env"),
});

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json({ limit: "10kb" }));

const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};

function getBookFields(body) {
    const fields = ["title", "author", "category"];

    if (
        !body ||
        fields.some(
            (field) =>
                typeof body[field] !== "string" ||
                !body[field].trim()
        )
    ) {
        const error = new Error(
            "عنوان، نویسنده و دسته‌بندی الزامی هستند."
        );
        error.status = 400;
        throw error;
    }

    const maxLengths = {
        title: 255,
        author: 255,
        category: 100,
    };

    const book = Object.fromEntries(
        fields.map((field) => [field, body[field].trim()])
    );

    if (
        fields.some(
            (field) => book[field].length > maxLengths[field]
        )
    ) {
        const error = new Error(
            "طول عنوان، نویسنده یا دسته‌بندی بیشتر از حد مجاز است."
        );
        error.status = 400;
        throw error;
    }

    return book;
}

function getBookId(value) {
    if (!/^[1-9]\d*$/.test(value)) {
        const error = new Error("شناسهٔ کتاب معتبر نیست.");
        error.status = 400;
        throw error;
    }

    return Number(value);
}

// Home
app.get("/", (req, res) => {
    res.send("Library Server is Running!");
});

// Database health check
app.get(
    "/health",
    asyncHandler(async (req, res) => {
        await db.query("SELECT 1");
        res.json({ status: "ok" });
    })
);

// Get all books
app.get(
    "/books",
    asyncHandler(async (req, res) => {
        const [books] = await db.query(
            "SELECT id, title, author, category FROM books ORDER BY id DESC"
        );

        res.json(books);
    })
);

// Add book
app.post(
    "/books",
    asyncHandler(async (req, res) => {
        const book = getBookFields(req.body);

        const [result] = await db.query(
            "INSERT INTO books (title, author, category) VALUES (?, ?, ?)",
            [book.title, book.author, book.category]
        );

        res.status(201).json({
            id: result.insertId,
            ...book,
        });
    })
);

// Update book
app.put(
    "/books/:id",
    asyncHandler(async (req, res) => {
        const id = getBookId(req.params.id);
        const book = getBookFields(req.body);

        const [existingBooks] = await db.query(
            "SELECT id FROM books WHERE id = ?",
            [id]
        );

        if (existingBooks.length === 0) {
            return res.status(404).json({
                error: "کتاب موردنظر پیدا نشد.",
            });
        }

        await db.query(
            "UPDATE books SET title = ?, author = ?, category = ? WHERE id = ?",
            [book.title, book.author, book.category, id]
        );

        res.json({ id, ...book });
    })
);

// Delete book
app.delete(
    "/books/:id",
    asyncHandler(async (req, res) => {
        const id = getBookId(req.params.id);

        const [result] = await db.query(
            "DELETE FROM books WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "کتاب موردنظر پیدا نشد.",
            });
        }

        res.json({ message: "کتاب حذف شد." });
    })
);

// Error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (!err.status || err.status >= 500) {
        console.error("Request failed:", err.message);
    }

    res.status(err.status || 500).json({
        error: err.status
            ? err.message
            : "در ارتباط با سرور یا پایگاه داده مشکلی پیش آمد.",
    });
});

app.listen(port, () => {
    console.log(
        `Library server is running on port ${port}`
    );
});
