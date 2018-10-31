var fs = require("fs");
var dbPath = "./db.json";

exports.save = function (student, callback) {
    fs.readFile(dbPath, function (error, data) {
        if (error) {
            return callback(error);
        }
        var students = JSON.parse(data.toString()).students;
        student.id = students[students.length - 1].id + 1;
        students.push(student);
        var fileData = JSON.stringify({students: students});
        fs.writeFile(dbPath, fileData, function (error) {
            if (error) {
                return callback(error);
            }
            callback(null);
        });
    });
};

exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, function (error, data) {
        if (error) {
            return callback(error);
        }
        var students = JSON.parse(data.toString()).students;

        var deleteId = students.findIndex(function (item) {
            return item.id = parseInt(id);
        });
        
        students.splice(deleteId, 1);
        var fileData = JSON.stringify({students: students});

        fs.writeFile(dbPath, fileData, function (error) {
            if (error) {
                return callback(error);
            }
            callback(null);
        });
    });
};

exports.updateById = function (student, callback) {
    fs.readFile(dbPath, function (error, data) {
        if (error) {
            return callback(error);
        }
        var students = JSON.parse(data.toString()).students;
        student.id = parseInt(student.id);
        var stu = students.find(function (item) {
            return item.id === student.id;
        });

        for (var key in student) {
            stu[key] = student[key];
        }

        var fileData = JSON.stringify({students: students});

        fs.writeFile(dbPath, fileData, function (error) {
            if (error) {
                return callback(error);
            }
            callback(null);
        });
    });
};

exports.find = function (callback) {
    fs.readFile(dbPath, function (error, data) {
        if (error) {
            return callback(error);
        }
        callback(null, JSON.parse(data.toString()).students);
    });
};

exports.findById = function (id, callback) {
    fs.readFile(dbPath, function (error, data) {
        if (error) {
            return callback(error);
        }
        var students = JSON.parse(data.toString()).students;
        var stu = students.find(function (item) {
            return item.id === parseInt(id);
        });
        callback(null, stu);
    });
};
