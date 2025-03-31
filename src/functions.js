
export const fetchExchangeRate = async () => {
    try {
      const response = await fetch('https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=4188e8eced62d2be8ce1388c8f9e69ebacc815e55bad2a9b1046161ea30eaefc');
      const data = await response.json();
      return parseFloat(data.bmx.series[0].datos[0].dato);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return 20; // Valor por defecto si falla la API
    }
  };