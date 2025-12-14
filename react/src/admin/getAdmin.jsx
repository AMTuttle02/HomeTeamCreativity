import axios from 'axios';

export async function getAdmin() {
  try {
    const response = await axios.get('/api/admin/session.php');
    // axios parses JSON automatically and puts it on response.data
    return response.data && response.data.admin;
  } catch (err) {
    // Bubble up the error after logging so callers can handle it
    // (avoid swallowing errors silently)
    // You can change this to return null instead if you prefer
    console.error('getAdmin error', err);
    throw err;
  }
}