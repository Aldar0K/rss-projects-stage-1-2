import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '1751169aae08467b81e4892121501fd2', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
