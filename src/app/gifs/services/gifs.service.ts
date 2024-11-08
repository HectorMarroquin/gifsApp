import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'L6dP7tiyrg9k3SkcLXkAyRsECEHhURmP';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { }


  get tagsHistory(): string[] {
      return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag)  ){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);

  }

  public searchTag( tag : string ): void{

      if(tag.length === 0 ) return;
      this.organizeHistory(tag);

      this.http.get('/search?api_key=L6dP7tiyrg9k3SkcLXkAyRsECEHhURmP&q=advengers&limit=10')
      .subscribe( resp => {
            console.log(resp);

      });

  }

}
