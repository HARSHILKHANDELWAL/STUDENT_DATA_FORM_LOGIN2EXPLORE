/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseurl="http://api.login2explore.com:5577";
var imlurl="/api/iml";
var irlurl="/api/irl";
var dbName="SCHOOL-DB";
var  relationName="STUDENT-TABLE"
var connToken="90933010|-31949325226273038|90949756"
$("#StudentId").focus();
$("#StudentSave").prop("disabled",true);
$("#StudentUpdate").prop("disabled",true);
$("#StudentReset").prop("disabled",true);
$("#StudentName").prop( "disabled", true );
$("#StudentClass").prop( "disabled", true );
$("#StudentBirth").prop( "disabled", true );
$("#StudentAddress").prop( "disabled", true );
$("#StudentEnrollDate").prop( "disabled", true );
function validateAndGetFormData() {
var StudentIdVar = $("#StudentId").val();
if (StudentIdVar === "") {
alert("Student RollNO. Required Value");
$("#StudentId").focus();
return "";
}
var StudentNameVar = $("#StudentName").val();
if (StudentNameVar === "") {
alert("Student Name is Required Value");
$("#StudentName").focus();
return "";
}
var StudentClassVar = $("#StudentClass").val();
if (StudentClassVar === "") {
alert("Student Class is Required Value");
$("#StudentClass").focus();
return "";

}
var StudentBirthVar = $("#StudentBirth").val();
if (StudentBirthVar === "") {
alert("Student Birth-Date is Required Value");
$("#StudentBirth").focus();
return "";

}


var StudentAddressVar = $("#StudentAddress").val();
if (StudentAddressVar === "") {
alert("Student Address is Required Value");
$("#StudentAdress").focus();
return "";

}
var StudentEnrollDateVar = $("#StudentEnrollDate").val();
if (StudentEnrollDateVar === "") {
alert("Student EnrollDate is Required Value");
$("#StudentEnrollDate").focus();
return "";

}




var jsonStrObj = {
StudentId: StudentIdVar,
StudentName: StudentNameVar,
StudentClass: StudentClassVar,
StudentBirth: StudentBirthVar,
StudentAddress: StudentAddressVar,
StudentEnrollDate: StudentEnrollDateVar,

};
return JSON.stringify(jsonStrObj);
}

// This method is used to create PUT Json request.

function resetForm() {
$("#StudentId").val("")
$("#StudentName").val("");
$("#StudentClass").val("");
$("#StudentBirth").val("");
$("#StudentAddress").val("");
$("#StudentEnrollDate").val("");
$("#StudentId").prop("disabled", false);
$("#StudentName").prop( "disabled", true );
$("#StudentClass").prop( "disabled", true );
$("#StudentBirth").prop( "disabled", true );
$("#StudentAddress").prop( "disabled", true );
$("#StudentEnrollDate").prop( "disabled", true );
$("#StudentId").focus();
}
function saveStudentData() {
var jsonStr = validateAndGetFormData();
if (jsonStr === "") {
return "";

}
var putReqStr = createPUTRequest(connToken,
jsonStr, dbName, relationName);
//alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
baseurl, imlurl);
alert("your data has been successfully entered");
jQuery.ajaxSetup({async: true});
resetForm();
}


function updateStudentData() {
    $('#StudentUpdate').prop('disabled',true);
var jsonStr = validateAndGetFormData();
if (jsonStr === "") {
return "";

}
var updateReqStr = createUPDATERecordRequest(connToken,
jsonStr, dbName, relationName,localStorage.getItem("updateid"));
//alert(updateReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(updateReqStr,
baseurl, imlurl);
alert("Updated Successfully");
jQuery.ajaxSetup({async: true});
resetForm();
}

function getData(){
    var studentData=getDataById();
//    console.log(studentData);
    var getRequestStr=createGET_BY_KEYRequest(connToken, dbName, relationName, studentData);
    
    jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(getRequestStr,
baseurl, irlurl);
//console.log(resultObj)
//alert(JSON.stringify(resultObj));
jQuery.ajaxSetup({async: true});

 
    
    
if(resultObj.status===400){
    $("#StudentSave").prop("disabled",false);
     $("#StudentReset").prop("disabled",false);
       $("#StudentUpdate").prop("disabled",true);
     $("#StudentName").focus();
       $("#StudentName").prop( "disabled", false );
$("#StudentClass").prop( "disabled", false );
$("#StudentBirth").prop( "disabled", false );
$("#StudentAddress").prop( "disabled", false );
$("#StudentEnrollDate").prop( "disabled", false );
}
else if(resultObj.status===200)
{
    $("#StudentId").prop("disabled",true);
    fillData(resultObj);
    $("#StudentName").focus();
    $("#StudentName").prop( "disabled", false );
$("#StudentClass").prop( "disabled", false );
$("#StudentBirth").prop( "disabled", false );
$("#StudentAddress").prop( "disabled", false );
$("#StudentEnrollDate").prop( "disabled", false );
     $("#StudentUpdate").prop("disabled",false);
     $("#StudentReset").prop("disabled",false);
     
    
}

}

function saveRecNo(resulObj)
{
    var savedata=JSON.parse(resulObj.data);
    localStorage.setItem("updateid",savedata.rec_no);
}

function fillData(resultObj){
    saveRecNo(resultObj);
    var data=JSON.parse(resultObj.data).record;
    console.log(data)
    $("#StudentId").val(data.StudentId);
$("#StudentName").val(data.StudentName);

$("#StudentClass").val(data.StudentClass );
$("#StudentBirth").val(data.StudentBirth);
$("#StudentAddress").val(data.StudentAddress);
$("#StudentEnrollDate").val(data.StudentEnrollDate);

}

function getDataById(){
    var studentRoll= $('#StudentId').val();
    var RollNo ={
        StudentId:studentRoll
    };
    return JSON.stringify(RollNo);
}