#!/usr/bin/env node
import * as taskService from './taskService.js';

startPrompt();

async function startPrompt() {

    try {

        const argumentos = process.argv.slice(2);
        const command = argumentos[0];

        switch (command) {

            case 'add': {

                const description = argumentos[1] ? argumentos[1].toString() : '';
                taskService.addTask(description);
                console.log("Task was added successfully!!");

                break;

            }

            case 'update': {
                
                const task_id = Number(argumentos[1]);
                const updateDescription = argumentos[2];
                
                if(updateDescription) {

                    taskService.updateTask(task_id!, updateDescription);
                    console.log("Task " + task_id + " was updated successfully!!");

                }

                break;
            }

            case 'delete': {

                const task_id = Number(argumentos[1]);
                taskService.deleteTask(task_id);
                console.log("Task " + task_id + " was deleted successfully!!");
                break;

            }

            case 'mark-in-progress': {
                const task_id = Number(argumentos[1]);
                taskService.markTaskInProgress(task_id);
                console.log("Task " + task_id + " was marked as IN - PROGRESS successfully!!");
                break;

            }

            case 'mark-done': {
                const task_id = Number(argumentos[1]);
                taskService.markTaskDone(task_id);
                console.log("Task " + task_id + " was marked as DONE successfully!!");
                break;

            }

            case 'list': {
                const status = argumentos[1] ?? '';
                const tasks = await taskService.listTasks(status);
                if (tasks) {
                    tasks.forEach(task => {
                        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`);
                        console.log('----------------------------------------------------------------------------------------------------------');
                    });
                }
                break;
            }
            default: {
                console.log("Welcome to Task Tracker 1.0!");
                console.log("Usage: task-cli <command>");
                console.log("List of commands:");
                console.log("task-cli add [description] - to add a task");
                console.log("task-cli update 1 [New Description] - to update an existing task");
                console.log("task-cli delete 1 - to delete an existing task");
                console.log("task-cli mark-in-progress 1 - to mark an existing task as in-progress");
                console.log("task-cli mark-done 1 - to mark an existing task as done");
                console.log("task-cli list [status] - to list tasks by status (todo, in-progress, done) or all tasks if no status is provided");
                break;
            }
        }
        process.exit;
    }
    catch (error) {
        console.error("Type help to see all available commands!", error);
    }
}