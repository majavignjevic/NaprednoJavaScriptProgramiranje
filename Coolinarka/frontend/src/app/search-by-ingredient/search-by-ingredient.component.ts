import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-search-by-ingredient',
  templateUrl: './search-by-ingredient.component.html',
  styleUrl: './search-by-ingredient.component.css'
})
export class SearchByIngredientComponent {
  filteredRecipes: any = [];
  allRecipes: any = [];
  showedRecipes: any = [];
  categories: any = [];
  selectedCategory: any;

  constructor(
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe(data => {
      this.allRecipes = data.data;
      this.showedRecipes = this.allRecipes;
    });

    this.apiService.getCategories().subscribe(data =>{
      this.categories=data;
      //console.log(this.categories);
    })

  }

  search() {
   // console.log('Selected Category:', this.selectedCategory);
  
    if (this.selectedCategory !== undefined && this.selectedCategory !== null) {
      this.filteredRecipes = this.allRecipes.filter((recipe: { category_id: any; }) => {
        return recipe.category_id === Number(this.selectedCategory);
      });
    } else {
      this.filteredRecipes = this.allRecipes;
    }
  
    this.showedRecipes = this.filteredRecipes;
    //console.log('Filtered Recipes:', this.showedRecipes);
  }
  
  

}
