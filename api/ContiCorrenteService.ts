const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/conti-corrente`;

export const getAllContiCorrente = async (token: string) => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  return await response.json();
};

export const addContoCorrente = async (
  token: string,
  data: {
    nome: string,
    descrizione: string,
    totale: number
  }
) => {
  const response = await fetch(API_URL + "/add", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  return await response.json();
};