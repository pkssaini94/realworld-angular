import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/core/models/profile.model';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() 
  profile: Profile;

  @Output() 
  toggle = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }

}
