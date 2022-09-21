// Импорт класса Modal.
import Modal from './Modal.js';

class ArticleModal extends Modal {
    constructor (classes, { id, name, img, type, breed, description, age, inoculations, diseases, parasites }) {
        super(classes);
        this.id = id;
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    //Article Modal generator.
    generateContent () {
        let template = '';
        let article = document.createElement('div');
        article.className = 'modal__content';

        this.img &&
        (template += `<img class="modal__image" src=${this.img} alt="pet.png">`)

        template += `<div class="modal__text">`

        this.name && this.type && this.breed &&
        (template += `<div class="modal__title"><h3>${this.name}</h3><h4>${this.type} - ${this.breed}</h4></div>`)

        this.description &&
        (template += `<h5 class="modal__paragraph">${this.description}</h5>`)

        this.age && this.inoculations && this.diseases && this.parasites &&
        (template += `<div class="modal__list"><ul><li><b>Age</b>: ${this.age}</li><li><b>Inoculations</b>: ${this.inoculations}</li><li><b>Diseases</b>: ${this.diseases}</li><li><b>Parasites</b>: ${this.parasites}</li></ul></div>`)

        template += `</div>`

        article.innerHTML = template;
        return article;
    }

    renderModal () {
        let content = this.generateContent();
        super.buildModal(content);
    }
}

// Экспорт подкласса ArticleModal.
export default ArticleModal;