const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Health check
  static async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`Server health check failed: ${response.status}`);
    }
    return response.json();
  }

  // Create appointment
  static async createAppointment(appointmentData) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = data.message || 
                          (data.errors && data.errors.join(', ')) || 
                          `Server error: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  }

  // Get availability
  static async getAvailability(date) {
    // Format date as YYYY-MM-DD
    const dateObj = new Date(date);
    const formattedDate = dateObj.toISOString().split('T')[0];
    
    const response = await fetch(`${API_BASE_URL}/appointments/availability/slots?date=${formattedDate}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch availability: ${response.status}`);
    }
    
    return response.json();
  }

  // Get appointment by reference
  static async getAppointment(referenceNumber) {
    const response = await fetch(`${API_BASE_URL}/appointments/${referenceNumber}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch appointment: ${response.status}`);
    }
    
    return response.json();
  }

  // Submit contact form - UPDATED
  static async submitContact(formData) {
    console.log('📧 Sending contact data:', formData);
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      console.log('📧 Contact response:', {
        status: response.status,
        ok: response.ok,
        data: data
      });
      
      if (!response.ok) {
        const errorMessage = data.message || 
                            (data.errors && data.errors.join(', ')) || 
                            `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
      
    } catch (error) {
      console.error('❌ Contact API error:', error);
      throw error;
    }
  }

  // Test contact endpoint
  static async testContactEndpoint() {
    const response = await fetch(`${API_BASE_URL}/contact/debug`);
    if (!response.ok) {
      throw new Error(`Contact endpoint test failed: ${response.status}`);
    }
    return response.json();
  }
}

export default ApiService;