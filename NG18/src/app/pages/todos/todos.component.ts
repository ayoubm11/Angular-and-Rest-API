import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  imports: [FormsModule, NgClass],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  notify : boolean = false;
  title = 'Master Angular';
  todoIndex : number = -1;
  defaultTodo = "Write a todo"
  editable = false;
  showForm : boolean = false;
  myTodo: string = "";
  todos : string[] = ['Angular','Reactjs','spring boot','django']
  notification = {
    message: '',
    position: '',
    alertClass: '',
    duration: 3000,
  };

  addTodos(){
    this.todos = [this.myTodo, ...this.todos];
    this.initTodos();
    this.triggerNotification({
      message: 'Todo creat successfuly',
      position: 'toast-bottom toast-end',
      alertClass: 'alert-success',
      duration: 3000,
    }
    );
  }
  triggerNotification(customNotify: any){
    this.notification = {
      ...customNotify,
    }
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
    }, 3000)    
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
      this.initTodos();
      this.triggerNotification({
          message: 'Todo update successfuly',
          position: 'toast-bottom toast-start',
          alertClass: 'alert-warning',
          duration: 3000,
        }
      );
    }
  }
  deleteTodo(index: number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.todos = this.todos.filter((item, i) => i !== index) ;
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
    // if (confirm("Are you sure to delete this todo?")){
    //   method 1 :
    //   this.todos.splice(index, 1);
    //   method 2 :
    //   this.todos = this.todos.filter((item, i) => i !== index) ;
    //}
    this.triggerNotification({
        message: 'Todo delete successfuly',
        position: 'toast-middel toast-end',
        alertClass: 'alert-error',
        duration: 20000,
      }
    );
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }
  changtoggobtn(){
    return this.showForm  ? 'Hide' : 'Show';
  }
  
  initTodos(){
    this.myTodo = '';
    this.editable = false ;
    this.showForm = false; 
    this.todoIndex = -1; 
  }
  cancel(){
    this.initTodos();
    this.triggerNotification({
      message: 'update cancel',
      position: 'toast-end',
      alertClass: 'alert-neutral',
      duration: 20000,
    })
  }
  submit(){
    if(!this.validateTodo()){
      return;
    }
    if(this.editable){
      this.updateTodos
    }else{
      this.addTodos()
    }
  }
  validateTodo(){
    if(!this.myTodo){
      this.triggerNotification({
        message: 'Please check the data into a input, Todo is required!!',
        alertClass: 'alert-error',
        position: 'toast-end',
        duration: 3000
      })
      return false
    }
    return true
  }


  // showTitle(){
  //   return this.edite == true ? 'Edite Todos' : 'Show all todos'; 
  // }



}
