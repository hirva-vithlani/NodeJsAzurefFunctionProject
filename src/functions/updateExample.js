const { app } = require('@azure/functions');
const db = require('../db'); // Assuming you have a db.js file that handles database operations

app.http('updateEmployee', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed a PUT request for url "${request.url}"`);

        const data = request.body;
        const query = `Update tblEmployee set Name = '${data.Name}', Email = '${data.Email}', Department=${data.Department}, DateOfBirth='${data.DateOfBirth}', Gender='${data.Gender}' where EmployeeID = ${data.EmployeeID}`

        if (data) {
            try {
                const updatedEmployee = await new db.runQuery(query); // Assuming you have an updateData function in your db.js file
                return { status: 200, body: updatedEmployee };
            } catch (error) {
                context.log(`Error updating data: ${error}`);
                return { status: 500, body: 'Error updating data' };
            }
        } else {
            return { status: 400, body: 'No id or name provided' };
        }
    }
});