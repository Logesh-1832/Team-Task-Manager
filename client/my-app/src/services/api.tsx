const BASE_URL = 'http://localhost:3000';

export async function getData(endpoint: any) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error('GET request failed');
    return await response.json();
}

export async function postData(endpoint: any, payload: any) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'POST request failed');
    return data;
}

export async function putData(endpoint: any, payload: any) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'PUT request failed');
    return data;
}

// Example usage:
// getData('projects').then(console.log).catch(console.error);
// postData('projects', { name: 'Test', description: 'Desc', status: 'active' });
// putData('projects/1', { name: 'Updated', description: 'Updated desc', status: 'inactive' });

export default { getData, postData, putData };
