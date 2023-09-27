import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
//http://localhost:4200/portifolio/1 => out {1}
  constructor(
    private parametrizador: ActivatedRoute,
    private nagador: Router) {
    this.parametrizador.params.subscribe(
      res => console.log(res)
    )

//http://localhost:4200/portifolio/1?%7Bname=victor&token=123%7D => para recuperar após o 1
      this.parametrizador.queryParams.subscribe(
        res => console.log(res)
      )
      this.parametrizador.firstChild?.params.subscribe(
        res => console.log(res)
      )
  }

  ngOnInit(): void {
//    setInterval(()=>{
//      this.nagador.navigate(['/'])
//    }, 5000)
  }

}
