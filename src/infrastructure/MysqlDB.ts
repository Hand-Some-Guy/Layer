import { createPool, Pool, PoolOptions } from "mysql2/promise";
import { DatabaseConnection } from "./db";

let pool: Pool | null = null;

const connectToDatabases = async () => {
  if (!pool) {
    try {
      const poolConfig: PoolOptions = {
        host: "localhost",
        user: "root",
        password: "password",
        database: "testdb",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };
      pool = createPool(poolConfig);
      console.log("데이터베이스 풀 연결에 성공하였습니다.");

      await pool.getConnection();
    } catch (err) {
      console.log(" 데이터 베이스 연결에 실패패하였습니다.");
      throw err;
    }
  }
  return pool;
};

const closeDatabasePool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("데이터베이스 풀 연결이 종료되었습니다.");
  }
};

export class DatabaseConnectionImpl implements DatabaseConnection {
  async getConnection(): Promise<Pool> {
    return await connectToDatabases();
  }
}
