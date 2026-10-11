package org.example.Controller;

import org.example.Entities.orchid;
import org.example.Services.orchidServices;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<orchid> showOrchid(Model model) {
        List<orchid> list = services.findAll();

        // Sắp xếp theo tên (alphabet)
        list.sort((s1, s2) -> {
            String name1 = s1.getName();
            String name2 = s2.getName();
            if (name1 == null && name2 == null) return 0;
            if (name1 == null) return 1;
            if (name2 == null) return -1;
            return name1.compareToIgnoreCase(name2);
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
        return list;
    }
    @DeleteMapping("/delete/{id}")
    public void deleteOrchid(@PathVariable("id") int id) {
        services.deleteOrchid(id);
    }

    // API: GET http://localhost:8080/orchids/search?name=lan
    @GetMapping("/search")
    public ResponseEntity<List<orchid>> searchOrchids(@RequestParam("name") String name) {
        List<orchid> result = services.searchByName(name);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<orchid> updateOrchid(@PathVariable("id") int id, @RequestBody orchid orchid) {
        orchid.setId(id);
        orchid result = services.saveOrchid(orchid);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/add")
    public ResponseEntity<orchid> addOrchid(@RequestBody orchid orchid) {
        orchid result = services.saveOrchid(orchid);
        return ResponseEntity.ok(result);
    }




}
