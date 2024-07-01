import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRecepiesComponent } from './all-recepies/all-recepies.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SearchByIngredientComponent } from './search-by-ingredient/search-by-ingredient.component';
import { SearchByAuthorComponent } from './search-by-author/search-by-author.component';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';

const routes: Routes = [
  { path: '', component: AllRecepiesComponent },
  { path: 'profile/profileDetails', component: MyProfileComponent },
  { path: 'profile/login', component: LoginComponent },
  { path: 'profile/signup', component: SignupComponent },
  { path: 'recipe/:receptId', component: RecipeComponent },
  { path: 'show-my-recipes', component: MyRecipesComponent},
  { path: 'edit-a-recipe/:id', component: EditRecipeComponent },
  { path: 'add-a-recipe', component: NewRecipeComponent},
  { path: 'search-by-ingredient', component: SearchByIngredientComponent},
  { path: 'search-by-author', component: SearchByAuthorComponent},
  { path: 'search-by-recepie-name', component: SearchByNameComponent},
  { path: '**', component: PagenotfoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
