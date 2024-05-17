
import User from "@/models/user.model";
import fs from 'fs'
/**
 * The function exports data from a MongoDB collection to a JSON file using Node.js and TypeScript.
*/




//  export for mongoose 


// const exportData = async function () {
    //     try {
        //         const data = await User.find({});
        
        //         // Export data to JSON file
        //         const jsonData = JSON.stringify(data, null, 2);
        //         fs.writeFileSync('exportedData.json', jsonData);
//         console.log('Data exported to exportedData.json');
//     } catch (err) {
    //         console.error('Error querying data:', err);
    //     }
    // }
    



    function generateCreateTableStatement() {
        const fields = [];
    
        // Add the primary key field
        fields.push('id INT AUTO_INCREMENT PRIMARY KEY');
    
        // Map schema fields to MySQL data types
        for (const [key, value] of Object.entries(User.schema.paths)) {
            // Skip the MongoDB _id field
            if (key === '_id') {
                continue;
            }
    
            let fieldType;
            switch (value.instance) {
                case 'String':
                    fieldType = 'VARCHAR(255)';
                    break;
                case 'Number':
                    fieldType = 'INT';
                    break;
                case 'Boolean':
                    fieldType = 'BOOLEAN';
                    break;
                case 'Date':
                    fieldType = 'DATETIME';
                    break;
                default:
                    continue;
            }
    
            // Add the field definition to the list
            fields.push(`${key} ${fieldType}`);
        }
    
        // Combine all field definitions into a single string
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                ${fields.join(',\n')}
            );
        `;
    
        return createTableQuery;
    }
    
    
    // export for sql 
    export const exportToSQL = async function () {
        try {
          
    
            // Fetch all records from the 'users' collection
            const users = await User.find();
    
            // Create the .sql file path
            const fileStream = fs.createWriteStream('exportedData.sql');
    
            // Generate and write the CREATE TABLE statement
            const createTableQuery = generateCreateTableStatement();
            fileStream.write(createTableQuery + '\n');
    
            // Write the INSERT statements for each user document
            for (const user of users) {
                const sql = `
                    INSERT INTO users (username, email, password, isVerified, isAdmin, createdAt, updatedAt, __v)
                    VALUES (
                        '${user.username}',
                        '${user.email}',
                        '${user.password}',
                        ${user.isVerified},
                        ${user.isAdmin},
                        '${user.createdAt.toISOString()}',
                                    '${user.updatedAt.toISOString()}',   
                        ${user.__v}
                    );
                `;
                fileStream.write(sql + '\n');
            }
    
            // Close the file stream
            fileStream.end();
    
            console.log(`Data exported  successfully.`);
        } catch (err) {
            console.error('Error exporting data:', err);
        } 
    }
    
    // Run the export function