export async function get<T>(url: string): Promise<T> {
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`GET ${url} failed: ${res.statusText}`);
    }
    
    return res.json() as Promise<T>;
}

export async function post<T, U>(url: string, payload: U): Promise<T> {
    const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
      
    if (!res.ok) {
        throw new Error(`POST ${url} failed: ${res.statusText}`);
    }
    
    return res.json() as Promise<T>;
}

export async function put<T, U>(url: string, payload: U): Promise<T> {
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
        throw new Error(`PUT ${url} failed: ${res.statusText}`);
    }
    
    return res.json() as Promise<T>;
}

export async function deleteData<T, U>(url: string, payload: U): Promise<T> {
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
        throw new Error(`DELETE ${url} failed: ${res.statusText}`);
    }
    
    return res.json() as Promise<T>;
}
