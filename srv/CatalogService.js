module.exports = cds.service.impl( async function( ){

    // const { EmployeeSet, AddressSet } = this.entities;

    const EmployeeSet  = this.entities.EmployeeSet;
    const POs  = this.entities.POs;

    this.before(['UPDATE','CREATE'], EmployeeSet, (req, res) => {
        console.log("aa gaya " + JSON.stringify(req.data));
        var jasondata = req.data;
        if(jasondata.hasOwnProperty('salaryAmount')){
            const salary = parseFloat(req.data.salaryAmount);
            if(salary > 1000000){
                req.error(500, "Bro, the salary cannot be above 1 Million")
            }
        }
    });

    this.after('READ', EmployeeSet, (req, res) => {
        // console.log(JSON.stringify(res));
        var finalData = [];
        for (let i = 0; i < res.results.length; i++) {
            const element = res.results[i];
            element.salaryAmount = element.salaryAmount * 1.10;
            finalData.push(element);
        }
        finalData.push({
            "ID": "DUMMY",
            "nameFirst": "Michel",
            "nameLast": "Saylor"
        })
        res.results = finalData;
    });

    this.on('getMostExpensiveOrder', async (req, res) => {
        try {
            const tx = cds.tx(req);

            // let csn = cds.compile(POs);

            const myData = await tx.read(POs).orderBy({
                "GROSS_AMOUNT": 'desc'
            }).limit(1);

            return myData;
        } catch (error) {
            return "Hey Amigo !" + error.toString();
        }
    });

    this.on('boost', async(req, res) => {
        try{
            //Programmatically check @ rutime, if the user have the editor permission
            req.user.is('Editor') || req.reject(403)
            const POID = req.params[0];
            console.log("Bro your PO id was " + JSON.stringify(POID));
            const tx = cds.tx(req);
            await tx.update(POs).with({
                "GROSS_AMOUNT" : { '+=' : 20000 }
            }).where(POID);
            const reply = tx.read(POs).where(POID);
            return reply;
        } catch (error) {
            return "Hey Amigo !" + error.toString();
        }
    });

});