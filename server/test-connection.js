const axios = require('axios');

async function testConnection() {
    console.log('Testing connection to JSONPlaceholder...');
    try {
        const start = Date.now();
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const duration = Date.now() - start;
        console.log(`Success! Status: ${response.status}`);
        console.log(`Duration: ${duration}ms`);
        console.log(`Data count: ${response.data.length}`);
    } catch (error) {
        console.error('Connection failed!');
        console.error('Error:', error.message);
        if (error.code) console.error('Code:', error.code);
        if (error.response) console.error('Response Status:', error.response.status);
    }
}

testConnection();
