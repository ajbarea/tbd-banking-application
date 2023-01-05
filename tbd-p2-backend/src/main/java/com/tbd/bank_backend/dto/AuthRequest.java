package com.tbd.bank_backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class AuthRequest {
    @NotNull @Length(min = 1, max = 50)
    private String userName;

    @NotNull @Length(min = 1, max = 50)
    private String password;
}
