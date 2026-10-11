package org.example.Services;

import org.example.Entities.orchid;
import org.example.Reponsitory.orchidReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class orchidServices {
    @Autowired
    orchidReponsitory orchidRepository;
//
    public List<orchid> findAll(){
        return orchidRepository.findAll();
    }
//
    public orchid saveOrchid(orchid orchid) {
        return orchidRepository.save(orchid);
    }
//
    @Transactional
    public void deleteName(String name){
        orchidRepository.deleteByName(name);
    }
//
//    // ĐẶT METHOD DELETE VÀO BÊN TRONG CLASS TẠI ĐÂY
    @Transactional
    public void deleteOrchid(int id) {
        // 1. Kiểm tra tồn tại, nếu không có thì bắn Exception
        if (!orchidRepository.findById(id).isPresent()) {
            throw new RuntimeException("Không tìm thấy Hoa Lan có ID = " + id);
        }
//
//        // 2. Gọi Repository xóa vĩnh viễn dưới DB
        orchidRepository.deleteById(id);
//    }
//    public toursEntities updateTour(int  id, toursEntities tourDetails) {
//        tourDetails.setId(id); // Đảm bảo gán đúng ID để JPA thực hiện lệnh UPDATE
//        return tourReponsitory.save(tourDetails);
//    }


    }
    public List<orchid> searchByName(String name) {
        return orchidRepository.findByNameContainingIgnoreCase(name);
    }
}
