const { app } = require('@azure/functions');
const db = require('../db'); // Assuming you have a db.js file that handles database operations

app.http('deleteExample', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed a DELETE request for url "${request.url}"`);

        const query = `delete from tblEmployee where EmployeeID = ${request.params.id}`
        if (request.params.id) {
            try {
                await db.runQuery(query); // Assuming you have a deleteData function in your db.js file
                return { status: 200, body: 'Data deleted successfully' };
            } catch (error) {
                context.log(`Error deleting data: ${error}`);
                return { status: 500, body: 'Error deleting data' };
            }
        } else {
            return { status: 400, body: 'No id provided' };
        }
    }
});