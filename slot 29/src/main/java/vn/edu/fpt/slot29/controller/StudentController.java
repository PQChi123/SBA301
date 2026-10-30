package vn.edu.fpt.slot29.controller;

import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.slot29.domain.Student;
import vn.edu.fpt.slot29.service.IStudentService;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final IStudentService studentService;

    public StudentController(IStudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getStudents();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.getStudent(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @PostMapping("/{studentId}/borrow/{bookId}")
    public void borrowBook(@PathVariable Long studentId, @PathVariable Long bookId) {
        studentService.borrowBook(studentId, bookId);
    }

    @PostMapping("/{studentId}/return/{bookId}")
    public void returnBook(@PathVariable Long studentId, @PathVariable Long bookId) {
        studentService.returnBook(studentId, bookId);
    }

    @GetMapping("/by-book/{bookId}")
    public List<Student> findStudentsByBook(@PathVariable Long bookId) {
        return studentService.findStudentsByBook(bookId);
    }
}
