import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent {
  filteredRecipes: any = [];
  allRecipes: any = [];
  showedRecipes: any = [];
  recipeName: string = '';

  constructor(
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe(data => {
      this.allRecipes = data.data;
      this.showedRecipes = this.allRecipes;
    });
  }

  search() {
    console.log("recipeName: ");
    console.log(this.recipeName);

    if (this.recipeName) {
      this.filteredRecipes = this.allRecipes.filter((recipe: { title: string; }) => 
        recipe.title.toLowerCase().includes(this.recipeName.toLowerCase())
      );
    } else {
      this.filteredRecipes = this.allRecipes;
    }

    this.showedRecipes = this.filteredRecipes;
  }
}
