import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {
  activeUser: any;
  recipes: any[] = [];
  myRecipes: any[] = [];
  selectedRecipe: any;

  constructor (
    private router: Router,
    private activeUserService: ActiveUserService,
    private apiService: ApiServiceService
  ){}

  ngOnInit(): void {
    this.activeUser = this.activeUserService.getActiveUser();
    // console.log("Active user:");
    // console.log(this.activeUser);

    this.apiService.getRecipes().subscribe(data => {
      this.recipes = data.data;
      // console.log("All recipes:");
      // console.log(this.recipes);

      this.myRecipes = this.recipes.filter(recipe => recipe.user_id === this.activeUser.user_id);
      // console.log("My recipes:");
      // console.log(this.myRecipes);
    },
    (error: any) => {
      console.error('Error fetching recipes:', error);
    });
  }

  updateRecipe(id: number) {
    this.router.navigate([`/edit-a-recipe/${id}`]);
  }  

   deleteRecipe(id: number) {
    this.apiService.deleteRecipe(id).subscribe(
      () => {
        this.myRecipes = this.myRecipes.filter(recipe => recipe.recipe_id !== id);
        alert("Recipe deleted successfully.");
      },
      error => {
        console.error(`Error deleting recipe with ID ${id}:`, error);
        // Optionally, show an error message to the user
      }
    );
  }
  
}  