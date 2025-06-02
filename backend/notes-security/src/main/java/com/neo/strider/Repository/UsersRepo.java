package com.neo.strider.Repository;

import com.neo.strider.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<Users,Integer> {
        Users findByUsername(String Username);
        boolean existsByUsername(String Username);
}
