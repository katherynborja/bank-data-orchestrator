const axios = require('axios');

async function testBackend() {
    const baseUrl = 'http://localhost:3000/api';

    try {
        console.log('1. Attempting Login...');
        const loginRes = await axios.post(`${baseUrl}/auth/login`, {
            username: 'admin',
            password: 'admin123'
        });

        if (!loginRes.data.success) {
            throw new Error('Login failed');
        }

        const token = loginRes.data.token;
        console.log('Login Successful! Token obtained.');

        console.log('2. Requesting External Data with Token...');
        const dataRes = await axios.get(`${baseUrl}/external-data`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Data Request Status:', dataRes.status);
        console.log('Data Count:', dataRes.data.data.length);
        console.log('SUCCESS: Backend is working correctly!');

    } catch (error) {
        console.error('FAILED: Backend test failed.');
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

testBackend();
