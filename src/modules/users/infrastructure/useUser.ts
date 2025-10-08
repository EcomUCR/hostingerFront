// src/hooks/useUser.ts
import { useEffect, useState } from "react";
import api from "../../../lib/axios";

export type UserRole = "SELLER" | "CUSTOMER" | "ADMIN" | null;

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category_id?: number | null;
  business_name?: string | null;
  tax_id?: string | null;
  legal_type?: string | null;
  support_email?: string | null;
  support_phone?: string | null;
  status?: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
        setRole(data.role ?? null);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, role, loading };
}
