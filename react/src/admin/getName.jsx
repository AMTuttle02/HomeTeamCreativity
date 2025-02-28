import axios from 'axios';

export async function getFirstName() {
  const response = await axios.get("/api/admin/session.php");
  return response.data.first_name; 
}