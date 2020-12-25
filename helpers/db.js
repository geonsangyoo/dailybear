// Standard
import SQLite from 'react-native-sqlite-storage';

export const executeQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction(trans => {
        trans.executeSql(sql, params, (trans, res) => {
            resolve(res);
        },
        (error) => {
            reject(error);
        });
    });
});

const createTable = async () => {
    let result;
    result = await executeQuery(
        `
            CREATE TABLE IF NOT EXISTS setting 
            (
                function VARCHAR(50) NOT NULL,
                content VARCHAR(100) NOT NULL,
                setting_detail VARCHAR(300) NOT NULL,
                created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
                updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
                PRIMARY KEY(function, content)
            );
        `
    , []);
    console.log('Table <setting> Creation => ' + result);

    result = await executeQuery(
        `
            CREATE TABLE IF NOT EXISTS saying 
            (
                year INTEGER NOT NULL,
                month INTEGER NOT NULL,
                saying TEXT,
                mode VARCHAR(50),
                created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
                updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
                PRIMARY KEY(year, month)
            );
        `
    , []);
    console.log('Table <saying> Creation => ' + result);
};

const createTrigger = async () => {
    let result;
    result = await executeQuery(
        `
            CREATE TRIGGER IF NOT EXISTS update_setting
            AFTER UPDATE ON setting
            BEGIN
                UPDATE saying SET updated_at = DATETIME('now', 'localtime')
                WHERE rowid == NEW.rowid;
            END;
        `    
    , []);
    console.log('Trigger <update_setting> Creation => ' + result);

    result = await executeQuery(
        `
            CREATE TRIGGER IF NOT EXISTS update_saying
            AFTER UPDATE ON saying
            BEGIN
                UPDATE saying SET updated_at = DATETIME('now', 'localtime')
                WHERE rowid == NEW.rowid;
            END;
        `    
    , []);
    console.log('Trigger <update_saying> Creation => ' + result);
};

const dropTables = async () => {
    let result;
    result = await executeQuery(
        `
            DROP TABLE IF EXISTS setting;
        `
    , []);
    console.log(' TABLE <setting> is dropped! => ' + result);

    result = await executeQuery(
        `
            DROP TABLE IF EXISTS saying;
        `
    , []);
    console.log('TABLE <saying> is dropped! => ' + result);
};

export const fetchSettings = async (functionName) => {
    let fetchedRows = await executeQuery(
        `
            SELECT * FROM setting WHERE function = ?;
        `
    , [functionName]);
    return fetchedRows;
};

export const init = async () => {
    SQLite.DEBUG(true);
    /**
     * Schema Init
     */
    // await dropTables();
    await createTable();
    createTrigger();
};