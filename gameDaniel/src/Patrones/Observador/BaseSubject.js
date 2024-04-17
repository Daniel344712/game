import { BaseObserver } from "./BaseObserver.js";

export class BaseSubject {
     /**
   * 
   * @param {BaseObserver} observer 
   */
     addObserver(observer) {
        throw new Error('Method not implemented.');
    }
    
    notifyObservers() {
        throw new Error('Method not implemented.');
    }
    /**
      * 
      * @param {BaseObserver} observer 
      */
    removeObserver(observer) {
        throw new Error('Method not implemented.');
    }
}