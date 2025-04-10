import Cookies from "js-cookie";

// const API_BASE_URL = "http://localhost:5134";
const API_BASE_URL = "https://cachechan.squareweb.app";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface LoginResponse {
  token: string;
  apiKey: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface Metrics {
  totalRequests: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
}

interface CacheItem {
  key: string;
  value: any;
  ttl?: number;
  type: string;
  size: string;
  created: string;
  status: string;
}

interface SupportMessage {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userEmail: string;
  isAdmin: boolean;
  message: string;
  timestamp: string;
  read: boolean;
}

interface SupportThread {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: "open" | "closed" | "pending";
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: SupportMessage[];
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface UpdateProfileDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export class CacheChanApi {
  private get token(): string | null {
    return Cookies.get("token") || null;
  }

  private get apiKey(): string | null {
    return Cookies.get("apiKey") || null;
  }

  private get user(): any {
    const userStr = Cookies.get("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  private set token(value: string | null) {
    if (value) Cookies.set("token", value, { secure: true, sameSite: "Strict" });
    else Cookies.remove("token");
  }

  private set apiKey(value: string | null) {
    if (value) Cookies.set("apiKey", value, { secure: true, sameSite: "Strict" });
    else Cookies.remove("apiKey");
  }

  private set user(value: any) {
    if (value) Cookies.set("user", JSON.stringify(value), { secure: true, sameSite: "Strict" });
    else Cookies.remove("user");
  }

  isAuthenticated() {
    return !!this.token && !!this.apiKey;
  }

  getUser() {
    return this.user;
  }

  clearCredentials() {
    Cookies.remove("token");
    Cookies.remove("apiKey");
    Cookies.remove("user");
  }

  private async request<T>(
    endpoint: string,
    method = "GET",
    body?: any,
    useApiKey = true
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (useApiKey && this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Ocorreu um erro na requisição",
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>(
      "/login",
      "POST",
      { email, password },
      false
    );

    if (response.success && response.data) {
      this.token = response.data.token;
      this.apiKey = response.data.apiKey;
      this.user = response.data.user;
    }

    return response;
  }

  async register(name: string, email: string, password: string): Promise<ApiResponse<any>> {
    return this.request<any>("/register", "POST", { username: name, email, password }, false);
  }

  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>("/users/me");
  }

  async updateUserProfile(dto: UpdateProfileDto): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>("/users/me", "PUT", dto);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    const dto: ChangePasswordDto = { currentPassword, newPassword };
    return this.request<any>("/users/me/password", "POST", dto);
  }

  async getCacheItem(key: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/cache/${key}`);
  }

  async setCacheItem(key: string, value: any, ttl?: number): Promise<ApiResponse<any>> {
    return this.request<any>("/cache", "POST", { key, value, ttl });
  }

  async deleteCacheItem(key: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/cache/${key}`, "DELETE");
  }

  async listCacheItems(): Promise<ApiResponse<CacheItem[]>> {
    return this.request<CacheItem[]>("/cache");
  }

  async getMetrics(): Promise<ApiResponse<Metrics>> {
    return this.request<Metrics>("/metrics");
  }

  async checkStatus(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>("/status", "GET", undefined, false);
  }

  async listApiKeys(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>("/users/api-keys");
  }

  async createApiKey(
    name: string,
    permissions: string[]
  ): Promise<ApiResponse<{ apiKey: string }>> {
    return this.request<{ apiKey: string }>("/users/api-keys", "POST", { name, permissions });
  }

  async updateApiKeyStatus(id: string, active: boolean): Promise<ApiResponse<any>> {
    return this.request<any>(`/users/api-keys/${id}`, "PATCH", { active });
  }

  async deleteApiKey(id: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/users/api-keys/${id}`, "DELETE");
  }

  async listSupportThreads(): Promise<ApiResponse<SupportThread[]>> {
    return this.request<SupportThread[]>("/support/threads");
  }

  async listAllSupportThreads(): Promise<ApiResponse<SupportThread[]>> {
    return this.request<SupportThread[]>("/support/threads?all=true");
  }

  async getSupportThread(threadId: string): Promise<ApiResponse<SupportThread>> {
    return this.request<SupportThread>(`/support/threads/${threadId}`);
  }

  async createSupportThread(subject: string, message: string): Promise<ApiResponse<SupportThread>> {
    return this.request<SupportThread>("/support/threads", "POST", { subject, message });
  }

  async sendSupportMessage(
    threadId: string,
    message: string,
    isAdmin: boolean
  ): Promise<ApiResponse<SupportMessage>> {
    return this.request<SupportMessage>(`/support/threads/${threadId}/messages`, "POST", {
      message,
      isAdmin,
    });
  }

  async markThreadAsRead(threadId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/support/threads/${threadId}/read`, "POST");
  }

  async closeSupportThread(threadId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/support/threads/${threadId}/close`, "POST");
  }

  async reopenSupportThread(threadId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/support/threads/${threadId}/reopen`, "POST");
  }
}

export const api = new CacheChanApi();
