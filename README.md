# Its4aDev

Issue tracking system for **Agile** development with **Scrum**

# Key features

- User **signup** and **login**
- Project **collaboration**
- Set up **development teams**
- Build and manage **product backlogs**
  - create user stories, issues, bugs and tasks
  - assign story points and formulate estimates
  - order and prioritize items
- Create **sprints** and manage increments
- Use **Scrum boards** and keep track of work progress

# Installation

```javascript
npm install
```

# Usage

## Signup and Login

### Signup

As a user, I can sign up by providing my full name, email address, a globally unique username and a password.

![Signup validation](/src/assets/gifs/signupValidation.gif)
![Signup](/src/assets/gifs/signup.gif)

### Login

As a user, I can log in with the credentials I provided during signup, including my email and password.

## Projects

As a user, I can create projects, so that we as a team can coordinate the development of a product.

![Create new project](/src/assets/gifs/project.gif)

## Issues

### Create

As a user, I can create issues, so that I can track individual pieces of work that must be completed.

![Create new issue](/src/assets/gifs/createIssue.gif)

### Update

As a user, I can update an issue's properties, including description, summary, priority, type, points and assignee.

![Update issue](/src/assets/gifs/updateIssue.gif)

### Details

As a user, I can display the details of a particular issue.

### Remove

As a user, I can remove issues from the product backlog.

## Comments

As a user, I can manage comments on a specific issue.

## Product backlog

As a user, I can manage a prioritized list of issues, so that the development team can improve the product.

## Sprint backlog

### Create

As a user, I can create a sprint backlog by specifying a sprint's start and end dates as well as its goal.

### Manage

As a user, I can identify the items to be added to fill the sprint backlog, by dragging them from the product backlog.

### Start

As a user, I can start a sprint after having selected the necessary set of items to be completed.

## Scrum board

As a user, I can create boards for my sprints organized into columns.

## Columns

### Manage

As a user, I can add a new column to the Scrum board, in addition to updating its title.

### Utilization

As a user, I can move issues between columns by dragging them, so that their status can change.

## Sprints

### Complete a sprint

As a user, I can end a sprint, so that all the uncompleted issues are moved back into the product backlog.

### Display details

As a user, I can display the details of the currently active, as well as the previously completed sprints.

## Development teams

As a user, I can manage my project's development team, by adding or removing members.
