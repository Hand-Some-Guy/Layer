import { Pool } from "mysql2/promise";

export interface DatabaseConnection {
  getConnection: () => Promise<Pool>;
}
