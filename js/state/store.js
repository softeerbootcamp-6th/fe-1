export class DateStore{
    
    constructor(initState = {}) {
        this.state={...initState};
        this.listeners = [];
    }

    subscribe(key, listener) {
        if(!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners.push(listener);
    }

    setState(key, value) {
        this.state[key] = value;
        if(this.listeners[key]) {
            this.listeners[key].forEach(listener => listener(value));
        }
    }

    getState(key) {
        return this.state[key];
    }


}