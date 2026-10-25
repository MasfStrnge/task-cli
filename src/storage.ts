import { promises as fs, readFile } from 'node:fs';
import { type Task } from "./type.js";


export async function readTasksFromFile(): Promise<Task[]> {
    try {

        const tasks = await fs.readFile('tasks.json', 'utf-8');
        return JSON.parse(tasks);
        
    } catch (error) {
        console.error('Error reading tasks from file: ', error);
        return [];
    }
}

export async function writeTaskFromFile(taskData: Task[]) {
    try {

        const tasks = JSON.stringify(taskData, null, 2);
        await fs.writeFile('tasks.json', tasks);

    } catch(error) {
        console.error('Error writing tasks in the file: ', error);
    }

}
