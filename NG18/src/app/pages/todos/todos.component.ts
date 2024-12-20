import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  title = 'Master Angular';
  todoIndex : number = -1;
  defaultTodo = "Write a todo"
  editable = false;
  showForm : boolean = false;
  myTodo: string = "";
  todos : string[] = ['Angular','Reactjs','spring boot','django']

  addTodos(){
    this.todos = [this.myTodo, ...this.todos];
    this.myTodo = '';
    this.showForm = false;
  }
  editTodo(todo: string, index:number ){
    this.myTodo = todo;
    this.showForm = true;
    this.editable = true;
    this.todoIndex = index;
  }
  updateTodos(){
    if(this.todoIndex >=0){
      this.todos[this.todoIndex] = this.myTodo;
      this.myTodo = '';
      this.editable = false;
      this.showForm = false;
    }
  }
  deleteTodo(index: number){
    this.todos.splice(index, 1);

  }

  toggleForm(){
    this.showForm = !this.showForm;
  }
  changtoggobtn(){
    return this.showForm  ? 'Hide' : 'Show';
  }

  // showTitle(){
  //   return this.edite == true ? 'Edite Todos' : 'Show all todos'; 
  // }
 



}
