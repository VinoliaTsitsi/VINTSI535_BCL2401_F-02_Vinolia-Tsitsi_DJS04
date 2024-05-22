
// helpers.js

// Helper function to create a single book preview element
export function createBookElement(book, authors) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', book.id);

    element.innerHTML = `
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
        </div>
    `;
    return element;
}

// Helper function to apply filters to books
export function applyFilters(formData, books) {
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book);
        }
    }

    return result;
}

// Helper function to update the "Show more" button
export function updateListButton(button, remaining) {
    button.disabled = remaining <= 0;
    button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `;
}

// Helper function to populate select options
export function populateSelectOptions(selector, options) {
    const selectElement = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    const defaultOption = document.createElement('option');
    defaultOption.value = 'any';
    defaultOption.innerText = 'All';
    fragment.appendChild(defaultOption);
    for (const [id, name] of Object.entries(options)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        fragment.appendChild(option);
    }
    selectElement.appendChild(fragment);
}

// Helper function to set theme
export function setTheme(theme) {
    if (theme === 'night' || (theme !== 'day' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.querySelector('[data-settings-theme]').value = 'night';
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.querySelector('[data-settings-theme]').value = 'day';
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}
