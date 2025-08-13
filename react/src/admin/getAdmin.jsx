import axios from 'axios';

export async function getAdmin() {
  await axios.get("/api/admin/session.php")
    .then((response) => response.json())
    .then((data) => {
      return(data.admin);
    });
}