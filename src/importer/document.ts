export default class DocumentReady {
    private readonly LOADING_STATE = 'loading';
  
    private readonly E_CONTENT_LOADED = 'DOMContentLoaded';
  
    private readonly contentLoaded: boolean;
  
    constructor() {
      this.contentLoaded = document.readyState !== this.LOADING_STATE;
    }
  
    public ready(callback: () => void): void {
      if (this.contentLoaded) {
        callback();
      } else {
        document.addEventListener(this.E_CONTENT_LOADED, callback);
      }
    }
  }
  
  export const documentReady = new DocumentReady();
  