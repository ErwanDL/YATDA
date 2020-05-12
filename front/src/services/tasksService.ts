import { apiGet, apiPut } from "@/services/myFetch.ts";
import { TaskType } from "@/types.ts";

export async function getUserData(username: string): Promise<TaskType[]> {
    const responseData = await apiGet(`/users/${username}`);
    return responseData;
}

export async function putUpdatedUserData(
    username: string,
    data: TaskType[],
): Promise<void> {
    await apiPut(`/users/${username}`, JSON.stringify(data));
}
