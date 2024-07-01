import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-search-by-author',
  templateUrl: './search-by-author.component.html',
  styleUrls: ['./search-by-author.component.css']
})
export class SearchByAuthorComponent implements OnInit {
  filteredRecipes: any = [];
  allRecipes: any = [];
  showedRecipes: any = [];
  authorName: string = '';

  constructor(
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe(data => {
      this.allRecipes = data.data;
      this.showedRecipes = this.allRecipes; // Initialize showedRecipes after data is fetched
    });
  }

  search() {
    //console.log("authorName: ", this.authorName);

    if (this.authorName) {
      this.filteredRecipes = this.allRecipes.filter((recipe: { username: string; }) => 
        recipe.username.toLowerCase().includes(this.authorName.toLowerCase())
      );
    } else {
      this.filteredRecipes = this.allRecipes;
    }

    this.showedRecipes = this.filteredRecipes;
  }
}
