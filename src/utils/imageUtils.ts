export const getProfileImageUrl = (username: string, type: 'profile' | 'banner') => {
    return `/api/${username}/${type}`; // Dynamically route to the API
  };
  