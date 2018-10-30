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
    var student = request.body;
    Student.save(student, function (error) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.redirect(302, "/students");
    });
});

router.get("/students/edit", function (request, response) {
    Student.findById(parseInt(request.query.id), function (error, data) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        console.log(data);
        response.render("edit.html", {students: data});
    });
});

router.post("/students/edit", function (request, response) {
    var student = request.body;
    Student.updateById(student, function (error) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.redirect(302, "/students");
    });
});

router.get("/students/delete", function (request, response) {
    var id = request.query.id;
    Student.deleteById(id, function (error) {
        if (error) {
            return response.status(500).send("Server error.");
        }
        response.redirect(302, "/students");
    })
});

module.exports = router;
