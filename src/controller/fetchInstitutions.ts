export const fetchInstitutions = async () => {
  try {
      const response = await fetch('/api/institutions');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching dataaaa:', error);
      throw error;
  }
};