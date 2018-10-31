var express = require("express");
var router = express.Router();
var Student = require("./student");

router.get("/students", function (request, response) {
    Student.find(function (error, data) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.render("index.html", {students: data});
    });
});

router.get("/students/new", function (request, response) {
    response.render("new.html");
});

router.post("/students/new", function (request, response) {
    new Student(request.body).save(function (error) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.redirect(302, "/students");
    });
});

router.get("/students/edit", function (request, response) {
    Student.findById(request.query.id.replace(/"/g, ""), function (error, data) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.render("edit.html", {students: data});
    });
});

router.post("/students/edit", function (request, response) {
    console.log(typeof request.body.id.replace(/"/g, ""));
    Student.findByIdAndUpdate(request.body.id.replace(/"/g, ""), request.body, function (error) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.redirect(302, "/students");
    });
});

router.get("/students/delete", function (request, response) {
    Student.findByIdAndRemove(request.query.id.replace(/"/g, ""), function (error) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.redirect(302, "/students");
    })
});

module.exports = router;
