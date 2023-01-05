package com.tbd.bank_backend.services;

import com.tbd.bank_backend.models.Request;
import com.tbd.bank_backend.models.User;
import com.tbd.bank_backend.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RequestService {

	@Autowired
	private RequestRepository reqRepo;

	public int createRequest(Request request){

		return reqRepo.save(request).getId();
	}


	public Optional<Request> getRequestById(int id){
		return reqRepo.findById(id);
	}

	@Transactional
	public boolean markRequestComplete(int id){
		return reqRepo.updateStatusById(2, id) > 0;
	}


	public void deleteRequest(int id) {
		 reqRepo.deleteById(id);
	}
}
