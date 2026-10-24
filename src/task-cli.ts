#!/usr/bin/env node
import { addTask, updateTask, deleteTask } from './taskService.js'

startPrompt();

async function startPrompt() {

    try {

        const argumentos = process.argv.slice(2);
        const command = argumentos[0];

        switch (command) {

            case 'add': {

                const description = argumentos[1] ? argumentos[1].toString() : '';
                addTask(description);
                console.log("Task was added successfully!!");

                break;

            }

            case 'update': {
                
                const task_id = Number(argumentos[1]);
                const updateDescription = argumentos[2];
                
                if(updateDescription) {

                    updateTask(task_id!, updateDescription);
                    console.log("Task " + task_id + " was updated successfully!!");

                }

                break;
            }

            case 'delete': {

                const task_id = Number(argumentos[1]);
                deleteTask(task_id);
                console.log("Task " + task_id + " was deleted successfully!!");
                break;

            }

            default: {

                console.log("Welcome to Task Tracker 1.0!");
                console.log("Usage: task-cli <command>");
                console.log("List of commands:")
                console.log("task-cli add [description] - to add a task");
                console.log("task-cli update 1 [New Description] - to update an existing task");
                console.log("task-cli delete 1 - to delete an existing task");
                
                break;
                
            }

        }

        process.exit;

    } catch (error) {

        console.error("Type help to see all available commands!", error);
    }

}

