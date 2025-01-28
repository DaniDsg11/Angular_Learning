import { Component } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [TaskItemComponent], // Import the child component
})
export class TodoListComponent {
  newTask = ''; // Holds the value from the input field
  tasks: { text: string; completed: boolean }[] = []; // Array to store tasks

  constructor() {
    this.loadTasks(); // Load tasks from localStorage when the component initializes
  }

  onInputChange(event: Event) {
    console.log('value: ', (event.target as HTMLInputElement).value);
    this.newTask = (event.target as HTMLInputElement).value;
  }
  
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask.trim(), completed: false }); // Add a new task
      this.newTask = ''; // Clear the input field
      this.saveTasks(); // Save after adding a task
    }
  }

  // Toggle task completion state
  toggleTaskCompletion(task: { text: string; completed: boolean }) {
    task.completed = !task.completed; // Toggle between completed/uncompleted
    this.saveTasks(); // Save to localStorage
  }

  // Method to mark a task as completed
  completeTask(task: { text: string; completed: boolean }) {
    task.completed = !task.completed; // Update the task's "completed" status
    this.saveTasks(); // Save after marking a task as completed
  }

  // Method to delete a task
  deleteTask(task: { text: string; completed: boolean }) {
    this.tasks = this.tasks.filter(t => t !== task); // Remove the task from the array
    this.saveTasks(); // Save after deleting a task
  }

  // Method to save tasks to localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Method to load tasks from localStorage
  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}
