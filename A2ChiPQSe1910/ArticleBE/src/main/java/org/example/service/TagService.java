/**
* ChiPQCe180289
*
**/
package org.example.service;

import org.example.entities.Tag;
import org.example.respository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* ChiPQCe180289
*
**/
@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    public List<Tag> search(String name) {
        return tagRepository.findByTagNameContainingIgnoreCase(name);
    }
}
