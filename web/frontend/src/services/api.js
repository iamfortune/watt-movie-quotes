const API_BASE_URL = 'http://localhost:3042'; 

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

export const fetchQuotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

export const likeQuote = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: { increment: 1 } }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error liking quote:', error);
    throw error;
  }
};

export const createQuote = async (quoteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

export const deleteQuote = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};