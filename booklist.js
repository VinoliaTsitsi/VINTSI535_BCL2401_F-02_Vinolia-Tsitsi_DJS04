import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
export class BookList extends HTMLElement {
    constructor( foundBooks, foundAuthors, foundGenres, booksPerPage, targetElement ) {
        super();
        this.attachShadow({ mode: "open" });

        this.books=foundBooks ? foundBooks : books;
        this.authors=foundAuthors ? foundAuthors : authors;
        this.genres= foundGenres ? foundGenres : genres;
        this. booksPerPage=booksPerPage ? booksPerPage : BOOKS_PER_PAGE;
        this.targetElement = typeof targetElement === "string" ? document.querySelector(targetElement) : targetElement;

        if(this.targetElement instanceof HTMLElement){
            this.renderBookPreviews(this.books, this.targetElement, this.authors);
        }
    }
 
    createBookElement(book, authors) {
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

    renderBookPreviews(foundBooks, targetElement, authors) {
        // const fragment = document.createDocumentFragment();
        const fragment = document.createElement("div");
        fragment.className = "list__items";
        fragment.setAttribute("data-list-items", "");
        foundBooks.slice(0, this.booksPerPage).forEach(book => {
            const element = this.createBookElement(book, authors);
            fragment.appendChild(element);
        });

        if(this.targetElement instanceof HTMLElement){
            const css = this.bookElementCSS();
            targetElement.appendChild(css);
            targetElement.appendChild(fragment);
        }
        else {
            return fragment;
        }
    }
 
    bookElementCSS() {
        const style = document.createElement("style");
        style.innerHTML = `
        .list__items {
          display: grid;
          padding: 2rem 1rem;
          grid-template-columns: 1fr;
          grid-column-gap: 0.5rem;
          grid-row-gap: 0.5rem;
          margin: 0 auto;
          width: 100%;
        }
        
        @media (min-width: 50rem) {
          .list__items {
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 0.75rem;
            grid-row-gap: 0.75rem;
          }
        }
        
        @media (min-width: 100rem) {
          .list__items {
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 0.75rem;
            grid-row-gap: 0.75rem;
          }
        }
        
        @media (min-width: 150rem) {
          .list__items {
            grid-template-columns: repeat(8, 1fr);
            grid-column-gap: 0.75rem;
            grid-row-gap: 0.75rem;
          }
        }
        
        .list__button {
          font-family: Roboto, sans-serif;
          transition: background-color 0.1s;
          border-width: 0;
          border-radius: 6px;
          height: 2.75rem;
          cursor: pointer;
          width: 50%;
          background-color: rgba(var(--color-blue), 1);
          color: rgba(var(--color-force-light), 1);
          font-size: 1rem;
          border: 1px solid rgba(var(--color-blue), 1);
          max-width: 10rem;
          margin: 0 auto;
          display: block;
        }
        
        .list__remaining {
          opacity: 0.5;
        }
        
        .list__button:not(:disabled) hover {
          background-color: rgba(var(--color-blue), 0.8);
          color: rgba(var(--color-force-light), 1);
        }
        
        .list__button:disabled {
          cursor: not-allowed;
          opacity: 0.2;
        }
        
        /* preview */
        
        .preview {
          border-width: 0;
          width: 100%;
          font-family: Roboto, sans-serif;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          text-align: left;
          border-radius: 8px;
          border: 1px solid rgba(var(--color-dark), 0.15);
          background: rgba(var(--color-light), 1);
        }
        
        @media (min-width: 60rem) {
          .preview {
            padding: 1rem;
          }
        }
        
        .preview_hidden {
          display: none;
        }
        
        .preview:hover {
          background: rgba(var(--color-blue), 0.05);
        }
        
        .preview__image {
          width: 48px;
          height: 70px;
          object-fit: cover;
          background: grey;
          border-radius: 2px;
          box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        }
        
        .preview__info {
          padding: 1rem;
        }
        
        .preview__title {
          margin: 0 0 0.5rem;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
          color: rgba(var(--color-dark), 0.8)
        }
        
        .preview__author {
          color: rgba(var(--color-dark), 0.4);
        }
        
        /* preview */

        .preview {
        border-width: 0;
        width: 100%;
        font-family: Roboto, sans-serif;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-align: left;
        border-radius: 8px;
        border: 1px solid rgba(var(--color-dark), 0.15);
        background: rgba(var(--color-light), 1);
        }

        @media (min-width: 60rem) {
        .preview {
            padding: 1rem;
        }
        }

        .preview_hidden {
        display: none;
        }

        .preview:hover {
        background: rgba(var(--color-blue), 0.05);
        }

        .preview__image {
        width: 48px;
        height: 70px;
        object-fit: cover;
        background: grey;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        }

        .preview__info {
        padding: 1rem;
        }

        .preview__title {
        margin: 0 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
        }

        .preview__author {
        color: rgba(var(--color-dark), 0.4);
        }

        `;
        return style;
    }
 
    appendToDOM() {
        const shadowRoot = this.shadowRoot,
        css = this.bookElementCSS(),
        html = this.renderBookPreviews(this.books, this.targetElement, this.authors);

        shadowRoot.appendChild(css);
        
        shadowRoot.appendChild(html);

        return shadowRoot;
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        this.appendToDOM();
    }
}

customElements.define("book-list", BookList);