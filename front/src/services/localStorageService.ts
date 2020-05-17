import { TaskType } from "@/types.ts";

export async function getLocalStorageData(): Promise<TaskType[]> {
    const localData = localStorage.getItem("tasks");
    return localData === null ? [] : JSON.parse(localData);
}

export async function updateLocalStorageTasks(data: TaskType[]): Promise<void> {
    localStorage.setItem("tasks", JSON.stringify(data));
}
