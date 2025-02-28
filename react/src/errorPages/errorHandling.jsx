import axios from 'axios';

export async function reportError(error, file) {
  const formData = new FormData();
  formData.append('error', error);
  formData.append('file', file);

  const response = await axios.post('/api/admin/sendErrorLog.php', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response != 1) {
    console.log(response.data);
  }
}