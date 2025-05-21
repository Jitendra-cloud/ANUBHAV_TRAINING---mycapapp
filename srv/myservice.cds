using { mycapapp.db.master.employees } from '../db/data-model';


service MyService @(path: 'SimpleFunctionService') {

    function jitendracapm(input : String(80)) returns String;

    entity EmployeeSrv as projection on employees;
}