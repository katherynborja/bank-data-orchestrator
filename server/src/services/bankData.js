const axios = require('axios');

/**
 * Fetches and transforms bank data from external API
 * @returns {Promise<Array>} Cleaned bank data
 */
async function fetchBankData() {
  try {
    const apiUrl = process.env.EXTERNAL_API_URL || 'https://jsonplaceholder.typicode.com/users';

    console.log('[BankDataService] Fetching from:', apiUrl);

    // Fetch data from external API
    const response = await axios.get(apiUrl);
    console.log('[BankDataService] External API Status:', response.status);

    // Transform data to clean format
    const cleanedData = response.data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      companyName: user.company?.name || 'N/A'
    }));

    console.log('[BankDataService] Data transformed, count:', cleanedData.length);
    return cleanedData;
  } catch (error) {
    console.error('[BankDataService] Error detail:', error.message);
    if (error.response) {
      console.error('[BankDataService] Response status:', error.response.status);
      console.error('[BankDataService] Response data:', error.response.data);
    }
    throw new Error('Failed to fetch data from external API');
  }
}

module.exports = {
  fetchBankData
};
