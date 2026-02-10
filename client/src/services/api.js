const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  /* =========================
     🩺 HEALTH
  ========================== */
  static async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error(`Server health check failed: ${response.status}`);
    }

    return response.json();
  }

  /* =========================
     📅 APPOINTMENTS
  ========================== */

  // Create appointment (Public)
  static async createAppointment(appointmentData) {
    return this._post('/appointments', appointmentData);
  }

  // Get availability slots
  static async getAvailability(date) {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return this._get(
      `/appointments/availability/slots?date=${formattedDate}`
    );
  }

  // Get appointment by reference number
  static async getAppointment(referenceNumber) {
    return this._get(`/appointments/${referenceNumber}`);
  }

  /* =========================
     📧 CONTACTS
  ========================== */

  // Submit contact form (PUBLIC)
  static async submitContact(formData) {
    return this._post('/contacts', formData);
  }

  // (Optional) Admin – get all contacts
  static async getContacts(query = '') {
    return this._get(`/contacts${query}`);
  }

  // (Optional) Admin – get single contact
  static async getContactById(id) {
    return this._get(`/contacts/${id}`);
  }

  /* =========================
     🧠 INTERNAL HELPERS
  ========================== */

  static async _get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message ||
          (data.errors && data.errors.join(', ')) ||
          `Server error: ${response.status}`
      );
    }

    return data;
  }

  static async _post(endpoint, body) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message ||
          (data.errors && data.errors.join(', ')) ||
          `Server error: ${response.status}`
      );
    }

    return data;
  }
}

export default ApiService;
