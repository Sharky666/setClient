import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from './random-number.service'

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  guessNumber: number;

  constructor(private randomNumberService: RandomNumberService) { }

  ngOnInit() {
  }

  onSubmitClick() {
    
  }

}
