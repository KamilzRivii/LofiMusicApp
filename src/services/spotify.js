import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';

export const getSpotifyToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!data.access_token) {
      console.error('Brak access_token w odpowiedzi:', data);
      throw new Error('Nie udało się uzyskać tokenu Spotify.');
    }

    return data.access_token;
  } catch (error) {
    console.error('Błąd podczas pobierania tokenu:', error);
    return null;
  }
};
