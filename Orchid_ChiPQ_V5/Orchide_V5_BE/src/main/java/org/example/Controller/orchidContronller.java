package org.example.Controller;

import org.example.Entities.orchid;
import org.example.Services.orchidServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class orchidContronller {
    @Autowired
    orchidServices services;

@GetMapping
    @ResponseBody
    public ResponseEntity<List<orchid>> showOrchid(Model model) {
        List<orchid> list = services.findAll();

        // Sắp xếp theo tên (alphabet)
        list.sort((s1, s2) -> {
            int name1 = s1.getId();
            int name2 = s2.getId();
//            if (name1 == null && name2 == null) return 0;
//            if (name1 == null) return 1;
//            if (name2 == null) return -1;
            return Integer.compare(name1, name2);
        });
//
//        // Nếu muốn sắp xếp theo tuổi thì thay bằng:
//        // list.sort(Comparator.comparingInt(Staff::getAge));
//
//        // Nếu muốn sắp xếp theo nhiều tiêu chí (tên rồi đến tuổi):
//        // list.sort(Comparator.comparing(Staff::getStaffName)
//        //                     .thenComparingInt(Staff::getAge));

        model.addAttribute("List", list);
        //return "ListTour";
        return ResponseEntity.ok(list);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable("id") int id) {
        if (services.findById(id) == null) {
            return ResponseEntity.notFound().build(); // ID không tồn tại -> 404
        }
        services.deleteOrchid(id);
        return ResponseEntity.noContent().build(); // Xóa thành công -> 204 No Content
    }

    @PostMapping("/add")
    public ResponseEntity<orchid> addOrchid(@RequestBody orchid orchid) {
        orchid created = services.saveOrchid(orchid);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<orchid> updateOrchid(@PathVariable("id") int id, @RequestBody orchid orchidDetails) {
        orchid updated = services.updateOrchid(id, orchidDetails);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<orchid> getOrchidById(@PathVariable("id") int id) {
        orchid orchid = services.findById(id);
        if (orchid == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orchid);
    }

    @GetMapping("/search")
    public ResponseEntity<List<orchid>> searchOrchids(@RequestParam("name") String name) {
        List<orchid> result = services.searchByName(name);
        return ResponseEntity.ok(result);
    }

}
