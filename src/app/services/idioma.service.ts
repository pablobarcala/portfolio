import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  idioma: BehaviorSubject<string> = new BehaviorSubject<string>("Es")
  
  constructor() {}

  getIdioma() {
    return this.idioma.asObservable()
  }

  changeIdioma() {
    if(this.idioma.value == "Es") {
      this.idioma.next("En")
    } else {
      this.idioma.next("Es")
    }
  }
}
