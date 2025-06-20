function getValues() {
  return {
    id: document.getElementById('idInstance').value.trim(),
    token: document.getElementById('apiTokenInstance').value.trim()
  };
}

function showResponse(data) {
  document.getElementById('response').textContent = JSON.stringify(data, null, 2);
}

function showError(error) {
  document.getElementById('response').textContent = 'Ошибка: ' + error.message;
}

async function getSettings() {
  const { id, token } = getValues();
  try {
    const res = await fetch(`https://api.green-api.com/waInstance${id}/getSettings/${token}`);
    showResponse(await res.json());
  } catch (error) {
    showError(error);
  }
}

async function getStateInstance() {
  const { id, token } = getValues();
  try {
    const res = await fetch(`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`);
    showResponse(await res.json());
  } catch (error) {
    showError(error);
  }
}

async function sendMessage() {
  const { id, token } = getValues();
  const chatId = document.getElementById('chatId').value.trim() + '@c.us';
  const message = document.getElementById('message').value.trim();

  try {
    const res = await fetch(`https://api.green-api.com/waInstance${id}/sendMessage/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message })
    });
    showResponse(await res.json());
  } catch (error) {
    showError(error);
  }
}

async function sendFile() {
  const { id, token } = getValues();
  const filePhone = document.getElementById('filePhone').value.trim() + '@c.us';
  const urlFile = document.getElementById('fileUrl').value.trim();

  // Извлекаем имя файла из URL
  const fileName = urlFile.split('/').pop().split('?')[0] || 'file.jpg';

  try {
    const res = await fetch(`https://api.green-api.com/waInstance${id}/sendFileByUrl/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: filePhone,
        urlFile,
        fileName
      })
    });
    showResponse(await res.json());
  } catch (error) {
    showError(error);
  }
}
