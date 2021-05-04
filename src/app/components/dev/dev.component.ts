import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { ProjectService } from 'src/app/services/project/project.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
})
export class DevComponent implements OnInit {
  @Input() dev: User;
  @Input() projectId: string;

  @Output() userRemovedFromProject = new EventEmitter<User>();

  constructor(
    private projectService: ProjectService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onRemove() {
    // remove user from project
    this.projectService
      .removeUserFromProject(this.projectId, this.dev.id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log(
            `USER ${this.dev.id} removed from project ${this.projectId} ==> ${response}`
          );

          // emit event, announce dev removed from project
          this.userRemovedFromProject.emit(this.dev);
        },
      });
  }

  canRemove() {
    return this.storageService.getUserIdentifier() != this.dev.id;
  }
}
