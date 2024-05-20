export class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .preview {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }
                .preview__image {
                    width: 100px;
                    height: 150px;
                    margin-right: 10px;
                }
                .preview__info {
                    flex-grow: 1;
                }
                .preview__title {
                    margin: 0;
                    font-size: 16px;
                }
                .preview__author {
                    font-size: 14px;
                }
            </style>
            <button class="preview">
                <img class="preview__image" />
                <div class="preview__info">
                    <h3 class="preview__title"></h3>
                    <div class="preview__author"></div>
                </div>
            </button>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    set data(book) {
        this.shadowRoot.querySelector('.preview__image').src = book.image;
        this.shadowRoot.querySelector('.preview__title').textContent = book.title;
        this.shadowRoot.querySelector('.preview__author').textContent = book.authorName;
        this.dataset.preview = book.id;
    }
}

customElements.define('book-preview', BookPreview);
