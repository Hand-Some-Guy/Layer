import { mysql } from "mysql2/promise";

let connection: any;

const connectToDatabases = async () => {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "testdb",
      });
      console.log(" 데이터 베이스 연결에 성공하였습니다.");
    } catch (err) {
      console.log(" 데이터 베이스 연결에 실패패하였습니다.");
      throw err;
    }
  }
  return connection;
};
