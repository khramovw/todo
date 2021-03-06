import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

// Services
import { TodoesService } from '../../services/todoes.service';


// Models
import { Task } from '../../models/Task';
import { UidService } from "../../services/uid.service";


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  getdate: any;
  gettime: any;
  createformdate: any;

  todo: Task = {
    date: '',
    id: '',
    done: false,
    header: '',
    text: '',
    time: '',
    timestamp: '',
    setTime: 0
  };

  // Получаю элементы формы
  @ViewChild("todoForm") form: any;

  constructor( private todoesService: TodoesService,
               private router: Router,
               private uid: UidService ) {

  }

  ngOnInit() {
  }

  onSubmit() {
    if ( !this.form.valid ) {
      console.log('no validate form');

    } else {

      console.log(this.form);

      // Получаю время
      this.todo.timestamp = new Date();

      // получаю из ипутов дату и время и собираю в формате GMT и записываю в setTime:
      this.getdate = this.todo.date.split('-'); // от инпута с датой получаю строку и создаю масив
      this.gettime = this.todo.time.split(':'); // от инпута с временем получаю строку и создаю масив

      // собираю число в формате GMT
      this.createformdate = +(new  Date(this.getdate[0], this.getdate[1]-1, this.getdate[2], this.gettime[0], this.gettime[1]));
      // записываю в setTime:
      this.todo.setTime = this.createformdate;

      // Записываю id
      // this.todo.id = this.uid.generate();

      // Отправка таска
      this.todoesService.addTodo(this.todo);

      // this.todoesService.addTodo({
      //   date: this.todo.time,
      //   id: this.uid.generate(),
      //   done: false,
      //   header: this.todo.header,
      //   text: this.todo.text,
      //   time: this.todo.time,
      //   timestamp: new Date(),
      //   setTime: this.createformdate
      // });

      // Перход на роут
      this.router.navigate(['/']);

    }
  }

}
