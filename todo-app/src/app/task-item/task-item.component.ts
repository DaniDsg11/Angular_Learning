import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: { text: string; completed: boolean }; // Receives task from parent
  @Output() taskUpdated = new EventEmitter<void>(); // Emits event to parent

  toggleTaskCompletion(task: { text: string; completed: boolean }) {
    task.completed = !task.completed; // Toggle between completed/uncompleted
    this.taskUpdated.emit(); // Notify parent to update localStorage
  }

  deleteTask(task: { text: string; completed: boolean }) {
    this.taskUpdated.emit(); // Notify parent to update localStorage
  }
}
