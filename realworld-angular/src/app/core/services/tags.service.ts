import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private apiService: ApiService) { }

  getTags(): Observable<any> {
    return this.apiService.get('/tags').pipe(map(data => data.tags));
  }

}
