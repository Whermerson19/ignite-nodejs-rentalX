import createConnection from "../index";

import { v4 } from "uuid";
import { hash } from "bcryptjs";

async function create() {
  const connection = await createConnection("localhost");

  const id = v4();
  const hashedPassword = await hash("admin", 10);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "driverLicense")
    values('${id}', 'admin', 'admin@rentx.com.br', '${hashedPassword}', true, 'now()', 'XXXXX')
    ` 
  );
}

create().then(() => console.log("Admin user has created!"));
