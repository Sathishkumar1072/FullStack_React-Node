const sql = require("mssql");
const express = require("express");
const req = require("express/lib/request");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
const dbData = new sql.ConnectionPool({
  user: "sa",
  password: "Password@123",
  server: "192.168.130.204",
  // user: "Govindarsj",
  // password: "Govind@123",
  // server: "192.168.131.141",
  // database: "Information_Schema",
  database: "Sathish",
  // password: "Gskumar@1072",
  // server: "192.168.131.162",
  // database: "parthashop",
  // port: 3001, // make sure to change port
  options: {
    encrypt: false, // Use this if you're on Windows Azure
  },
});

dbData.connect(async function (error) {
  if (!!error) {
    console.log("throwing error", error);
  } else {
    console.log("Database Connected Successfully..!!");
  }
});

app.post("/add", (req, res) => {
  const { FirstName, LastName, Image } = req.body;
  // const sql = `insert into PersonDetails values ('${FirstName}','${LastName}','${Image}')`;

  const sql = `DECLARE @FirstNameToAdd NVARCHAR(255)
  SET @FirstNameToAdd = '${FirstName}'
  
  
  IF EXISTS (SELECT 1 FROM PersonDetails WHERE  @FirstNameToAdd != '' AND @FirstNameToAdd IS NOT NULL)
  BEGIN
      insert into PersonDetails values ('${FirstName}','${LastName}','${Image}')
      SELECT 'Record with FirstName ' + @FirstNameToAdd + ' Added.' as Result
  END
  ELSE
  BEGIN
      SELECT 'Please enter FirstName to Add' as Result
  END`;
  dbData.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).send(result?.recordset[0].Result); // Set status and send the response
    }
  });
});

app.delete("/delete", (req, res) => {
  const { FirstName } = req.body;
  // const sql = `DELETE FROM PersonDetails WHERE FirstName = '${FirstName}' AND EXISTS (SELECT 1 FROM PersonDetails WHERE FirstName = '${FirstName}')`;
  const sql = `DECLARE @FirstNameToDelete NVARCHAR(255)
  SET @FirstNameToDelete = '${FirstName}'
  
  IF EXISTS (SELECT 1 FROM PersonDetails WHERE FirstName = @FirstNameToDelete AND @FirstNameToDelete != '' )
  BEGIN
      DELETE FROM PersonDetails WHERE FirstName = @FirstNameToDelete
      SELECT 'Record with FirstName ' + @FirstNameToDelete + ' deleted.' as Result
  END
  ELSE
  BEGIN
      SELECT 'Record with FirstName ' + @FirstNameToDelete + ' does not exist for delete.' as Result
  END`;
  dbData.query(sql, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).send(result?.recordset[0].Result);
    }
  });
});
app.put("/update", (req, res) => {
  const { FirstName, LastName, Image } = req.body;
  // const sql = `update PersonDetails set LastName = '${LastName}',Image = '${Image}' where FirstName = '${FirstName}'`;

  const sql = `DECLARE @FirstNameToUpdate NVARCHAR(255)
  SET @FirstNameToUpdate = '${FirstName}'
  
  IF EXISTS (SELECT 1 FROM PersonDetails WHERE FirstName = @FirstNameToUpdate AND @FirstNameToUpdate != '' AND @FirstNameToUpdate IS NOT NULL)
  BEGIN
  update PersonDetails set LastName = '${LastName}',Image = '${Image}' where FirstName = '${FirstName}'
      SELECT 'Record with FirstName ' + @FirstNameToUpdate + ' updated.' as Result
  END
  ELSE
  BEGIN
      SELECT 'Record with FirstName ' + @FirstNameToUpdate + ' does not exist for update.' as Result
  END`;
  dbData.query(sql, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).send(result?.recordset[0].Result);
    }
  });
});

app.get("/", (req, res) => {
  const sql = `select * from PersonDetails order by FirstName asc`;

  dbData.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.recordsets[0]);
    }
  });
});

app.post("/create", (req, res) => {
  const { TableName } = req.body;
  console.log("createTableBackEnd->", TableName);
  const sql = `
  CREATE TABLE ${TableName} (
      FirstName varchar(255),
      LastName varchar(255),
      Image varchar(max),
  );`;
  dbData.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).send("Table Created Successfully"); // Set status and send the response
    }
  });
});

app.post("/newtable/add", (req, res) => {
  const { TableName, FirstName, LastName, Image } = req.body;
  console.log("insertDataBackEnd->", TableName, FirstName, LastName, Image);

  const sql = `DECLARE @FirstNameToAdd NVARCHAR(255)
  SET @FirstNameToAdd = '${FirstName}'
  
  BEGIN
      insert into Sample2 values ('${FirstName}','${LastName}','${Image}')
      SELECT 'Record with FirstName ' + @FirstNameToAdd + ' Added.' as Result

  END`;
  dbData.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log("insertDataBackEndSAMMMMMM-->", result?.recordset[0].Result);
      res.status(200).send(result?.recordset[0].Result); // Set status and send the response
    }
  });
});

app.post("/sam", (req, res) => {
  const { TableName, Fields } = req.body;
  console.log("createTableBackEnd->", TableName,Fields);
  const sql = `
  CREATE TABLE ${TableName} (
    ${ Fields }
  );`;
  console.log("sql->", sql);
  dbData.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).send("Table Created Successfully"); // Set status and send the response
    }
  });
});
app.listen(3006, () => {
  console.log("successfully running 3006");
});

module.exports = dbData;
