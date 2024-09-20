import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'api_call',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: 'api_call.html',
})
export class ApiCallComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(
        (data) => {
          this.todos = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load todo list';
          this.loading = false;
        }
      );
  }
}
