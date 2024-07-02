import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeId: any;
  activeUser: any;
  ingredients: any = [];
  recipe: any = {};
  users: any = [];
  author: any;
  categories: any = [];
  category: any;
  image: any;
  image_id: any;

  constructor(
    private route: ActivatedRoute,
    private activeUserService: ActiveUserService,
    private ApiService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.recipeId = +id;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.activeUser = this.activeUserService.getActiveUser();

    this.ApiService.getRecipe(this.recipeId).subscribe(data => {
      this.recipe = data;
      this.image_id = this.recipe.image_id;
      this.getAuthor();
      this.getCategory();
      this.getIngredients();
      this.getImage();
    });
  }

  getAuthor(): void {
    this.ApiService.getUsers().subscribe(userdata => {
      this.users = userdata.data;
      this.author = this.users.find((user: { user_id: any; }) => user.user_id === this.recipe.user_id);
    });
  }

  getCategory(): void {
    this.ApiService.getCategories().subscribe(data => {
      this.categories = data;
      this.category = this.categories.find((cat: { category_id: any; }) => cat.category_id === this.recipe.category_id);
    });
  }

  getImage(): void {
    this.ApiService.getImage(this.image_id).subscribe(data => {
      this.image = data.image; // Assuming image data is stored in data.image
    });
  }

  getIngredients(): void {
    this.ApiService.getIngredientList(this.recipeId).subscribe(
      data => {
        this.ingredients = data.ingredients;
      },
      error => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  onSubmit() {
      const updatedRecipe = {
        category_id: this.recipe.category_id,
        title: this.recipe.title,
        description: this.recipe.description,
        instructions: this.recipe.instructions
      }

      console.log(updatedRecipe); //isnt eritten out

      this.ApiService.updateRecipe(this.recipeId, updatedRecipe).subscribe(
        () => {
          console.log('Recipe details updated successfully');
        },
        error => {
          console.error('Error updating recipe details:', error);
          // Handle error appropriately
        }
      );

      const updatedIngredients = this.ingredients.map((ing: { ingredient_id: any; quantity: any; }) => ({
        ingredient_id: ing.ingredient_id,
        quantity: ing.quantity
      }));

      this.ApiService.updateIngredients(this.recipeId, updatedIngredients).subscribe(
        () => {
          console.log('Ingredients quantities updated successfully');
          alert("Recept ažuiran!")
        },
        error => {
          console.error('Error updating ingredients quantities:', error);
        }
      );
  }
}
