class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Profile API
  async getProfile(): Promise<{ profile: any }> {
    return this.request('/auth/profile')
  }

  async updateProfile(data: UpdateProfileRequest): Promise<{ profile: any }> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: data,
    })
  }

  // Clinics API
  async getClinics(params?: {
    search?: string
    specialty?: string
    service?: string
    location?: string
    sortBy?: string
    limit?: number
    offset?: number
  }): Promise<{
    clinics: Clinic[]
    total: number
    limit: number
    offset: number
  }> {
    const searchParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request(`/clinics${query}`)
  }

  async getClinic(id: string): Promise<{ clinic: Clinic }> {
    return this.request(`/clinics/${id}`)
  }

  // Specialists API
  async getSpecialists(params?: {
    specialty?: string
    clinicId?: string
    available?: boolean
    limit?: number
    offset?: number
  }): Promise<{ specialists: Specialist[] }> {
    const searchParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request(`/specialists${query}`)
  }

  // Appointments API
  async getAppointments(params?: {
    status?: string
    upcoming?: boolean
  }): Promise<{ appointments: Appointment[] }> {
    const searchParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request(`/appointments${query}`)
  }

  async getAppointment(id: string): Promise<{ appointment: Appointment }> {
    return this.request(`/appointments/${id}`)
  }

  async createAppointment(data: CreateAppointmentRequest): Promise<{ appointment: Appointment }> {
    return this.request('/appointments', {
      method: 'POST',
      body: data,
    })
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<{ appointment: Appointment }> {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async cancelAppointment(id: string): Promise<{ success: boolean }> {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    })
  }

  // Availability API
  async getAvailability(params: {
    specialistId: string
    date: string
    clinicId?: string
  }): Promise<{ availableSlots: string[] }> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value)
      }
    })

    return this.request(`/availability?${searchParams.toString()}`)
  }

  // Reviews API
  async getReviews(params?: {
    clinicId?: string
    specialistId?: string
    limit?: number
    offset?: number
  }): Promise<{ reviews: Review[] }> {
    const searchParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request(`/reviews${query}`)
  }

  async createReview(data: CreateReviewRequest): Promise<{ review: Review }> {
    return this.request('/reviews', {
      method: 'POST',
      body: data,
    })
  }
}

// Create singleton instance
export const apiClient = new ApiClient()