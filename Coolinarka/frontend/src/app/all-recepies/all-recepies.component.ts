import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-all-recepies',
  templateUrl: './all-recepies.component.html',
  styleUrl: './all-recepies.component.css'
})
export class AllRecepiesComponent implements OnInit{
  constructor(private ApiServiceService: ApiServiceService) { }

  recipes: any[] = [];

  ngOnInit(): void {
    this.ApiServiceService.getRecipes().subscribe(data => {
      console.log(data);
      this.recipes = data.data;

    });
  }
}