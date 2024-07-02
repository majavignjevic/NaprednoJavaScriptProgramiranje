import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  private baseUrl = 'http://localhost:8081/api'; 

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`); //http://localhost:8081/api/recipes
  }

  getRecipe(recipeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${recipeId}`); //http://localhost:8081/api/recipes/id
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`);
  }

  updateRecipe(recipeId: number, recipeData: any): Observable<any> {
    const url = `${this.baseUrl}/recipes/${recipeId}`;
    return this.http.put(url, recipeData);
  }

  addRecipe(recipeData: any): Observable<any> {
    const url = `${this.baseUrl}/recipes`;
    return this.http.post<any>(url, recipeData);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`); //http://localhost:8081/api/users
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/users`, user, { headers });
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getIngredientList(recipeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/ingredients-by-recipe/${recipeId}`); //http://localhost:8081/api/ingredients-by-recipe/id
  }

  updateIngredients(recipeId: number, ingredientsData: any[]): Observable<any> {
    const url = `${this.baseUrl}/ingredients-by-recipe/${recipeId}`;
    return this.http.put(url, ingredientsData);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`); //http://localhost:8081/api/categories
  }

  getImage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/images/${id}`); //http://localhost:8081/api/images/image_id
  }

  addImage(imageData: string): Observable<any> {
    const url = `${this.baseUrl}/images`;
    return this.http.post<any>(url, { image_data: imageData });
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}//ingredients`); //http://localhost:8081/api/ingredients
  }

  addRecipeIngredients(recipeId: number, ingredients: any[]): Observable<any> {
    const url = `${this.baseUrl}/recipe-ingredients`;
    const body = { recipe_id: recipeId, ingredients };
    return this.http.post<any>(url, body);
  }
}
