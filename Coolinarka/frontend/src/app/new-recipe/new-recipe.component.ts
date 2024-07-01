import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  title: string = '';
  description: string = '';
  category: number | null = null; // Change category to number type
  steps: string = '';
  image: string | ArrayBuffer = '';
  categories: any = [];
  ingredientsList: any[] = [];
  selectedIngredients: any[] = []; 
  author: any;

  constructor(
    private apiService: ApiServiceService,
    private activeUser: ActiveUserService
  ) {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.apiService.getIngredients().subscribe((response: any) => {
      if (Array.isArray(response.data)) {
        this.ingredientsList = response.data;
        //console.log(this.ingredientsList);
        
        // Initialize selectedIngredients with default values
        this.selectedIngredients = this.ingredientsList.map(ingredient => ({
          ingredientId: ingredient.ingredient_id,
          quantity: ''
        }));
      } else {
        console.error('Expected an array of ingredients in response.data, but received:', response);
        // Handle error or set default values for ingredientsList and selectedIngredients
        this.ingredientsList = [];
        this.selectedIngredients = [];
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.image = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.author = this.activeUser.getActiveUser();
    // console.log('Active user:', this.author)

    const newRecipe = {
      user_id: this.author.user_id,
      title: this.title,
      description: this.description,
      category: this.category,
      steps: this.steps,
      image: this.image,
      ingredients: this.selectedIngredients.filter(ing => ing.quantity != '')
    };


    // console.log('New Recipe:', newRecipe);
    this.author = this.activeUser.getActiveUser();
    // console.log('Active user:', this.author)

    this.apiService.addImage(this.image as string).subscribe((imageResponse: any) => {
      const imageId = imageResponse.image_id;
      
      const recipeToUpload = {
          user_id: this.author.user_id,
          title: this.title,
          description: this.description,
          category_id: this.category,
          instructions: this.steps,
          image_id: imageId
      };
  
      this.apiService.addRecipe(recipeToUpload).subscribe((recipeResponse: any) => {
          const recipeId = recipeResponse.recipe_id;
  
          const ingredientsToInsert = this.selectedIngredients.filter(ing => ing.quantity !== '');
          this.apiService.addRecipeIngredients(recipeId, ingredientsToInsert).subscribe(
              (ingredientsResponse: any) => {
                  console.log('Recipe and ingredients added successfully:', ingredientsResponse);
                  alert("Success!");
              },
              (ingredientsError) => {
                  console.error('Failed to add ingredients:', ingredientsError);
              }
          );
      },
      (recipeError) => {
          console.error('Failed to add recipe:', recipeError);
          // Handle error scenario, show error message, etc.
      });
  },
  (imageError) => {
      console.error('Failed to upload image:', imageError);
      // Handle error scenario, show error message, etc.
  });
  
  };

  counterArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
