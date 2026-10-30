
package org.example.controller;

import org.example.entities.Tag;
import org.example.service.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ChiPQCe180289
 *
 **/
@RestController
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.getAll();
    }

    @GetMapping("/search")
    public List<Tag> searchTags(@RequestParam("name") String name) {
        return tagService.search(name);
    }
}
