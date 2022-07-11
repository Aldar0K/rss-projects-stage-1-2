import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', { apiKey: 'aa98da32b3864c3b932b532528bd2542' });
        // получите свой ключ https://newsapi.org/
    }
}

export default AppLoader;
