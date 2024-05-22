// script.js
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { page, matches } from './state.js';
import { createBookElement, applyFilters, updateListButton, populateSelectOptions, setTheme } from './helpers.js';
import { renderBookPreviews, handleShowMore } from './task.js';
import { BookList } from './booklist.js';

// const booklist = new BookList(books, authors, genres, BOOKS_PER_PAGE, "books");

// Render initial book previews
renderBookPreviews(matches, document.querySelector('[data-list-items]'), authors);

// Populate genre select options
populateSelectOptions('[data-search-genres]', genres);

// Populate author select options
populateSelectOptions('[data-search-authors]', authors);

// Set theme based on prefers-color-scheme
setTheme();

// Set initial list button text and disable if no more matches
const listButton = document.querySelector('[data-list-button]');
updateListButton(listButton, Math.max(0, matches.length - (page * BOOKS_PER_PAGE)));

// Event listeners
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    setTheme(theme);
    document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = applyFilters(formData, books);
    page = 1;
    matches = result;

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    document.querySelector('[data-list-items]').innerHTML = '';
    renderBookPreviews(matches, document.querySelector('[data-list-items]'), authors);
    updateListButton(listButton, Math.max(0, matches.length - (page * BOOKS_PER_PAGE)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-list-button]').addEventListener('click', () => {
    handleShowMore(listButton, matches, authors);
});

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            active = books.find(book => book.id === node.dataset.preview);
        }
    }

    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    }
});
