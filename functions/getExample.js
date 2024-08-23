const { app } = require('@azure/functions');
const db = require('../db'); // Assuming you have a db.js file that handles database operations

app.http('getEmployee', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed a GET request for url "${request.url}"`);
        const id = request.query.get('id');
        // If the id exists, we fetch the corresponding data from the database
        if (id) {
            try {
                const query = `select * from tblEmployee where EmployeeID = '${id}'`;
                const data = await db.runQuery(query); // Assuming you have a getEmployee function in your db.js file
                return { body: data };
            } catch (error) {
                context.log(`Error fetching data: ${error}`);
                return { status: 500, body: 'Error fetching data' };
            }
        } else {
            return { status: 400, body: 'No id provided' };
        }
    }
});