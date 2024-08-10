export interface Payment {
  id: number;
  name: string;
  active: boolean;
  description: string | null;
  api_key: string | null;
  private_key: string | null;
  url_callback: string | null;
  setting_id: number;
}
