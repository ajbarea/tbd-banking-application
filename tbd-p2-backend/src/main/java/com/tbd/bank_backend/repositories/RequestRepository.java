package com.tbd.bank_backend.repositories;

import com.tbd.bank_backend.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface RequestRepository extends JpaRepository<Request, Integer> {


	@Modifying
	@Transactional
	@Query("UPDATE requests n SET n.status.id = :statusId WHERE n.id = :id")
	int updateStatusById(@Param("statusId") int statusId, @Param("id") int id);

}
