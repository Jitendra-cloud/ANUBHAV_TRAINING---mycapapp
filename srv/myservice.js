const cds = require('@sap/cds');
const { employees } = cds.entities("mycapapp.db.master")


module.exports = (srv) => {
    srv.on('jitendracapm', (req,res) => {
        return "Hello " + req.data.input;
    });

    srv.on("READ", "EmployeeSrv", async(req, res) => {
        const results = await cds.tx(req).run(SELECT.from(employees).where(
            {
                "salaryAmount" : {
                    ">" : 90000
                } 
            }
        ));
        return results;
    })
}