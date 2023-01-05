package com.tbd.bank_backend.controllers;

import com.tbd.bank_backend.models.Request;
import com.tbd.bank_backend.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

	@Autowired
	private RequestService rServe;

	@PostMapping
	public int create(@RequestBody Request request) {
		try {
			return rServe.createRequest(request);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@GetMapping("/{id}")
	public Request getRequest(@PathVariable int id){
		return rServe.getRequestById(id).orElse(null);
	}

	@PutMapping("/{id}")
	public boolean updateRequest(@PathVariable int id) {
		if(rServe.getRequestById(id).isPresent()) {
			return rServe.markRequestComplete(id);
		}
		return false;
	}

	@DeleteMapping("/{id}")
	public void deleteRequest(@PathVariable int id){
		rServe.deleteRequest(id);
	}


}
