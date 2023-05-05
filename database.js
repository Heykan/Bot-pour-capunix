const { Database } = require("sqlite3");
let db = new Database("./bot.db3");

console.log('Bdd connecté !');

exports.GET = (table, idName, id) => {
    return new Promise((resolve, reject) => {
        let sql = id ? `select * from ${table} where ${idName} = ${id}` : `select * from ${table}`;
        db.get(sql, (err, row) => {
            if (err) resolve(null);
            else resolve(row);
        });
    });
}

exports.NOT_NULL = (table, idName) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from ${table} where ${idName} is not null`;
        db.all(sql, (err, rows) => {
            if (err) resolve(null);
            else resolve(rows);
        });
    });
}

exports.ALL = (table, idName, id) => {
    return new Promise((resolve, reject) => {
        let sql = id ? `select * from ${table} where ${idName} = ${id}` : `select * from ${table}`;
        db.all(sql, (err, rows) => {
            if (err) resolve(null);
            else resolve(rows);
        });
    });
}

exports.INSERT = (table, values, column) => {
    return new Promise((resolve, reject) => {
        let placeholders = values.map(() => '(?)').join(",");
        let col = column ? column.map(c => c).join(",") : null;
        let sql = col ? `insert into ${table} (${col}) values (${placeholders})` : `insert into ${table} values (${placeholders})`;
        db.run(sql, values, (err) => {
            if (err) {
                resolve(false);
                console.log(err);
            }
            else resolve(true);
        });
    });
}

exports.UPDATE = (table, column, value, idName, id) => {
    return new Promise((resolve, reject) => {
        let sql;
        if (Array.isArray(column)){
            let textValue = '';
            for (let i = 0; i < column.length; ++i){
                if (i >= column.length - 1)
                    textValue += `${column[i]} = ${value[i] == null ? 'NULL' : value[i]}`;
                else
                    textValue += `${column[i]} = ${value[i] == null ? 'NULL' : value[i]},`;
            }
                sql = `update ${table} set ${textValue} where ${idName} = ${id}`;
        }
        else
            sql = value == null ? `update ${table} set ${column} = NULL where ${idName} = ${id}` : `update ${table} set ${column} = '${value}' where ${idName} = ${id}`;

        db.run(sql, (err) => {
            //console.log(column, value, idName, id);
            if (err) resolve(false);
            else resolve(true);
        });
    });
}

exports.LAST = (table, idName) => {
    return new Promise((resolve, reject) => {
        // SELECT * FROM Table ORDER BY ID DESC LIMIT 1
        let sql = `select * from ${table} order by ${idName} desc limit 1`;
        db.get(sql, (err, row) => {
            if (err) resolve(null);
            else resolve(row);
        });
    });
}

exports.DELETE = (table, idName, id) => {
    return new Promise((resolve, reject) => {
        let sql = `delete from ${table} where ${idName} = ${id}`;
        db.run(sql, (err) => {
            if (err) resolve(false);
            else resolve(true);
        });
    });
}