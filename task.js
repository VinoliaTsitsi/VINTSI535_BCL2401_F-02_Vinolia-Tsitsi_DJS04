// tasks.js
import { createBookElement, updateListButton } from './helpers.js';
import { page, matches } from './state.js';
import {BOOKS_PER_PAGE} from './data.js';

// Function to render book previews
export function renderBookPreviews(books, targetElement, authors) {
    const fragment = document.createDocumentFragment();
    books.slice(0, BOOKS_PER_PAGE).forEach(book => {
        const element = createBookElement(book, authors);
        fragment.appendChild(element);
    });
    targetElement.appendChild(fragment);
}

// Function to handle "Show more" button click
export function handleShowMore(button, matches, authors) {
    const fragment = document.createDocumentFragment();
    const start = page * BOOKS_PER_PAGE;
    const end = (page + 1) * BOOKS_PER_PAGE;

    for (const book of matches.slice(start, end)) {
        const element = createBookElement(book, authors);
        fragment.appendChild(element);
    }

    document.querySelector('[data-list-items]').appendChild(fragment);
    page++;
    updateListButton(button, Math.max(0, matches.length - (page * BOOKS_PER_PAGE)));
}

