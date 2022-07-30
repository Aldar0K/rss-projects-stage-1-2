export const baseUrl = 'http://127.0.0.1:3000';

export const createElement = (tag: string, className?: string): HTMLElement => {
    const el = document.createElement(tag) as HTMLElement;
    if (className) el.classList.add(className);

    return el;
};

export const getElement = (selector: string): HTMLElement | undefined => {
    if (document.querySelector(selector)) {
      const el = document.querySelector(selector) as HTMLElement;
      return el;
    }
};
