import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipeId: any;
  activeUser: any;
  ingredients: any = [];
  recipe: any;
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
      const id = params.get('receptId');
      if (id !== null) {
        this.recipeId = +id;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.activeUser = this.activeUserService.getActiveUser();
    
    // Load recipe data and related entities
    this.ApiService.getRecipe(this.recipeId).subscribe(data => {
      this.recipe = data;
      this.image_id = this.recipe.image_id;
      this.getAuthor();
      this.getCategory();
      this.getImage();
      this.getIngredients();
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
      this.image = data.image; 
      // console.log(this.image);
    });
  }

  getIngredients(): void {
    this.ApiService.getIngredientList(this.recipeId).subscribe(data => {
      this.ingredients = data.ingredients;
    });
  }
}
