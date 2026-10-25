import { type Task } from "./type.js";
import { readTasksFromFile, writeTaskFromFile } from "./storage.js";

export async function addTask(description: string): Promise<void> {

    const tasks: Task[] = await readTasksFromFile();

    const novaTask: Task = {
        id: tasks.length + 1,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(novaTask);
    writeTaskFromFile(tasks);

};

export async function updateTask(task_id: number, newDescription: string): Promise<void> {
    
    try {

    const tasks: Task[] = await readTasksFromFile();

    const task = tasks.find(t => t.id === task_id);

    if(task)   {

        task.description = newDescription;
        task.updatedAt = new Date().toISOString();
        
        await writeTaskFromFile(tasks)

    } 

    } catch(error) {

        console.error("Error in updating task's description!", error);

    }
   
}

export async function deleteTask(task_id: number): Promise<void> {
    try {
        
        const tasks: Task[] = await readTasksFromFile();

        const taskList: Task[] = tasks.filter(t => t.id != task_id);

        await writeTaskFromFile(taskList);

    } catch(error) {

        console.error("Error in deleting the task!", error);
    }
}

export async function markTaskInProgress(task_id: Number): Promise<void> {
   try {
    //será que tem que ter await antes do readTasksFromFile() porque a função retorna uma promessa?
        const array_tasks: Task[] = await readTasksFromFile();

        const task = array_tasks.find(task => task.id == task_id);

        if(task) {
            task.status = "in-progress";
            await writeTaskFromFile(array_tasks);

            } 

    }catch(error) {

        console.log("Error in changing task's status!", error);
    }        
        
}



