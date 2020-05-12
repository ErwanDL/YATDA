type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

async function myFetch(
    endpoint: string,
    method: RequestMethod = "GET",
    body?: string,
): Promise<any> {
    const response = await fetch(process.env.VUE_APP_API_BASE_URL + endpoint, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body,
    });
    let responseData: string;
    try {
        responseData = await response.json();
    } catch {
        responseData = "No data provided";
    }
    return response.ok ? responseData : Promise.reject(responseData);
}

export async function apiGet(endpoint: string): Promise<any> {
    return myFetch(endpoint, "GET");
}

export async function apiPost(endpoint: string, body: string): Promise<any> {
    return myFetch(endpoint, "POST", body);
}
export async function apiPut(endpoint: string, body: string): Promise<any> {
    return myFetch(endpoint, "PUT", body);
}

export async function apiDelete(endpoint: string): Promise<any> {
    return myFetch(endpoint, "DELETE");
}
