/*
    File: hw4.js
    GUI Assigment: Using the jQuery Plugin/UI with Your Dynamic Table - PART 1: Validation Plugin
    Minh Le, Umass Lowell Computer Science, minhtri_le@student.uml.edu
    Copyright (C) 2021 by Minh Le. 
    Updated by ML on October 20, 2021 at 7:00pm
*/

$(document).ready(function () {

    /*jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });*/

    // Add new method to validation (check if the number is integer or not)
    $.validator.addMethod("integerNumber", function (value, element) {
        return Number.isInteger(Number(value));
    }, "Please enter an integer number.");

    /* 
        Validate the form:
        1. no blank field.
        2. input must be a number
        3. input must be in the range [-50, 50]
        4. input must be an integer number
    */
    $("#createTableForm").validate({
        rules: {
            fCol: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            },
            eCol: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            },
            fRow: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            },
            eRow: {
                required: true,
                number: true,
                range: [-50, 50],
                integerNumber: true
            }
        },

        // Config error messages
        messages: {
            fCol: {
                required: "Please enter a start column number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            },
            eCol: {
                required: "Please enter a end column number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            },
            fRow: {
                required: "Please enter a start row number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            },
            eRow: {
                required: "Please enter a end row number.",
                number: "Please enter a number.",
                range: "Please enter a number between -50 and 50."
            }
        }
    });

    // Button to create the table
    $("#btnGen").click(function () {
        var formValid = $("#createTableForm").valid();

        //console.log(formValid);

        // Check if the form is valid
        if (formValid) {
            // if the form is valid, get values from inputs and create the table
            var fCol = $("#fCol").val();
            var eCol = $("#eCol").val();
            var fRow = $("#fRow").val();
            var eRow = $("#eRow").val();

            /*
            console.log(fCol);
            console.log(eCol);
            console.log(fRow);
            console.log(eRow);
            */

            if (fCol != "" && eCol != "" && fRow != "" && eRow != "") {

                // convert string to numbers
                fCol = parseInt(fCol);
                eCol = parseInt(eCol);
                fRow = parseInt(fRow);
                eRow = parseInt(eRow);

                createTable(fCol, eCol, fRow, eRow);
            }
        }
    });

    // Create the table
    function createTable(x1, x2, y1, y2) {

        // if the table exist, remove it
        if ($("#myTable").length != 0) {
            $("#myTable").remove();
        }

        $("#wrapper").append("<div id='displayTab'></div>"); // add div#displayTab to div#wrapper
        $("#displayTab").append("<table id='myTable'></table>") // add table#myTable to div#displayTab

        // create rows
        var i, j, tr_index;
        tr_index = 0; // index of the TR

        // This code measure the table is still created 
        // if users input start values > end values
        // I converted from javascript from hw3 to jquery hw4
        if (x1 > x2 && y1 > y2) { // end start > end col and start row > end row
            for (i = y1; i >= y2 - 1; i--) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable").append("<tr></tr>"); // add tr to table

                    // Create the first TD (detail)
                    $("tr").eq(tr_index).append("<td></td>"); // add td to tr

                    // Create other TD on the first row
                    for (j = x1; j >= x2; j--) {
                        $("tr").eq(tr_index).append("<td>" + j + "</td>"); // add td with value j to tr
                    }
                    tr_index++; // increase index of tr by one
                } else {
                    // rows 2nd and more
                    $("#myTable").append("<tr></tr>"); // add 2nd and more tr to table

                    // Left Header
                    // i + 1 because we skip the first row, so we need to +1 (going down)
                    $("tr").eq(tr_index).append("<td>" + (i + 1) + "</td>"); // add td with value i + 1 to tr

                    // Create other next TD (columns)
                    for (j = x1; j >= x2; j--) {
                        $("tr").eq(tr_index).append("<td>" + (i + 1) * j + "</td>"); // calculate the result of multiplication
                    }
                    tr_index++; // increase index of tr by one
                }
            }
        } else if (x1 > x2 && y1 <= y2) { // start col > end col and start row <= end row
            for (i = y1; i <= y2 + 1; i++) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable").append("<tr></tr>");

                    // Create the first TD (detail)
                    $("tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j >= x2; j--) {
                        $("tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable").append("<tr></tr>");

                    // Left Header
                    // i - 1 because we skip the first header (going up)
                    $("tr").eq(tr_index).append("<td>" + (i - 1) + "</td>");

                    // Create other next TD (columns)
                    for (j = x1; j >= x2; j--) {
                        $("tr").eq(tr_index).append("<td>" + (i - 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        } else if (x1 <= x2 && y1 > y2) { // start col <= end col and start row > end row
            for (i = y1; i >= y2 - 1; i--) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable").append("<tr></tr>");

                    // Create the first TD (detail)
                    $("tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j <= x2; j++) {
                        $("tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable").append("<tr></tr>");

                    // Left Header
                    $("tr").eq(tr_index).append("<td>" + (i + 1) + "</td>");

                    // Create other next TD (columns)
                    for (j = x1; j <= x2; j++) {
                        $("tr").eq(tr_index).append("<td>" + (i + 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        } else { // start col <= end col and start row <= end row
            for (i = y1; i <= y2 + 1; i++) {
                if (i == y1) {
                    // First row (Top Header)
                    $("#myTable").append("<tr></tr>");

                    // Create the first TD (detail)
                    $("tr").eq(tr_index).append("<td></td>");

                    // Create other TD on the first row
                    for (j = x1; j <= x2; j++) {
                        $("tr").eq(tr_index).append("<td>" + j + "</td>");
                    }
                    tr_index++;
                } else {
                    // rows 2nd and more
                    $("#myTable").append("<tr></tr>");

                    // Left Header
                    $("tr").eq(tr_index).append("<td>" + (i - 1) + "</td>");

                    // Create other next TD
                    for (j = x1; j <= x2; j++) {
                        $("tr").eq(tr_index).append("<td>" + (i - 1) * j + "</td>");
                    }
                    tr_index++;
                }
            }
        }
    }
});

