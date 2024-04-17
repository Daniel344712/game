import { BaseObserver } from "./BaseObserver.js";
import { BaseSubject } from "./BaseSubject.js";

export class Subject extends BaseSubject {

    /** @type {string} */
    #value;

    /** @type {BaseObserver[]} */
    observers = [];

    setSubjectState(value) {
        this.#value = value;
        this.notifyObservers();
    }
    
    /**
    * 
    * @param {BaseObserver} observer 
    */
    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.#value));
    }
    /**
      * 
      * @param {BaseObserver} observer 
      */
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
}