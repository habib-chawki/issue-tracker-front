import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { ProjectService } from 'src/app/services/api/project/project.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() projectId: string;

  @Output() userAddedToProject = new EventEmitter<User>();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}

  onInvite() {
    // add user to project
    this.projectService
      .addUserToProject(this.projectId, this.user.id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log(
            `USER ${this.user.id} added to project ${this.projectId} ==> ${response}`
          );

          // communicate invitation success to parent component (users)
          this.userAddedToProject.emit(this.user);
        },
      });
  }
}
