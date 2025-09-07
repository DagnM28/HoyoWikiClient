const API_BASE_URL = 'http://localhost:5203/api/v1';

export async function signInApi(data: { username: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Login failed.');
    }

    localStorage.setItem('authToken', result.token);

    return result;
}

export async function signUpApi(data: { username: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Registration failed.');
    }

    return result;
}

export async function verifyOtpApi(data: { email: string; otp: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Invalid OTP.');
    }

    return result;
}