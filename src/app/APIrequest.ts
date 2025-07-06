
export const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/test/actions/blueprints/test/graph');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}