// Your code here
function createEmployeeRecord(empArray) {
  const empObject = {
    "firstName": empArray[0],
    "familyName": empArray[1],
    "title": empArray[2],
    "payPerHour": empArray[3],
    "timeInEvents": [],
    "timeOutEvents": [],
  };
  return empObject;
}

function createEmployeeRecords(arrayArray) {
     const newArray = arrayArray.map((e) => {
               return createEmployeeRecord(e);
          });
     return newArray;
};

function createTimeInEvent(employeeObject, dateStamp) {
     const dateAndTime = dateStamp.split(" ");
     const timeAsInteger = parseInt(dateAndTime[1],10);

    employeeObject.timeInEvents.push({
          "type" : "TimeIn",
          "date" : dateAndTime[0],
          "hour" : timeAsInteger
     });
     return employeeObject;
}
function createTimeOutEvent(employeeObject,dateStamp) {
     const dateAndTime = dateStamp.split(" ");
     const timeAsInteger = parseInt(dateAndTime[1],10);

    employeeObject.timeOutEvents.push({
          "type" : "TimeOut",
          "date" : dateAndTime[0],
          "hour" : timeAsInteger
     });
     return employeeObject;
}

function hoursWorkedOnDate(employeeObject,date) {
     const timeOut = employeeObject.timeOutEvents.find((element) => {
          return element.date == date;
     }).hour;
     const timeIn = employeeObject.timeInEvents.find((element) => {
          return element.date == date;
     }).hour;
     return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(employeeObject,date) {
     const payRate = employeeObject.payPerHour;
     const hours = hoursWorkedOnDate(employeeObject,date);
     return hours * payRate;
}
function allWagesFor(employeeObject) {
//reduce start at 0 
const datesWorked = employeeObject.timeInEvents.map((date) => {
     return date.date;   
 })
const wagesEarned = datesWorked.map((e) => {
    return wagesEarnedOnDate(employeeObject,e);
})
return wagesEarned.reduce((a,b) => {
     return a+b;
},0)

}
function findEmployeeByFirstName(srcArray,name) {
     return srcArray.find((element) => {
          return element.firstName == name;
     });
}
function calculatePayroll(employeeObject) {
//reduce start at 0 
 return employeeObject.reduce((a,b) => {
      return a + allWagesFor(b);
 },0)
}